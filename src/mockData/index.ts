import {
  Department,
  Startup,
  Challenge,
  Application,
  Evaluation,
  Pilot,
  Milestone,
  KPI,
  Contract,
  Payment,
  Document,
  Expert,
  Risk,
  AuditEvent,
  ScaleUpDecision,
  StageInfo
} from '../types';

export const LIFECYCLE_STAGES: StageInfo[] = [
  {
    id: 'PROBLEM',
    label: 'Problem Definition',
    stepNumber: 1,
    description: 'Government departments identify operational bottlenecks and unmet public service challenges.'
  },
  {
    id: 'CHALLENGE',
    label: 'Outcome Challenge',
    stepNumber: 2,
    description: 'Problems converted into outcome-based open innovation procurement specifications.'
  },
  {
    id: 'STARTUP',
    label: 'Startup Discovery',
    stepNumber: 3,
    description: 'Automated screening & outreach matching verified DPIIT deep-tech startups.'
  },
  {
    id: 'EVALUATION',
    label: 'Expert Evaluation',
    stepNumber: 4,
    description: 'Independent expert panel (IIT / NIC / AIIMS) reviews technical viability & security.'
  },
  {
    id: 'PILOT',
    label: 'Sandbox / Pilot',
    stepNumber: 5,
    description: 'Controlled live operational trial with milestone-based PFMS escrow disbursement.'
  },
  {
    id: 'MEASUREMENT',
    label: 'KPI & Performance',
    stepNumber: 6,
    description: 'Continuous automated IoT telemetry tracking against baseline targets.'
  },
  {
    id: 'VALIDATION',
    label: 'Independent Validation',
    stepNumber: 7,
    description: 'Third-party auditor & ministry steering committee performance sign-off.'
  },
  {
    id: 'PROCUREMENT',
    label: 'Direct Procurement',
    stepNumber: 8,
    description: 'Fast-track transition to formal government procurement contract under GFR Rule 194.'
  },
  {
    id: 'SCALE',
    label: 'Cross-Dept Scale',
    stepNumber: 9,
    description: 'Deployment template replicated across sister state and central departments.'
  }
];

export const MOCK_DEPARTMENTS: Department[] = [
  {
    id: 'dept-101',
    name: 'Urban Development Department, Uttar Pradesh',
    code: 'UDD-UP',
    ministry: 'Government of Uttar Pradesh',
    leadOfficial: 'Dr. Rajesh Vardhan, IAS',
    email: 'r.vardhan.demo@up.gov.in',
    budgetAllocated: 150000000, // ₹15 Crore
    budgetUtilized: 68000000,   // ₹6.8 Crore
    activeChallengesCount: 8,
    activePilotsCount: 5,
    scaledSolutionsCount: 4
  },
  {
    id: 'dept-102',
    name: 'Ministry of Jal Shakti',
    code: 'JAL-SHAKTI',
    ministry: 'Government of India',
    leadOfficial: 'Smt. Ananya Sharma, IAS',
    email: 'a.sharma.demo@jalshakti.gov.in',
    budgetAllocated: 220000000, // ₹22 Crore
    budgetUtilized: 114000000,
    activeChallengesCount: 7,
    activePilotsCount: 6,
    scaledSolutionsCount: 5
  },
  {
    id: 'dept-103',
    name: 'Public Works Department, Karnataka',
    code: 'PWD-KAR',
    ministry: 'Government of Karnataka',
    leadOfficial: 'Shri Suresh Kumar, KAS',
    email: 's.kumar.demo@karnataka.gov.in',
    budgetAllocated: 120000000, // ₹12 Crore
    budgetUtilized: 45000000,
    activeChallengesCount: 6,
    activePilotsCount: 4,
    scaledSolutionsCount: 3
  },
  {
    id: 'dept-104',
    name: 'Department of Agriculture & Farmers Welfare, UP',
    code: 'AGRI-UP',
    ministry: 'Government of Uttar Pradesh',
    leadOfficial: 'Dr. Priya Nair',
    email: 'p.nair.demo@up.gov.in',
    budgetAllocated: 180000000, // ₹18 Crore
    budgetUtilized: 89000000,
    activeChallengesCount: 5,
    activePilotsCount: 4,
    scaledSolutionsCount: 3
  },
  {
    id: 'dept-105',
    name: 'Transport Department, Telangana',
    code: 'TRANS-TS',
    ministry: 'Government of Telangana',
    leadOfficial: 'Shri Arjun Mehta, IAS',
    email: 'a.mehta.demo@telangana.gov.in',
    budgetAllocated: 140000000, // ₹14 Crore
    budgetUtilized: 62000000,
    activeChallengesCount: 6,
    activePilotsCount: 4,
    scaledSolutionsCount: 2
  },
  {
    id: 'dept-106',
    name: 'Department of Administrative Reforms (DARPG)',
    code: 'DARPG',
    ministry: 'Ministry of Personnel, Public Grievances & Pensions',
    leadOfficial: 'Smt. Sneha Iyer, IAS',
    email: 's.iyer.demo@nic.in',
    budgetAllocated: 100000000, // ₹10 Crore
    budgetUtilized: 41000000,
    activeChallengesCount: 4,
    activePilotsCount: 3,
    scaledSolutionsCount: 2
  }
];

