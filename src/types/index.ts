/**
 * Core Data Entities & System Types for GovInnovate Procurement Platform
 */

export type UserRole = 'PUBLIC' | 'GOVERNMENT' | 'STARTUP' | 'EXPERT' | 'ADMIN';

export type LifecycleStage = 
  | 'PROBLEM' 
  | 'CHALLENGE' 
  | 'STARTUP' 
  | 'EVALUATION' 
  | 'PILOT' 
  | 'MEASUREMENT' 
  | 'VALIDATION' 
  | 'PROCUREMENT' 
  | 'SCALE';

export interface StageInfo {
  id: LifecycleStage;
  label: string;
  stepNumber: number;
  description: string;
  countKey?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  ministry: string;
  leadOfficial: string;
  email: string;
  budgetAllocated: number;
  budgetUtilized: number;
  activeChallengesCount: number;
  activePilotsCount: number;
  scaledSolutionsCount: number;
}

export type StartupCategory = 
  | 'CleanTech' 
  | 'HealthTech' 
  | 'SmartMobility' 
  | 'Mobility' 
  | 'GovTech' 
  | 'AgriTech' 
  | 'CyberSecurity' 
  | 'Cybersecurity' 
  | 'Waste Management' 
  | 'Water Management' 
  | 'Clean Water' 
  | (string & {});

export interface Startup {
  id: string;
  name: string;
  cinOrTaxId: string;
  category: StartupCategory;
  dpiitRegistrationNumber: string;
  foundingYear: number;
  founderName: string;
  email: string;
  phone: string;
  headquarters: string;
  employeeCount: number;
  readinessLevel: 'TRL-6' | 'TRL-7' | 'TRL-8' | 'TRL-9';
  securityClearanceStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  pastGovContractsCount: number;
  valuationFormatted: string;
  description: string;
  capabilities: string[];
}

export type ChallengeStatus = 
  | 'DRAFT' 
  | 'UNDER_REVIEW' 
  | 'OPEN' 
  | 'SCREENING' 
  | 'EVALUATION' 
  | 'SHORTLISTED' 
  | 'SANDBOX_ACTIVE' 
  | 'SCALED' 
  | 'CLOSED';

export interface Challenge {
  id: string;
  code: string;
  title: string;
  departmentId: string;
  departmentName: string;
  problemStatement: string;
  desiredOutcome: string;
  sector: string;
  budgetCap: number;
  sandboxDurationMonths: number;
  currentStage: LifecycleStage;
  status: ChallengeStatus;
  publishDate: string;
  submissionDeadline: string;
  eligibleStartupCriteria: string[];
  applicationsCount: number;
  evaluationsCount: number;
  activePilotId?: string;
}

export type ApplicationStatus = 
  | 'SUBMITTED' 
  | 'ELIGIBILITY_PASSED' 
  | 'ELIGIBILITY_FAILED' 
  | 'EXPERT_EVALUATION' 
  | 'SHORTLISTED' 
  | 'REJECTED' 
  | 'SANDBOX_AWARDED';

export interface Application {
  id: string;
  challengeId: string;
  challengeTitle: string;
  startupId: string;
  startupName: string;
  submissionDate: string;
  proposedSolution: string;
  technicalArchitectureSummary: string;
  proposedBudget: number;
  sandboxTimelineDays: number;
  status: ApplicationStatus;
  eligibilityScore: number; // out of 100
  expertAverageScore?: number; // out of 100
  documents: Document[];
  assignedExpertIds: string[];
}

export interface EvaluationCriterion {
  id?: string;
  name: string;
  maxScore: number;
  givenScore: number;
  comments: string;
  criterion?: string;
  score?: number;
  weightPct?: number;
  comment?: string;
}

export interface Evaluation {
  id: string;
  applicationId: string;
  challengeId: string;
  expertId: string;
  expertName: string;
  expertDesignation: string;
  evaluationDate: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  totalScore: number; // out of 100
  criteriaScores: EvaluationCriterion[];
  overallComments: string;
  recommendation: 'APPROVE_FOR_SANDBOX' | 'REJECT' | 'REQUEST_MODIFICATION';
}

export type PilotStatus = 
  | 'SETUP' 
  | 'ACTIVE' 
  | 'MILESTONE_REVIEW' 
  | 'MEASUREMENT_PHASE' 
  | 'VALIDATED' 
  | 'SCALED' 
  | 'TERMINATED';

