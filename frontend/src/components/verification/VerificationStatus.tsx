import { ShieldCheckIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function VerificationStatus() {
  const verificationRequests = [
    {
      id: 1,
      type: 'KYC Verification',
      requester: 'Acme Corp',
      status: 'pending',
      date: '2024-08-08',
      description: 'Know Your Customer verification for employment'
    },
    {
      id: 2,
      type: 'Background Check',
      requester: 'Tech Startup Inc',
      status: 'completed',
      date: '2024-08-07',
      description: 'Criminal background verification'
    },
    {
      id: 3,
      type: 'Education Verification',
      requester: 'University Partners',
      status: 'rejected',
      date: '2024-08-06',
      description: 'Educational credentials verification'
    }
  ]

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Verification Status</h1>
        <p className="text-gray-600">Track the status of your identity verification requests</p>
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
                  </div>
                </div>
                
                <div className="text-right">
                  <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">5</div>
          <div className="text-sm text-gray-600">Total Requests</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">3</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">2</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
      </div>
    </div>
  )
}
