import { useState } from 'react'
import { ShareIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export default function DataSharing() {
  const [selectedData, setSelectedData] = useState<string[]>([])
  const [recipientWallet, setRecipientWallet] = useState('')
  const [expiryDate, setExpiryDate] = useState('')

  const availableData = [
    { id: 'name', label: 'Full Name', description: 'Your legal name' },
    { id: 'email', label: 'Email Address', description: 'Your contact email' },
    { id: 'phone', label: 'Phone Number', description: 'Your contact phone' },
    { id: 'address', label: 'Address', description: 'Your residential address' },
    { id: 'dob', label: 'Date of Birth', description: 'Your birth date' },
    { id: 'id_documents', label: 'ID Documents', description: 'Passport, driver license, etc.' },
    { id: 'professional_credentials', label: 'Professional Credentials', description: 'Licenses, certificates' },
    { id: 'employment_history', label: 'Employment History', description: 'Work experience and references' },
  ]

  const handleDataToggle = (dataId: string) => {
    setSelectedData(prev => 
      prev.includes(dataId) 
        ? prev.filter(id => id !== dataId)
        : [...prev, dataId]
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Sharing</h1>
        <p className="text-gray-600">Selectively share your data with others</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Share Data</h2>
        
        <div className="space-y-4">
          <div>
            <label className="form-label">Recipient Wallet Address</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Enter wallet address to share with"
              value={recipientWallet}
              onChange={(e) => setRecipientWallet(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Select Data to Share</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {availableData.map(data => (
                <div 
                  key={data.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedData.includes(data.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleDataToggle(data.id)}
                >
                  <div className="flex items-start space-x-3">
                    {selectedData.includes(data.id) ? (
                      <EyeIcon className="w-5 h-5 text-primary-600 mt-0.5" />
                    ) : (
                      <EyeSlashIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{data.label}</p>
                      <p className="text-sm text-gray-600">{data.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label">Expiry Date (Optional)</label>
            <input 
              type="date" 
              className="input-field" 
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave empty for permanent access (you can revoke anytime)
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="btn-secondary">Cancel</button>
            <button 
              className="btn-primary"
              disabled={!recipientWallet || selectedData.length === 0}
            >
              Share Data
            </button>
          </div>
        </div>
      </div>

      {/* Recent Shares */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Shares</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <ShareIcon className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Tech Startup Inc</p>
                <p className="text-sm text-gray-600">Name, Email, Professional Credentials</p>
                <p className="text-sm text-gray-500">Shared 2 hours ago</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
              Revoke Access
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <LockClosedIcon className="w-8 h-8 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Acme Bank</p>
                <p className="text-sm text-gray-600">Name, Address, ID Documents</p>
                <p className="text-sm text-gray-500">Expired 1 day ago</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Expired</span>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="card bg-green-50 border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-2">Selective Disclosure</h3>
        <p className="text-green-800 text-sm">
          You're sharing only the specific data you choose. The recipient cannot access any other information 
          about you. You can revoke access at any time, and all access attempts are logged for transparency.
        </p>
      </div>
    </div>
  )
}
