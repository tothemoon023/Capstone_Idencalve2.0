# IDenclave 2.0 MVP Architecture

## MVP Goals & Scope

### Primary Objectives:
1. **Demonstrate Core Value**: User-controlled identity with selective disclosure
2. **Show Technical Feasibility**: Solana blockchain integration with privacy features
3. **Validate User Experience**: Intuitive interface for non-technical users
4. **Prove Business Case**: Cost-effective verification for businesses

### MVP Scope (What to Build):
- ✅ User registration and profile creation
- ✅ Document upload and credential management
- ✅ Selective disclosure mechanism
- ✅ Basic verification workflow
- ✅ Simple business dashboard
- ✅ Web3 wallet integration

### MVP Scope (What to Skip):
- ❌ Advanced zero-knowledge proofs (Phase 2)
- ❌ Complex compliance features (Phase 3)
- ❌ Enterprise integrations (Phase 4)
- ❌ Cross-chain functionality (Phase 4)

---

## Technical Architecture

### 1. Frontend (React + TypeScript)
```
src/
├── components/
│   ├── auth/
│   │   ├── WalletConnect.tsx
│   │   └── LoginForm.tsx
│   ├── profile/
│   │   ├── UserProfile.tsx
│   │   └── DocumentUpload.tsx
│   ├── verification/
│   │   ├── VerificationRequest.tsx
│   │   └── VerificationStatus.tsx
│   ├── sharing/
│   │   ├── ConsentManager.tsx
│   │   └── DataSharing.tsx
│   └── dashboard/
│       ├── UserDashboard.tsx
│       └── BusinessDashboard.tsx
├── hooks/
│   ├── useWallet.ts
│   ├── useIdentity.ts
│   └── useVerification.ts
├── services/
│   ├── api.ts
│   ├── blockchain.ts
│   └── storage.ts
└── utils/
    ├── encryption.ts
    └── validation.ts
```

### 2. Backend (Node.js + Express)
```
server/
├── routes/
│   ├── auth.js
│   ├── identity.js
│   ├── verification.js
│   └── sharing.js
├── services/
│   ├── blockchainService.js
│   ├── encryptionService.js
│   └── verificationService.js
├── middleware/
│   ├── auth.js
│   └── validation.js
└── config/
    └── database.js
```

### 3. Smart Contracts (Solana + Anchor)
```
programs/
├── identity/
│   ├── lib.rs
│   ├── instructions/
│   │   ├── create_user.rs
│   │   ├── update_profile.rs
│   │   └── manage_credentials.rs
│   └── state/
│       ├── user_account.rs
│       └── credential_account.rs
├── verification/
│   ├── lib.rs
│   ├── instructions/
│   │   ├── create_request.rs
│   │   ├── process_verification.rs
│   │   └── update_status.rs
│   └── state/
│       ├── verification_request.rs
│       └── verification_result.rs
└── consent/
    ├── lib.rs
    ├── instructions/
    │   ├── grant_consent.rs
    │   ├── revoke_consent.rs
    │   └── check_permission.rs
    └── state/
        ├── consent_account.rs
        └── access_log.rs
```

### 4. Database Schema (PostgreSQL)
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    wallet_address VARCHAR(44) UNIQUE NOT NULL,
    profile_data JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Credentials table
