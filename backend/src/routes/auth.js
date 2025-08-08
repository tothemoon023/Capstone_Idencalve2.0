const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Initialize Solana connection
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com');

// Generate JWT token
const generateToken = (walletAddress) => {
  return jwt.sign(
    { walletAddress },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// POST /api/auth/connect-wallet
router.post('/connect-wallet', async (req, res) => {
  try {
    const { walletAddress, signature, message } = req.body;

    if (!walletAddress || !signature || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Wallet address, signature, and message are required'
      });
    }

    // Verify wallet address format
    try {
      new PublicKey(walletAddress);
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid wallet address',
        message: 'Please provide a valid Solana wallet address'
      });
    }

    // TODO: Verify signature against message
    // For MVP, we'll skip signature verification for now
    // In production, you should verify the signature

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { walletAddress }
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          walletAddress,
          profileData: {
            walletAddress,
            createdAt: new Date().toISOString()
          }
        }
      });
    }

    // Generate JWT token
    const token = generateToken(walletAddress);

    res.json({
      success: true,
      message: 'Wallet connected successfully',
      data: {
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          userType: user.userType,
          status: user.status
        },
        token
      }
    });

  } catch (error) {
    console.error('Wallet connection error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to connect wallet'
    });
  }
});

// POST /api/auth/verify-signature
router.post('/verify-signature', async (req, res) => {
  try {
    const { walletAddress, signature, message } = req.body;

    if (!walletAddress || !signature || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Wallet address, signature, and message are required'
      });
    }

    // TODO: Implement signature verification
    // For MVP, we'll return success
    // In production, verify the signature using Solana web3.js

    res.json({
      success: true,
      message: 'Signature verified successfully'
    });

  } catch (error) {
    console.error('Signature verification error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to verify signature'
    });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        error: 'No token provided',
        message: 'Authentication token is required'
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { walletAddress } = decoded;

    // Get user from database
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
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Authentication token is invalid'
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to get user information'
    });
  }
});

module.exports = router;
