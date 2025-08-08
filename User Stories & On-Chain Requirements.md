# User Stories & On-Chain Requirements

## Most Critical User Types for Initial Proof-of-Concept (PoC)

### 1. Privacy-Conscious Professionals (Doctors, Financial Advisors, Legal Professionals)
**Rationale:**
These users operate in highly regulated environments (healthcare, finance, law) where privacy, compliance, and secure credential management are mission-critical. Their daily workflows involve sensitive data and frequent identity verification, making them ideal for demonstrating IDenclave’s privacy-preserving, user-controlled identity features. If these professionals find value in the platform, it validates both the compliance and usability aspects of your solution.

### 2. Regulated SMEs in Fintech and Healthcare
**Rationale:**
Small-to-medium enterprises in regulated sectors face significant compliance burdens but often lack the resources of large corporations. They are highly motivated to adopt solutions that reduce compliance overhead, streamline onboarding, and improve auditability. Successfully onboarding a few SMEs for the PoC will prove IDenclave’s business integration, regulatory alignment, and real-world impact for organizations—key to your B2B value proposition.

### 3. Crypto & Web3 Platform Operators
**Rationale:**
These are early adopters who are already familiar with decentralized technologies and are actively seeking robust, user-controlled identity solutions for their platforms. Integrating IDenclave with a Web3 app or DeFi platform for the PoC will showcase the system’s interoperability, developer-friendliness, and appeal to the broader blockchain ecosystem. Their feedback will also help refine technical integration and user experience.

### 4. Compliance Officers
**Rationale:**
Compliance officers are responsible for ensuring regulatory adherence and managing audits within organizations. Their involvement in the PoC is essential to validate that IDenclave’s compliance-ready features (such as audit trails and selective disclosure) meet real-world regulatory requirements. Their endorsement will be crucial for broader organizational adoption and for demonstrating the platform’s value to other regulated entities.

### 5. Everyday End Users (Patients, Banking Customers)
**Rationale:**
While not the primary focus for the PoC, including a small group of everyday end users (such as patients accessing health records or banking customers onboarding digitally) can help demonstrate the platform’s usability and user empowerment features. Their experience will provide valuable feedback on the intuitiveness and accessibility of the system, which is vital for future scaling.

---

**Summary:**
Focusing your PoC on Privacy-Conscious Professionals, Regulated SMEs, Crypto/Web3 Platform Operators, and Compliance Officers will best demonstrate IDenclave’s core value: privacy, compliance, usability, and integration. Including a small cohort of Everyday End Users can further validate the user experience and accessibility of your solution. These groups are essential for proving the platform’s real-world impact and for building credibility with both enterprise and Web3 communities. 
------------------------------------------------------------------------------

## Final Prioritized User Types for PoC (Updated)

### 1. Regulated SMEs in Fintech and Healthcare
**Rationale:**
They have the most urgent compliance and privacy needs. Their adoption validates IDenclave’s business value, regulatory alignment, and provides strong B2B case studies.

### 2. Privacy-Conscious Professionals (Doctors, Financial Advisors, Legal Professionals)
**Rationale:**
These users are both decision-makers and daily users in regulated environments. Their endorsement demonstrates that IDenclave’s privacy and usability features meet the highest standards for data protection.

### 3. Crypto & Web3 Platform Operators
**Rationale:**
As early adopters, they provide rapid feedback and help build credibility in the Web3 ecosystem.

### 4. Web3 Developers
**Rationale:**
Web3 developers are essential for integrating IDenclave into dApps and other decentralized platforms. Their experience and feedback will ensure that the platform’s APIs, SDKs, and documentation are developer-friendly and meet the needs of the broader Web3 community. Their successful integrations will drive adoption and demonstrate technical viability.

### 5. IDenclave Admin
**Rationale:**
Admins are critical for platform governance, security, and operational oversight. They manage verifier permissions, monitor identity verification activities, and remove fake or suspicious identities, ensuring the platform remains secure and trustworthy.

---

## Decision-Making Process

- **Agreed with AI:** On the importance of regulated SMEs, privacy-conscious professionals, and crypto/Web3 operators.
- **Added:** The Admin role for platform integrity and operational oversight.
- **Added:** Web3 Developers, as they are crucial for technical integration and adoption within the decentralized ecosystem.
- **Clarified:** Compliance officers are embedded within SMEs/professionals and not a standalone group for the PoC.
- **Deprioritized:** Everyday end users for the initial PoC, focusing instead on those who will drive adoption, integration, and ensure platform integrity.

