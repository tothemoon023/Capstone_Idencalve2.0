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

// POST /api/verification/request
router.post('/request', authenticateToken, async (req, res) => {
  try {
    const { requesterWalletAddress } = req.user;
    const { targetWalletAddress, requestType, metadata } = req.body;

    if (!targetWalletAddress || !requestType) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Target wallet address and request type are required'
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

    // Get target user
    const target = await prisma.user.findUnique({
      where: { walletAddress: targetWalletAddress }
    });

    if (!target) {
      return res.status(404).json({
        error: 'Target not found',
        message: 'Target user does not exist'
      });
    }

    // Create verification request
    const verificationRequest = await prisma.verificationRequest.create({
      data: {
        requesterId: requester.id,
        targetId: target.id,
        requestType,
        metadata: metadata || {}
      }
    });

    res.status(201).json({
      success: true,
      message: 'Verification request created successfully',
      data: {
        verificationRequest: {
          id: verificationRequest.id,
          requestType: verificationRequest.requestType,
          status: verificationRequest.status,
          metadata: verificationRequest.metadata,
          createdAt: verificationRequest.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Create verification request error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create verification request'
    });
  }
});

// GET /api/verification/:requestId
router.get('/:requestId', authenticateToken, async (req, res) => {
  try {
    const { requestId } = req.params;
    const { walletAddress } = req.user;

    const verificationRequest = await prisma.verificationRequest.findUnique({
      where: { id: requestId },
      include: {
        requester: true,
        target: true
      }
    });

    if (!verificationRequest) {
      return res.status(404).json({
        error: 'Verification request not found',
        message: 'Verification request does not exist'
      });
    }

    // Check if user is authorized to view this request
    if (verificationRequest.requester.walletAddress !== walletAddress && 
        verificationRequest.target.walletAddress !== walletAddress) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You are not authorized to view this verification request'
      });
    }

    res.json({
      success: true,
      data: {
        verificationRequest: {
          id: verificationRequest.id,
          requestType: verificationRequest.requestType,
          status: verificationRequest.status,
          metadata: verificationRequest.metadata,
          createdAt: verificationRequest.createdAt,
          updatedAt: verificationRequest.updatedAt,
          requester: {
            id: verificationRequest.requester.id,
            walletAddress: verificationRequest.requester.walletAddress,
            userType: verificationRequest.requester.userType
          },
          target: {
            id: verificationRequest.target.id,
            walletAddress: verificationRequest.target.walletAddress,
            userType: verificationRequest.target.userType
          }
        }
      }
    });

  } catch (error) {
    console.error('Get verification request error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to get verification request'
    });
  }
});

// PUT /api/verification/:requestId
router.put('/:requestId', authenticateToken, async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, metadata } = req.body;
    const { walletAddress } = req.user;

    const verificationRequest = await prisma.verificationRequest.findUnique({
      where: { id: requestId },
      include: {
        requester: true,
        target: true
      }
    });

    if (!verificationRequest) {
      return res.status(404).json({
        error: 'Verification request not found',
        message: 'Verification request does not exist'
      });
    }

    // Check if user is authorized to update this request
    if (verificationRequest.requester.walletAddress !== walletAddress && 
        verificationRequest.target.walletAddress !== walletAddress) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You are not authorized to update this verification request'
      });
    }

    // Update verification request
    const updatedRequest = await prisma.verificationRequest.update({
      where: { id: requestId },
      data: {
        status: status || verificationRequest.status,
        metadata: metadata || verificationRequest.metadata
      }
    });

    res.json({
      success: true,
      message: 'Verification request updated successfully',
      data: {
        verificationRequest: {
          id: updatedRequest.id,
          requestType: updatedRequest.requestType,
          status: updatedRequest.status,
          metadata: updatedRequest.metadata,
          updatedAt: updatedRequest.updatedAt
        }
      }
    });

  } catch (error) {
    console.error('Update verification request error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update verification request'
    });
  }
});

// GET /api/verification/user/:walletAddress
router.get('/user/:walletAddress', authenticateToken, async (req, res) => {
  try {
    const { walletAddress } = req.params;

    // Verify user can only access their own verification requests
    if (req.user.walletAddress !== walletAddress) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You can only access your own verification requests'
      });
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        verificationRequests: {
          include: {
            target: true
          }
        },
        verificationTargets: {
          include: {
            requester: true
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
        sentRequests: user.verificationRequests,
        receivedRequests: user.verificationTargets
      }
    });

  } catch (error) {
    console.error('Get user verification requests error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to get verification requests'
    });
  }
});

module.exports = router;
