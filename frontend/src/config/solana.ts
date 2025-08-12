import { clusterApiUrl } from '@solana/web3.js';

// Test program ID - we'll use this for testing until we get the real deployment working
export const TEST_PROGRAM_ID = '11111111111111111111111111111111';

// Environment configuration
const isDevelopment = import.meta.env.DEV;
const useLocalnet = false; // Keep false for devnet demo

export const SOLANA_CONFIG = {
  // Program ID for the deployed IDenclave smart contract
  PROGRAM_ID: 'E26WsLNacfSvEJcKMZ1667XPoNn3mDpyCb523sgaf8yy',
  
  // Solana endpoint - use localnet in development, devnet in production
  RPC_ENDPOINT: useLocalnet ? 'http://localhost:8899' : clusterApiUrl('devnet'),
  
  // Network configuration
  NETWORK: useLocalnet ? 'localnet' : 'devnet' as const,
  
  // Commitment level
  COMMITMENT: 'confirmed' as const,
  
  // Test mode flag - enables mock responses for development
  TEST_MODE: isDevelopment,
  
  // Localnet flag
  USE_LOCALNET: useLocalnet,
};

export const IDENCLAVE_PROGRAM_ID = SOLANA_CONFIG.PROGRAM_ID;