**Summary:**
For a robust and credible PoC, the most critical user types are:
1. Regulated SMEs in Fintech and Healthcare  
2. Privacy-Conscious Professionals  
3. Crypto & Web3 Platform Operators  
4. Web3 Developers  
5. IDenclave Admin  

This selection ensures the platform is tested for compliance, usability, technical integration, developer experience, and operational security—laying a strong foundation for future growth and adoption.
------------------------------------------------------------------

## Key Functions and Interactions by User Type

### 1. Regulated SMEs in Fintech and Healthcare
- Onboard Organization: Register as a verified business entity on the platform.
- Invite/Manage Employees: Add, remove, and manage employee access and roles.
- Request/Perform Identity Verification: Initiate and track KYC/AML or credential checks for employees, clients, or partners.
- Compliance Dashboard: View audit trails, compliance reports, and regulatory status.
- Selective Disclosure: Choose what information to share with partners, regulators, or clients.
- Integration with Existing Systems: Connect IDenclave to HR, onboarding, or compliance software via APIs.

### 2. Privacy-Conscious Professionals
- Create/Manage Digital Identity: Set up and update their self-sovereign identity profile.
- Credential Management: Upload, verify, and manage professional credentials (licenses, certificates, etc.).
- Selective Disclosure: Approve or deny requests to share specific data with employers, clients, or regulators.
- Consent Management: Review and revoke data sharing permissions at any time.
- Access Logs: View who has accessed or requested their information.
- Secure Login/Authentication: Use IDenclave for passwordless, privacy-preserving authentication to services.

### 3. Crypto & Web3 Platform Operators
- Integrate IDenclave: Connect their dApp or platform to IDenclave for user onboarding and verification.
- Set Verification Policies: Define what level of identity verification is required for different actions (e.g., trading, governance).
- Monitor Verification Status: Track which users have completed required verifications.
- Compliance Reporting: Generate reports for audits or regulatory checks.
- Fraud Detection: Flag or review suspicious activity or identities.
- User Support: Assist users with identity-related issues on their platform.

### 4. Web3 Developers
- Access Developer Portal: Register, access documentation, and obtain API keys or SDKs.
- Integrate APIs/SDKs: Implement IDenclave identity verification into their dApps.
- Test Integration: Use sandbox/testnet environments to validate integration.
- Submit Feedback/Bug Reports: Communicate issues or suggestions to the IDenclave team.
- Participate in Developer Community: Join forums, contribute to open-source tools, or attend workshops/hackathons.

### 5. IDenclave Admin
- User & Verifier Management: Approve, suspend, or remove verifiers and business accounts.
- Monitor Platform Activity: View logs of verification requests, approvals, and suspicious activity.
- Fraud & Abuse Response: Investigate and take action on fake or malicious identities.
- Policy Enforcement: Update and enforce platform rules, compliance standards, and data retention policies.
- System Health Monitoring: Oversee uptime, performance, and security alerts.
- Support & Incident Response: Address escalated user issues and coordinate with support teams.

---

**Summary Table:**

| User Type                      | Key Functions/Interactions                                                                                   |
|------------------------------- |-------------------------------------------------------------------------------------------------------------|
| Regulated SMEs                 | Onboard org, manage employees, request verification, compliance dashboard, selective disclosure, integration |
| Privacy-Conscious Professionals| Create/manage identity, credential management, selective disclosure, consent mgmt, access logs, secure login|
| Crypto/Web3 Platform Operators | Integrate IDenclave, set policies, monitor status, compliance reporting, fraud detection, user support       |
| Web3 Developers                | Access portal, integrate APIs/SDKs, test integration, submit feedback, join community                      |
| IDenclave Admin                | Manage users/verifiers, monitor activity, fraud response, policy enforcement, system health, support        |
-------------------------------------------------------------------------------

------------------------------------------------------------------------------

## Key Technical Requirements for PoC (Derived from Core User Interactions)

### 1. User Registration & Onboarding
- Business Entity Registration:
  - Ability for SMEs to register as verified organizations (including KYC for the business itself).
  - Admin dashboard for organization profile management.
