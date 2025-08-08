import { useWallet } from '@solana/wallet-adapter-react'
import { UserIcon, PencilIcon } from '@heroicons/react/24/outline'

export default function UserProfile() {
  const { publicKey } = useWallet()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <button className="btn-secondary">
          <PencilIcon className="w-4 h-4 mr-2" />
          Edit Profile
        </button>
      </div>

      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Digital Identity</h2>
            <p className="text-gray-600">Wallet: {publicKey?.toBase58()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Full Name</label>
            <input type="text" className="input-field" placeholder="Enter your full name" />
          </div>
          
          <div>
            <label className="form-label">Email</label>
            <input type="email" className="input-field" placeholder="Enter your email" />
          </div>
          
          <div>
            <label className="form-label">Profession</label>
            <select className="input-field">
              <option>Select profession</option>
              <option>Doctor</option>
              <option>Lawyer</option>
              <option>Financial Advisor</option>
              <option>Engineer</option>
              <option>Other</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Location</label>
            <input type="text" className="input-field" placeholder="Enter your location" />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-medium text-green-900">Identity Verified</span>
            <span className="text-sm text-green-600">✓ Active</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="font-medium text-blue-900">Wallet Connected</span>
            <span className="text-sm text-blue-600">✓ Connected</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <span className="font-medium text-yellow-900">Documents Pending</span>
            <span className="text-sm text-yellow-600">2 remaining</span>
          </div>
        </div>
      </div>
    </div>
  )
}
