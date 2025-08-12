const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPG, and PNG files are allowed.'), false);
    }
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const { walletAddress } = req.query;
    
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Mock response for demo
    const profile = {
      walletAddress,
      name: 'John Doe',
      email: 'john.doe@example.com',
      profession: 'Software Engineer',
      location: 'San Francisco, CA',
      status: 'verified',
      createdAt: new Date().toISOString()
    };

    res.json(profile);
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { walletAddress, profileData } = req.body;
    
    if (!walletAddress || !profileData) {
      return res.status(400).json({ error: 'Wallet address and profile data are required' });
    }

    // Mock response for demo
    const updatedProfile = {
      walletAddress,
      ...profileData,
      updatedAt: new Date().toISOString()
    };

    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Upload document
router.post('/upload-document', upload.single('file'), async (req, res) => {
  try {
    const { documentType, walletAddress } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!documentType || !walletAddress) {
      return res.status(400).json({ error: 'Document type and wallet address are required' });
    }

    // Mock document record for demo
    const document = {
      id: Date.now(),
      filename: file.filename,
      originalName: file.originalname,
      documentType,
      walletAddress,
      fileSize: file.size,
      mimeType: file.mimetype,
      uploadDate: new Date().toISOString(),
      status: 'pending',
      filePath: file.path
    };

    // In a real application, you would save this to the database
    console.log('Document uploaded:', document);

    res.json({
      success: true,
      document: {
        id: document.id,
        name: file.originalname,
        type: documentType,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      }
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// Get user documents
router.get('/documents', async (req, res) => {
  try {
    const { walletAddress } = req.query;
    
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Mock documents for demo
    const documents = [
      {
        id: 1,
        name: 'Driver License.pdf',
        type: 'ID Document',
        status: 'Verified',
        date: '2024-08-08',
        size: '2.3 MB'
      },
      {
        id: 2,
        name: 'Passport.pdf',
        type: 'ID Document',
        status: 'Pending',
        date: '2024-08-07',
        size: '1.8 MB'
      }
    ];

    res.json(documents);
  } catch (error) {
    console.error('Error getting documents:', error);
    res.status(500).json({ error: 'Failed to get documents' });
  }
});

// Add credential
router.post('/credentials', async (req, res) => {
  try {
    const { walletAddress, credentialHash, credentialType, metadata } = req.body;
    
    if (!walletAddress || !credentialHash || !credentialType) {
      return res.status(400).json({ error: 'Wallet address, credential hash, and type are required' });
    }

    // Mock credential for demo
    const credential = {
      id: Date.now(),
      walletAddress,
      credentialHash,
      credentialType,
      metadata: metadata || '',
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    res.json(credential);
  } catch (error) {
    console.error('Error adding credential:', error);
    res.status(500).json({ error: 'Failed to add credential' });
  }
});

// Get user credentials
router.get('/credentials', async (req, res) => {
  try {
    const { walletAddress } = req.query;
    
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Mock credentials for demo
    const credentials = [
      {
        id: 1,
        credentialHash: 'abc123...',
        credentialType: 'Professional License',
        metadata: 'Software Engineer License',
        status: 'active',
        createdAt: '2024-08-01'
      },
      {
        id: 2,
        credentialHash: 'def456...',
        credentialType: 'Certificate',
        metadata: 'Blockchain Development Certificate',
        status: 'active',
        createdAt: '2024-08-05'
      }
    ];

    res.json(credentials);
  } catch (error) {
    console.error('Error getting credentials:', error);
    res.status(500).json({ error: 'Failed to get credentials' });
  }
});

module.exports = router;
