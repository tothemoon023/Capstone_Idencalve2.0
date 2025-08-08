use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::*;

#[derive(Accounts)]
pub struct InitializeIdentity<'info> {
    #[account(
        init,
        payer = user,
        space = User::LEN,
        seeds = [b"user", user.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, User>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateProfile<'info> {
    #[account(
        mut,
        seeds = [b"user", user.key().as_ref()],
        bump = user_account.bump
    )]
    pub user_account: Account<'info, User>,
    
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct AddCredential<'info> {
    #[account(
        init,
        payer = user,
        space = Credential::LEN,
        seeds = [b"credential", user.key().as_ref()],
        bump
    )]
    pub credential: Account<'info, Credential>,
    
    #[account(
        seeds = [b"user", user.key().as_ref()],
        bump = user_account.bump
    )]
    pub user_account: Account<'info, User>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn initialize_identity(
    ctx: Context<InitializeIdentity>,
    profile_data: String,
    user_type: String,
) -> Result<()> {
    let user_account = &mut ctx.accounts.user_account;
    let clock = Clock::get()?;
    
    // Validate user type
    if user_type != "individual" && user_type != "business" {
        return err!(IdenclaveError::InvalidUserType);
    }
    
    // Validate profile data length
    if profile_data.len() > 200 {
        return err!(IdenclaveError::DataTooLarge);
    }
    
    user_account.wallet_address = ctx.accounts.user.key();
    user_account.profile_data = profile_data;
    user_account.user_type = user_type;
    user_account.status = "pending".to_string();
    user_account.created_at = clock.unix_timestamp;
    user_account.updated_at = clock.unix_timestamp;
    user_account.bump = ctx.bumps.user_account;
    
    msg!("Identity initialized for wallet: {}", ctx.accounts.user.key());
    Ok(())
}

pub fn update_profile(
    ctx: Context<UpdateProfile>,
    profile_data: String,
) -> Result<()> {
    let user_account = &mut ctx.accounts.user_account;
    let clock = Clock::get()?;
    
    // Validate profile data length
    if profile_data.len() > 200 {
        return err!(IdenclaveError::DataTooLarge);
    }
    
    user_account.profile_data = profile_data;
    user_account.updated_at = clock.unix_timestamp;
    
    msg!("Profile updated for wallet: {}", ctx.accounts.user.key());
    Ok(())
}

pub fn add_credential(
    ctx: Context<AddCredential>,
    credential_hash: String,
    credential_type: String,
    metadata: String,
) -> Result<()> {
    let credential = &mut ctx.accounts.credential;
    let clock = Clock::get()?;
    
    // Validate credential data
    if credential_hash.len() > 100 {
        return err!(IdenclaveError::DataTooLarge);
    }
    
    if credential_type.len() > 50 {
        return err!(IdenclaveError::DataTooLarge);
    }
    
    if metadata.len() > 200 {
        return err!(IdenclaveError::DataTooLarge);
    }
    
    credential.user = ctx.accounts.user.key();
    credential.credential_hash = credential_hash;
    credential.credential_type = credential_type;
    credential.metadata = metadata;
    credential.status = "pending".to_string();
    credential.created_at = clock.unix_timestamp;
    credential.updated_at = clock.unix_timestamp;
    credential.bump = ctx.bumps.credential;
    
    msg!("Credential added for wallet: {}", ctx.accounts.user.key());
    Ok(())
}