- Individual User Registration:
  - Self-sovereign identity creation for professionals (unique, user-controlled digital ID).
  - Secure onboarding flow (with email, wallet, or other authentication).

### 2. Identity & Credential Management
- Employee/Member Management:
  - Add, remove, and manage employee/user accounts within an SME.
  - Assign roles and permissions (admin, employee, etc.).
- Credential Issuance & Storage:
  - Upload, verify, and store professional credentials (certificates, licenses, etc.).
  - Support for cryptographic proofs of credential authenticity.
- Credential Revocation:
  - Mechanism for revoking or updating credentials.

### 3. Identity Verification & KYC/AML
- Verification Request Workflow:
  - Initiate, track, and approve/reject identity verification requests (KYC/AML, credential checks).
  - Notification system for pending actions (for both SMEs and professionals).
- Audit Trail & Compliance Dashboard:
  - Immutable logging of verification actions, credential sharing, and access events.
  - Dashboard for SMEs to view compliance status, audit trails, and reports.

### 4. Selective Disclosure & Consent Management
- Granular Data Sharing:
  - Professionals can approve/deny requests to share specific credentials or data fields.
  - SMEs can request only the minimum necessary information.
- Consent Management:
  - Professionals can review, grant, or revoke data sharing permissions at any time.
- Access Logs:
  - Users can view who accessed or requested their data and when.

### 5. Authentication & Security
- Passwordless Authentication:
  - Support for secure, privacy-preserving login (e.g., wallet-based, WebAuthn, or similar).
- End-to-End Encryption:
  - All sensitive data and credentials are encrypted at rest and in transit.
- Role-Based Access Control:
  - Enforce permissions for admins, employees, and professionals.

### 6. Integration & APIs
- API Endpoints:
  - Expose APIs for SMEs to integrate IDenclave with HR, onboarding, or compliance systems.
- Webhooks/Notifications:
  - Real-time updates for verification status, credential changes, and consent events.

### 7. Basic Admin & Platform Oversight
- Admin Tools:
  - Approve or suspend organizations and users.
  - Monitor suspicious activity and manage platform health.

---

**Summary Table:**

| Requirement Area         | Key Features/Functions                                                                 |
|-------------------------|----------------------------------------------------------------------------------------|
| Registration/Onboarding | SME & user registration, profile management, secure onboarding                        |
| Credential Management   | Upload, verify, store, revoke credentials; cryptographic proofs                       |
| Verification Workflow   | Initiate/track KYC/AML, notifications, audit trails, compliance dashboard             |
| Selective Disclosure    | Approve/deny data sharing, consent management, access logs                            |
| Authentication/Security | Passwordless login, encryption, role-based access control                             |
| Integration/APIs        | API endpoints, webhooks, integration with external systems                            |
| Admin/Oversight         | Admin tools for user/org management, monitoring and platform security                |
------------------------------------------------------------------------------

------------------------------------------------------------------------------
Part B
## Analysis, Rationale, and Refined User Stories & Technical Requirements

### Analysis & Rationale

The feedback highlighted that while the original user stories and requirements are well-aligned with IDenclave’s value proposition and target markets, they can be improved by:
- Explicitly mapping out end-to-end user flows and edge cases.
- Clarifying which actions/data are on-chain vs. off-chain.
- Detailing security and privacy mechanisms (e.g., ZKPs, encryption).
- Including requirements for developer experience and extensibility.
- Making compliance and auditability more explicit.

Refining the user stories and technical requirements in these ways will:
- Ensure all critical user journeys (including error handling and consent revocation) are covered.
- Enable the technical team to design clear data models, APIs, and smart contracts.
- Make it easier to demonstrate compliance and privacy guarantees to both users and regulators.
- Support future extensibility and third-party integrations.
- Provide a better developer experience, which is crucial for ecosystem adoption.

---

### Refined User Stories

#### A. Regulated SME Onboarding and Verification
**As a** compliance manager at a fintech/healthcare SME,
**I want to** register my organization, onboard employees, and initiate KYC/credential checks,
**so that** I can meet regulatory requirements and ensure only verified individuals access sensitive systems.
- **Edge Cases:** If an employee fails verification, I want to be notified and able to request resubmission or escalate for review.
- **On-Chain/Off-Chain:** Organization and employee identities are anchored on-chain; sensitive PII and documents are encrypted and stored off-chain.

