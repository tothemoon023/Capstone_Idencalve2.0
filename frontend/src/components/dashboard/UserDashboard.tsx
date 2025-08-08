import { useWallet } from '@solana/wallet-adapter-react'
import { 
  UserIcon, 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  CogIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

export default function UserDashboard() {
  const { publicKey } = useWallet()

  const stats = [
    { name: 'Credentials', value: '3', icon: DocumentTextIcon, color: 'bg-blue-500' },
    { name: 'Verifications', value: '2', icon: ShieldCheckIcon, color: 'bg-green-500' },
    { name: 'Active Consents', value: '1', icon: CogIcon, color: 'bg-purple-500' },
  ]

  const quickActions = [
    { name: 'Upload Document', href: '/upload', icon: PlusIcon },
    { name: 'Request Verification', href: '/verification/request', icon: ShieldCheckIcon },
    { name: 'Manage Consents', href: '/consent', icon: CogIcon },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your digital identity</p>
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

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <DocumentTextIcon className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Driver's License uploaded</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">Verified</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <ShieldCheckIcon className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Identity verification requested</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
            </div>
            <span className="text-sm text-blue-600 font-medium">Pending</span>
          </div>
        </div>
      </div>
    </div>
  )
}
