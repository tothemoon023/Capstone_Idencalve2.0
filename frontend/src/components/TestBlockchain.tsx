import { useWallet } from '@solana/wallet-adapter-react'
import { useIdenclave } from '../hooks/useIdenclave'
import { useState } from 'react'

export default function TestBlockchain() {
  const { publicKey, connected } = useWallet()
  const { loading, error, checkUserIdentity, getUserAccount, getBalance, programId } = useIdenclave()
  const [testResults, setTestResults] = useState<any>({})

  const runTests = async () => {
    const results: any = {}
    
    // Test 1: Check wallet connection
    results.walletConnected = connected
    results.walletAddress = publicKey?.toBase58()
    
    // Test 2: Check program ID
    results.programId = programId
    
    // Test 3: Check balance
    try {
      results.balance = await getBalance()
    } catch (err) {
      results.balanceError = err instanceof Error ? err.message : 'Unknown error'
    }
    
    // Test 4: Check user identity
    try {
      results.userIdentityExists = await checkUserIdentity()
    } catch (err) {
      results.userIdentityError = err instanceof Error ? err.message : 'Unknown error'
    }
    
    // Test 5: Get user account
    try {
      results.userAccount = await getUserAccount()
    } catch (err) {
      results.userAccountError = err instanceof Error ? err.message : 'Unknown error'
    }
    
    setTestResults(results)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Blockchain Integration Test</h1>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={runTests}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Running Tests...' : 'Run Blockchain Tests'}
            </button>
            
            <div className="text-sm text-gray-600">
              Program ID: {programId}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-red-800 font-medium">Error:</div>
              <div className="text-red-700">{error}</div>
            </div>
          )}

          {Object.keys(testResults).length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Results:</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Wallet Connected:</span>
                  <span className={testResults.walletConnected ? 'text-green-600' : 'text-red-600'}>
                    {testResults.walletConnected ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
                
                {testResults.walletAddress && (
                  <div className="flex justify-between">
                    <span className="font-medium">Wallet Address:</span>
                    <span className="text-sm text-gray-600 font-mono">
                      {testResults.walletAddress.slice(0, 8)}...{testResults.walletAddress.slice(-8)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="font-medium">Program ID:</span>
                  <span className="text-sm text-gray-600 font-mono">
                    {testResults.programId?.slice(0, 8)}...{testResults.programId?.slice(-8)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Balance:</span>
                  <span className={testResults.balanceError ? 'text-red-600' : 'text-green-600'}>
                    {testResults.balanceError ? `❌ ${testResults.balanceError}` : `✅ ${testResults.balance} SOL`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">User Identity Exists:</span>
                  <span className={testResults.userIdentityError ? 'text-red-600' : testResults.userIdentityExists ? 'text-green-600' : 'text-yellow-600'}>
                    {testResults.userIdentityError ? `❌ ${testResults.userIdentityError}` : 
                     testResults.userIdentityExists ? '✅ Yes' : '⚠️ No (needs initialization)'}
                  </span>
                </div>
                
                {testResults.userAccount && (
                  <div className="flex justify-between">
                    <span className="font-medium">User Account:</span>
                    <span className="text-green-600">✅ Loaded</span>
                  </div>
                )}
                
                {testResults.userAccountError && (
                  <div className="flex justify-between">
                    <span className="font-medium">User Account Error:</span>
                    <span className="text-red-600">❌ {testResults.userAccountError}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
