use anchor_lang::prelude::*;

declare_id!("Gp1WFWsFF7t84LgrZRv5ALoZsDf7YjRDzrc5FxE3zVUH");

#[program]
pub mod idenclave {
    use super::*;

    pub fn initialize_identity(_ctx: Context<InitializeIdentity>) -> Result<()> {
        msg!("Identity initialized!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeIdentity<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
