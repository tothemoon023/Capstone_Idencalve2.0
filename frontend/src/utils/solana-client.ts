import { 
  Connection, 
  PublicKey, 
  Transaction, 
  sendAndConfirmTransaction,
  Keypair,
  SystemProgram,
  SYSVAR_RENT_PUBKEY
} from '@solana/web3.js';
import { SOLANA_CONFIG } from '../config/solana';

export class SolanaClient {
  private connection: Connection;
  private programId: PublicKey;

  constructor() {
    this.connection = new Connection(SOLANA_CONFIG.RPC_ENDPOINT, SOLANA_CONFIG.COMMITMENT);
    this.programId = new PublicKey(SOLANA_CONFIG.PROGRAM_ID);
  }

  getConnection(): Connection {
    return this.connection;
  }

  getProgramId(): PublicKey {
    return this.programId;
  }

  // Get user account address
  async getUserAccountAddress(userWallet: PublicKey): Promise<PublicKey> {
    const [userAccount] = await PublicKey.findProgramAddress(
      [Buffer.from('user'), userWallet.toBuffer()],
      this.programId
    );
    return userAccount;
  }

  // Get credential account address
  async getCredentialAccountAddress(userWallet: PublicKey): Promise<PublicKey> {
    const [credentialAccount] = await PublicKey.findProgramAddress(
      [Buffer.from('credential'), userWallet.toBuffer()],
      this.programId
    );
    return credentialAccount;
  }

  // Get verification request account address
  async getVerificationRequestAddress(requester: PublicKey, targetWallet: PublicKey): Promise<PublicKey> {
    const [verificationRequest] = await PublicKey.findProgramAddress(
      [Buffer.from('verification'), requester.toBuffer(), targetWallet.toBuffer()],
      this.programId
    );
    return verificationRequest;
  }

  // Get consent record address
  async getConsentRecordAddress(dataOwner: PublicKey, requester: PublicKey): Promise<PublicKey> {
    const [consentRecord] = await PublicKey.findProgramAddress(
      [Buffer.from('consent'), dataOwner.toBuffer(), requester.toBuffer()],
      this.programId
    );
    return consentRecord;
  }

  // Check if user account exists
  async userAccountExists(userWallet: PublicKey): Promise<boolean> {
    try {
      const userAccountAddress = await this.getUserAccountAddress(userWallet);
      const accountInfo = await this.connection.getAccountInfo(userAccountAddress);
      return accountInfo !== null;
    } catch (error) {
      console.error('Error checking user account:', error);
      return false;
    }
  }

  // Get user account data
  async getUserAccountData(userWallet: PublicKey): Promise<any> {
    try {
      const userAccountAddress = await this.getUserAccountAddress(userWallet);
      const accountInfo = await this.connection.getAccountInfo(userAccountAddress);
      
      if (!accountInfo) {
        return null;
      }

      // Parse account data (this would need to match your program's data structure)
      return {
        walletAddress: userWallet.toBase58(),
        exists: true,
        data: accountInfo.data
      };
    } catch (error) {
      console.error('Error getting user account data:', error);
      return null;
    }
  }

  // Get account balance
  async getAccountBalance(publicKey: PublicKey): Promise<number> {
    try {
      const balance = await this.connection.getBalance(publicKey);
      return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
      console.error('Error getting account balance:', error);
      return 0;
    }
  }
}

// Export singleton instance
export const solanaClient = new SolanaClient();
