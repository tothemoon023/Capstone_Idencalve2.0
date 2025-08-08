import { useWallet } from '@solana/wallet-adapter-react'
import { 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  ShieldCheckIcon, 
  DocumentTextIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

export default function BusinessDashboard() {
  const { publicKey } = useWallet()

  const stats = [
    { name: 'Employees', value: '12', icon: UserGroupIcon, color: 'bg-blue-500' },
    { name: 'Pending Verifications', value: '5', icon: ShieldCheckIcon, color: 'bg-yellow-500' },
    { name: 'Completed Verifications', value: '8', icon: DocumentTextIcon, color: 'bg-green-500' },
  ]

  const quickActions = [
    { name: 'Add Employee', href: '/business/employees', icon: PlusIcon },
    { name: 'Request Verification', href: '/verification/request', icon: ShieldCheckIcon },
    { name: 'View Reports', href: '/business/reports', icon: DocumentTextIcon },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
          <p className="text-gray-600">Manage your organization's identity verification</p>
        </div>
        <div className="text-sm text-gray-500">
          Wallet: {publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-8)}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <a
              key={action.name}
              href={action.href}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <action.icon className="w-5 h-5 text-primary-600 mr-3" />
              <span className="font-medium text-gray-900">{action.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Verifications */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Verifications</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <UserGroupIcon className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">John Doe - KYC Verification</p>
                <p className="text-sm text-gray-600">Requested 2 hours ago</p>
              </div>
            </div>
            <span className="text-sm text-yellow-600 font-medium">Pending</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <UserGroupIcon className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Jane Smith - Background Check</p>
                <p className="text-sm text-gray-600">Completed 1 day ago</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">Approved</span>
          </div>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <ShieldCheckIcon className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-medium text-green-900">KYC Compliance</span>
            </div>
            <p className="text-sm text-green-700 mt-1">All employees verified</p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <DocumentTextIcon className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="font-medium text-yellow-900">Document Updates</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">3 documents need renewal</p>
          </div>
        </div>
      </div>
    </div>
  )
}