export const MOCK_STARTUPS: Startup[] = [
  {
    id: 'start-01',
    name: 'Aarohan AI Technologies Pvt. Ltd.',
    cinOrTaxId: 'U72900KA2021PTC381920',
    category: 'GovTech',
    dpiitRegistrationNumber: 'DPIIT-ST-98212',
    foundingYear: 2021,
    founderName: 'Vikramaditya Nair',
    email: 'founders.demo@aarohan.ai',
    phone: '+91 98XX XX4321',
    headquarters: 'Bengaluru, Karnataka',
    employeeCount: 42,
    readinessLevel: 'TRL-8',
    securityClearanceStatus: 'VERIFIED',
    pastGovContractsCount: 3,
    valuationFormatted: '₹14.2 Crore',
    description: 'AI-driven computer vision and sensor telemetry system for real-time urban optimization and civic management.',
    capabilities: ['Edge AI Video Analytics', 'Adaptive Traffic Controllers', 'Emergency Preemption', 'GeM Integrated Portal']
  },
  {
    id: 'start-02',
    name: 'BharatVision Labs',
    cinOrTaxId: 'U24299UP2020PTC345112',
    category: 'Waste Management',
    dpiitRegistrationNumber: 'DPIIT-ST-77144',
    foundingYear: 2020,
    founderName: 'Dr. Meera Kulkarni',
    email: 'info.demo@bharatvision.in',
    phone: '+91 98XX XX1122',
    headquarters: 'Noida, Uttar Pradesh',
    employeeCount: 28,
    readinessLevel: 'TRL-9',
    securityClearanceStatus: 'VERIFIED',
    pastGovContractsCount: 4,
    valuationFormatted: '₹18.5 Crore',
    description: 'Smart waste management sensors and AI route optimization algorithms tailored for municipal corporations.',
    capabilities: ['Bin Fill Sensor Swarms', 'Dynamic Route Optimization', 'Citizen Grievance Sync', 'IoT Telemetry']
  },
  {
    id: 'start-03',
    name: 'NexGen CivicTech Pvt. Ltd.',
    cinOrTaxId: 'U73100TS2022PTC410290',
    category: 'Water Management',
    dpiitRegistrationNumber: 'DPIIT-ST-104921',
    foundingYear: 2022,
    founderName: 'Rohan Deshmukh',
    email: 'contact.demo@nexgencivic.io',
    phone: '+91 97XX XX8899',
    headquarters: 'Hyderabad, Telangana',
    employeeCount: 36,
    readinessLevel: 'TRL-8',
    securityClearanceStatus: 'VERIFIED',
    pastGovContractsCount: 2,
    valuationFormatted: '₹9.8 Crore',
    description: 'Acoustic and pressure IoT sensor nodes for non-revenue water leakage detection in municipal pipelines.',
    capabilities: ['Pipeline Acoustic Leak Detection', 'Non-Revenue Water Audit', 'GIS Mapping Integration', 'SCADA Compatibility']
  },
  {
    id: 'start-04',
    name: 'Pragati Analytics',
    cinOrTaxId: 'U40106MH2021PTC398210',
    category: 'AgriTech',
    dpiitRegistrationNumber: 'DPIIT-ST-88201',
    foundingYear: 2021,
    founderName: 'Arjun Mehta',
    email: 'hello.demo@pragatianalytics.in',
    phone: '+91 99XX XX2233',
    headquarters: 'Pune, Maharashtra',
    employeeCount: 31,
    readinessLevel: 'TRL-7',
    securityClearanceStatus: 'VERIFIED',
    pastGovContractsCount: 1,
    valuationFormatted: '₹7.5 Crore',
    description: 'Hyper-local satellite imagery and AI crop advisory platform providing automated risk alerts to farmers.',
    capabilities: ['Satellite Crop Telemetry', 'Pest Risk Forecasting', 'Multi-Lingual Voice Advisory', 'Krishi Vigyan Kendra API']
  },
  {
    id: 'start-05',
    name: 'RoadSense Analytics Pvt. Ltd.',
    cinOrTaxId: 'U45201UP2019PTC290111',
    category: 'Mobility',
    dpiitRegistrationNumber: 'DPIIT-ST-55120',
    foundingYear: 2019,
    founderName: 'Sanjay Raman',
    email: 'contact.demo@roadsense.in',
    phone: '+91 94XX XX3321',
    headquarters: 'Lucknow, Uttar Pradesh',
    employeeCount: 58,
    readinessLevel: 'TRL-9',
    securityClearanceStatus: 'VERIFIED',
    pastGovContractsCount: 5,
    valuationFormatted: '₹22.0 Crore',
    description: 'Dashcam LiDAR and AI computer vision for automated road distress, pothole, and asset health detection.',
    capabilities: ['Pothole & Crack AI Vision', 'Automated PWD Work Orders', 'Road Quality Indexing', 'GIS Asset Mapping']
  },
  {
    id: 'start-06',
    name: 'CivicGrid Solutions',
    cinOrTaxId: 'U72200DL2020PTC360129',
    category: 'Cybersecurity',
    dpiitRegistrationNumber: 'DPIIT-ST-66902',
    foundingYear: 2020,
    founderName: 'Kavita Menon',
    email: 'sec.demo@civicgrid.gov.in',
    phone: '+91 98XX XX5544',
    headquarters: 'New Delhi',
    employeeCount: 65,
    readinessLevel: 'TRL-9',
    securityClearanceStatus: 'VERIFIED',
    pastGovContractsCount: 6,
    valuationFormatted: '₹31.0 Crore',
    description: 'NLP-driven automated classification and priority routing engine for national citizen grievance portals.',
    capabilities: ['Multilingual NLP Classification', 'Auto Grievance Routing', 'Sentiment Analytics', 'DARPG CPGRAMS API']
  }
];

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'ch-2026-01',
    code: 'CH-UP-UDD-01',
    title: 'AI-Based Urban Waste Collection Optimization',
    departmentId: 'dept-101',
    departmentName: 'Urban Development Department, Uttar Pradesh',
    problemStatement: 'Municipal waste collection vehicles in Lucknow experience inefficient routing and underutilized capacity, leading to missed pickup schedules and excessive fuel expenditure.',
    desiredOutcome: 'Reduce inefficient collection routes by 30%, improve vehicle capacity utilization, and establish real-time IoT bin fill monitoring.',
    sector: 'Waste Management',
    budgetCap: 2500000, // ₹25,00,000
    sandboxDurationMonths: 6,
    currentStage: 'PILOT',
    status: 'SANDBOX_ACTIVE',
    publishDate: '15 Jan 2026',
    submissionDeadline: '01 Mar 2026',
    eligibleStartupCriteria: [
      'DPIIT Recognized Startup',
      'Minimum TRL-7 solution',
      'GST & Udyam Registered',
      'Demonstrated 99.5% uptime in field trials'
    ],
    applicationsCount: 18,
    evaluationsCount: 15,
    activePilotId: 'pilot-301'
  },
  {
    id: 'ch-2026-02',
    code: 'CH-JAL-02',
    title: 'Smart Water Leakage Detection in Urban Distribution Networks',
    departmentId: 'dept-102',
    departmentName: 'Ministry of Jal Shakti',
    problemStatement: 'Urban water supply lines in Jaipur experience non-revenue water losses exceeding 35% due to undetected subterranean pipeline leakages.',
    desiredOutcome: 'Identify subterranean leakages within 2 meters precision and reduce non-revenue water loss to below 15%.',
    sector: 'Water Management',
    budgetCap: 4000000, // ₹40,00,000
    sandboxDurationMonths: 8,
    currentStage: 'MEASUREMENT',
    status: 'SANDBOX_ACTIVE',
    publishDate: '10 Nov 2025',
    submissionDeadline: '20 Dec 2025',
    eligibleStartupCriteria: [
      'DPIIT Recognition Certificate',
      'Acoustic or sensor-based non-destructive testing capability',
      'Compliance with BIS drinking water telemetry standards'
    ],
    applicationsCount: 22,
    evaluationsCount: 19,
    activePilotId: 'pilot-302'
  },
  {
    id: 'ch-2026-03',
    code: 'CH-PWD-03',
    title: 'AI-Based Road Condition & Pothole Monitoring',
    departmentId: 'dept-103',
    departmentName: 'Public Works Department, Karnataka',
    problemStatement: 'Manual road inspection in Bengaluru urban corridor is slow and reactive, delaying pothole repairs and causing traffic hazards.',
    desiredOutcome: 'Automated 3D vision road distress indexing, reducing defect identification time by 40% with automated PWD work order generation.',
    sector: 'Mobility',
    budgetCap: 3000000, // ₹30,00,000
    sandboxDurationMonths: 6,
    currentStage: 'VALIDATION',
    status: 'SANDBOX_ACTIVE',
    publishDate: '01 Sep 2025',
    submissionDeadline: '15 Oct 2025',
    eligibleStartupCriteria: [
      'Indian Roads Congress (IRC) test compliance',
      'GIS-mapped dashboard compatibility',
      'Local manufacturing component >60%'
    ],
    applicationsCount: 14,
    evaluationsCount: 14,
    activePilotId: 'pilot-303'
  },
  {
    id: 'ch-2026-04',
    code: 'CH-AGRI-04',
    title: 'Digital Crop Advisory Platform for Climate Resilience',
    departmentId: 'dept-104',
    departmentName: 'Department of Agriculture & Farmers Welfare, UP',
    problemStatement: 'Smallholder farmers in Eastern Uttar Pradesh suffer crop damage due to unseasonal rain and localized pest attacks without timely advisories.',
    desiredOutcome: 'Hyper-local satellite crop advisory delivered in Hindi voice prompts to 50,000+ registered farmers with 90%+ accuracy.',
    sector: 'AgriTech',
    budgetCap: 2000000, // ₹20,00,000
    sandboxDurationMonths: 6,
    currentStage: 'EVALUATION',
    status: 'EVALUATION',
    publishDate: '01 Feb 2026',
    submissionDeadline: '25 Mar 2026',
    eligibleStartupCriteria: [
      'DPIIT Recognition',
      'Multi-lingual Indian language NLP interface',
      'Integration capability with Krishi Vigyan Kendra data'
    ],
    applicationsCount: 16,
    evaluationsCount: 11
  },
  {
    id: 'ch-2026-05',
    code: 'CH-TRANS-05',
    title: 'Intelligent Public Transport Fleet & Passenger Monitoring',
    departmentId: 'dept-105',
    departmentName: 'Transport Department, Telangana',
    problemStatement: 'City buses in Hyderabad lack real-time passenger load tracking and predictive maintenance alerts, causing service gaps.',
    desiredOutcome: 'Improve bus fleet utilization by 25%, provide accurate live ETA to commuters via mobile app, and track driver behavior.',
    sector: 'Mobility',
    budgetCap: 5000000, // ₹50,00,000
    sandboxDurationMonths: 9,
    currentStage: 'PILOT',
    status: 'SANDBOX_ACTIVE',
    publishDate: '10 Apr 2025',
    submissionDeadline: '30 May 2025',
    eligibleStartupCriteria: [
      'AIS-140 GPS Compliance',
      'DPIIT Recognized Startup',
      'Proven hardware endurance under Indian ambient temperatures'
    ],
    applicationsCount: 21,
    evaluationsCount: 18,
    activePilotId: 'pilot-304'
  },
  {
    id: 'ch-2026-06',
    code: 'CH-DARPG-06',
    title: 'AI-Assisted Citizen Grievance Classification & Priority Routing',
    departmentId: 'dept-106',
    departmentName: 'Department of Administrative Reforms (DARPG)',
    problemStatement: 'CPGRAMS receives over 10,000 daily citizen grievances that require labor-intensive manual sorting, delaying resolution times.',
    desiredOutcome: 'Automated 95%+ accurate grievance classification across 22 scheduled Indian languages with auto-redirection to nodal officers.',
    sector: 'GovTech',
    budgetCap: 1500000, // ₹15,00,000
    sandboxDurationMonths: 4,
    currentStage: 'SCALE',
    status: 'SCALED',
    publishDate: '05 Jan 2026',
    submissionDeadline: '20 Feb 2026',
    eligibleStartupCriteria: [
      'ISO 27001 Cybersecurity Certification candidate',
      'Support for major Indian languages (Hindi, Tamil, Telugu, Bengali, Marathi, etc.)',
      'NIC Cloud Hosting compatibility'
    ],
    applicationsCount: 25,
    evaluationsCount: 25,
    activePilotId: 'pilot-305'
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-501',
    challengeId: 'ch-2026-01',
    challengeTitle: 'AI-Based Urban Waste Collection Optimization',
    startupId: 'start-02',
    startupName: 'BharatVision Labs',
    submissionDate: '20 Feb 2026',
    proposedSolution: 'Deployment of 150 ultrasonic bin fill sensors paired with real-time AI vehicle dispatch optimization across 8 municipal wards in Lucknow.',
    technicalArchitectureSummary: 'LoRaWAN sensor mesh transmitting telemetry to Lucknow Municipal Cloud server via encrypted MQTT protocol.',
    proposedBudget: 2450000, // ₹24,50,000
    sandboxTimelineDays: 180,
    status: 'SANDBOX_AWARDED',
    eligibilityScore: 96,
    expertAverageScore: 93,
    assignedExpertIds: ['exp-01', 'exp-02'],
    documents: [
      {
        id: 'doc-101',
        title: 'BharatVision Technical Proposal & Architecture v2.pdf',
        type: 'PITCH_DECK',
        fileSize: '4.8 MB',
        uploadDate: '20 Feb 2026',
        verificationStatus: 'VERIFIED'
      },
      {
        id: 'doc-102',
        title: 'DPIIT Recognition Certificate & GST Registration.pdf',
        type: 'SECURITY_AUDIT',
        fileSize: '2.1 MB',
        uploadDate: '20 Feb 2026',
        verificationStatus: 'VERIFIED'
      }
    ]
  },
  {
    id: 'app-502',
    challengeId: 'ch-2026-02',
    challengeTitle: 'Smart Water Leakage Detection in Urban Distribution Networks',
    startupId: 'start-03',
    startupName: 'NexGen CivicTech Pvt. Ltd.',
    submissionDate: '15 Dec 2025',
    proposedSolution: 'Installation of 40 acoustic hydrophone nodes across Jaipur Zone-4 distribution main pipelines for 24x7 pressure & leak telemetry.',
    technicalArchitectureSummary: 'Edge processing acoustic analyzer with cellular IoT transmission and GIS map visualization.',
    proposedBudget: 3850000, // ₹38,50,000
    sandboxTimelineDays: 240,
    status: 'SANDBOX_AWARDED',
    eligibilityScore: 94,
    expertAverageScore: 91,
    assignedExpertIds: ['exp-03', 'exp-04'],
    documents: [
      {
        id: 'doc-201',
        title: 'NexGen Water Audit & Acoustic Calibration Report.pdf',
        type: 'PITCH_DECK',
        fileSize: '5.6 MB',
        uploadDate: '15 Dec 2025',
        verificationStatus: 'VERIFIED'
      }
    ]
  },
  {
    id: 'app-503',
    challengeId: 'ch-2026-03',
    challengeTitle: 'AI-Based Road Condition & Pothole Monitoring',
    startupId: 'start-05',
    startupName: 'RoadSense Analytics Pvt. Ltd.',
    submissionDate: '10 Oct 2025',
    proposedSolution: 'AI dashcam sensor suite mounted on municipal inspection vehicles covering 250 km of Bengaluru urban roads daily.',
    technicalArchitectureSummary: 'NVIDIA Orin Nano edge inference vision node calculating Pavement Condition Index (PCI) in real time.',
    proposedBudget: 2800000, // ₹28,00,000
    sandboxTimelineDays: 180,
    status: 'SANDBOX_AWARDED',
    eligibilityScore: 98,
    expertAverageScore: 95,
    assignedExpertIds: ['exp-01', 'exp-03'],
    documents: [
      {
        id: 'doc-301',
        title: 'RoadSense IRC Test Certificate & PWD Architecture.pdf',
        type: 'PITCH_DECK',
        fileSize: '6.4 MB',
        uploadDate: '10 Oct 2025',
        verificationStatus: 'VERIFIED'
      }
    ]
  }
];

