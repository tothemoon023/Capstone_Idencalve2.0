import { useState } from 'react'
import { DocumentTextIcon, CloudArrowUpIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function DocumentUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'Driver License.pdf', type: 'ID Document', status: 'Verified', date: '2024-08-08' },
    { id: 2, name: 'Passport.pdf', type: 'ID Document', status: 'Pending', date: '2024-08-07' },
  ])

  const documentTypes = [
    'ID Document',
    'Passport',
    'Driver License',
    'Professional License',
    'Certificate',
    'Other'
  ]

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
            <select className="input-field">
              <option>Select document type</option>
              {documentTypes.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Upload File</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
              <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop your file here, or</p>
              <button className="btn-primary">Choose File</button>
              <p className="text-sm text-gray-500 mt-2">PDF, JPG, PNG up to 10MB</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn-primary">Upload Document</button>
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
                  <p className="text-sm text-gray-600">{file.type} • {file.date}</p>
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
                <button className="text-red-600 hover:text-red-800">
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
