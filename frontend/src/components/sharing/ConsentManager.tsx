import { useState } from 'react'
import { CogIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function ConsentManager() {
  const [activeTab, setActiveTab] = useState('pending')

  const consentRecords = {
    pending: [
      {
        id: 1,
        requester: 'Acme Bank',
        dataScope: 'Identity verification for loan application',
        date: '2024-08-08',
        status: 'pending'
      }
    ],
    granted: [
      {
        id: 2,
        requester: 'Tech Startup Inc',
        dataScope: 'Employment verification',
        date: '2024-08-07',
        status: 'granted',
        expiresAt: '2024-09-07'
      }
    ],
    revoked: [
      {
        id: 3,
        requester: 'Old Employer',
        dataScope: 'Background check',
        date: '2024-08-06',
        status: 'revoked'
      }
    ]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />
      case 'granted':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />
      case 'revoked':
        return <XCircleIcon className="w-5 h-5 text-red-600" />
      default:
        return <CogIcon className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'granted':
        return 'bg-green-100 text-green-800'
      case 'revoked':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Consent Manager</h1>
        <p className="text-gray-600">Manage who can access your data and for how long</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'pending', name: 'Pending', count: consentRecords.pending.length },
            { id: 'granted', name: 'Granted', count: consentRecords.granted.length },
            { id: 'revoked', name: 'Revoked', count: consentRecords.revoked.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Consent Records */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Requests
        </h2>
        
        <div className="space-y-4">
          {consentRecords[activeTab as keyof typeof consentRecords].map(record => (
            <div key={record.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(record.status)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{record.requester}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{record.dataScope}</p>
                    <p className="text-sm text-gray-500">Requested: {record.date}</p>
                    {record.expiresAt && (
                      <p className="text-sm text-gray-500">Expires: {record.expiresAt}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {record.status === 'pending' && (
                    <>
                      <button className="btn-primary text-sm px-3 py-1">Grant</button>
                      <button className="btn-danger text-sm px-3 py-1">Deny</button>
                    </>
                  )}
                  {record.status === 'granted' && (
                    <button className="btn-danger text-sm px-3 py-1">Revoke</button>
                  )}
                  <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {consentRecords[activeTab as keyof typeof consentRecords].length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No {activeTab} consent requests
            </div>
          )}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Privacy Rights</h3>
        <p className="text-blue-800 text-sm">
          You have complete control over your data. You can grant, deny, or revoke access at any time. 
          All data sharing is logged and you can see exactly who accessed what and when.
        </p>
      </div>
    </div>
  )
}
