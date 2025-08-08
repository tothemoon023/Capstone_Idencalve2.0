import { useState } from 'react'
import { ShieldCheckIcon, UserIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

export default function VerificationRequest() {
  const [verificationType, setVerificationType] = useState('')
  const [targetWallet, setTargetWallet] = useState('')

  const verificationTypes = [
    { id: 'kyc', name: 'KYC Verification', description: 'Know Your Customer verification' },
    { id: 'aml', name: 'AML Check', description: 'Anti-Money Laundering verification' },
    { id: 'background', name: 'Background Check', description: 'Criminal background verification' },
    { id: 'employment', name: 'Employment Verification', description: 'Employment history verification' },
    { id: 'education', name: 'Education Verification', description: 'Educational credentials verification' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Request Verification</h1>
        <p className="text-gray-600">Request identity verification for individuals or employees</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">New Verification Request</h2>
        
        <div className="space-y-4">
          <div>
            <label className="form-label">Target Wallet Address</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Enter wallet address to verify"
              value={targetWallet}
              onChange={(e) => setTargetWallet(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Verification Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {verificationTypes.map(type => (
                <div 
                  key={type.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    verificationType === type.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setVerificationType(type.id)}
                >
                  <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">{type.name}</p>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label">Additional Notes (Optional)</label>
            <textarea 
              className="input-field" 
              rows={3}
              placeholder="Add any additional information about this verification request"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button className="btn-secondary">Cancel</button>
            <button className="btn-primary">Submit Request</button>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <UserIcon className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">John Doe</p>
                <p className="text-sm text-gray-600">KYC Verification • 2 hours ago</p>
              </div>
            </div>
            <span className="text-sm text-yellow-600 font-medium">Pending</span>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <BuildingOfficeIcon className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Jane Smith</p>
                <p className="text-sm text-gray-600">Background Check • 1 day ago</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">Completed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