#### B. Privacy-Conscious Professional Credential Sharing
**As a** privacy-conscious professional,
**I want to** create my digital identity, upload credentials, and selectively share them with employers/clients,
**so that** I retain control over my data and can prove my qualifications securely.
- **Edge Cases:** If I revoke consent after sharing, the system should prevent further access and log the event.
- **On-Chain/Off-Chain:** Credential hashes and sharing events are on-chain; actual documents are encrypted off-chain.

#### C. Web3 Developer Integration
**As a** Web3 developer,
**I want to** access clear documentation, SDKs, and a testnet environment,
**so that** I can easily integrate IDenclave identity verification into my dApp and test all flows before going live.
- **Edge Cases:** If integration fails or a test credential is invalid, I want detailed error messages and support resources.

#### D. IDenclave Admin Oversight
**As an** IDenclave admin,
**I want to** monitor all verification activities, manage verifiers, and respond to suspicious or fraudulent activity,
**so that** the platform remains secure, compliant, and trustworthy.
- **Edge Cases:** If a verifier is flagged for abuse, I want to suspend their access and trigger an audit.

---

### Refined & Granular Technical Requirements

#### User Registration & Onboarding
- On-chain registration of organizations and users (unique IDs, public keys).
- Off-chain encrypted storage for sensitive PII and documents.
- Admin dashboard for organization and user management.
- Email/wallet-based authentication with passwordless login.

#### Identity & Credential Management
- CRUD APIs for employee/user management (add, remove, update, assign roles).
- Credential issuance: On-chain hash, off-chain encrypted document storage.
- Credential revocation: On-chain event and off-chain status update.
- Role-based access control enforced at both API and smart contract levels.

#### Verification & KYC/AML Workflow
- API and UI for initiating, tracking, and resolving verification requests.
- Notification system (email, in-app, webhook) for pending actions and failures.
- Immutable on-chain audit log of all verification and sharing events.
- Compliance dashboard with exportable reports.

#### Selective Disclosure & Consent Management
- Smart contract logic for granular data sharing and consent revocation.
- Off-chain consent registry with on-chain proofs of consent actions.
- Access logs: API and UI for users to view all access/sharing events.
- Enforcement of consent revocation (block further access, log event).

#### Authentication & Security
- Support for wallet-based and WebAuthn authentication.
- End-to-end encryption for all sensitive data.
- ZKP support for credential verification without revealing underlying data.
- Regular security audits and vulnerability monitoring.

#### Integration & Developer Experience
- REST/GraphQL APIs and Web3 SDKs for integration.
- Testnet/sandbox environment for developers.
- Detailed documentation, code samples, and error handling guides.
- Webhooks for real-time integration with external systems.

#### Admin & Platform Oversight
- Admin APIs and dashboard for user/org management, activity monitoring, and policy enforcement.
- Automated fraud detection and abuse response workflows.
- System health monitoring and alerting.

#### Compliance & Auditability
- Mapping of data flows and storage to regulatory requirements (GDPR, HIPAA, etc.).
- Exportable audit trails and compliance reports.
- Support for third-party compliance audits.

---

**Summary Table:**

| Area                | Refined User Story Example                                      | Granular Technical Requirement Example                |
|---------------------|-----------------------------------------------------------------|------------------------------------------------------|
| SME Onboarding      | Register org, onboard employees, initiate KYC                   | On-chain org/user reg, CRUD APIs, compliance dashboard|
| Professional Sharing| Create identity, upload/share credentials, revoke consent        | Credential issuance/revocation, consent registry      |
| Web3 Dev Integration| Integrate/test IDenclave, get support                           | SDKs, testnet, error handling, documentation          |
| Admin Oversight     | Monitor/manage verifiers, respond to abuse                      | Admin dashboard, fraud detection, audit logs          |
------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------

## Part C Refinement Log

### 1. Regulated SME Onboarding and Verification

**Before:**  
"As a compliance manager at a fintech/healthcare SME, I want to register my organization, onboard employees, and initiate KYC/credential checks, so that I can meet regulatory requirements and ensure only verified individuals access sensitive systems."

**Issues:**  
- Contains multiple actions (register org, onboard employees, initiate KYC).
- Some jargon ("KYC", "credential checks", "onboard").
- Not atomic.