export interface Pilot {
  id: string;
  code: string;
  challengeId: string;
  challengeTitle: string;
  startupId: string;
  startupName: string;
  departmentId: string;
  departmentName: string;
  startDate: string;
  endDate: string;
  status: PilotStatus;
  allocatedBudget: number;
  disbursedAmount: number;
  kpis: KPI[];
  milestones: Milestone[];
  overallSuccessRate: number; // percentage
  independentValidatorName: string;
  independentValidationStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'VERIFIED' | 'FLAGGED';
  testbedLocation?: string;
  kpiStatus?: 'ON_TRACK' | 'ACTION_REQUIRED';
  riskStatus?: 'LOW' | 'MEDIUM' | 'HIGH';
  progressPercentage?: number;
  totalBudget?: number;
  spentBudget?: number;
}

export interface Milestone {
  id: string;
  pilotId?: string;
  title: string;
  description: string;
  dueDate: string;
  payoutPercentage: number;
  payoutAmount: number;
  status: 'PENDING' | 'SUBMITTED' | 'UNDER_VERIFICATION' | 'APPROVED' | 'DISBURSED' | 'DELAYED';
  deliverables: string[];
  submissionNotes?: string;
  verificationDate?: string;
  verifiedBy?: string;
  validationStatus?: string;
}

export interface KPI {
  id: string;
  pilotId: string;
  metricName: string;
  unit: string;
  baselineValue: number;
  targetValue: number;
  achievedValue: number;
  status: 'MEETS_TARGET' | 'EXCEEDS_TARGET' | 'BELOW_TARGET' | 'IN_PROGRESS';
  verifiedByValidator: boolean;
}

export interface Contract {
  id: string;
  contractNumber: string;
  title?: string;
  challengeId: string;
  startupId: string;
  startupName: string;
  departmentId: string;
  departmentName: string;
  contractType: 'SANDBOX_TRIAL' | 'DIRECT_PROCUREMENT' | 'MULTI_YEAR_SCALE_UP';
  totalContractValue: number;
  effectiveDate: string;
  expiryDate: string;
  status: 'DRAFT' | 'EXECUTED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  clauses: string[];
  signedPdfUrl?: string;
}

export interface Payment {
  id: string;
  transactionRef: string;
  pilotId: string;
  milestoneId?: string;
  startupName: string;
  departmentName: string;
  amount: number;
  disbursementDate: string;
  paymentGatewayStatus: 'SUCCESS' | 'PENDING' | 'ESCROW_HELD' | 'FAILED';
  approvalChain: {
    role: string;
    approved: boolean;
    timestamp: string;
  }[];
}

export interface Document {
  id: string;
  title: string;
  type: 'PITCH_DECK' | 'SECURITY_AUDIT' | 'FINANCIAL_STATEMENT' | 'KPI_REPORT' | 'VALIDATION_CERTIFICATE' | 'PROCUREMENT_SPEC';
  fileSize: string;
  uploadDate: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'FLAGGED';
}

export interface Expert {
  id: string;
  name: string;
  designation: string;
  institution: string; // e.g. IIT Delhi, NIC, NITI Aayog
  domainSpecialization: string[];
  evaluationsCompletedCount: number;
  pendingEvaluationsCount: number;
  rating: number;
  clearanceLevel: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3';
  department?: string;
  email?: string;
}

export interface Risk {
  id: string;
  entityType: 'CHALLENGE' | 'PILOT' | 'STARTUP';
  entityId: string;
  entityName: string;
  category: 'TECHNICAL' | 'LEGAL_COMPLIANCE' | 'FINANCIAL' | 'CYBERSECURITY' | 'TIMELINE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  mitigationPlan: string;
  ownerDepartment: string;
  status: 'IDENTIFIED' | 'MITIGATING' | 'RESOLVED';
  riskTitle?: string;
  mitigationStrategy?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetEntity: string;
  ipAddress: string;
  blockchainHash: string; // For audit trail integrity simulation
}

export interface ScaleUpDecision {
  id: string;
  pilotId: string;
  challengeTitle: string;
  startupName: string;
  originDepartment: string;
  recommendationDate: string;
  status: 'RECOMMENDED' | 'APPROVED_FOR_DIRECT_PROCUREMENT' | 'CROSS_DEPARTMENT_EXPANSION' | 'DECLINED';
  independentScore: number;
  projectedAnnualSavings: number;
  replicateDepartments: string[];
}