export const MOCK_EVALUATIONS: Evaluation[] = [
  {
    id: 'eval-701',
    applicationId: 'app-501',
    challengeId: 'ch-2026-01',
    expertId: 'exp-01',
    expertName: 'Prof. Anand R. Swaminathan',
    expertDesignation: 'Chair, Intelligent Transportation Systems, IIT Delhi',
    evaluationDate: '25 Feb 2026',
    status: 'COMPLETED',
    totalScore: 93,
    overallComments: 'Exceptional field feasibility. Sensor battery life (3+ years) and LoRaWAN mesh connectivity verified for Indian urban environments.',
    recommendation: 'APPROVE_FOR_SANDBOX',
    criteriaScores: [
      { id: 'c1', name: 'Technical Innovation & Architecture', maxScore: 30, givenScore: 29, comments: 'Well-designed low-power sensor hardware.' },
      { id: 'c2', name: 'Field Deployability & Indian Conditions', maxScore: 25, givenScore: 23, comments: 'IP68 enclosure withstands high monsoon humidity.' },
      { id: 'c3', name: 'Financial Realism & Cost Benefit', maxScore: 25, givenScore: 23, comments: 'Cost per bin is 40% lower than imported European alternatives.' },
      { id: 'c4', name: 'Cybersecurity & Data Sovereignty', maxScore: 20, givenScore: 18, comments: 'Compliant with MeitY cloud hosting guidelines.' }
    ]
  },
  {
    id: 'eval-702',
    applicationId: 'app-502',
    challengeId: 'ch-2026-02',
    expertId: 'exp-03',
    expertName: 'Dr. Sunita Deshmukh',
    expertDesignation: 'Director of Healthcare Informatics, AIIMS New Delhi',
    evaluationDate: '28 Dec 2025',
    status: 'COMPLETED',
    totalScore: 91,
    overallComments: 'High impact potential for urban water governance. Acoustic telemetry accurately pinpointed underground test leaks during benchmarks.',
    recommendation: 'APPROVE_FOR_SANDBOX',
    criteriaScores: [
      { id: 'c1', name: 'Acoustic Accuracy & Validation', maxScore: 30, givenScore: 28, comments: 'Sensitivity matches standard leak detection baselines.' },
      { id: 'c2', name: 'Ease of Field Installation', maxScore: 25, givenScore: 24, comments: 'Non-invasive clamp-on sensor design.' },
      { id: 'c3', name: 'Data Security & Privacy', maxScore: 25, givenScore: 22, comments: 'On-device AES-256 encryption.' },
      { id: 'c4', name: 'Scale Sustainability', maxScore: 20, givenScore: 17, comments: 'Modular deployment model across municipal zones.' }
    ]
  }
];

