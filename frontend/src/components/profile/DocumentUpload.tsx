import { useState, useRef } from 'react'
import { DocumentTextIcon, CloudArrowUpIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useWallet } from '@solana/wallet-adapter-react'

interface Document {
  id: number
  name: string
  type: string
  status: string
  date: string
  size?: string
}

export default function DocumentUpload() {
  const { publicKey } = useWallet()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<Document[]>([
    { id: 1, name: 'Driver License.pdf', type: 'ID Document', status: 'Verified', date: '2024-08-08', size: '2.3 MB' },
    { id: 2, name: 'Passport.pdf', type: 'ID Document', status: 'Pending', date: '2024-08-07', size: '1.8 MB' },
  ])

  const documentTypes = [
    'ID Document',
    'Passport',
    'Driver License',
    'Professional License',
    'Certificate',
    'Other'
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload PDF, JPG, or PNG files only')
        return
      }
      
      setSelectedFile(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload PDF, JPG, or PNG files only')
        return
      }
      
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !documentType) {
      alert('Please select a file and document type')
      return
    }

    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Create form data
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('documentType', documentType)
      formData.append('walletAddress', publicKey.toBase58())

      // Upload to backend
      const response = await fetch('http://localhost:4000/api/identity/upload-document', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (response.ok) {
        const result = await response.json()
        
        // Add new document to list
        const newDocument: Document = {
          id: Date.now(),
          name: selectedFile.name,
          type: documentType,
          status: 'Pending',
          date: new Date().toISOString().split('T')[0],
          size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
        }
        
        setUploadedFiles(prev => [newDocument, ...prev])
        
        // Reset form
        setSelectedFile(null)
        setDocumentType('')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        
        alert('Document uploaded successfully!')
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setUploadedFiles(prev => prev.filter(file => file.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
        <p className="text-gray-600">Upload and manage your credentials securely</p>
      </div>

      {/* Upload Area */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New Document</h2>
        
        <div className="space-y-4">
          <div>
            <label className="form-label">Document Type</label>
            <select 
              className="input-field"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Select document type</option>
              {documentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Upload File</label>
            <div 
              className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors ${
                selectedFile ? 'border-primary-400 bg-primary-50' : ''
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              
              {selectedFile ? (
                <div className="space-y-2">
                  <p className="text-primary-600 font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-600">
                    Size: {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-2">Drag and drop your file here, or</p>
                  <button 
                    className="btn-primary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </button>
                  <p className="text-sm text-gray-500 mt-2">PDF, JPG, PNG up to 10MB</p>
                </>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
              />
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button 
              className="btn-primary"
              onClick={handleUpload}
              disabled={!selectedFile || !documentType || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Documents</h2>
        
        <div className="space-y-3">
          {uploadedFiles.map(file => (
            <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <DocumentTextIcon className="w-8 h-8 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-600">
                    {file.type} • {file.date} • {file.size}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  file.status === 'Verified' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {file.status}
                </span>
                <button 
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(file.id)}
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Security & Privacy</h3>
        <p className="text-blue-800 text-sm">
          Your documents are encrypted and stored securely. Only you control who can access your information. 
          Documents are never stored in plain text and are protected by blockchain-level security.
        </p>
      </div>
    </div>
  )
}
