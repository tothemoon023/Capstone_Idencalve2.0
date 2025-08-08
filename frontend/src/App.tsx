import { Routes, Route } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import Layout from './components/Layout'
import Home from './components/Home'
import Dashboard from './components/dashboard/UserDashboard'
import Profile from './components/profile/UserProfile'
import DocumentUpload from './components/profile/DocumentUpload'
import VerificationRequest from './components/verification/VerificationRequest'
import VerificationStatus from './components/verification/VerificationStatus'
import ConsentManager from './components/sharing/ConsentManager'
import DataSharing from './components/sharing/DataSharing'
import BusinessDashboard from './components/dashboard/BusinessDashboard'
import WalletConnect from './components/auth/WalletConnect'

function App() {
  const { connected } = useWallet()

  return (
    <div className="min-h-screen bg-gray-50">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {connected ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/upload" element={<DocumentUpload />} />
              <Route path="/verification/request" element={<VerificationRequest />} />
              <Route path="/verification/status" element={<VerificationStatus />} />
              <Route path="/consent" element={<ConsentManager />} />
              <Route path="/sharing" element={<DataSharing />} />
              <Route path="/business" element={<BusinessDashboard />} />
            </>
          ) : (
            <Route path="*" element={<WalletConnect />} />
          )}
        </Routes>
      </Layout>
    </div>
  )
}

export default App
