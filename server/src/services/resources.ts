interface Resource {
  name: string
  description: string
  url: string
  type: 'government' | 'nonprofit' | 'ombudsman'
}

const resources: Record<string, Record<string, Resource[]>> = {
  US: {
    'medical-bill': [
      { name: 'CMS Medicare Fee Schedule', description: 'Look up standard Medicare rates for procedures', url: 'https://www.cms.gov/medicare/payment/fee-schedules', type: 'government' },
      { name: 'No Surprises Help Desk', description: 'File complaints about surprise medical bills', url: 'https://www.cms.gov/nosurprises', type: 'government' },
      { name: 'Patient Advocate Foundation', description: 'Free case management for patients with billing issues', url: 'https://www.patientadvocate.org', type: 'nonprofit' },
      { name: 'State Insurance Commissioner', description: 'File complaints about health insurance billing', url: 'https://content.naic.org/state-insurance-regulators', type: 'government' },
    ],
    'debt-collection': [
      { name: 'CFPB Complaint Portal', description: 'File complaints about debt collectors', url: 'https://www.consumerfinance.gov/complaint/', type: 'government' },
      { name: 'FTC Debt Collection', description: 'Know your rights under the FDCPA', url: 'https://www.ftc.gov/debt-collection', type: 'government' },
      { name: 'National Consumer Law Center', description: 'Consumer rights advocacy and resources', url: 'https://www.nclc.org', type: 'nonprofit' },
      { name: 'Legal Aid', description: 'Find free legal help in your area', url: 'https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help', type: 'nonprofit' },
    ],
    'insurance-denial': [
      { name: 'State Insurance Commissioner', description: 'File complaints and appeals about insurance denials', url: 'https://content.naic.org/state-insurance-regulators', type: 'government' },
      { name: 'CMS External Review', description: 'Request independent external review of denial', url: 'https://www.cms.gov/CCIIO/Resources/consumer-assistance-grants', type: 'government' },
      { name: 'Patient Advocate Foundation', description: 'Help navigating insurance appeals', url: 'https://www.patientadvocate.org', type: 'nonprofit' },
    ],
    'hoa-fine': [
      { name: 'State Attorney General', description: 'Consumer protection division handles HOA complaints', url: 'https://www.usa.gov/state-attorney-general', type: 'government' },
      { name: 'Community Associations Institute', description: 'Resources for homeowners in managed communities', url: 'https://www.caionline.org', type: 'nonprofit' },
    ],
    'landlord-dispute': [
      { name: 'HUD Fair Housing', description: 'File discrimination complaints', url: 'https://www.hud.gov/program_offices/fair_housing_equal_opp/online-complaint', type: 'government' },
      { name: 'Legal Aid', description: 'Find free legal help for tenant issues', url: 'https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help', type: 'nonprofit' },
      { name: 'State Tenant Rights', description: 'Know your rights by state', url: 'https://www.nolo.com/legal-encyclopedia/renters-rights', type: 'nonprofit' },
    ],
    'bank-fee': [
      { name: 'CFPB Complaint Portal', description: 'File complaints about bank fees', url: 'https://www.consumerfinance.gov/complaint/', type: 'government' },
      { name: 'OCC Customer Assistance', description: 'Complaints about national banks', url: 'https://www.occ.treas.gov/topics/consumers-and-communities/consumer-protection/index-consumer-protection.html', type: 'government' },
    ],
    'airline-claim': [
      { name: 'DOT Aviation Consumer', description: 'File airline complaints with the DOT', url: 'https://www.transportation.gov/airconsumer/file-consumer-complaint', type: 'government' },
      { name: 'DOT Airline Dashboards', description: 'Check airline commitment dashboards', url: 'https://www.transportation.gov/airconsumer/airline-customer-service-dashboard', type: 'government' },
    ],
  },

  GB: {
    'medical-bill': [
      { name: 'NHS Complaints', description: 'Complain about NHS services or charges', url: 'https://www.nhs.uk/using-the-nhs/about-the-nhs/how-to-complain-to-the-nhs/', type: 'government' },
      { name: 'Private Healthcare Information Network', description: 'Compare private healthcare costs', url: 'https://www.phin.org.uk', type: 'government' },
    ],
    'debt-collection': [
      { name: 'Financial Ombudsman Service', description: 'Free dispute resolution for financial complaints', url: 'https://www.financial-ombudsman.org.uk', type: 'ombudsman' },
      { name: 'Citizens Advice', description: 'Free advice on debt and consumer rights', url: 'https://www.citizensadvice.org.uk/debt-and-money/', type: 'nonprofit' },
      { name: 'StepChange Debt Charity', description: 'Free debt advice and management', url: 'https://www.stepchange.org', type: 'nonprofit' },
    ],
    'insurance-denial': [
      { name: 'Financial Ombudsman Service', description: 'Dispute insurance decisions for free', url: 'https://www.financial-ombudsman.org.uk', type: 'ombudsman' },
      { name: 'Citizens Advice', description: 'Insurance rights guidance', url: 'https://www.citizensadvice.org.uk/consumer/insurance/', type: 'nonprofit' },
    ],
    'hoa-fine': [
      { name: 'First-tier Tribunal (Property Chamber)', description: 'Dispute service charges and management issues', url: 'https://www.gov.uk/courts-tribunals/first-tier-tribunal-property-chamber', type: 'government' },
      { name: 'Leasehold Advisory Service', description: 'Free legal advice for leaseholders', url: 'https://www.lease-advice.org', type: 'nonprofit' },
    ],
    'landlord-dispute': [
      { name: 'Shelter', description: 'Housing advice and advocacy', url: 'https://www.shelter.org.uk', type: 'nonprofit' },
      { name: 'Citizens Advice', description: 'Free tenant rights advice', url: 'https://www.citizensadvice.org.uk/housing/', type: 'nonprofit' },
      { name: 'Housing Ombudsman', description: 'Resolve housing complaints', url: 'https://www.housing-ombudsman.org.uk', type: 'ombudsman' },
    ],
    'bank-fee': [
      { name: 'Financial Ombudsman Service', description: 'Dispute bank charges for free', url: 'https://www.financial-ombudsman.org.uk', type: 'ombudsman' },
      { name: 'FCA Consumer Help', description: 'Report issues to the financial regulator', url: 'https://www.fca.org.uk/consumers/how-complain', type: 'government' },
    ],
    'airline-claim': [
      { name: 'CAA Passenger Advice', description: 'UK aviation regulator passenger rights', url: 'https://www.caa.co.uk/passengers/', type: 'government' },
      { name: 'CEDR Aviation', description: 'Alternative dispute resolution for airlines', url: 'https://www.cedr.com/consumer/aviation/', type: 'ombudsman' },
    ],
  },

  AU: {
    'medical-bill': [
      { name: 'Health and Disability Complaints', description: 'State health complaint commissioners', url: 'https://www.health.gov.au', type: 'government' },
      { name: 'Private Health Insurance Ombudsman', description: 'Dispute private health insurance issues', url: 'https://www.ombudsman.gov.au/How-we-can-help/private-health-insurance', type: 'ombudsman' },
    ],
    'debt-collection': [
      { name: 'AFCA', description: 'Australian Financial Complaints Authority', url: 'https://www.afca.org.au', type: 'ombudsman' },
      { name: 'ACCC', description: 'Australian Competition and Consumer Commission', url: 'https://www.accc.gov.au/consumers', type: 'government' },
    ],
    'insurance-denial': [
      { name: 'AFCA', description: 'Dispute insurance decisions for free', url: 'https://www.afca.org.au', type: 'ombudsman' },
      { name: 'ASIC MoneySmart', description: 'Insurance rights information', url: 'https://moneysmart.gov.au/how-to-complain', type: 'government' },
    ],
    'hoa-fine': [
      { name: 'State Fair Trading', description: 'Strata and body corporate disputes by state', url: 'https://www.fairtrading.nsw.gov.au', type: 'government' },
    ],
    'landlord-dispute': [
      { name: 'State Tenancy Tribunal', description: 'Formal dispute resolution for tenancy issues', url: 'https://www.fairtrading.nsw.gov.au/housing-and-property/renting', type: 'government' },
      { name: 'Tenants Union', description: 'Free tenancy advice by state', url: 'https://www.tenants.org.au', type: 'nonprofit' },
    ],
    'bank-fee': [
      { name: 'AFCA', description: 'Dispute bank fees for free', url: 'https://www.afca.org.au', type: 'ombudsman' },
    ],
    'airline-claim': [
      { name: 'Airline Customer Advocate', description: 'Dispute resolution for airline complaints', url: 'https://www.airlinecustomeradvocate.com.au', type: 'ombudsman' },
      { name: 'ACCC', description: 'Consumer guarantee rights', url: 'https://www.accc.gov.au/consumers/buying-products-and-services/travel', type: 'government' },
    ],
  },

  CA: {
    'medical-bill': [
      { name: 'Provincial Health Ombudsman', description: 'Complaint about health billing in your province', url: 'https://www.canada.ca/en/health-canada.html', type: 'government' },
    ],
    'debt-collection': [
      { name: 'Provincial Consumer Affairs', description: 'File complaints about debt collectors', url: 'https://www.canada.ca/en/services/finance/consumer.html', type: 'government' },
      { name: 'Credit Counselling Canada', description: 'Free credit counselling services', url: 'https://creditcounsellingcanada.ca', type: 'nonprofit' },
    ],
    'insurance-denial': [
      { name: 'General Insurance OmbudService', description: 'Dispute insurance claims for free', url: 'https://www.giocanada.org', type: 'ombudsman' },
      { name: 'OLHI', description: 'Life and health insurance complaints', url: 'https://www.olhi.ca', type: 'ombudsman' },
    ],
    'hoa-fine': [
      { name: 'Provincial Condominium Authority', description: 'Dispute condo issues', url: 'https://www.condoauthorityontario.ca', type: 'government' },
    ],
    'landlord-dispute': [
      { name: 'Provincial Tenancy Board', description: 'Formal dispute resolution', url: 'https://tribunalsontario.ca/ltb/', type: 'government' },
    ],
    'bank-fee': [
      { name: 'FCAC', description: 'Financial Consumer Agency of Canada', url: 'https://www.canada.ca/en/financial-consumer-agency.html', type: 'government' },
      { name: 'OBSI', description: 'Banking Ombudsman', url: 'https://www.obsi.ca', type: 'ombudsman' },
    ],
    'airline-claim': [
      { name: 'CTA Air Travel Complaints', description: 'Canadian Transportation Agency', url: 'https://otc-cta.gc.ca/eng/air-travel-complaints', type: 'government' },
    ],
  },

  NZ: {
    'medical-bill': [
      { name: 'Health and Disability Commissioner', description: 'Complaints about health services', url: 'https://www.hdc.org.nz', type: 'ombudsman' },
    ],
    'debt-collection': [
      { name: 'Commerce Commission', description: 'Consumer protection enforcement', url: 'https://comcom.govt.nz', type: 'government' },
      { name: 'Citizens Advice Bureau NZ', description: 'Free consumer advice', url: 'https://www.cab.org.nz', type: 'nonprofit' },
    ],
    'insurance-denial': [
      { name: 'IFSO', description: 'Insurance & Financial Services Ombudsman', url: 'https://www.ifso.nz', type: 'ombudsman' },
    ],
    'hoa-fine': [
      { name: 'Tenancy Tribunal', description: 'Dispute resolution for unit title issues', url: 'https://www.tenancy.govt.nz', type: 'government' },
    ],
    'landlord-dispute': [
      { name: 'Tenancy Services', description: 'NZ Government tenancy dispute resolution', url: 'https://www.tenancy.govt.nz', type: 'government' },
      { name: 'Community Law', description: 'Free legal advice', url: 'https://communitylaw.org.nz', type: 'nonprofit' },
    ],
    'bank-fee': [
      { name: 'Banking Ombudsman', description: 'Dispute bank fees for free', url: 'https://www.bankomb.org.nz', type: 'ombudsman' },
    ],
    'airline-claim': [
      { name: 'Commerce Commission', description: 'Consumer guarantees for travel', url: 'https://comcom.govt.nz', type: 'government' },
    ],
  },

  IE: {
    'medical-bill': [
      { name: 'HSE Complaints', description: 'Complaints about health service charges', url: 'https://www2.hse.ie/services/your-service-your-say/', type: 'government' },
    ],
    'debt-collection': [
      { name: 'FSPO', description: 'Financial Services and Pensions Ombudsman', url: 'https://www.fspo.ie', type: 'ombudsman' },
      { name: 'MABS', description: 'Money Advice and Budgeting Service (free)', url: 'https://www.mabs.ie', type: 'nonprofit' },
    ],
    'insurance-denial': [
      { name: 'FSPO', description: 'Dispute insurance decisions for free', url: 'https://www.fspo.ie', type: 'ombudsman' },
    ],
    'hoa-fine': [
      { name: 'PSRA', description: 'Property Services Regulatory Authority', url: 'https://www.psr.ie', type: 'government' },
    ],
    'landlord-dispute': [
      { name: 'RTB', description: 'Residential Tenancies Board dispute resolution', url: 'https://www.rtb.ie', type: 'government' },
      { name: 'Threshold', description: 'Free housing advice', url: 'https://www.threshold.ie', type: 'nonprofit' },
    ],
    'bank-fee': [
      { name: 'FSPO', description: 'Dispute bank charges for free', url: 'https://www.fspo.ie', type: 'ombudsman' },
    ],
    'airline-claim': [
      { name: 'Commission for Aviation Regulation', description: 'EU261 complaints in Ireland', url: 'https://www.aviationreg.ie', type: 'government' },
    ],
  },

  ZA: {
    'medical-bill': [
      { name: 'Council for Medical Schemes', description: 'Complaints about medical scheme billing', url: 'https://www.medicalschemes.co.za', type: 'government' },
    ],
    'debt-collection': [
      { name: 'National Credit Regulator', description: 'Complaints about debt collectors', url: 'https://www.ncr.org.za', type: 'government' },
      { name: 'Council for Debt Collectors', description: 'Report unregistered or abusive collectors', url: 'https://www.cfdc.org.za', type: 'government' },
    ],
    'insurance-denial': [
      { name: 'Long-term Insurance Ombudsman', description: 'Dispute life/long-term insurance', url: 'https://www.ombud.co.za', type: 'ombudsman' },
      { name: 'Short-term Insurance Ombudsman', description: 'Dispute general insurance', url: 'https://www.osti.co.za', type: 'ombudsman' },
    ],
    'hoa-fine': [
      { name: 'CSOS', description: 'Community Schemes Ombud Service', url: 'https://www.csos.org.za', type: 'ombudsman' },
    ],
    'landlord-dispute': [
      { name: 'Rental Housing Tribunal', description: 'Free dispute resolution by province', url: 'https://www.gov.za/services/housing/rental-housing', type: 'government' },
    ],
    'bank-fee': [
      { name: 'Ombudsman for Banking Services', description: 'Dispute bank fees for free', url: 'https://www.obssa.co.za', type: 'ombudsman' },
    ],
    'airline-claim': [
      { name: 'National Consumer Commission', description: 'Consumer protection complaints', url: 'https://www.thencc.gov.za', type: 'government' },
    ],
  },
}

export function getResources(documentType: string, country: string): Resource[] {
  return resources[country]?.[documentType] || resources['US']?.[documentType] || []
}
