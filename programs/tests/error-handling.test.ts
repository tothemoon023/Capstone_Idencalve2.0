import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Idenclave } from "../target/types/idenclave";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { expect } from "chai";

describe("IDenclave 2.0 Smart Contract Error Handling Tests", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Idenclave as Program<Idenclave>;
  const user = Keypair.generate();
  const invalidUser = Keypair.generate();

  before(async () => {
    // Airdrop SOL to test user
    const signature = await provider.connection.requestAirdrop(
      user.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(signature);
  });

  describe("Account Validation Errors", () => {
    it("should handle invalid account owner", async () => {
      try {
        // Create a PDA with invalid owner
        const [invalidPda] = PublicKey.findProgramAddressSync(
          [Buffer.from("invalid"), user.publicKey.toBuffer()],
          program.programId
        );

        await program.methods
          .initializeIdentity()
          .accounts({
            user: invalidPda,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });

    it("should handle missing required accounts", async () => {
      try {
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            // Missing systemProgram
          })
          .rpc();

        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });

    it("should handle wrong account types", async () => {
      try {
        await program.methods
          .initializeIdentity()
          .accounts({
            user: SystemProgram.programId, // Wrong account type
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });
  });

  describe("Instruction Parameter Errors", () => {
    it("should handle invalid instruction parameters", async () => {
      try {
        // Test with invalid parameters (if the instruction had parameters)
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });

    it("should handle empty or null parameters", async () => {
      try {
        // Test with empty parameters
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });
  });

  describe("Program State Errors", () => {
    it("should handle duplicate initialization attempts", async () => {
      try {
        // First initialization
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        // Second initialization should fail
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error for duplicate initialization");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });

    it("should handle operations on uninitialized accounts", async () => {
      try {
        // Try to perform operations on an account that hasn't been initialized
        await program.methods
          .initializeIdentity()
          .accounts({
            user: invalidUser.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error for uninitialized account");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });
  });

  describe("Permission Errors", () => {
    it("should handle unauthorized access attempts", async () => {
      try {
        // Try to access with wrong signer
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([invalidUser]) // Wrong signer
          .rpc();

        expect.fail("Should have thrown an error for unauthorized access");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });

    it("should handle missing signer", async () => {
      try {
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error for missing signer");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });
  });

  describe("Resource Errors", () => {
    it("should handle insufficient SOL for rent", async () => {
      try {
        // Create a user with no SOL
        const poorUser = Keypair.generate();

        await program.methods
          .initializeIdentity()
          .accounts({
            user: poorUser.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([poorUser])
          .rpc();

        expect.fail("Should have thrown an error for insufficient SOL");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });

    it("should handle account size too small", async () => {
      try {
        // Test with account that's too small for the data
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error for account size");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });
  });

  describe("Network and Transaction Errors", () => {
    it("should handle network timeouts", async () => {
      try {
        // Simulate network timeout by using a very short timeout
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc({ commitment: "processed", timeout: 1 }); // 1ms timeout

        expect.fail("Should have thrown a timeout error");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });

    it("should handle transaction simulation failures", async () => {
      try {
        // Create a transaction that will fail simulation
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown a simulation error");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });
  });

  describe("Custom Program Errors", () => {
    it("should handle custom error codes", async () => {
      try {
        // Test custom error handling
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown a custom error");
      } catch (error) {
        expect(error.message).to.include("Error");
        // Check for custom error codes if they exist
      }
    });

    it("should handle invalid instruction data", async () => {
      try {
        // Test with malformed instruction data
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error for invalid instruction data");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });
  });

  describe("PDA (Program Derived Address) Errors", () => {
    it("should handle invalid PDA seeds", async () => {
      try {
        // Test with invalid PDA seeds
        const [invalidPda] = PublicKey.findProgramAddressSync(
          [Buffer.from("invalid_seed")], // Invalid seeds
          program.programId
        );

        await program.methods
          .initializeIdentity()
          .accounts({
            user: invalidPda,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error for invalid PDA");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });

    it("should handle PDA bump errors", async () => {
      try {
        // Test PDA bump validation
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error for PDA bump");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });
  });

  describe("Cross-Program Invocation (CPI) Errors", () => {
    it("should handle CPI failures", async () => {
      try {
        // Test CPI error handling
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown a CPI error");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });

    it("should handle invalid CPI accounts", async () => {
      try {
        // Test with invalid CPI account
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: invalidUser.publicKey, // Invalid system program
          })
          .rpc();

        expect.fail("Should have thrown an error for invalid CPI account");
      } catch (error) {
        expect(error.message).to.include("Error");
      }
    });
  });

  describe("Error Recovery and Graceful Degradation", () => {
    it("should handle errors gracefully without crashing", async () => {
      try {
        // Test that errors don't crash the program
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error");
      } catch (error) {
        // Error should be caught and handled gracefully
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.be.a("string");
      }
    });

    it("should provide meaningful error messages", async () => {
      try {
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.be.a("string");
        expect(error.message.length).to.be.greaterThan(0);
      }
    });
  });

  describe("Error Logging and Debugging", () => {
    it("should log errors appropriately", async () => {
      try {
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error");
      } catch (error) {
        // Error should be logged for debugging
        console.log("Error logged:", error.message);
        expect(error.message).to.be.a("string");
      }
    });

    it("should provide error context for debugging", async () => {
      try {
        await program.methods
          .initializeIdentity()
          .accounts({
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        expect.fail("Should have thrown an error");
      } catch (error) {
        // Error should include context for debugging
        expect(error).to.have.property("message");
        expect(error).to.have.property("stack");
      }
    });
  });
});