export const MOCK_PILOTS: Pilot[] = [
  {
    id: 'pilot-301',
    code: 'PLT-UP-UDD-2026-01',
    challengeId: 'ch-2026-01',
    challengeTitle: 'AI-Based Urban Waste Collection Optimization',
    startupId: 'start-02',
    startupName: 'BharatVision Labs',
    departmentId: 'dept-101',
    departmentName: 'Urban Development Department, Uttar Pradesh',
    startDate: '01 Mar 2026',
    endDate: '31 Aug 2026',
    status: 'ACTIVE',
    allocatedBudget: 2500000, // ₹25,00,000
    disbursedAmount: 1250000, // 50% disbursed
    overallSuccessRate: 94,
    independentValidatorName: 'National Institute of Urban Affairs (NIUA)',
    independentValidationStatus: 'IN_PROGRESS',
    testbedLocation: 'Lucknow Municipal Wards 12-19 (Lucknow District, UP, India)',
    kpiStatus: 'ON_TRACK',
    riskStatus: 'LOW',
    progressPercentage: 65,
    totalBudget: 2500000,
    spentBudget: 1250000,
    kpis: [
      {
        id: 'kpi-1',
        pilotId: 'pilot-301',
        metricName: 'Reduction in Inefficient Collection Routes',
        unit: '% reduction',
        baselineValue: 0,
        targetValue: 30,
        achievedValue: 32.4,
        status: 'EXCEEDS_TARGET',
        verifiedByValidator: true
      },
      {
        id: 'kpi-2',
        pilotId: 'pilot-301',
        metricName: 'Vehicle Capacity Utilization Improvement',
        unit: '% improvement',
        baselineValue: 55,
        targetValue: 85,
        achievedValue: 88.2,
        status: 'EXCEEDS_TARGET',
        verifiedByValidator: true
      },
      {
        id: 'kpi-3',
        pilotId: 'pilot-301',
        metricName: 'Sensor Telemetry Uptime',
        unit: '% uptime',
        baselineValue: 0,
        targetValue: 99.5,
        achievedValue: 99.8,
        status: 'MEETS_TARGET',
        verifiedByValidator: true
      }
    ],
    milestones: [
      {
        id: 'ms-101',
        pilotId: 'pilot-301',
        title: 'Milestone 1 — Prototype & Sensor Commissioning',
        description: 'Deploy 150 bin sensors across Ward 12-19 and verify IoT cloud gateway transmission.',
        dueDate: '31 Mar 2026',
        payoutPercentage: 20,
        payoutAmount: 500000, // ₹5,00,000
        status: 'DISBURSED',
        deliverables: ['Commissioning Verification Log', 'Telemetry Map', 'GeM Registration Proof'],
        verificationDate: '02 Apr 2026',
        verifiedBy: 'Er. R. K. Sharma (NIUA Independent Auditor)'
      },
      {
        id: 'ms-102',
        pilotId: 'pilot-301',
        title: 'Milestone 2 — Field Deployment & AI Route Optimization',
        description: 'Demonstrate live dynamic dispatching across all municipal collection trucks for 60 days.',
        dueDate: '15 May 2026',
        payoutPercentage: 30,
        payoutAmount: 750000, // ₹7,50,000
        status: 'DISBURSED',
        deliverables: ['60-Day Route Optimization Audit Log', 'Fuel Consumption Savings Report'],
        verificationDate: '18 May 2026',
        verifiedBy: 'Er. R. K. Sharma'
      },
      {
        id: 'ms-103',
        pilotId: 'pilot-301',
        title: 'Milestone 3 — Performance Testing & Audit Signoff',
        description: 'Third-party NIUA verification of >30% route efficiency improvement.',
        dueDate: '15 Jul 2026',
        payoutPercentage: 20,
        payoutAmount: 500000, // ₹5,00,000
        status: 'UNDER_VERIFICATION',
        deliverables: ['NIUA Certified Performance Audit Report', 'Citizen Grievance Resolution Summary'],
        submissionNotes: 'All 90-day telemetry uploaded. Efficiency gain certified at 32.4%.'
      },
      {
        id: 'ms-104',
        pilotId: 'pilot-301',
        title: 'Milestone 4 — Final Validation & Scale Template',
        description: 'Deliver final scaling blueprint for state-wide UP rollout.',
        dueDate: '31 Aug 2026',
        payoutPercentage: 30,
        payoutAmount: 750000, // ₹7,50,000
        status: 'PENDING',
        deliverables: ['State Scale Blueprint', 'GeM Procurement Template']
      }
    ]
  },
  {
    id: 'pilot-302',
    code: 'PLT-JAL-2025-08',
    challengeId: 'ch-2026-02',
    challengeTitle: 'Smart Water Leakage Detection in Urban Distribution Networks',
    startupId: 'start-03',
    startupName: 'NexGen CivicTech Pvt. Ltd.',
    departmentId: 'dept-102',
    departmentName: 'Ministry of Jal Shakti',
    startDate: '01 Jan 2026',
    endDate: '30 Aug 2026',
    status: 'MEASUREMENT_PHASE',
    allocatedBudget: 4000000, // ₹40,00,000
    disbursedAmount: 2800000,
    overallSuccessRate: 96,
    independentValidatorName: 'National Environmental Engineering Research Institute (NEERI)',
    independentValidationStatus: 'VERIFIED',
    testbedLocation: 'Jaipur Zone-4 Distribution Network (Jaipur District, Rajasthan, India)',
    kpiStatus: 'ON_TRACK',
    riskStatus: 'LOW',
    progressPercentage: 80,
    totalBudget: 4000000,
    spentBudget: 2800000,
    kpis: [
      {
        id: 'kpi-4',
        pilotId: 'pilot-302',
        metricName: 'Non-Revenue Water Loss Reduction',
        unit: '% loss level',
        baselineValue: 36.0,
        targetValue: 15.0,
        achievedValue: 12.8,
        status: 'EXCEEDS_TARGET',
        verifiedByValidator: true
      }
    ],
    milestones: [
      {
        id: 'ms-201',
        pilotId: 'pilot-302',
        title: 'M1: Acoustic Sensor Swarm Installation',
        description: 'Deploy 40 hydrophone nodes across primary pipeline mains.',
        dueDate: '15 Feb 2026',
        payoutPercentage: 40,
        payoutAmount: 1600000, // ₹16,00,000
        status: 'DISBURSED',
        deliverables: ['Sensor Deployment Certificates', 'GIS Mapping Log'],
        verificationDate: '18 Feb 2026',
        verifiedBy: 'Dr. Vivek Menon (NEERI Senior Scientist)'
      },
      {
        id: 'ms-202',
        pilotId: 'pilot-302',
        title: 'M2: 120-Day Leak Detection Verification',
        description: 'Pinpoint underground leakages within 2 meters precision.',
        dueDate: '30 May 2026',
        payoutPercentage: 30,
        payoutAmount: 1200000, // ₹12,00,000
        status: 'DISBURSED',
        deliverables: ['NEERI Leakage Audit Certificate', 'Repair Verification Log'],
        verificationDate: '05 Jun 2026',
        verifiedBy: 'Dr. Vivek Menon'
      },
      {
        id: 'ms-203',
        pilotId: 'pilot-302',
        title: 'M3: State Water Portal API Integration',
        description: 'Integrate real-time SCADA telemetry with Jal Jeevan Mission dashboard.',
        dueDate: '30 Aug 2026',
        payoutPercentage: 30,
        payoutAmount: 1200000, // ₹12,00,000
        status: 'PENDING',
        deliverables: ['API Interoperability Certificate', 'Final Water Audit Report']
      }
    ]
  },
  {
    id: 'pilot-303',
    code: 'PLT-PWD-2025-09',
    challengeId: 'ch-2026-03',
    challengeTitle: 'AI-Based Road Condition & Pothole Monitoring',
    startupId: 'start-05',
    startupName: 'RoadSense Analytics Pvt. Ltd.',
    departmentId: 'dept-103',
    departmentName: 'Public Works Department, Karnataka',
    startDate: '01 Nov 2025',
    endDate: '01 May 2026',
    status: 'VALIDATED',
    allocatedBudget: 3000000, // ₹30,00,000
    disbursedAmount: 3000000,
    overallSuccessRate: 98,
    independentValidatorName: 'Central Road Research Institute (CRRI)',
    independentValidationStatus: 'VERIFIED',
    testbedLocation: 'Bengaluru Outer Ring Road Corridor (Bengaluru Urban, Karnataka, India)',
    kpiStatus: 'ON_TRACK',
    riskStatus: 'LOW',
    progressPercentage: 100,
    totalBudget: 3000000,
    spentBudget: 3000000,
    kpis: [
      {
        id: 'kpi-6',
        pilotId: 'pilot-303',
        metricName: 'Pothole Identification Time Reduction',
        unit: '% faster',
        baselineValue: 0,
        targetValue: 40,
        achievedValue: 54.2,
        status: 'EXCEEDS_TARGET',
        verifiedByValidator: true
      }
    ],
    milestones: [
      {
        id: 'ms-301',
        pilotId: 'pilot-303',
        title: 'M1: Hardware Mounting & PWD Map Calibration',
        description: 'Equip 10 inspection vehicles with AI vision nodes.',
        dueDate: '15 Dec 2025',
        payoutPercentage: 50,
        payoutAmount: 1500000, // ₹15,00,000
        status: 'DISBURSED',
        deliverables: ['Vehicle Mounting Logs', 'CRRI Calibration Certificate'],
        verificationDate: '20 Dec 2025',
        verifiedBy: 'CRRI Principal Auditor'
      },
      {
        id: 'ms-302',
        pilotId: 'pilot-303',
        title: 'M2: 90-Day Full Corridor Inspection & Work Order Sync',
        description: 'Inspect 250 km daily and auto-generate PWD maintenance work orders.',
        dueDate: '15 Mar 2026',
        payoutPercentage: 50,
        payoutAmount: 1500000, // ₹15,00,000
        status: 'DISBURSED',
        deliverables: ['90-Day Road Quality Audit', 'CRRI Final Certificate'],
        verificationDate: '18 Mar 2026',
        verifiedBy: 'CRRI Principal Auditor'
      }
    ]
  }
];