**After:**  
- **Story 1:** "As a compliance manager, I want to register my company on the platform so that my business can use IDenclave."
  - *Rationale:* Split for atomicity; removed jargon.
- **Story 2:** "As a compliance manager, I want to add or remove employees from my company's account so that I can control who has access."
  - *Rationale:* Split for atomicity; clarified action.
- **Story 3:** "As a compliance manager, I want to request identity checks for my employees or clients so that I can be sure only verified people have access."
  - *Rationale:* Split for atomicity; replaced 'KYC/credential checks' with 'identity checks'.
- **Story 4:** "As a compliance manager, I want to see a dashboard showing all verification activities and compliance reports so that I can track our regulatory status."
  - *Rationale:* Clarified outcome; removed jargon.
- **Story 5:** "As a compliance manager, I want to choose what information to share with partners or regulators so that we only disclose what is necessary."
  - *Rationale:* Clarified selective disclosure.
- **Story 6:** "As a compliance manager, I want to connect IDenclave to our HR or compliance software so that our systems work together."
  - *Rationale:* Clarified integration.

---

### 2. Privacy-Conscious Professional Credential Sharing

**Before:**  
"As a privacy-conscious professional, I want to create my digital identity, upload credentials, and selectively share them with employers/clients, so that I retain control over my data and can prove my qualifications securely."

**Issues:**  
- Multiple actions in one story.
- Jargon ("digital identity", "credentials", "selectively share").
- Not atomic.

**After:**  
- **Story 1:** "As a professional, I want to create my personal profile on IDenclave so that I can use the platform."
  - *Rationale:* Split for atomicity; removed jargon.
- **Story 2:** "As a professional, I want to upload and verify my work documents or licenses so that I can prove my qualifications."
  - *Rationale:* Clarified 'credentials'.
- **Story 3:** "As a professional, I want to decide which documents to share with an employer or client so that I control my information."
  - *Rationale:* Clarified 'selective disclosure'.
- **Story 4:** "As a professional, I want to see who has viewed or requested my information so that I know how my data is used."
  - *Rationale:* Clarified 'access logs'.
- **Story 5:** "As a professional, I want to take back permission to share my information at any time so that I stay in control."
  - *Rationale:* Clarified 'consent management'.
- **Story 6:** "As a professional, I want to log in securely without a password so that my account stays safe."
  - *Rationale:* Clarified 'passwordless authentication'.

---

### 3. Web3 Developer Integration

**Before:**  
"As a Web3 developer, I want to access clear documentation, SDKs, and a testnet environment, so that I can easily integrate IDenclave identity verification into my dApp and test all flows before going live."

**Issues:**  
- Multiple actions.
- Jargon ("SDKs", "testnet", "dApp", "flows", "integrate").
- Not atomic.

**After:**  
- **Story 1:** "As a developer, I want to find easy-to-understand guides and examples so that I can learn how to use IDenclave."
  - *Rationale:* Removed jargon; clarified documentation.
- **Story 2:** "As a developer, I want to connect my app to IDenclave so that my users can verify their identity."
  - *Rationale:* Clarified 'integrate'.
- **Story 3:** "As a developer, I want to test my app in a safe environment before launching it to real users."
  - *Rationale:* Clarified 'testnet environment'.
- **Story 4:** "As a developer, I want to get help and report problems so that I can fix issues quickly."
  - *Rationale:* Clarified support/feedback.

---

### 4. IDenclave Admin Oversight

**Before:**  
"As an IDenclave admin, I want to monitor all verification activities, manage verifiers, and respond to suspicious or fraudulent activity, so that the platform remains secure, compliant, and trustworthy."

**Issues:**  
- Multiple actions.
- Jargon ("verifiers", "verification activities", "fraudulent activity").
- Not atomic.

**After:**  
- **Story 1:** "As an admin, I want to approve or remove companies and users so that only trusted people use the platform."
  - *Rationale:* Split for atomicity; clarified 'manage verifiers'.
- **Story 2:** "As an admin, I want to see a list of all identity checks and actions so that I can monitor what is happening."
  - *Rationale:* Clarified 'monitor verification activities'.
- **Story 3:** "As an admin, I want to get alerts about suspicious behavior so that I can act quickly to keep the platform safe."
  - *Rationale:* Clarified 'respond to suspicious or fraudulent activity'.
