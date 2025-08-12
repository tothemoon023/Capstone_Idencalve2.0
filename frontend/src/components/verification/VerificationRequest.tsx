import { useState } from 'react'
import { ShieldCheckIcon, UserIcon, BuildingOfficeIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useWallet } from '@solana/wallet-adapter-react'

interface VerificationRequest {
  id: number
  targetWallet: string
  type: string
  status: string
  date: string
  notes?: string
}

export default function VerificationRequest() {
  const { publicKey } = useWallet()
  const [verificationType, setVerificationType] = useState('')
  const [targetWallet, setTargetWallet] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recentRequests, setRecentRequests] = useState<VerificationRequest[]>([
    {
      id: 1,
      targetWallet: 'CisxG9RxXkXo5W4gAfJ9EF4EzckvZiVrfwHzWKEqbtMK',
      type: 'KYC Verification',
      status: 'pending',
      date: '2024-08-08'
    },
    {
      id: 2,
      targetWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      type: 'Background Check',
      status: 'completed',
      date: '2024-08-07'
    }
  ])

  const verificationTypes = [
    { id: 'kyc', name: 'KYC Verification', description: 'Know Your Customer verification' },
    { id: 'aml', name: 'AML Check', description: 'Anti-Money Laundering verification' },
    { id: 'background', name: 'Background Check', description: 'Criminal background verification' },
    { id: 'employment', name: 'Employment Verification', description: 'Employment history verification' },
    { id: 'education', name: 'Education Verification', description: 'Educational credentials verification' },
  ]

  const handleSubmit = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    if (!targetWallet || !verificationType) {
      alert('Please fill in all required fields')
      return
    }

    // Basic wallet address validation
    if (targetWallet.length < 32 || targetWallet.length > 44) {
      alert('Please enter a valid Solana wallet address')
      return
    }

    setIsSubmitting(true)

    try {
      // Create verification request
      const newRequest: VerificationRequest = {
        id: Date.now(),
        targetWallet,
        type: verificationTypes.find(t => t.id === verificationType)?.name || verificationType,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        notes
      }

      // In a real app, this would call the blockchain
      // For demo, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Add to recent requests
      setRecentRequests(prev => [newRequest, ...prev])

      // Reset form
      setTargetWallet('')
      setVerificationType('')
      setNotes('')

      alert('Verification request submitted successfully!')
    } catch (error) {
      console.error('Error submitting verification request:', error)
      alert('Failed to submit verification request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setTargetWallet('')
    setVerificationType('')
    setNotes('')
  }

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
            <label className="form-label">Target Wallet Address *</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Enter wallet address to verify"
              value={targetWallet}
              onChange={(e) => setTargetWallet(e.target.value)}
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the Solana wallet address of the person you want to verify
            </p>
          </div>

          <div>
            <label className="form-label">Verification Type *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {verificationTypes.map(type => (
                <div 
                  key={type.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    verificationType === type.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !isSubmitting && setVerificationType(type.id)}
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
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button 
              className="btn-secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              className="btn-primary"
              onClick={handleSubmit}
              disabled={!targetWallet || !verificationType || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h2>
        
        <div className="space-y-3">
          {recentRequests.map(request => (
            <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <UserIcon className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    {request.targetWallet.slice(0, 8)}...{request.targetWallet.slice(-8)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {request.type} • {request.date}
                  </p>
                  {request.notes && (
                    <p className="text-xs text-gray-500 mt-1">{request.notes}</p>
                  )}
                </div>
              </div>
              <span className={`text-sm font-medium ${
                request.status === 'completed' ? 'text-green-600' : 
                request.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Blockchain Integration Notice */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Blockchain Integration</h3>
        <p className="text-blue-800 text-sm">
          Verification requests are recorded on the Solana blockchain for transparency and immutability. 
          Each request creates a smart contract transaction that can be verified by all parties.
        </p>
      </div>
    </div>
  )
}