export const MOCK_EXPERTS: Expert[] = [
  {
    id: 'exp-01',
    name: 'Prof. Anand R. Swaminathan',
    designation: 'Chair of Intelligent Transportation Systems',
    institution: 'IIT Delhi',
    department: 'Smart Mobility & AI',
    email: 'a.swaminathan.demo@iitd.ac.in',
    domainSpecialization: ['Edge AI Systems', 'Traffic Engineering', 'IoT Sensors'],
    evaluationsCompletedCount: 22,
    pendingEvaluationsCount: 2,
    rating: 4.9,
    clearanceLevel: 'LEVEL_3'
  },
  {
    id: 'exp-02',
    name: 'Smt. Radhika Merchant',
    designation: 'Chief Cyber Risk Auditor',
    institution: 'National Informatics Centre (NIC)',
    department: 'Cybersecurity & Infrastructure',
    email: 'r.merchant.demo@nic.in',
    domainSpecialization: ['Critical Infrastructure Security', 'Zero Trust', 'IoT Firmware'],
    evaluationsCompletedCount: 28,
    pendingEvaluationsCount: 1,
    rating: 4.8,
    clearanceLevel: 'LEVEL_3'
  },
  {
    id: 'exp-03',
    name: 'Dr. Sunita Deshmukh',
    designation: 'Director of Healthcare & AI Informatics',
    institution: 'AIIMS New Delhi',
    department: 'Healthtech & Medical Systems',
    email: 's.deshmukh.demo@aiims.edu',
    domainSpecialization: ['Medical Diagnostics', 'Telemedicine Protocols', 'DISHA Data Standards'],
    evaluationsCompletedCount: 19,
    pendingEvaluationsCount: 3,
    rating: 4.9,
    clearanceLevel: 'LEVEL_2'
  },
  {
    id: 'exp-04',
    name: 'Dr. Vikramaditya Sen',
    designation: 'Senior Fellow in Public Procurement Policy',
    institution: 'NITI Aayog Policy Cell',
    department: 'Governance & Sandbox Policy',
    email: 'v.sen.demo@niti.gov.in',
    domainSpecialization: ['GFR Rule 194 Sandbox Rules', 'IP Rights Protection', 'GeM Integration'],
    evaluationsCompletedCount: 35,
    pendingEvaluationsCount: 2,
    rating: 5.0,
    clearanceLevel: 'LEVEL_3'
  }
];

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: 'cnt-1001',
    contractNumber: 'GOV-PROC-2026-UP-UDD-004',
    challengeId: 'ch-2026-01',
    startupId: 'start-02',
    startupName: 'BharatVision Labs',
    departmentId: 'dept-101',
    departmentName: 'Urban Development Department, Uttar Pradesh',
    contractType: 'SANDBOX_TRIAL',
    totalContractValue: 2500000, // ₹25,00,000
    effectiveDate: '01 Mar 2026',
    expiryDate: '31 Aug 2026',
    status: 'ACTIVE',
    clauses: [
      'Clause 4.2: Milestone disbursement subject to NIUA independent auditor verification via PFMS within 10 business days.',
      'Clause 8.1: Startup retains underlying AI IP; Department receives perpetual royalty-free municipal operational license.',
      'Clause 12.3: Fast-track direct procurement conversion eligible under GFR Rule 194 if pilot achieves >30% route optimization.'
    ]
  },
  {
    id: 'cnt-1002',
    contractNumber: 'GOV-PROC-2025-JAL-019',
    challengeId: 'ch-2026-02',
    startupId: 'start-03',
    startupName: 'NexGen CivicTech Pvt. Ltd.',
    departmentId: 'dept-102',
    departmentName: 'Ministry of Jal Shakti',
    contractType: 'SANDBOX_TRIAL',
    totalContractValue: 4000000, // ₹40,00,000
    effectiveDate: '01 Jan 2026',
    expiryDate: '30 Aug 2026',
    status: 'ACTIVE',
    clauses: [
      'Clause 3.1: Strict patient and municipal telemetry data sovereignty - hosted on NIC / MeitY empaneled cloud.',
      'Clause 9.4: NEERI validation required prior to final 30% milestone release.'
    ]
  },
  {
    id: 'cnt-1003',
    contractNumber: 'GOV-PROC-2025-PWD-SCALE-002',
    challengeId: 'ch-2026-03',
    startupId: 'start-05',
    startupName: 'RoadSense Analytics Pvt. Ltd.',
    departmentId: 'dept-103',
    departmentName: 'Public Works Department, Karnataka',
    contractType: 'MULTI_YEAR_SCALE_UP',
    totalContractValue: 28000000, // ₹2.8 Crore
    effectiveDate: '01 Oct 2025',
    expiryDate: '30 Sep 2028',
    status: 'EXECUTED',
    clauses: [
      'Multi-year deployment covering 1,200 km of state highway corridors in Karnataka.',
      'Quarterly road quality index telemetry reporting and SLA guarantee of 24-hour pothole defect notification.'
    ]
  }
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'pay-901',
    transactionRef: 'PFMS-TRX-20260402-88192',
    pilotId: 'pilot-301',
    milestoneId: 'ms-101',
    startupName: 'BharatVision Labs',
    departmentName: 'Urban Development Department, Uttar Pradesh',
    amount: 500000, // ₹5,00,000
    disbursementDate: '03 Apr 2026',
    paymentGatewayStatus: 'SUCCESS',
    approvalChain: [
      { role: 'Independent Auditor (NIUA)', approved: true, timestamp: '02 Apr 2026 10:15 AM' },
      { role: 'Department Financial Advisor (UP)', approved: true, timestamp: '02 Apr 2026 02:40 PM' },
      { role: 'Treasury Nodal Officer (PFMS)', approved: true, timestamp: '03 Apr 2026 09:10 AM' }
    ]
  },
  {
    id: 'pay-902',
    transactionRef: 'PFMS-TRX-20260518-11029',
    pilotId: 'pilot-301',
    milestoneId: 'ms-102',
    startupName: 'BharatVision Labs',
    departmentName: 'Urban Development Department, Uttar Pradesh',
    amount: 750000, // ₹7,50,000
    disbursementDate: '19 May 2026',
    paymentGatewayStatus: 'SUCCESS',
    approvalChain: [
      { role: 'Independent Auditor (NIUA)', approved: true, timestamp: '18 May 2026 11:00 AM' },
      { role: 'Department Nodal Officer', approved: true, timestamp: '18 May 2026 04:20 PM' }
    ]
  },
  {
    id: 'pay-903',
    transactionRef: 'PFMS-TRX-ESCROW-20260716',
    pilotId: 'pilot-301',
    milestoneId: 'ms-103',
    startupName: 'BharatVision Labs',
    departmentName: 'Urban Development Department, Uttar Pradesh',
    amount: 500000, // ₹5,00,000
    disbursementDate: '16 Jul 2026 (Scheduled)',
    paymentGatewayStatus: 'ESCROW_HELD',
    approvalChain: [
      { role: 'Independent Auditor (NIUA)', approved: true, timestamp: '15 Jul 2026 05:00 PM' },
      { role: 'Department Financial Advisor', approved: false, timestamp: 'Pending Verification Signoff' }
    ]
  }
];