- **Story 4:** "As an admin, I want to pause or block anyone who breaks the rules so that the platform stays secure."
  - *Rationale:* Clarified 'policy enforcement'.

---

**Summary of Changes:**
- **De-jargonized** all stories for non-technical clarity.
- **Split** multi-step stories into atomic, single-action stories.
- **Clarified** user actions and outcomes.
- **Checked for overlap** and merged/eliminated redundant stories.
----------------------------------------------------------------------------------------------
Part D: Defining Potential On-Chain Requirements

### **Regulated SME Stories**

**User Story:** "As a compliance manager, I want to register my company on the platform so that my business can use IDenclave."

**Potential On-Chain Requirements:**
- Need a way to create a new on-chain account to hold company data.
- This account must store the company's unique identifier and public key.
- It needs to store the compliance manager's address for permissions.
- Must initialize company status as "pending verification."
- Should store company type (fintech/healthcare) for regulatory compliance.

---

**User Story:** "As a compliance manager, I want to add or remove employees from my company's account so that I can control who has access."

**Potential On-Chain Requirements:**
- Need a function to add employee addresses to the company's employee list.
- Need a function to remove employee addresses from the company's employee list.
- The company account must store a list of authorized employee addresses.
- Only the compliance manager's address should be able to modify the employee list.
- Should emit events when employees are added or removed.

---

**User Story:** "As a compliance manager, I want to request identity checks for my employees or clients so that I can be sure only verified people have access."

**Potential On-Chain Requirements:**
- Need a function to create a new verification request account.
- This account must store the requester's address (company), target address (employee/client), and verification type.
- Must store verification status (pending, approved, rejected).
- Should emit events when verification requests are created or status changes.
- Need a way to link verification requests to the company account.

---

**User Story:** "As a compliance manager, I want to see a dashboard showing all verification activities and compliance reports so that I can track our regulatory status."

**Potential On-Chain Requirements:**
- Need to store verification history and status changes on-chain for audit trails.
- Company account should maintain a list of all verification requests made.
- Should store timestamps for all verification activities.
- Need to calculate and store compliance metrics (e.g., verification completion rates).

---

**User Story:** "As a compliance manager, I want to choose what information to share with partners or regulators so that we only disclose what is necessary."

**Potential On-Chain Requirements:**
- Need a function to create sharing permission accounts.
- These accounts must store what data can be shared, with whom, and for how long.
- Must store the company's consent preferences for each sharing request.
- Should emit events when sharing permissions are granted or revoked.
- Need to link sharing permissions to specific verification data.

---

**User Story:** "As a compliance manager, I want to connect IDenclave to our HR or compliance software so that our systems work together."

**Potential On-Chain Requirements:**
- Need to store API keys or integration credentials securely on-chain.
- Company account should maintain a list of authorized external systems.
- Should emit events when integrations are added or removed.
- Need to store integration status and health checks.

---

### **Privacy-Conscious Professional Stories**

**User Story:** "As a professional, I want to create my personal profile on IDenclave so that I can use the platform."

**Potential On-Chain Requirements:**
- Need a way to create a new on-chain account to hold personal profile data.
- This account must store the user's unique identifier and public key.
- Must initialize profile status as "pending verification."
- Should store user type (doctor, lawyer, financial advisor, etc.).

---

**User Story:** "As a professional, I want to upload and verify my work documents or licenses so that I can prove my qualifications."

**Potential On-Chain Requirements:**
- Need a function to create credential accounts for each document.
- Each credential account must store a hash of the document and verification status.
- Must store the credential issuer's address and issuance date.
- Should store credential type (license, certificate, etc.).
- Need to link credentials to the user's profile account.
- Should emit events when credentials are added or verified.

---

**User Story:** "As a professional, I want to decide which documents to share with an employer or client so that I control my information."

**Potential On-Chain Requirements:**
- Need a function to create sharing consent accounts.
- These accounts must store which credentials can be shared, with whom, and for how long.
- Must store the user's consent status (granted, denied, pending).
- Should emit events when consent is given or revoked.
- Need to link sharing consents to specific credential accounts.

---

**User Story:** "As a professional, I want to see who has viewed or requested my information so that I know how my data is used."

**Potential On-Chain Requirements:**
- Need to store access logs on-chain for transparency.
- Each access event must store who accessed what, when, and why.
- Should emit events for every access attempt.
- Need to maintain a history of all access events linked to the user account.

