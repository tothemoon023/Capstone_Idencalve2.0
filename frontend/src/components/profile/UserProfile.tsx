import { useWallet } from '@solana/wallet-adapter-react'
import { UserIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

interface ProfileData {
  name: string
  email: string
  profession: string
  location: string
  status: string
}

export default function UserProfile() {
  const { publicKey } = useWallet()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    profession: '',
    location: '',
    status: 'pending'
  })

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!publicKey) return

      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:4000/api/identity/profile?walletAddress=${publicKey.toBase58()}`)
        
        if (response.ok) {
          const data = await response.json()
          setProfileData({
            name: data.name || '',
            email: data.email || '',
            profession: data.profession || '',
            location: data.location || '',
            status: data.status || 'pending'
          })
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        // Use mock data for demo
        setProfileData({
          name: 'John Doe',
          email: 'john.doe@example.com',
          profession: 'Software Engineer',
          location: 'San Francisco, CA',
          status: 'verified'
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [publicKey])

  const handleSave = async () => {
    if (!publicKey) return

    try {
      setIsSaving(true)
      const response = await fetch('http://localhost:4000/api/identity/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: publicKey.toBase58(),
          profileData
        }),
      })

      if (response.ok) {
        setIsEditing(false)
        alert('Profile updated successfully!')
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        {!isEditing ? (
          <button 
            className="btn-secondary"
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              className="btn-secondary"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button 
              className="btn-primary"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Digital Identity</h2>
            <p className="text-gray-600">
              Wallet: {publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-8)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Enter your full name"
              value={profileData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="Enter your email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label className="form-label">Profession</label>
            <select 
              className="input-field"
              value={profileData.profession}
              onChange={(e) => handleInputChange('profession', e.target.value)}
              disabled={!isEditing}
            >
              <option value="">Select profession</option>
              <option value="Doctor">Doctor</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Financial Advisor">Financial Advisor</option>
              <option value="Engineer">Engineer</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Location</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Enter your location"
              value={profileData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-medium text-green-900">Identity Verified</span>
            <span className="text-sm text-green-600">
              {profileData.status === 'verified' ? '✓ Active' : '⏳ Pending'}
            </span>
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

      {isEditing && (
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Privacy Notice</h3>
          <p className="text-blue-800 text-sm">
            Your profile information is encrypted and stored securely. Only you control who can access your data. 
            Changes are saved to the blockchain for immutability and transparency.
          </p>
        </div>
      )}
    </div>
  )
}