export const MOCK_RISKS: Risk[] = [
  {
    id: 'risk-01',
    entityType: 'PILOT',
    entityId: 'pilot-301',
    entityName: 'BharatVision Waste Collection Sandbox',
    category: 'CYBERSECURITY',
    severity: 'MEDIUM',
    description: 'Potential vector for unauthorized telemetry interference if edge LoRaWAN gateway credentials are exposed during field maintenance.',
    mitigationPlan: 'Enforce hardware TPM 2.0 cryptographic chip keys and daily automated key rotation on NIC cloud gateway.',
    ownerDepartment: 'Urban Development Department, Uttar Pradesh',
    status: 'MITIGATING'
  },
  {
    id: 'risk-02',
    entityType: 'PILOT',
    entityId: 'pilot-302',
    entityName: 'NexGen Water Leakage Detection Sandbox',
    category: 'LEGAL_COMPLIANCE',
    severity: 'LOW',
    description: 'Municipal pipeline access permission coordination across local municipal ward engineers.',
    mitigationPlan: 'Issued centralized nodal order from Ministry of Jal Shakti to Jaipur Municipal Corporation.',
    ownerDepartment: 'Ministry of Jal Shakti',
    status: 'RESOLVED'
  }
];

export const MOCK_SCALE_UP_DECISIONS: ScaleUpDecision[] = [
  {
    id: 'scale-801',
    pilotId: 'pilot-303',
    challengeTitle: 'AI-Based Road Condition & Pothole Monitoring',
    startupName: 'RoadSense Analytics Pvt. Ltd.',
    originDepartment: 'Public Works Department, Karnataka',
    recommendationDate: '20 Mar 2026',
    status: 'APPROVED_FOR_DIRECT_PROCUREMENT',
    independentScore: 98,
    projectedAnnualSavings: 125000000, // ₹12.5 Crore saved annually in road maintenance
    replicateDepartments: [
      'National Highways Authority of India (NHAI)',
      'Public Works Department, Uttar Pradesh',
      'Public Works Department, Maharashtra'
    ]
  },
  {
    id: 'scale-802',
    pilotId: 'pilot-305',
    challengeTitle: 'AI-Assisted Citizen Grievance Classification & Priority Routing',
    startupName: 'CivicGrid Solutions',
    originDepartment: 'Department of Administrative Reforms (DARPG)',
    recommendationDate: '15 Sep 2025',
    status: 'CROSS_DEPARTMENT_EXPANSION',
    independentScore: 96,
    projectedAnnualSavings: 42000000, // ₹4.2 Crore annual administrative savings
    replicateDepartments: [
      'Government of Uttar Pradesh Grievance Cell',
      'Government of Maharashtra e-Seva Portal',
      'Government of Rajasthan Jan Soochna Portal'
    ]
  }
];

