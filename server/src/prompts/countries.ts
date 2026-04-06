export const countryOverlays: Record<string, Record<string, string>> = {
  US: {
    'medical-bill': `US-specific regulations to check:
- No Surprises Act violations (out-of-network charges without prior notice for services after Jan 1, 2022)
- Good Faith Estimate violations (final bill exceeds estimate by $400 or more, for uninsured/self-pay patients)
- Compare charges against CMS Medicare Fee Schedule published rates
- EMTALA violations (emergency services billing)
- State balance billing protections
- Affordable Care Act preventive services coverage requirements
- Check CPT/HCPCS code validity against current AMA code sets`,

    'debt-collection': `US-specific regulations to check:
- Fair Debt Collection Practices Act (FDCPA) violations
- Regulation F requirements (effective Nov 30, 2021) — communication frequency limits, electronic communication rules
- Required mini-Miranda warning
- 30-day validation notice requirements
- State-specific debt collection laws (varies by state)
- TCPA compliance for phone/text communications
- Statute of limitations on debt by state
- CFPB enforcement actions and guidance`,

    'insurance-denial': `US-specific regulations to check:
- ACA essential health benefit denials
- Mental Health Parity and Addiction Equity Act compliance
- No Surprises Act independent dispute resolution rights
- State insurance commissioner complaint process
- ERISA plan appeal requirements (for employer plans)
- External review rights under ACA
- Preventive care coverage under ACA
- Network adequacy requirements`,

    'hoa-fine': `US-specific regulations to check:
- State-specific HOA laws (vary significantly by state)
- Davis-Stirling Act (California)
- Florida Homeowners' Association Act
- Fair Housing Act implications
- State limits on fine amounts
- Required meeting and notice procedures under state law`,

    'landlord-dispute': `US-specific regulations to check:
- Fair Housing Act protections
- State and local rent control laws where applicable
- Security deposit limits by state
- Required notice periods by state (typically 30-60 days)
- Implied warranty of habitability
- State retaliatory eviction protections
- Lead paint disclosure requirements (pre-1978 housing)
- Local just cause eviction ordinances`,

    'bank-fee': `US-specific regulations to check:
- Regulation E (Electronic Fund Transfer Act) — overdraft opt-in requirement
- Truth in Savings Act (Regulation DD) — fee disclosures
- Dodd-Frank Act Section 1034 — error resolution
- CFPB overdraft fee guidance
- Regulation Z (Truth in Lending) for credit-related fees
- Expedited Funds Availability Act (Regulation CC)`,

    'airline-claim': `US-specific regulations to check:
- DOT 14 CFR Part 250 — denied boarding compensation ($775-$1,550)
- DOT refund rules for canceled/significantly changed flights
- DOT tarmac delay rules (3 hours domestic, 4 hours international)
- Lost baggage liability limit ($3,800 domestic)
- DOT 24-hour booking cancellation rule
- DOT dashboard of airline commitments
- State consumer protection laws for travel`,

    'other': `US-specific consumer protection regulations to check:
- FTC Act Section 5 — unfair or deceptive acts or practices
- State consumer protection and unfair business practices statutes
- Truth in Lending Act (TILA) for credit-related documents
- State usury laws for interest rate caps
- Automatic renewal laws (varies by state, e.g., California ARL)
- CFPB regulations for financial products
- State attorney general consumer protection enforcement`,
  },

  GB: {
    'medical-bill': `UK-specific regulations to check:
- NHS Constitution rights (free at point of use for eligible services)
- Private healthcare pricing transparency requirements
- Competition and Markets Authority (CMA) guidance on private healthcare
- NHS charges regulations (prescription charges, dental charges)
- Cross-border healthcare directive rights
- Private Patient Unit (PPU) billing practices`,

    'debt-collection': `UK-specific regulations to check:
- Consumer Credit Act 1974 requirements
- Financial Conduct Authority (FCA) Consumer Credit sourcebook (CONC)
- Pre-Action Protocol for Debt Claims
- OFT Debt Collection Guidance (now FCA)
- Statute of limitations (6 years England/Wales, 5 years Scotland)
- Required default notice under Section 87 CCA
- Right to request CCA agreement copy (Section 78)
- FCA treating customers fairly (TCF) requirements
- Breathing space regulations`,

    'insurance-denial': `UK-specific regulations to check:
- Financial Ombudsman Service (FOS) complaint rights
- FCA Insurance Conduct of Business Sourcebook (ICOBS)
- Consumer Insurance (Disclosure and Representations) Act 2012
- Insurance Act 2015 requirements
- Unfair Terms in Consumer Contracts Regulations
- FCA fair value rules for insurance products`,

    'hoa-fine': `UK-specific regulations to check (leasehold/freehold context):
- Leasehold Reform Act provisions
- Commonhold and Leasehold Reform Act 2002
- Service charge reasonableness under Landlord and Tenant Act 1985
- First-tier Tribunal (Property Chamber) rights
- Right to Manage (RTM) provisions
- Section 20 consultation requirements for major works`,

    'landlord-dispute': `UK-specific regulations to check:
- Housing Act 1988 and 2004 requirements
- Tenant Fees Act 2019 (England) — banned fees
- Deposit protection scheme requirements (TDS, DPS, myDeposits)
- Section 21 and Section 8 notice requirements
- Renters' Reform Bill provisions (if enacted)
- Homes (Fitness for Human Habitation) Act 2018
- EPC rating requirements
- Gas Safety Certificate requirements
- How to Rent guide requirement`,

    'bank-fee': `UK-specific regulations to check:
- FCA Banking Conduct of Business Sourcebook
- Payment Services Regulations 2017
- Consumer Rights Act 2015
- Unfair terms provisions
- FCA overdraft pricing rules (single interest rate from April 2020)
- Financial Ombudsman Service rights
- Current Account Switch Service guarantee`,

    'airline-claim': `UK-specific regulations to check:
- UK retained EU Regulation 261/2004 (UK261) for flights departing UK
- Compensation: £220 (short haul), £350 (medium), £520 (long haul)
- Montreal Convention for baggage (approx 1,288 SDR)
- CAA enforcement and CEDR/AviationADR dispute resolution
- Package Travel Regulations 2018
- Consumer Rights Act 2015 for travel services`,

    'other': `UK-specific consumer protection regulations to check:
- Consumer Rights Act 2015 — unfair terms, quality of services
- Consumer Contracts Regulations 2013 — cancellation rights
- Financial Conduct Authority rules for financial products
- Unfair Trading Regulations 2008
- Citizens Advice and Trading Standards enforcement
- Financial Ombudsman Service for financial disputes`,
  },

  AU: {
    'medical-bill': `Australia-specific regulations to check:
- Medicare Benefits Schedule (MBS) fee comparison
- No gap or known gap arrangements
- Private Health Insurance Act 2007 requirements
- Australian Competition and Consumer Commission (ACCC) guidelines
- Informed financial consent requirements
- Out-of-pocket cost transparency`,

    'debt-collection': `Australia-specific regulations to check:
- Australian Consumer Law (ACL) provisions
- ASIC Debt Collection Guideline (Regulatory Guide 96)
- National Consumer Credit Protection Act 2009
- State/territory debt collection licensing requirements
- Statute of limitations (varies by state, typically 6 years)
- Hardship provisions requirements
- Australian Financial Complaints Authority (AFCA) rights`,

    'insurance-denial': `Australia-specific regulations to check:
- Insurance Contracts Act 1984 requirements
- General Insurance Code of Practice
- ASIC regulatory guidance
- Australian Financial Complaints Authority (AFCA) complaint rights
- Duty of utmost good faith
- Unfair contract terms protections`,

    'hoa-fine': `Australia-specific regulations to check (strata/body corporate context):
- State-specific strata legislation
- Strata Schemes Management Act (NSW)
- Owners Corporation Act (VIC)
- Body Corporate and Community Management Act (QLD)
- By-law enforcement procedures
- Maximum penalty amounts by state`,

    'landlord-dispute': `Australia-specific regulations to check:
- State/territory residential tenancy acts
- Bond/deposit limits by state (typically 4 weeks rent)
- Minimum notice periods by state
- Condition reports and bond claims
- Rent increase notice requirements
- Residential tenancy tribunal rights
- Minimum housing standards`,

    'bank-fee': `Australia-specific regulations to check:
- ASIC regulatory guidance on fees
- Banking Code of Practice (ABA)
- National Consumer Credit Protection Act 2009
- Australian Financial Complaints Authority (AFCA) rights
- ePayments Code
- Responsible lending obligations`,

    'airline-claim': `Australia-specific regulations to check:
- Australian Consumer Law (ACL) consumer guarantees
- ACCC airline rights guidance
- Consumer guarantee of acceptable quality and fitness for purpose
- No specific EU261-style compensation regime (but ACL applies)
- Airline Customer Advocate dispute resolution
- Montreal Convention for international flights`,

    'other': `Australia-specific consumer protection regulations to check:
- Australian Consumer Law (ACL) — unfair contract terms, consumer guarantees
- ACCC enforcement of misleading or deceptive conduct
- State/territory fair trading acts
- ASIC regulations for financial products
- Unfair contract terms provisions under ACL
- Australian Financial Complaints Authority (AFCA) for financial disputes`,
  },

  CA: {
    'medical-bill': `Canada-specific regulations to check:
- Canada Health Act — insured services should have no patient charges
- Provincial health insurance coverage requirements
- Extra-billing prohibitions for insured services
- Uninsured services fee schedules by province
- Private insurance coordination requirements`,

    'debt-collection': `Canada-specific regulations to check:
- Provincial debt collection acts (vary by province)
- Collection and Debt Settlement Services Act (Ontario)
- Business Practices and Consumer Protection Act (BC)
- Consumer Protection Act (Quebec)
- Limitation periods by province (typically 2-6 years)
- Required licensing and bonding
- Prohibited practices under provincial law`,

    'insurance-denial': `Canada-specific regulations to check:
- Provincial insurance acts
- General Insurance OmbudService (GIO) complaint rights
- OmbudService for Life & Health Insurance (OLHI)
- Provincial superintendent of insurance complaint process
- Insurance company complaint handling requirements`,

    'hoa-fine': `Canada-specific regulations to check (condominium context):
- Provincial condominium/strata acts
- Condominium Act 1998 (Ontario)
- Strata Property Act (BC)
- Required notice and hearing procedures
- By-law enforcement procedures by province`,

    'landlord-dispute': `Canada-specific regulations to check:
- Provincial residential tenancy acts
- Rent control provisions by province
- Security deposit limits (vary by province)
- Required notice periods by province
- Landlord and Tenant Board (Ontario) / Residential Tenancy Branch (BC)
- Standard lease requirements`,

    'bank-fee': `Canada-specific regulations to check:
- Bank Act (federal)
- Financial Consumer Agency of Canada (FCAC) requirements
- Cost of Borrowing Regulations
- Canadian Code of Practice for Consumer Debit Card Services
- Ombudsman for Banking Services and Investments (OBSI)`,

    'airline-claim': `Canada-specific regulations to check:
- Air Passenger Protection Regulations (APPR) — CTA
- Compensation: $125-$1,000 CAD depending on delay length and airline size
- Denied boarding compensation requirements
- Lost/damaged baggage compensation
- Canadian Transportation Agency complaint process
- Montreal Convention for international flights`,

    'other': `Canada-specific consumer protection regulations to check:
- Provincial consumer protection acts (Ontario CPA, BC BPCPA, Quebec CPA)
- Competition Act — misleading advertising and deceptive practices
- Federal interest rate criminal threshold (60% per annum)
- Automatic renewal and negative option billing laws by province
- Financial Consumer Agency of Canada (FCAC) for financial products
- Provincial consumer protection offices for complaints`,
  },

  NZ: {
    'medical-bill': `New Zealand-specific regulations to check:
- ACC (Accident Compensation Corporation) coverage for injuries
- District Health Board public healthcare provisions
- Health and Disability Commissioner rights
- Private surgical hospital pricing
- Informed consent requirements under Code of Health and Disability Services Consumers' Rights`,

    'debt-collection': `New Zealand-specific regulations to check:
- Fair Trading Act 1986
- Credit Contracts and Consumer Finance Act 2003
- Responsible lending requirements
- Limitation Act 2010 (6-year limitation)
- Financial dispute resolution scheme membership requirements
- Commerce Commission enforcement`,

    'insurance-denial': `New Zealand-specific regulations to check:
- Insurance (Prudential Supervision) Act 2010
- Fair Insurance Code
- Insurance & Financial Services Ombudsman (IFSO) rights
- Fair Trading Act 1986 provisions`,

    'hoa-fine': `New Zealand-specific regulations to check (body corporate context):
- Unit Titles Act 2010
- Body corporate operational rules
- Dispute resolution through Tenancy Tribunal`,

    'landlord-dispute': `New Zealand-specific regulations to check:
- Residential Tenancies Act 1986
- Healthy Homes standards (heating, insulation, ventilation, drainage, draught stopping)
- Bond lodgement requirements (max 4 weeks rent)
- Tenancy Tribunal dispute resolution
- 90-day notice requirements
- Rent increase procedures (once every 12 months)`,

    'bank-fee': `New Zealand-specific regulations to check:
- Banking Ombudsman Scheme
- Fair Trading Act 1986
- Credit Contracts and Consumer Finance Act 2003
- Code of Banking Practice`,

    'airline-claim': `New Zealand-specific regulations to check:
- Consumer Guarantees Act 1993
- Civil Aviation Act provisions
- Fair Trading Act 1986
- Airlines must provide services with reasonable care and skill
- Montreal Convention for international flights`,

    'other': `New Zealand-specific consumer protection regulations to check:
- Consumer Guarantees Act 1993 — quality, fitness for purpose
- Fair Trading Act 1986 — misleading conduct, unfair contract terms
- Credit Contracts and Consumer Finance Act 2003
- Commerce Commission enforcement
- Disputes Tribunal for claims under $30,000`,
  },

  IE: {
    'medical-bill': `Ireland-specific regulations to check:
- Health Service Executive (HSE) public healthcare charges
- National Treatment Purchase Fund
- Private health insurance regulations (HIA)
- Medical card and GP visit card entitlements
- Nursing home fair deal scheme
- Hospital in-patient charges (currently capped at €80/day, max €800/year)`,

    'debt-collection': `Ireland-specific regulations to check:
- Consumer Credit Act 1995
- Central Bank of Ireland Consumer Protection Code
- Non-Mortgage Arrears process (MARP equivalent)
- Statute of Limitations Act 1957 (6 years)
- Financial Services and Pensions Ombudsman (FSPO) rights
- Central Bank guidelines on debt collection practices`,

    'insurance-denial': `Ireland-specific regulations to check:
- Consumer Protection Code (Central Bank)
- Insurance Ireland Code of Practice
- Financial Services and Pensions Ombudsman (FSPO) rights
- Consumer Insurance Contracts Act 2019`,

    'hoa-fine': `Ireland-specific regulations to check (management company context):
- Multi-Unit Developments Act 2011
- Property Services Regulatory Authority
- Owners' management company obligations
- Service charge requirements`,

    'landlord-dispute': `Ireland-specific regulations to check:
- Residential Tenancies Acts 2004-2021
- RTB (Residential Tenancies Board) dispute resolution
- Rent Pressure Zone (RPZ) limits
- Deposit protection (max 1 month rent)
- Notice periods based on tenancy duration
- BER (Building Energy Rating) requirements
- Minimum standards regulations`,

    'bank-fee': `Ireland-specific regulations to check:
- Central Bank Consumer Protection Code
- Payment Services Regulations
- Financial Services and Pensions Ombudsman (FSPO)
- European Communities (Consumer Credit Agreements) Regulations`,

    'airline-claim': `Ireland-specific regulations to check:
- EU Regulation 261/2004 (directly applicable)
- Compensation: EUR 250/400/600 depending on distance
- Commission for Aviation Regulation (CAR) enforcement
- Small Claims Court procedure for airline claims
- Montreal Convention for baggage claims`,

    'other': `Ireland-specific consumer protection regulations to check:
- Consumer Protection Act 2007 — unfair, misleading, aggressive practices
- Consumer Rights Act 2022
- Central Bank Consumer Protection Code for financial products
- Competition and Consumer Protection Commission (CCPC) enforcement
- EU Consumer Rights Directive (as transposed)
- Financial Services and Pensions Ombudsman (FSPO) for financial disputes`,
  },

  ZA: {
    'medical-bill': `South Africa-specific regulations to check:
- National Health Act provisions
- Council for Medical Schemes regulations
- Medical schemes prescribed minimum benefits (PMBs)
- HPCSA (Health Professions Council) ethical billing guidelines
- Reference Price List (RPL) / NHRPL comparisons
- Gap cover implications`,

    'debt-collection': `South Africa-specific regulations to check:
- National Credit Act 34 of 2005
- Debt Collectors Act 114 of 1998
- Council for Debt Collectors registration requirements
- In duplum rule (interest cannot exceed principal)
- Prescription Act 68 of 1969 (3-year prescription for debts)
- National Credit Regulator (NCR) complaints
- Debt review/counselling requirements`,

    'insurance-denial': `South Africa-specific regulations to check:
- Insurance Act 18 of 2017
- Policyholder Protection Rules
- FAIS (Financial Advisory and Intermediary Services) Act
- Ombudsman for Long-term Insurance / Short-term Insurance Ombudsman
- Treating Customers Fairly (TCF) framework`,

    'hoa-fine': `South Africa-specific regulations to check (body corporate/HOA context):
- Sectional Titles Schemes Management Act 8 of 2011
- Community Schemes Ombud Service (CSOS) Act
- Prescribed management and conduct rules
- CSOS dispute resolution
- Body corporate trustee obligations`,

    'landlord-dispute': `South Africa-specific regulations to check:
- Rental Housing Act 50 of 1999
- Consumer Protection Act 68 of 2008
- Rental Housing Tribunals by province
- PIE Act (Prevention of Illegal Eviction)
- Deposit requirements and trust account rules
- Minimum notice periods`,

    'bank-fee': `South Africa-specific regulations to check:
- National Credit Act 34 of 2005
- Banks Act 94 of 1990
- Ombudsman for Banking Services (OBS) complaints
- Code of Banking Practice (BASA)
- Financial Sector Conduct Authority (FSCA) requirements`,

    'airline-claim': `South Africa-specific regulations to check:
- Consumer Protection Act 68 of 2008
- Air services licensing regulations
- Montreal Convention for international flights
- National Consumer Commission complaints
- No specific EU261-style compensation regime`,

    'other': `South Africa-specific consumer protection regulations to check:
- Consumer Protection Act 68 of 2008 — unfair terms, right to fair value
- National Credit Act 34 of 2005 for credit-related documents
- In duplum rule (interest cannot exceed principal)
- National Consumer Commission complaints and enforcement
- Financial Sector Conduct Authority (FSCA) for financial products
- Consumer Goods and Services Ombud`,
  },
}
