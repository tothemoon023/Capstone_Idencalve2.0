import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useState } from 'react'

export default function WalletTest() {
  const { publicKey, connected, connecting, disconnecting } = useWallet()
  const [error, setError] = useState<string | null>(null)

  const testConnection = async () => {
    try {
      setError(null)
      console.log('Wallet status:', { connected, connecting, disconnecting })
      console.log('Public key:', publicKey?.toBase58())
      
      if (connected && publicKey) {
        console.log('✅ Wallet connected successfully!')
        console.log('Wallet address:', publicKey.toBase58())
      } else {
        console.log('❌ Wallet not connected')
      }
    } catch (err) {
      console.error('Wallet test error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Wallet Connection Test</h1>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <WalletMultiButton className="btn-primary" />
            <button
              onClick={testConnection}
              className="btn-secondary"
            >
              Test Connection
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-red-800 font-medium">Error:</div>
              <div className="text-red-700">{error}</div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Connection Status:</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Connected:</span>
                <span className={connected ? 'text-green-600' : 'text-red-600'}>
                  {connected ? '✅ Yes' : '❌ No'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Connecting:</span>
                <span className={connecting ? 'text-yellow-600' : 'text-gray-600'}>
                  {connecting ? '🔄 Yes' : 'No'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Disconnecting:</span>
                <span className={disconnecting ? 'text-yellow-600' : 'text-gray-600'}>
                  {disconnecting ? '🔄 Yes' : 'No'}
                </span>
              </div>
              
              {publicKey && (
                <div className="flex justify-between">
                  <span className="font-medium">Wallet Address:</span>
                  <span className="text-sm text-gray-600 font-mono">
                    {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="text-blue-800 font-medium">Troubleshooting Tips:</div>
            <ul className="text-blue-700 text-sm mt-2 space-y-1">
              <li>• Make sure Phantom wallet is installed in your browser</li>
              <li>• Check that Phantom is set to Devnet</li>
              <li>• Try refreshing the page if connection fails</li>
              <li>• Check browser console for any errors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
