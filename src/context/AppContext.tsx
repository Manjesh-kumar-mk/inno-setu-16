import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  UserRole,
  LifecycleStage,
  Department,
  Startup,
  Challenge,
  Application,
  Evaluation,
  Pilot,
  Milestone,
  Contract,
  Payment,
  Expert,
  Risk,
  AuditEvent,
  ScaleUpDecision
} from '../types';
import {
  MOCK_DEPARTMENTS,
  MOCK_STARTUPS,
  MOCK_CHALLENGES,
  MOCK_APPLICATIONS,
  MOCK_EVALUATIONS,
  MOCK_PILOTS,
  MOCK_EXPERTS,
  MOCK_CONTRACTS,
  MOCK_PAYMENTS,
  MOCK_RISKS,
  MOCK_SCALE_UP_DECISIONS,
  MOCK_AUDIT_EVENTS
} from '../mockData';

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  // Authentication State
  isAuthenticated: boolean;
  userEmail: string;
  login: (roleInput: UserRole | 'VALIDATOR', targetView?: string, email?: string) => void;
  logout: () => void;

  // Navigation & Role State
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedStage: LifecycleStage | 'ALL';
  setSelectedStage: (stage: LifecycleStage | 'ALL') => void;
  selectedDepartmentId: string;
  setSelectedDepartmentId: (deptId: string) => void;

  // Search & Modals
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  switchDemoRole: (role: UserRole) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastNotification[];
  notifySuccess: (title: string, message?: string) => void;
  notifyInfo: (title: string, message?: string) => void;
  notifyError: (title: string, message?: string) => void;
  removeToast: (id: string) => void;

  // Modal Dialog Control
  activeModal: string | null;
  modalData: any;
  openModal: (modalName: string, data?: any) => void;
  closeModal: () => void;

  // Datasets
  departments: Department[];
  startups: Startup[];
  challenges: Challenge[];
  applications: Application[];
  evaluations: Evaluation[];
  pilots: Pilot[];
  contracts: Contract[];
  payments: Payment[];
  experts: Expert[];
  risks: Risk[];
  auditLogs: AuditEvent[];
  scaleUpDecisions: ScaleUpDecision[];

  // Mutators & Workflows
  addAuditEvent: (action: string, targetEntity: string) => void;
  createChallenge: (newChallenge: Partial<Challenge>) => void;
  submitEvaluation: (evaluation: Partial<Evaluation>) => void;
  verifyMilestone: (pilotId: string, milestoneId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getInitialAuth = (): boolean => {
  try {
    return sessionStorage.getItem('innosetu_auth') === 'true';
  } catch {
    return false;
  }
};

const getInitialRole = (): UserRole => {
  try {
    const isAuth = sessionStorage.getItem('innosetu_auth') === 'true';
    const savedRole = sessionStorage.getItem('innosetu_role') as UserRole;
    if (isAuth && savedRole && ['GOVERNMENT', 'STARTUP', 'EXPERT', 'ADMIN'].includes(savedRole)) {
      return savedRole;
    }
  } catch {}
  return 'PUBLIC';
};

const getInitialView = (): string => {
  try {
    const isAuth = sessionStorage.getItem('innosetu_auth') === 'true';
    const savedView = sessionStorage.getItem('innosetu_view');
    if (isAuth && savedView) return savedView;
    if (!isAuth) {
      if (savedView && savedView.startsWith('public-')) return savedView;
      return 'public-home';
    }
  } catch {}
  return 'public-home';
};

const getInitialEmail = (): string => {
  try {
    return sessionStorage.getItem('innosetu_user_email') || '';
  } catch {}
  return '';
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getInitialAuth);
  const [currentRole, setCurrentRoleState] = useState<UserRole>(getInitialRole);
  const [currentView, setCurrentViewState] = useState<string>(getInitialView);
  const [userEmail, setUserEmail] = useState<string>(getInitialEmail);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const [selectedStage, setSelectedStage] = useState<LifecycleStage | 'ALL'>('ALL');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('ALL');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  // Toasts State
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastNotification = { id, type, title, message };
    setToasts(prev => [newToast, ...prev].slice(0, 5));

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const notifySuccess = (title: string, message?: string) => addToast('success', title, message);
  const notifyInfo = (title: string, message?: string) => addToast('info', title, message);
  const notifyError = (title: string, message?: string) => addToast('error', title, message);

  // Entities state
  const [departments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [startups] = useState<Startup[]>(MOCK_STARTUPS);
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK_CHALLENGES);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(MOCK_EVALUATIONS);
  const [pilots, setPilots] = useState<Pilot[]>(MOCK_PILOTS);
  const [contracts] = useState<Contract[]>(MOCK_CONTRACTS);
  const [payments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [experts] = useState<Expert[]>(MOCK_EXPERTS);
  const [risks] = useState<Risk[]>(MOCK_RISKS);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(MOCK_AUDIT_EVENTS);
  const [scaleUpDecisions] = useState<ScaleUpDecision[]>(MOCK_SCALE_UP_DECISIONS);

  const setCurrentView = (view: string) => {
    setCurrentViewState(view);
    try {
      sessionStorage.setItem('innosetu_view', view);
    } catch {}
  };

  const setCurrentRole = (role: UserRole) => {
    if (role !== 'PUBLIC' && !isAuthenticated) {
      notifyError('Authentication Required', `Please sign in to access the ${role.toLowerCase()} portal.`);
      setCurrentRoleState('PUBLIC');
      setCurrentViewState('public-login');
      setIsSidebarOpen(false);
      try {
        sessionStorage.setItem('innosetu_role', 'PUBLIC');
        sessionStorage.setItem('innosetu_view', 'public-login');
      } catch {}
      return;
    }

    setCurrentRoleState(role);
    try {
      sessionStorage.setItem('innosetu_role', role);
    } catch {}
    notifyInfo('Switched Active Portal Context', `Current view updated for ${role} workspace.`);
    if (role === 'PUBLIC') {
      setCurrentView('public-home');
    } else {
      setCurrentView('dashboard');
    }
    setIsSidebarOpen(false);
  };

  const switchDemoRole = (role: UserRole) => {
    if (role === 'PUBLIC') {
      logout();
      return;
    }
    const demoEmail =
      role === 'GOVERNMENT' ? 'officer.demo@innosetu.example' :
      role === 'STARTUP' ? 'startup.demo@innosetu.example' :
      role === 'EXPERT' ? 'expert.demo@innosetu.example' : 'admin.demo@innosetu.example';

    login(role, 'dashboard', demoEmail);
    setIsSidebarOpen(false);
  };

  const login = (roleInput: UserRole | 'VALIDATOR', targetView?: string, email?: string) => {
    const role: UserRole = roleInput === 'VALIDATOR' ? 'EXPERT' : roleInput;
    const view = targetView || (roleInput === 'VALIDATOR' ? 'kpi-validation' : 'dashboard');
    const activeEmail = email || `${role.toLowerCase()}.demo@innosetu.example`;

    setIsAuthenticated(true);
    setCurrentRoleState(role);
    setCurrentViewState(view);
    setUserEmail(activeEmail);
    setIsSidebarOpen(false);

    try {
      sessionStorage.setItem('innosetu_auth', 'true');
      sessionStorage.setItem('innosetu_role', role);
      sessionStorage.setItem('innosetu_view', view);
      sessionStorage.setItem('innosetu_user_email', activeEmail);
    } catch {}

    const newAuditLog: AuditEvent = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actorName: activeEmail,
      actorRole: role,
      action: 'USER_LOGIN_AUTHENTICATED',
      targetEntity: `Sign in successful for ${activeEmail} (${roleInput})`,
      ipAddress: '127.0.0.1 (Authenticated Local)',
      blockchainHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`
    };
    setAuditLogs(prev => [newAuditLog, ...prev]);

    notifySuccess('Authenticated Successfully', `Welcome to the ${roleInput} Workspace.`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentRoleState('PUBLIC');
    setCurrentViewState('public-login');
    setUserEmail('');
    setIsSidebarOpen(false);

    try {
      sessionStorage.removeItem('innosetu_auth');
      sessionStorage.removeItem('innosetu_role');
      sessionStorage.removeItem('innosetu_view');
      sessionStorage.removeItem('innosetu_user_email');
    } catch {}

    notifyInfo('Logged Out', 'You have been safely logged out of InnoSetu.');
  };

  const openModal = (modalName: string, data?: any) => {
    setActiveModal(modalName);
    setModalData(data || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const addAuditEvent = (action: string, targetEntity: string) => {
    const newEvent: AuditEvent = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      actorName: currentRole === 'GOVERNMENT' ? 'Dr. Rajesh Vardhan, IAS' : 'Logged In User',
      actorRole: currentRole,
      action,
      targetEntity,
      ipAddress: '10.204.18.42',
      blockchainHash: `0x${Math.random().toString(16).substr(2, 64)}`
    };
    setAuditLogs(prev => [newEvent, ...prev]);
  };

  const createChallenge = (newChallenge: Partial<Challenge>) => {
    const challenge: Challenge = {
      id: `ch-2026-0${challenges.length + 1}`,
      code: `CH-DEPT-0${challenges.length + 1}`,
      title: newChallenge.title || 'Untitled Outcome Challenge',
      departmentId: newChallenge.departmentId || 'dept-101',
      departmentName: newChallenge.departmentName || 'Department of Transportation & Smart Mobility',
      problemStatement: newChallenge.problemStatement || '',
      desiredOutcome: newChallenge.desiredOutcome || '',
      sector: newChallenge.sector || 'Smart Mobility',
      budgetCap: newChallenge.budgetCap || 300000,
      sandboxDurationMonths: newChallenge.sandboxDurationMonths || 6,
      currentStage: 'CHALLENGE',
      status: 'OPEN',
      publishDate: new Date().toISOString().split('T')[0],
      submissionDeadline: '2026-10-30',
      eligibleStartupCriteria: newChallenge.eligibleStartupCriteria || ['DPIIT Registered Startup', 'TRL-7+ Solution'],
      applicationsCount: 0,
      evaluationsCount: 0
    };

    setChallenges(prev => [challenge, ...prev]);
    addAuditEvent('CREATED_OUTCOME_CHALLENGE', challenge.title);
    notifySuccess('Outcome Challenge Published', `Challenge "${challenge.title}" is now open for startup submissions.`);
  };

  const submitEvaluation = (evalData: Partial<Evaluation>) => {
    const newEval: Evaluation = {
      id: `eval-${Date.now()}`,
      applicationId: evalData.applicationId || 'app-501',
      challengeId: evalData.challengeId || 'ch-2026-01',
      expertId: 'exp-01',
      expertName: 'Prof. Anand R. Swaminathan',
      expertDesignation: 'Chair, Intelligent Transportation Systems, IIT Delhi',
      evaluationDate: new Date().toISOString().split('T')[0],
      status: 'COMPLETED',
      totalScore: evalData.totalScore || 90,
      criteriaScores: evalData.criteriaScores || [],
      overallComments: evalData.overallComments || 'Verified technical feasibility.',
      recommendation: evalData.recommendation || 'APPROVE_FOR_SANDBOX'
    };

    setEvaluations(prev => [newEval, ...prev]);
    addAuditEvent('SUBMITTED_EXPERT_EVALUATION', `Score ${newEval.totalScore}/100`);
    notifySuccess('Expert Evaluation Submitted', `Evaluation for application #${newEval.applicationId} recorded successfully.`);
  };

  const verifyMilestone = (pilotId: string, milestoneId: string) => {
    setPilots(prev => prev.map(pilot => {
      if (pilot.id === pilotId) {
        const updatedMilestones = pilot.milestones.map(ms => {
          if (ms.id === milestoneId) {
            return {
              ...ms,
              status: 'DISBURSED' as const,
              verificationDate: new Date().toISOString().split('T')[0],
              verifiedBy: 'Independent Auditor'
            };
          }
          return ms;
        });
        return { ...pilot, milestones: updatedMilestones };
      }
      return pilot;
    }));

    addAuditEvent('VERIFIED_MILESTONE_PAYOUT', `Pilot ${pilotId} - Milestone ${milestoneId}`);
    notifySuccess('Milestone Verified & Funds Disbursed', `Milestone funds approved and transferred to startup escrow account.`);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        userEmail,
        login,
        logout,
        currentRole,
        setCurrentRole,
        currentView,
        setCurrentView,
        selectedStage,
        setSelectedStage,
        selectedDepartmentId,
        setSelectedDepartmentId,
        isSidebarOpen,
        setIsSidebarOpen,
        switchDemoRole,
        searchQuery,
        setSearchQuery,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        isNotificationOpen,
        setIsNotificationOpen,
        toasts,
        notifySuccess,
        notifyInfo,
        notifyError,
        removeToast,
        activeModal,
        modalData,
        openModal,
        closeModal,
        departments,
        startups,
        challenges,
        applications,
        evaluations,
        pilots,
        contracts,
        payments,
        experts,
        risks,
        auditLogs,
        scaleUpDecisions,
        addAuditEvent,
        createChallenge,
        submitEvaluation,
        verifyMilestone
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
