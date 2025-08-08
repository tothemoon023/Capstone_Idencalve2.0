use anchor_lang::prelude::*;

#[error_code]
pub enum IdenclaveError {
    #[msg("User already exists")]
    UserAlreadyExists,
    
    #[msg("User not found")]
    UserNotFound,
    
    #[msg("Credential not found")]
    CredentialNotFound,
    
    #[msg("Verification request not found")]
    VerificationRequestNotFound,
    
    #[msg("Consent record not found")]
    ConsentRecordNotFound,
    
    #[msg("Invalid wallet address")]
    InvalidWalletAddress,
    
    #[msg("Invalid user type")]
    InvalidUserType,
    
    #[msg("Invalid verification type")]
    InvalidVerificationType,
    
    #[msg("Invalid consent status")]
    InvalidConsentStatus,
    
    #[msg("Consent already granted")]
    ConsentAlreadyGranted,
    
    #[msg("Consent already revoked")]
    ConsentAlreadyRevoked,
    
    #[msg("Consent expired")]
    ConsentExpired,
    
    #[msg("Insufficient permissions")]
    InsufficientPermissions,
    
    #[msg("Invalid profile data")]
    InvalidProfileData,
    
    #[msg("Invalid credential data")]
    InvalidCredentialData,
    
    #[msg("Invalid metadata")]
    InvalidMetadata,
    
    #[msg("Unauthorized access")]
    UnauthorizedAccess,
    
    #[msg("Invalid timestamp")]
    InvalidTimestamp,
    
    #[msg("Data too large")]
    DataTooLarge,
    
    #[msg("Invalid status transition")]
    InvalidStatusTransition,
}
