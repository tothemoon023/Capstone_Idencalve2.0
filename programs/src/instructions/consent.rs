use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::*;

#[derive(Accounts)]
pub struct GrantConsent<'info> {
    #[account(
        init,
        payer = data_owner,
        space = ConsentRecord::LEN,
        seeds = [b"consent", data_owner.key().as_ref(), requester.key().as_ref()],
        bump
    )]
    pub consent_record: Account<'info, ConsentRecord>,
    
    #[account(mut)]
    pub data_owner: Signer<'info>,
    
    pub requester: AccountInfo<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RevokeConsent<'info> {
    #[account(
        mut,
        seeds = [b"consent", data_owner.key().as_ref(), requester.key().as_ref()],
        bump = consent_record.bump,
        has_one = data_owner @ IdenclaveError::UnauthorizedAccess
    )]
    pub consent_record: Account<'info, ConsentRecord>,
    
    pub data_owner: Signer<'info>,
    
    pub requester: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CheckPermission<'info> {
    #[account(
        seeds = [b"consent", data_owner.key().as_ref(), requester.key().as_ref()],
        bump = consent_record.bump,
        has_one = data_owner @ IdenclaveError::UnauthorizedAccess
    )]
    pub consent_record: Account<'info, ConsentRecord>,
    
    pub data_owner: AccountInfo<'info>,
    
    pub requester: Signer<'info>,
}

pub fn grant_consent(
    ctx: Context<GrantConsent>,
    _data_owner: Pubkey,
    data_scope: String,
    expires_at: i64,
) -> Result<()> {
    let consent_record = &mut ctx.accounts.consent_record;
    let clock = Clock::get()?;
    
    // Validate data scope length
    if data_scope.len() > 200 {
        return err!(IdenclaveError::DataTooLarge);
    }
    
    // Validate expiry time
    if expires_at <= clock.unix_timestamp {
        return err!(IdenclaveError::InvalidTimestamp);
    }
    
    consent_record.data_owner = ctx.accounts.data_owner.key();
    consent_record.requester = ctx.accounts.requester.key();
    consent_record.data_scope = data_scope;
    consent_record.status = "granted".to_string();
    consent_record.granted_at = clock.unix_timestamp;
    consent_record.expires_at = expires_at;
    consent_record.revoked_at = None;
    consent_record.bump = ctx.bumps.consent_record;
    
    msg!("Consent granted to: {}", ctx.accounts.requester.key());
    Ok(())
}

pub fn revoke_consent(
    ctx: Context<RevokeConsent>,
) -> Result<()> {
    let consent_record = &mut ctx.accounts.consent_record;
    let clock = Clock::get()?;
    
    // Check if consent is already revoked
    if consent_record.status == "revoked" {
        return err!(IdenclaveError::ConsentAlreadyRevoked);
    }
    
    consent_record.status = "revoked".to_string();
    consent_record.revoked_at = Some(clock.unix_timestamp);
    
    msg!("Consent revoked for: {}", ctx.accounts.requester.key());
    Ok(())
}

pub fn check_permission(
    ctx: Context<CheckPermission>,
    _data_owner: Pubkey,
    data_type: String,
) -> Result<()> {
    let consent_record = &ctx.accounts.consent_record;
    let clock = Clock::get()?;
    
    // Check if consent is granted
    if consent_record.status != "granted" {
        return err!(IdenclaveError::InsufficientPermissions);
    }
    
    // Check if consent has expired
    if clock.unix_timestamp > consent_record.expires_at {
        return err!(IdenclaveError::ConsentExpired);
    }
    
    // Check if data type is within scope
    if !consent_record.data_scope.contains(&data_type) {
        return err!(IdenclaveError::InsufficientPermissions);
    }
    
    msg!("Permission granted for data type: {}", data_type);
    Ok(())
}
