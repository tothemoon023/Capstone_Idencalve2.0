import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  UserIcon 
} from '@heroicons/react/24/outline'

export default function WalletConnect() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheckIcon className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome to IDenclave
          </h2>
          <p className="text-gray-600">
            Connect your Solana wallet to access your digital identity and start managing your credentials securely.
          </p>
        </div>

        <div className="card space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Why Connect Your Wallet?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <LockClosedIcon className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Secure Authentication</p>
                  <p className="text-sm text-gray-600">Your wallet provides secure, passwordless access to your identity</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <UserIcon className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Own Your Identity</p>
                  <p className="text-sm text-gray-600">You control your digital identity with your private keys</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldCheckIcon className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Privacy First</p>
                  <p className="text-sm text-gray-600">No centralized storage, your data stays with you</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <WalletMultiButton className="w-full btn-primary text-lg py-3" />
            <p className="text-xs text-gray-500 text-center">
              Don't have a Solana wallet? 
              <a 
                href="https://phantom.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 ml-1"
              >
                Get Phantom
              </a>
            </p>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">
            By connecting your wallet, you agree to our terms of service
          </p>
          <div className="flex justify-center space-x-4 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  )
}