export const MOCK_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'aud-9901',
    timestamp: '25 Sep 2026 14:32:10 UTC',
    actorName: 'Dr. Rajesh Vardhan, IAS',
    actorRole: 'GOVERNMENT',
    action: 'APPROVED_SANDBOX_MILESTONE_RELEASE',
    targetEntity: 'Milestone MS-101 (BharatVision Labs)',
    ipAddress: '10.204.14.89 (NIC GovNet VPN)',
    blockchainHash: '0x8f3a9b1c2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0'
  },
  {
    id: 'aud-9902',
    timestamp: '25 Sep 2026 11:18:45 UTC',
    actorName: 'Prof. Anand R. Swaminathan',
    actorRole: 'EXPERT',
    action: 'SUBMITTED_TECHNICAL_EVALUATION',
    targetEntity: 'Application APP-501 (BharatVision Labs)',
    ipAddress: '14.139.45.12 (IIT Delhi Node)',
    blockchainHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2'
  },
  {
    id: 'aud-9903',
    timestamp: '24 Sep 2026 16:05:00 UTC',
    actorName: 'Smt. Radhika Merchant',
    actorRole: 'ADMIN',
    action: 'REGISTERED_NEW_EXPERT_PANELIST',
    targetEntity: 'Expert EXP-04 (Dr. Vikramaditya Sen)',
    ipAddress: '10.200.1.12 (NIC Data Center New Delhi)',
    blockchainHash: '0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8'
  },
  {
    id: 'aud-9904',
    timestamp: '23 Sep 2026 09:40:22 UTC',
    actorName: 'Vikramaditya Nair',
    actorRole: 'STARTUP',
    action: 'SUBMITTED_MILESTONE_DELIVERABLES',
    targetEntity: 'Milestone MS-102 (Route Optimization Telemetry Log)',
    ipAddress: '49.207.210.4 (Bengaluru Fiber)',
    blockchainHash: '0x4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5'
  }
];