---

**User Story:** "As a professional, I want to take back permission to share my information at any time so that I stay in control."

**Potential On-Chain Requirements:**
- Need a function to revoke sharing permissions immediately.
- Must update consent account status to "revoked."
- Should emit events when permissions are revoked.
- Need to invalidate any active sharing sessions.
- Should store revocation timestamp and reason.

---

**User Story:** "As a professional, I want to log in securely without a password so that my account stays safe."

**Potential On-Chain Requirements:**
- Need to store authentication method (wallet address, WebAuthn key) on-chain.
- Must verify ownership of the authentication method before allowing access.
- Should emit events for successful and failed login attempts.
- Need to store session information for audit purposes.

---

### **Web3 Developer Stories**

**User Story:** "As a developer, I want to find easy-to-understand guides and examples so that I can learn how to use IDenclave."

**Potential On-Chain Requirements:**
- Need to store developer account information on-chain.
- Should track developer activity and usage patterns.
- Need to store developer preferences and settings.

---

**User Story:** "As a developer, I want to connect my app to IDenclave so that my users can verify their identity."

**Potential On-Chain Requirements:**
- Need a function to create developer application accounts.
- These accounts must store the developer's address and app information.
- Must store API keys and integration credentials securely.
- Should store integration status and health metrics.
- Need to link developer accounts to their applications.

---

**User Story:** "As a developer, I want to test my app in a safe environment before launching it to real users."

**Potential On-Chain Requirements:**
- Need to create test accounts that mirror production functionality.
- Must store test environment configuration and settings.
- Should track test usage separately from production.
- Need to provide test credentials and sample data.

---

**User Story:** "As a developer, I want to get help and report problems so that I can fix issues quickly."

**Potential On-Chain Requirements:**
- Need to store support ticket information on-chain for transparency.
- Should track developer support history and resolution times.
- Need to store bug reports and feature requests.
- Should emit events when support tickets are created or resolved.

---

### **IDenclave Admin Stories**

**User Story:** "As an admin, I want to approve or remove companies and users so that only trusted people use the platform."

**Potential On-Chain Requirements:**
- Need admin accounts with elevated permissions.
- Must store admin actions and decisions on-chain for audit trails.
- Should emit events when companies or users are approved or removed.
- Need to store admin decision timestamps and reasons.
- Must maintain a list of all admin actions for transparency.

---

**User Story:** "As an admin, I want to see a list of all identity checks and actions so that I can monitor what is happening."

**Potential On-Chain Requirements:**
- Need to store all platform activities on-chain for monitoring.
- Must maintain comprehensive audit logs of all actions.
- Should emit events for all significant platform activities.
- Need to store activity metrics and analytics data.

---

**User Story:** "As an admin, I want to get alerts about suspicious behavior so that I can act quickly to keep the platform safe."

**Potential On-Chain Requirements:**
- Need to store security event information on-chain.
- Must maintain a list of suspicious activities and flagged accounts.
- Should emit events when suspicious behavior is detected.
- Need to store security metrics and threat indicators.

---

**User Story:** "As an admin, I want to pause or block anyone who breaks the rules so that the platform stays secure."

**Potential On-Chain Requirements:**
- Need a function to suspend or block user accounts.
- Must store suspension/block status and reasons on-chain.
- Should emit events when accounts are suspended or blocked.
- Need to store admin decision timestamps and justifications.
- Must maintain a list of all suspended/blocked accounts.
---------------------------------------------------------------------------------

------------------------------------------------------------------------------

## Final User Stories & On-Chain Requirements Document

### **Final Core User Personas**

#### **1. Compliance Manager (Regulated SME)**
- **Who:** Compliance officers at fintech/healthcare small-to-medium enterprises
- **Goal:** Meet regulatory requirements while reducing compliance overhead
- **Pain Points:** High compliance costs, manual verification processes, audit complexity
- **Key Needs:** Streamlined onboarding, automated verification, compliance reporting

#### **2. Privacy-Conscious Professional**
- **Who:** Doctors, lawyers, financial advisors, and other regulated professionals
- **Goal:** Maintain control over personal data while proving qualifications
- **Pain Points:** Forced to share excessive personal information, lack of data control
- **Key Needs:** Selective data sharing, credential management, consent control

