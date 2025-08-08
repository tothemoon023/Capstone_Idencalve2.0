use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

pub mod instructions;
pub mod state;
pub mod errors;

use instructions::*;

#[program]
pub mod idenclave {
    use super::*;

    /// Initialize a new user identity
    pub fn initialize_identity(
        ctx: Context<InitializeIdentity>,
        profile_data: String,
        user_type: String,
    ) -> Result<()> {
        instructions::identity::initialize_identity(ctx, profile_data, user_type)
    }

    /// Update user profile data
    pub fn update_profile(
        ctx: Context<UpdateProfile>,
        profile_data: String,
    ) -> Result<()> {
        instructions::identity::update_profile(ctx, profile_data)
    }

    /// Add a credential to user's identity
    pub fn add_credential(
        ctx: Context<AddCredential>,
        credential_hash: String,
        credential_type: String,
        metadata: String,
    ) -> Result<()> {
        instructions::identity::add_credential(ctx, credential_hash, credential_type, metadata)
    }

    /// Create a verification request
    pub fn create_verification_request(
        ctx: Context<CreateVerificationRequest>,
        target_wallet: Pubkey,
        request_type: String,
        metadata: String,
    ) -> Result<()> {
        instructions::verification::create_verification_request(ctx, target_wallet, request_type, metadata)
    }

    /// Update verification request status
    pub fn update_verification_status(
        ctx: Context<UpdateVerificationStatus>,
        status: String,
        metadata: String,
    ) -> Result<()> {
        instructions::verification::update_verification_status(ctx, status, metadata)
    }

    /// Grant consent for data sharing
    pub fn grant_consent(
        ctx: Context<GrantConsent>,
        data_owner: Pubkey,
        data_scope: String,
        expires_at: i64,
    ) -> Result<()> {
        instructions::consent::grant_consent(ctx, data_owner, data_scope, expires_at)
    }

    /// Revoke consent for data sharing
    pub fn revoke_consent(
        ctx: Context<RevokeConsent>,
    ) -> Result<()> {
        instructions::consent::revoke_consent(ctx)
    }

    /// Check permission for data access
    pub fn check_permission(
        ctx: Context<CheckPermission>,
        data_owner: Pubkey,
        data_type: String,
    ) -> Result<()> {
        instructions::consent::check_permission(ctx, data_owner, data_type)
    }
}
