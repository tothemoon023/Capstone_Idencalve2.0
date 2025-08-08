import { Link } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import { 
  ShieldCheckIcon, 
  UserIcon, 
  BuildingOfficeIcon, 
  LockClosedIcon,
  GlobeAltIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  const { connected } = useWallet()

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Privacy-First Design',
      description: 'Complete control over your personal information with zero-knowledge proofs and selective disclosure.'
    },
    {
      icon: UserIcon,
      title: 'Self-Sovereign Identity',
      description: 'You own your data. No more centralized storage vulnerable to hacks and breaches.'
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Business Ready',
      description: 'Streamlined verification processes that reduce costs and improve compliance.'
    },
    {
      icon: LockClosedIcon,
      title: 'Advanced Security',
      description: 'Built on Solana blockchain with state-of-the-art cryptography and encryption.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Cross-Platform',
      description: 'Use your verified identity across multiple services and platforms seamlessly.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Cost Effective',
      description: 'Much cheaper than traditional verification services with instant processing.'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Your Digital Identity,
            <span className="text-gradient block">Your Control</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IDenclave 2.0 is a blockchain-based identity verification system that empowers individuals 
            with complete control over their digital identities while providing businesses with secure, 
            cost-effective verification services.
          </p>
        </div>

        {!connected ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              Connect your Solana wallet to get started with your digital identity
            </p>
            <div className="flex justify-center">
              <Link 
                to="/dashboard" 
                className="btn-primary text-lg px-8 py-3"
              >
                Get Started
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              Welcome back! Manage your digital identity and credentials
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
              <Link to="/profile" className="btn-secondary">
                View Profile
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="card space-y-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <feature.icon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-lg font-semibold">Create Your Identity</h3>
            <p className="text-gray-600">
              Connect your Solana wallet and create your digital identity profile
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-lg font-semibold">Upload Documents</h3>
            <p className="text-gray-600">
              Securely upload and verify your important documents and credentials
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-lg font-semibold">Share Selectively</h3>
            <p className="text-gray-600">
              Control exactly what information to share and with whom
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to Take Control?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join thousands of users who have already taken control of their digital identities 
          with IDenclave 2.0.
        </p>
        {!connected && (
          <Link to="/dashboard" className="btn-primary text-lg px-8 py-3 inline-block">
            Start Your Journey
          </Link>
        )}
      </div>
    </div>
  )
}
