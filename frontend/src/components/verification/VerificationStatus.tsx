import { useState, useEffect } from 'react'
import { ShieldCheckIcon, ClockIcon, CheckCircleIcon, XCircleIcon, EyeIcon } from '@heroicons/react/24/outline'
import { useWallet } from '@solana/wallet-adapter-react'

interface VerificationRequest {
  id: number
  type: string
  requester: string
  status: string
  date: string
  description: string
  targetWallet?: string
  notes?: string
}

export default function VerificationStatus() {
  const { publicKey } = useWallet()
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null)

  // Load verification requests
  useEffect(() => {
    const loadVerificationRequests = async () => {
      if (!publicKey) return

      try {
        setIsLoading(true)
        // In a real app, this would fetch from the blockchain
        // For demo, we'll use mock data
        const mockRequests: VerificationRequest[] = [
          {
            id: 1,
            type: 'KYC Verification',
            requester: 'Acme Corp',
            status: 'pending',
            date: '2024-08-08',
            description: 'Know Your Customer verification for employment',
            targetWallet: 'CisxG9RxXkXo5W4gAfJ9EF4EzckvZiVrfwHzWKEqbtMK',
            notes: 'Standard KYC verification for new employee onboarding'
          },
          {
            id: 2,
            type: 'Background Check',
            requester: 'Tech Startup Inc',
            status: 'completed',
            date: '2024-08-07',
            description: 'Criminal background verification',
            targetWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
            notes: 'Background check completed successfully'
          },
          {
            id: 3,
            type: 'Education Verification',
            requester: 'University Partners',
            status: 'rejected',
            date: '2024-08-06',
            description: 'Educational credentials verification',
            targetWallet: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
            notes: 'Unable to verify educational credentials'
          }
        ]

        setVerificationRequests(mockRequests)
      } catch (error) {
        console.error('Error loading verification requests:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadVerificationRequests()
  }, [publicKey])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />
      case 'rejected':
        return <XCircleIcon className="w-5 h-5 text-red-600" />
      default:
        return <ShieldCheckIcon className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusCount = (status: string) => {
    return verificationRequests.filter(req => req.status === status).length
  }

  const handleViewDetails = (request: VerificationRequest) => {
    setSelectedRequest(request)
  }

  const handleCloseDetails = () => {
    setSelectedRequest(null)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verification Status</h1>
          <p className="text-gray-600">Track the status of your identity verification requests</p>
        </div>
        <div className="card">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Verification Status</h1>
        <p className="text-gray-600">Track the status of your identity verification requests</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{verificationRequests.length}</div>
          <div className="text-sm text-gray-600">Total Requests</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{getStatusCount('completed')}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">{getStatusCount('pending')}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600">{getStatusCount('rejected')}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Verification Requests</h2>
        
        <div className="space-y-4">
          {verificationRequests.map(request => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(request.status)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{request.type}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{request.description}</p>
                    <p className="text-sm text-gray-500">Requested by: {request.requester} • {request.date}</p>
                    {request.targetWallet && (
                      <p className="text-xs text-gray-400 mt-1">
                        Target: {request.targetWallet.slice(0, 8)}...{request.targetWallet.slice(-8)}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <button 
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
                    onClick={() => handleViewDetails(request)}
                  >
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Legend */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-gray-700">Pending - Under review</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-700">Completed - Verification successful</span>
          </div>
          <div className="flex items-center space-x-2">
            <XCircleIcon className="w-5 h-5 text-red-600" />
            <span className="text-sm text-gray-700">Rejected - Verification failed</span>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Verification Details</h3>
              <button 
                onClick={handleCloseDetails}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <p className="text-sm text-gray-900">{selectedRequest.type}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                  {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                </span>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Requester</label>
                <p className="text-sm text-gray-900">{selectedRequest.requester}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Date</label>
                <p className="text-sm text-gray-900">{selectedRequest.date}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="text-sm text-gray-900">{selectedRequest.description}</p>
              </div>
              
              {selectedRequest.targetWallet && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Target Wallet</label>
                  <p className="text-sm text-gray-900 font-mono">{selectedRequest.targetWallet}</p>
                </div>
              )}
              
              {selectedRequest.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Notes</label>
                  <p className="text-sm text-gray-900">{selectedRequest.notes}</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleCloseDetails}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blockchain Integration Notice */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Blockchain Transparency</h3>
        <p className="text-blue-800 text-sm">
          All verification requests are recorded on the Solana blockchain. You can verify the authenticity 
          of any request by checking the blockchain transaction hash associated with each verification.
        </p>
      </div>
    </div>
  )
}