#### **3. Web3 Developer**
- **Who:** Developers building decentralized applications and platforms
- **Goal:** Integrate secure identity verification into their applications
- **Pain Points:** Complex integration processes, lack of developer-friendly tools
- **Key Needs:** Clear documentation, easy integration, testing environments

#### **4. IDenclave Admin**
- **Who:** Platform administrators responsible for security and compliance
- **Goal:** Maintain platform integrity and trustworthiness
- **Pain Points:** Fraudulent activities, compliance violations, security threats
- **Key Needs:** Monitoring tools, fraud detection, policy enforcement

---

### **Final Function Maps**

#### **Compliance Manager Functions:**
1. **Register Company** - Create business account on platform
2. **Manage Employees** - Add/remove employee access
3. **Request Verification** - Initiate identity checks for employees/clients
4. **View Compliance Dashboard** - Monitor verification status and reports
5. **Control Data Sharing** - Choose what information to disclose
6. **Integrate Systems** - Connect with existing HR/compliance software

#### **Privacy-Conscious Professional Functions:**
1. **Create Profile** - Set up personal account
2. **Upload Credentials** - Add and verify work documents/licenses
3. **Manage Sharing** - Approve/deny data sharing requests
4. **Monitor Access** - View who has accessed their information
5. **Revoke Permissions** - Take back sharing consent at any time
6. **Secure Login** - Access account without passwords

#### **Web3 Developer Functions:**
1. **Access Documentation** - Find guides and examples
2. **Integrate Application** - Connect app to IDenclave
3. **Test Integration** - Validate in safe environment
4. **Get Support** - Report issues and get help

#### **IDenclave Admin Functions:**
1. **Manage Users** - Approve/remove companies and users
2. **Monitor Activity** - Track all platform actions
3. **Detect Threats** - Identify suspicious behavior
4. **Enforce Policies** - Suspend/block rule violators

---

### **Final Potential On-Chain Requirements**

#### **Account Management**
- **Company Account:** Store company ID, public key, manager address, status, type
- **User Account:** Store user ID, public key, profile status, user type
- **Developer Account:** Store developer address, app info, API keys, integration status
- **Admin Account:** Store admin permissions and elevated access rights

#### **Employee Management**
- **Employee List:** Store authorized employee addresses per company
- **Permission Control:** Only company manager can modify employee list
- **Event Emission:** Log when employees are added/removed

#### **Verification System**
- **Verification Request:** Store requester, target, verification type, status
- **Verification History:** Maintain audit trail of all verification activities
- **Status Tracking:** Track pending, approved, rejected states
- **Event Logging:** Emit events for verification creation and status changes

#### **Credential Management**
- **Credential Account:** Store document hash, verification status, issuer, date, type
- **Credential Linking:** Connect credentials to user profiles
- **Verification Events:** Log when credentials are added or verified

#### **Consent & Sharing**
- **Sharing Permission:** Store what data, with whom, for how long
- **Consent Status:** Track granted, denied, pending, revoked states
- **Permission Linking:** Connect sharing permissions to specific data
- **Revocation System:** Immediate permission revocation with event logging

#### **Access Control & Security**
- **Authentication Method:** Store wallet address, WebAuthn keys
- **Access Logs:** Record who accessed what, when, why
- **Session Management:** Track login attempts and session data
- **Security Events:** Log suspicious behavior and security incidents

#### **Compliance & Audit**
- **Audit Trails:** Immutable logging of all platform activities
- **Compliance Metrics:** Store verification completion rates and compliance data
- **Admin Actions:** Track all administrative decisions and actions
- **Suspension System:** Store suspension/block status and reasons

#### **Integration & Developer Support**
- **API Management:** Store integration credentials and health metrics
- **Test Environment:** Separate test accounts and configuration
- **Support System:** Track support tickets and resolution times
- **Developer Analytics:** Monitor developer activity and usage patterns

#### **Event System**
- **Comprehensive Logging:** Emit events for all significant actions
- **Transparency:** Maintain public audit trail of platform activities
- **Monitoring:** Enable real-time tracking of platform health and security


**Summary:** This refined structure provides a clear, actionable foundation for technical implementation, with each user persona having well-defined functions that map directly to specific on-chain requirements. The system prioritizes transparency, security, and user control while maintaining regulatory compliance and developer-friendly integration.
---------------------------------------------------------------------------------------------

