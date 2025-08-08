use anchor_lang::prelude::*;

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

#[account]
pub struct Credential {
    pub user: Pubkey,
    pub credential_hash: String,
    pub credential_type: String,
    pub metadata: String,
    pub status: String,
    pub created_at: i64,
    pub updated_at: i64,
    pub bump: u8,
}

#[account]
pub struct VerificationRequest {
    pub requester: Pubkey,
    pub target_wallet: Pubkey,
    pub request_type: String,
    pub metadata: String,
    pub status: String,
    pub created_at: i64,
    pub updated_at: i64,
    pub bump: u8,
}

#[account]
pub struct ConsentRecord {
    pub data_owner: Pubkey,
    pub requester: Pubkey,
    pub data_scope: String,
    pub status: String,
    pub granted_at: i64,
    pub expires_at: i64,
    pub revoked_at: Option<i64>,
    pub bump: u8,
}

#[account]
pub struct AccessLog {
    pub data_owner: Pubkey,
    pub requester: Pubkey,
    pub data_type: String,
    pub access_time: i64,
    pub bump: u8,
}

impl User {
    pub const LEN: usize = 32 + 4 + 200 + 4 + 50 + 4 + 20 + 8 + 8 + 1;
}

impl Credential {
    pub const LEN: usize = 32 + 4 + 100 + 4 + 50 + 4 + 200 + 4 + 20 + 8 + 8 + 1;
}

impl VerificationRequest {
    pub const LEN: usize = 32 + 32 + 4 + 50 + 4 + 200 + 4 + 20 + 8 + 8 + 1;
}

impl ConsentRecord {
    pub const LEN: usize = 32 + 32 + 4 + 200 + 4 + 20 + 8 + 8 + 1 + 8 + 1;
}

impl AccessLog {
    pub const LEN: usize = 32 + 32 + 4 + 50 + 8 + 1;
}
