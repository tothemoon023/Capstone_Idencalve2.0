use anchor_lang::prelude::*;

declare_id!("E26WsLNacfSvEJcKMZ1667XPoNn3mDpyCb523sgaf8yy");

#[program]
pub mod idenclave {
    use super::*;

    /// Initialize a new user identity
    pub fn initialize_identity(
        ctx: Context<InitializeIdentity>,
        profile_data: String,
        user_type: String,
    ) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        let clock = Clock::get()?;
        
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
}

#[derive(Accounts)]
pub struct InitializeIdentity<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 4 + 200 + 4 + 50 + 4 + 20 + 8 + 8 + 1,
        seeds = [b"user", user.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, User>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[account]
pub struct User {
    pub wallet_address: Pubkey,
    pub profile_data: String,
    pub user_type: String,
    pub status: String,
    pub created_at: i64,
    pub updated_at: i64,
    pub bump: u8,
}
