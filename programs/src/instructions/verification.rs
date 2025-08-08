use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::*;

#[derive(Accounts)]
pub struct CreateVerificationRequest<'info> {
    #[account(
        init,
        payer = requester,
        space = VerificationRequest::LEN,
        seeds = [b"verification", requester.key().as_ref()],
        bump
    )]
    pub verification_request: Account<'info, VerificationRequest>,
    
    #[account(mut)]
    pub requester: Signer<'info>,
    
    pub target_wallet: AccountInfo<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateVerificationStatus<'info> {
    #[account(
        mut,
        seeds = [b"verification", requester.key().as_ref()],
        bump = verification_request.bump,
        has_one = requester @ IdenclaveError::UnauthorizedAccess
    )]
    pub verification_request: Account<'info, VerificationRequest>,
    
    pub requester: Signer<'info>,
    
    pub target_wallet: AccountInfo<'info>,
}

pub fn create_verification_request(
    ctx: Context<CreateVerificationRequest>,
    target_wallet: Pubkey,
    request_type: String,
    metadata: String,
) -> Result<()> {
    let verification_request = &mut ctx.accounts.verification_request;
    let clock = Clock::get()?;
    
    // Validate verification type
    let valid_types = ["kyc", "aml", "background", "employment", "education"];
    if !valid_types.contains(&request_type.as_str()) {
        return err!(IdenclaveError::InvalidVerificationType);
    }
    
    // Validate metadata length
    if metadata.len() > 200 {
        return err!(IdenclaveError::DataTooLarge);
    }
    
    verification_request.requester = ctx.accounts.requester.key();
    verification_request.target_wallet = target_wallet;
    verification_request.request_type = request_type;
    verification_request.metadata = metadata;
    verification_request.status = "pending".to_string();
    verification_request.created_at = clock.unix_timestamp;
    verification_request.updated_at = clock.unix_timestamp;
    verification_request.bump = ctx.bumps.verification_request;
    
    msg!("Verification request created for target: {}", target_wallet);
    Ok(())
}

pub fn update_verification_status(
    ctx: Context<UpdateVerificationStatus>,
    status: String,
    metadata: String,
) -> Result<()> {
    let verification_request = &mut ctx.accounts.verification_request;
    let clock = Clock::get()?;
    
    // Validate status
    let valid_statuses = ["pending", "approved", "rejected", "completed"];
    if !valid_statuses.contains(&status.as_str()) {
        return err!(IdenclaveError::InvalidStatusTransition);
    }
    
    // Validate metadata length
    if metadata.len() > 200 {
        return err!(IdenclaveError::DataTooLarge);
    }
    
    verification_request.status = status;
    verification_request.metadata = metadata;
    verification_request.updated_at = clock.unix_timestamp;
    
    msg!("Verification status updated to: {}", verification_request.status);
    Ok(())
}
