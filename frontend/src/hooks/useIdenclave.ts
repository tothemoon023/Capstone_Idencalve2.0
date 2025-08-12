import { useWallet } from '@solana/wallet-adapter-react'
import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js'
import { useState, useCallback } from 'react'
import { solanaClient } from '../utils/solana-client'
import { SOLANA_CONFIG } from '../config/solana'

export interface UserAccount {
  walletAddress: string
  profileData: string
  userType: string
  status: string
  exists: boolean
}

export interface Credential {
  user: string
  credentialHash: string
  credentialType: string
  metadata: string
  status: string
}

export const useIdenclave = () => {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if user has an identity
  const checkUserIdentity = useCallback(async (): Promise<boolean> => {
    if (!publicKey) return false
    
    try {
      setLoading(true)
      setError(null)
      
      // In test mode, always return false (no identity exists yet)
      if (SOLANA_CONFIG.TEST_MODE) {
        console.log('Test mode: simulating no existing identity')
        return false
      }
      
      const exists = await solanaClient.userAccountExists(publicKey)
      return exists
    } catch (err) {
      console.error('Error checking user identity:', err)
      // In test mode, don't set error, just return false
      if (!SOLANA_CONFIG.TEST_MODE) {
        setError(err instanceof Error ? err.message : 'Failed to check user identity')
      }
      return false
    } finally {
      setLoading(false)
    }
  }, [publicKey])

  // Get user account data
  const getUserAccount = useCallback(async (): Promise<UserAccount | null> => {
    if (!publicKey) return null
    
    try {
      setLoading(true)
      setError(null)
      
      // In test mode, return a mock account
      if (SOLANA_CONFIG.TEST_MODE) {
        console.log('Test mode: returning mock user account')
        return {
          walletAddress: publicKey.toBase58(),
          profileData: '',
          userType: '',
          status: 'pending',
          exists: false
        }
      }
      
      const accountData = await solanaClient.getUserAccountData(publicKey)
      
      if (!accountData) {
        return {
          walletAddress: publicKey.toBase58(),
          profileData: '',
          userType: '',
          status: '',
          exists: false
        }
      }

      return {
        walletAddress: publicKey.toBase58(),
        profileData: accountData.profileData || '',
        userType: accountData.userType || '',
        status: accountData.status || '',
        exists: true
      }
    } catch (err) {
      console.error('Error getting user account:', err)
      // In test mode, don't set error, return mock account
      if (!SOLANA_CONFIG.TEST_MODE) {
        setError(err instanceof Error ? err.message : 'Failed to get user account')
        return null
      }
      
      return {
        walletAddress: publicKey.toBase58(),
        profileData: '',
        userType: '',
        status: 'error',
        exists: false
      }
    } finally {
      setLoading(false)
    }
  }, [publicKey])

  // Get account balance
  const getBalance = useCallback(async (): Promise<number> => {
    if (!publicKey) return 0
    
    try {
      setLoading(true)
      setError(null)
      const balance = await solanaClient.getAccountBalance(publicKey)
      return balance
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get balance')
      return 0
    } finally {
      setLoading(false)
    }
  }, [publicKey])

  // Initialize user identity (placeholder for smart contract call)
  const initializeIdentity = useCallback(async (profileData: string, userType: string): Promise<boolean> => {
    if (!publicKey || !sendTransaction) return false
    
    try {
      setLoading(true)
      setError(null)
      
      // This would be replaced with actual smart contract call
      // For now, we'll simulate the process
      console.log('Initializing identity for:', publicKey.toBase58())
      console.log('Profile data:', profileData)
      console.log('User type:', userType)
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize identity')
      return false
    } finally {
      setLoading(false)
    }
  }, [publicKey, sendTransaction])

  // Add credential (placeholder for smart contract call)
  const addCredential = useCallback(async (credentialHash: string, credentialType: string, metadata: string): Promise<boolean> => {
    if (!publicKey || !sendTransaction) return false
    
    try {
      setLoading(true)
      setError(null)
      
      // This would be replaced with actual smart contract call
      console.log('Adding credential for:', publicKey.toBase58())
      console.log('Credential hash:', credentialHash)
      console.log('Credential type:', credentialType)
      console.log('Metadata:', metadata)
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add credential')
      return false
    } finally {
      setLoading(false)
    }
  }, [publicKey, sendTransaction])

  // Create verification request (placeholder for smart contract call)
  const createVerificationRequest = useCallback(async (targetWallet: string, requestType: string, metadata: string): Promise<boolean> => {
    if (!publicKey || !sendTransaction) return false
    
    try {
      setLoading(true)
      setError(null)
      
      // This would be replaced with actual smart contract call
      console.log('Creating verification request from:', publicKey.toBase58())
      console.log('Target wallet:', targetWallet)
      console.log('Request type:', requestType)
      console.log('Metadata:', metadata)
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create verification request')
      return false
    } finally {
      setLoading(false)
    }
  }, [publicKey, sendTransaction])

  return {
    loading,
    error,
    checkUserIdentity,
    getUserAccount,
    getBalance,
    initializeIdentity,
    addCredential,
    createVerificationRequest,
    programId: SOLANA_CONFIG.PROGRAM_ID
  }
}