CREATE TABLE credentials (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    credential_hash VARCHAR(64) NOT NULL,
    credential_type VARCHAR(50),
    verification_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Verification requests table
CREATE TABLE verification_requests (
    id UUID PRIMARY KEY,
    requester_id UUID REFERENCES users(id),
    target_id UUID REFERENCES users(id),
    request_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Consent records table
CREATE TABLE consent_records (
    id UUID PRIMARY KEY,
    data_owner_id UUID REFERENCES users(id),
    requester_id UUID REFERENCES users(id),
    data_scope JSONB,
    consent_status VARCHAR(20),
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Core Features Implementation

### 1. User Registration & Profile Management
**Frontend Flow:**
1. User connects Solana wallet
2. System creates user account on blockchain
3. User fills out basic profile (name, email, profession)
4. Profile data encrypted and stored off-chain
5. User can update profile anytime

**Smart Contract Functions:**
- `create_user_account(wallet_address, profile_hash)`
- `update_user_profile(user_pubkey, new_profile_hash)`
- `get_user_profile(user_pubkey)`

### 2. Document Upload & Credential Management
**Frontend Flow:**
1. User uploads document (ID, passport, certificate)
2. Document encrypted and stored in IPFS
3. Document hash stored on blockchain
4. User can manage all credentials in dashboard

**Smart Contract Functions:**
- `add_credential(user_pubkey, credential_hash, credential_type)`
- `verify_credential(credential_hash)`
- `revoke_credential(credential_hash)`

### 3. Selective Disclosure Mechanism
**Frontend Flow:**
1. Business requests specific data from user
2. User receives notification with request details
3. User can approve/deny or share partial data
4. System creates consent record on blockchain
5. Business can access only approved data

**Smart Contract Functions:**
- `create_consent_request(requester, owner, data_scope)`
- `grant_consent(consent_id, expiry_date)`
- `revoke_consent(consent_id)`
- `check_access_permission(requester, owner, data_type)`

### 4. Verification Workflow
**Frontend Flow:**
1. Business initiates verification request
2. User receives notification
3. User approves verification
4. System processes verification (basic checks)
5. Verification result stored on blockchain
6. Business receives verification status

**Smart Contract Functions:**
- `create_verification_request(requester, target, verification_type)`
- `process_verification(request_id, result)`
- `get_verification_status(request_id)`

---

## Data Flow Architecture

### 1. User Registration Flow
```
User → Connect Wallet → Create Blockchain Account → Store Profile → Complete
```

### 2. Document Upload Flow
```
User → Upload Document → Encrypt → Store in IPFS → Hash to Blockchain → Complete
```

### 3. Data Sharing Flow
```
Business → Request Data → User Notification → User Decision → Consent Record → Access Granted
```

### 4. Verification Flow
```
Business → Request Verification → User Approval → Process Verification → Store Result → Notify Business
```

---

## Security & Privacy Features

### 1. Encryption
- **At Rest**: AES-256 encryption for all stored data
- **In Transit**: TLS 1.3 for all API communications
- **On Blockchain**: Only hashes and metadata stored on-chain

### 2. Access Control
- **Wallet-based Authentication**: Users sign transactions with their private keys
- **Role-based Permissions**: Different access levels for users vs. businesses
- **Consent Management**: Users control exactly what data is shared

### 3. Privacy Protection
- **Selective Disclosure**: Users share only necessary information
- **No Central Storage**: Personal data not stored in centralized databases
- **Audit Trail**: All access attempts logged on blockchain

---

## MVP Development Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Set up Solana development environment
- [ ] Create basic smart contracts (Identity, Verification, Consent)
- [ ] Set up React frontend with wallet connection
- [ ] Implement user registration flow

### Phase 2: Core Features (Week 3-4)
- [ ] Document upload and credential management
- [ ] Basic verification workflow
- [ ] Selective disclosure mechanism
- [ ] User dashboard

### Phase 3: Business Features (Week 5-6)
- [ ] Business registration and dashboard
- [ ] Verification request system
- [ ] Consent management interface
- [ ] Basic reporting

### Phase 4: Polish & Testing (Week 7-8)
- [ ] UI/UX improvements
- [ ] Error handling and validation
- [ ] Security testing
- [ ] Demo preparation

---

## Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **State Management**: Zustand
- **UI Library**: Tailwind CSS + Headless UI
- **Web3**: @solana/web3.js + @solana/wallet-adapter
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + wallet signatures

### Blockchain
- **Platform**: Solana
- **Framework**: Anchor
- **Language**: Rust
- **Network**: Devnet for MVP

### Infrastructure
- **Storage**: IPFS for document storage
- **Hosting**: Vercel (frontend) + Railway (backend)
- **Database**: Supabase (PostgreSQL)
- **Monitoring**: Sentry for error tracking

---

## Success Metrics for MVP

### Technical Metrics
- [ ] User registration completes in <30 seconds
- [ ] Document upload processes in <10 seconds
- [ ] Verification requests resolve in <60 seconds
- [ ] 99% uptime during demo period

### User Experience Metrics
- [ ] 90% of users complete registration flow
- [ ] 80% of users successfully upload documents
- [ ] 70% of verification requests are approved
- [ ] Average session duration >5 minutes

### Business Metrics
- [ ] 3+ business users onboarded
- [ ] 10+ individual users registered
- [ ] 5+ successful verification workflows
- [ ] Positive feedback from all user types

---

## Risk Mitigation

### Technical Risks
- **Smart Contract Bugs**: Extensive testing + security audit
- **Performance Issues**: Load testing + optimization
- **Integration Problems**: Modular architecture + clear APIs

### User Experience Risks
- **Complex Onboarding**: Step-by-step guided flow
- **Wallet Connection Issues**: Multiple wallet support + clear instructions
- **Data Privacy Concerns**: Transparent privacy controls + clear explanations

### Business Risks
- **Low Adoption**: Focus on clear value proposition + intuitive UX
- **Competition**: Emphasize unique Solana advantages + privacy features
- **Regulatory Issues**: Consult legal experts + build compliance-ready features

---

## Next Steps

1. **Set up development environment**
2. **Create project repository structure**
3. **Implement basic smart contracts**
4. **Build user registration flow**
5. **Add document upload functionality**
6. **Implement selective disclosure**
7. **Create business dashboard**
8. **Test and polish for demo**

This MVP architecture provides a solid foundation for demonstrating IDenclave's core value proposition while keeping development complexity manageable.
