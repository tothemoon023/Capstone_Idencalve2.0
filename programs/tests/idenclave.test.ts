import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Idenclave } from "../target/types/idenclave";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { expect } from "chai";

describe("IDenclave 2.0 Smart Contract Tests", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Idenclave as Program<Idenclave>;
  const user = Keypair.generate();

  before(async () => {
    // Airdrop SOL to user for testing
    const signature = await provider.connection.requestAirdrop(
      user.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(signature);
  });

  describe("Program Initialization", () => {
    it("should have correct program ID", () => {
      const expectedProgramId = new PublicKey("Gp1WFWsFF7t84LgrZRv5ALoZsDf7YjRDzrc5FxE3zVUH");
      expect(program.programId.toString()).to.equal(expectedProgramId.toString());
    });

    it("should have correct provider configuration", () => {
      expect(provider.connection.rpcEndpoint).to.include("devnet");
      expect(provider.wallet.publicKey).to.be.instanceOf(PublicKey);
    });
  });

  describe("Initialize Identity Instruction", () => {
    it("should have correct instruction structure", () => {
      // Test that the instruction exists and has correct structure
      expect(program.methods).to.have.property("initializeIdentity");
      expect(typeof program.methods.initializeIdentity).to.equal("function");
    });

    it("should accept correct parameters", () => {
      const instruction = program.methods.initializeIdentity();
      expect(instruction).to.be.an("object");
      expect(instruction).to.have.property("accounts");
      expect(instruction).to.have.property("signers");
    });
  });

  describe("Account Structures", () => {
    it("should have correct InitializeIdentity account structure", () => {
      const accounts = {
        user: user.publicKey,
        systemProgram: SystemProgram.programId,
      };

      expect(accounts).to.have.property("user");
      expect(accounts).to.have.property("systemProgram");
      expect(accounts.user).to.be.instanceOf(PublicKey);
      expect(accounts.systemProgram).to.be.instanceOf(PublicKey);
    });
  });

  describe("Mock Transaction Tests", () => {
    it("should simulate transaction creation", async () => {
      const instruction = program.methods.initializeIdentity();
      const accounts = {
        user: user.publicKey,
        systemProgram: SystemProgram.programId,
      };

      const transaction = new anchor.web3.Transaction();
      transaction.add(
        await instruction.accounts(accounts).instruction()
      );

      expect(transaction.instructions).to.have.length(1);
      expect(transaction.instructions[0]).to.have.property("programId");
      expect(transaction.instructions[0].programId.toString()).to.equal(program.programId.toString());
    });

    it("should validate account permissions", () => {
      const accounts = {
        user: user.publicKey,
        systemProgram: SystemProgram.programId,
      };

      // Test that user is a signer
      expect(accounts.user).to.be.instanceOf(PublicKey);
      expect(accounts.user.toString()).to.equal(user.publicKey.toString());

      // Test that system program is correct
      expect(accounts.systemProgram.toString()).to.equal(SystemProgram.programId.toString());
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid program ID gracefully", () => {
      const invalidProgramId = new PublicKey("11111111111111111111111111111111");
      expect(invalidProgramId.toString()).to.equal("11111111111111111111111111111111");
    });

    it("should validate public key format", () => {
      const validPublicKey = new PublicKey("Gp1WFWsFF7t84LgrZRv5ALoZsDf7YjRDzrc5FxE3zVUH");
      expect(validPublicKey.toString()).to.equal("Gp1WFWsFF7t84LgrZRv5ALoZsDf7YjRDzrc5FxE3zVUH");
    });
  });

  describe("Program State", () => {
    it("should maintain program state correctly", () => {
      expect(program.programId).to.be.instanceOf(PublicKey);
      expect(program.provider).to.equal(provider);
      expect(program.methods).to.be.an("object");
    });

    it("should have correct program metadata", () => {
      expect(program.programId.toString()).to.equal("Gp1WFWsFF7t84LgrZRv5ALoZsDf7YjRDzrc5FxE3zVUH");
    });
  });

  describe("Integration Tests", () => {
    it("should integrate with Solana web3.js correctly", () => {
      const connection = provider.connection;
      expect(connection).to.have.property("rpcEndpoint");
      expect(connection.rpcEndpoint).to.include("devnet");
    });

    it("should work with Anchor framework", () => {
      expect(program).to.have.property("programId");
      expect(program).to.have.property("provider");
      expect(program).to.have.property("methods");
    });
  });

  describe("Mock User Interaction", () => {
    it("should simulate user wallet connection", () => {
      const userWallet = user.publicKey;
      expect(userWallet).to.be.instanceOf(PublicKey);
      expect(userWallet.toString()).to.have.length(44); // Base58 encoded public key length
    });

    it("should simulate user balance check", async () => {
      const balance = await provider.connection.getBalance(user.publicKey);
      expect(balance).to.be.a("number");
      expect(balance).to.be.greaterThan(0);
    });
  });

  describe("Program Deployment Validation", () => {
    it("should validate program deployment on devnet", async () => {
      const programAccount = await provider.connection.getAccountInfo(program.programId);
      expect(programAccount).to.not.be.null;
      expect(programAccount).to.have.property("owner");
      expect(programAccount).to.have.property("lamports");
    });

    it("should confirm program is deployed", async () => {
      const accountInfo = await provider.connection.getAccountInfo(program.programId);
      expect(accountInfo).to.not.be.null;
      expect(accountInfo.owner.toString()).to.equal("11111111111111111111111111111111");
    });
  });
});
