const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      error: 'No token provided',
      message: 'Authentication token is required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token',
      message: 'Authentication token is invalid'
    });
  }
};

// POST /api/sharing/request
router.post('/request', authenticateToken, async (req, res) => {
  try {
    const { requesterWalletAddress } = req.user;
    const { dataOwnerWalletAddress, dataScope, expiresAt } = req.body;

    if (!dataOwnerWalletAddress || !dataScope) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Data owner wallet address and data scope are required'
      });
    }

    // Get requester user
    const requester = await prisma.user.findUnique({
      where: { walletAddress: requesterWalletAddress }
    });

    if (!requester) {
      return res.status(404).json({
        error: 'Requester not found',
        message: 'Requester user does not exist'
      });
    }

    // Get data owner user
    const dataOwner = await prisma.user.findUnique({
      where: { walletAddress: dataOwnerWalletAddress }
    });

    if (!dataOwner) {
      return res.status(404).json({
        error: 'Data owner not found',
        message: 'Data owner user does not exist'
      });
    }

    // Create consent request
    const consentRecord = await prisma.consentRecord.create({
      data: {
        dataOwnerId: dataOwner.id,
        requesterId: requester.id,
        dataScope,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      }
    });

    res.status(201).json({
      success: true,
      message: 'Data access request created successfully',
      data: {
        consentRecord: {
          id: consentRecord.id,
          dataScope: consentRecord.dataScope,
          consentStatus: consentRecord.consentStatus,
          expiresAt: consentRecord.expiresAt,
          createdAt: consentRecord.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Create consent request error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create data access request'
    });
  }
});

// POST /api/sharing/grant
router.post('/grant', authenticateToken, async (req, res) => {
  try {
    const { dataOwnerWalletAddress } = req.user;
    const { consentId } = req.body;

    if (!consentId) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Consent ID is required'
      });
    }

    // Get consent record
    const consentRecord = await prisma.consentRecord.findUnique({
      where: { id: consentId },
      include: {
        dataOwner: true
      }
    });

    if (!consentRecord) {
      return res.status(404).json({
        error: 'Consent record not found',
        message: 'Consent record does not exist'
      });
    }

    // Verify data owner can grant consent
    if (consentRecord.dataOwner.walletAddress !== dataOwnerWalletAddress) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You can only grant consent for your own data'
      });
    }

    // Update consent status
    const updatedConsent = await prisma.consentRecord.update({
      where: { id: consentId },
      data: {
        consentStatus: 'granted'
      }
    });

    res.json({
      success: true,
      message: 'Consent granted successfully',
      data: {
        consentRecord: {
          id: updatedConsent.id,
          consentStatus: updatedConsent.consentStatus,
          updatedAt: updatedConsent.updatedAt
        }
      }
    });

  } catch (error) {
    console.error('Grant consent error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to grant consent'
    });
  }
});

// POST /api/sharing/revoke
router.post('/revoke', authenticateToken, async (req, res) => {
  try {
    const { dataOwnerWalletAddress } = req.user;
    const { consentId } = req.body;

    if (!consentId) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Consent ID is required'
      });
    }

    // Get consent record
    const consentRecord = await prisma.consentRecord.findUnique({
      where: { id: consentId },
      include: {
        dataOwner: true
      }
    });

    if (!consentRecord) {
      return res.status(404).json({
        error: 'Consent record not found',
        message: 'Consent record does not exist'
      });
    }

    // Verify data owner can revoke consent
    if (consentRecord.dataOwner.walletAddress !== dataOwnerWalletAddress) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You can only revoke consent for your own data'
      });
    }

    // Update consent status
    const updatedConsent = await prisma.consentRecord.update({
      where: { id: consentId },
      data: {
        consentStatus: 'revoked'
      }
    });

    res.json({
      success: true,
      message: 'Consent revoked successfully',
      data: {
        consentRecord: {
          id: updatedConsent.id,
          consentStatus: updatedConsent.consentStatus,
          updatedAt: updatedConsent.updatedAt
        }
      }
    });

  } catch (error) {
    console.error('Revoke consent error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to revoke consent'
    });
  }
});

// GET /api/sharing/consent/:walletAddress
router.get('/consent/:walletAddress', authenticateToken, async (req, res) => {
  try {
    const { walletAddress } = req.params;

    // Verify user can only access their own consent records
    if (req.user.walletAddress !== walletAddress) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You can only access your own consent records'
      });
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        consentRecords: {
          include: {
            requester: true
          }
        },
        consentRequests: {
          include: {
            dataOwner: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with this wallet address does not exist'
      });
    }

    res.json({
      success: true,
      data: {
        grantedConsents: user.consentRecords.filter(c => c.consentStatus === 'granted'),
        pendingConsents: user.consentRecords.filter(c => c.consentStatus === 'pending'),
        revokedConsents: user.consentRecords.filter(c => c.consentStatus === 'revoked'),
        sentRequests: user.consentRequests
      }
    });

  } catch (error) {
    console.error('Get consent records error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to get consent records'
    });
  }
});

// POST /api/sharing/check-permission
router.post('/check-permission', authenticateToken, async (req, res) => {
  try {
    const { requesterWalletAddress } = req.user;
    const { dataOwnerWalletAddress, dataType } = req.body;

    if (!dataOwnerWalletAddress || !dataType) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Data owner wallet address and data type are required'
      });
    }

    // Get requester user
    const requester = await prisma.user.findUnique({
      where: { walletAddress: requesterWalletAddress }
    });

    if (!requester) {
      return res.status(404).json({
        error: 'Requester not found',
        message: 'Requester user does not exist'
      });
    }

    // Get data owner user
    const dataOwner = await prisma.user.findUnique({
      where: { walletAddress: dataOwnerWalletAddress }
    });

    if (!dataOwner) {
      return res.status(404).json({
        error: 'Data owner not found',
        message: 'Data owner user does not exist'
      });
    }

    // Check for active consent
    const activeConsent = await prisma.consentRecord.findFirst({
      where: {
        dataOwnerId: dataOwner.id,
        requesterId: requester.id,
        consentStatus: 'granted',
        dataScope: {
          path: ['dataTypes'],
          array_contains: [dataType]
        },
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      }
    });

    const hasPermission = !!activeConsent;

    res.json({
      success: true,
      data: {
        hasPermission,
        consentRecord: activeConsent ? {
          id: activeConsent.id,
          dataScope: activeConsent.dataScope,
          expiresAt: activeConsent.expiresAt
        } : null
      }
    });

  } catch (error) {
    console.error('Check permission error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to check permission'
    });
  }
});

module.exports = router;
