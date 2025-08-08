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

// POST /api/identity/create
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { walletAddress } = req.user;
    const { profileData, userType } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { walletAddress }
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists',
        message: 'User with this wallet address already exists'
      });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        walletAddress,
        profileData: profileData || {},
        userType: userType || 'individual'
      }
    });

    res.status(201).json({
      success: true,
      message: 'User identity created successfully',
      data: {
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          userType: user.userType,
          status: user.status,
          profileData: user.profileData
        }
      }
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create user identity'
    });
  }
});

// GET /api/identity/:walletAddress
router.get('/:walletAddress', authenticateToken, async (req, res) => {
  try {
    const { walletAddress } = req.params;

    // Verify user can only access their own profile
    if (req.user.walletAddress !== walletAddress) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You can only access your own profile'
      });
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        credentials: true,
        verificationRequests: true,
        verificationTargets: true
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
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          userType: user.userType,
          status: user.status,
          profileData: user.profileData,
          credentials: user.credentials,
          verificationRequests: user.verificationRequests,
          verificationTargets: user.verificationTargets
        }
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to get user profile'
    });
  }
});

// PUT /api/identity/:walletAddress
router.put('/:walletAddress', authenticateToken, async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const { profileData, userType, status } = req.body;

    // Verify user can only update their own profile
    if (req.user.walletAddress !== walletAddress) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You can only update your own profile'
      });
    }

    const updatedUser = await prisma.user.update({
      where: { walletAddress },
      data: {
        profileData: profileData || undefined,
        userType: userType || undefined,
        status: status || undefined
      }
    });

    res.json({
      success: true,
      message: 'User profile updated successfully',
      data: {
        user: {
          id: updatedUser.id,
          walletAddress: updatedUser.walletAddress,
          userType: updatedUser.userType,
          status: updatedUser.status,
          profileData: updatedUser.profileData
        }
      }
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update user profile'
    });
  }
});

// POST /api/identity/:walletAddress/credentials
router.post('/:walletAddress/credentials', authenticateToken, async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const { credentialHash, credentialType, metadata } = req.body;

    // Verify user can only add credentials to their own profile
    if (req.user.walletAddress !== walletAddress) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You can only add credentials to your own profile'
      });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { walletAddress }
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with this wallet address does not exist'
      });
    }

    // Create credential
    const credential = await prisma.credential.create({
      data: {
        userId: user.id,
        credentialHash,
        credentialType,
        metadata: metadata || {}
      }
    });

    res.status(201).json({
      success: true,
      message: 'Credential added successfully',
      data: {
        credential: {
          id: credential.id,
          credentialHash: credential.credentialHash,
          credentialType: credential.credentialType,
          verificationStatus: credential.verificationStatus,
          metadata: credential.metadata,
          createdAt: credential.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Add credential error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to add credential'
    });
  }
});

// GET /api/identity/:walletAddress/credentials
router.get('/:walletAddress/credentials', authenticateToken, async (req, res) => {
  try {
    const { walletAddress } = req.params;

    // Verify user can only access their own credentials
    if (req.user.walletAddress !== walletAddress) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You can only access your own credentials'
      });
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        credentials: true
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
        credentials: user.credentials
      }
    });

  } catch (error) {
    console.error('Get credentials error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to get credentials'
    });
  }
});

module.exports = router;
