import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { UserRole } from '../../../types';

type ExtendedRoleOption = 'GOVERNMENT' | 'STARTUP' | 'EXPERT' | 'VALIDATOR' | 'ADMIN';

interface RoleDetail {
  id: ExtendedRoleOption;
  title: string;
  description: string;
  placeholder: string;
  demoEmail: string;
  icon: string;
}

const ROLES: RoleDetail[] = [
  {
    id: 'GOVERNMENT',
    title: 'Government',
    description: 'Department officials and implementing agencies',
    placeholder: 'name@department.gov.in',
    demoEmail: 'officer.demo@innosetu.example',
    icon: '🏛️'
  },
  {
    id: 'STARTUP',
    title: 'Startup',
    description: 'Startups and solution providers',
    placeholder: 'contact@startup.in',
    demoEmail: 'startup.demo@innosetu.example',
    icon: '🚀'
  },
  {
    id: 'EXPERT',
    title: 'Expert',
    description: 'Evaluators and domain experts',
    placeholder: 'expert@institution.edu.in',
    demoEmail: 'expert.demo@innosetu.example',
    icon: '🔬'
  },
  {
    id: 'VALIDATOR',
    title: 'Validator',
    description: 'Independent pilot validators',
    placeholder: 'validator@agency.org',
    demoEmail: 'validator.demo@innosetu.example',
    icon: '⚖️'
  },
  {
    id: 'ADMIN',
    title: 'Administrator',
    description: 'Platform administration',
    placeholder: 'admin@innosetu.gov.in',
    demoEmail: 'admin.demo@innosetu.example',
    icon: '🛡️'
  }
];

export const LoginPage: React.FC = () => {
  const { login, addAuditEvent, notifySuccess, setCurrentView } = useApp();

  const [selectedRole, setSelectedRole] = useState<ExtendedRoleOption>('GOVERNMENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Demo selector state
  const [selectedDemoKey, setSelectedDemoKey] = useState<string>('');

  // States for UX flow
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const currentRoleDetail = ROLES.find(r => r.id === selectedRole) || ROLES[0];

  const handleRoleSelect = (roleId: ExtendedRoleOption) => {
    setSelectedRole(roleId);
    setErrorMessage(null);
    setFieldErrors({});
    setSelectedDemoKey('');
    const matchedRole = ROLES.find(r => r.id === roleId);
    if (matchedRole) {
      setEmail(matchedRole.demoEmail);
      setPassword('••••••••••••');
    }
  };

  const executeQuickLogin = (targetRole: ExtendedRoleOption, targetEmail?: string) => {
    setErrorMessage(null);
    setFieldErrors({});
    setIsSubmitting(true);

    const roleDetail = ROLES.find(r => r.id === targetRole) || ROLES[0];
    const activeEmail = targetEmail || email || roleDetail.demoEmail;

    setSuccessMessage(`Sign-in verified for ${roleDetail.title}`);

    setTimeout(() => {
      setIsSubmitting(false);
      login(targetRole, targetRole === 'VALIDATOR' ? 'kpi-validation' : 'dashboard', activeEmail);
    }, 250);
  };

  const handleDemoSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roleId = e.target.value as ExtendedRoleOption;
    setSelectedDemoKey(roleId);
    if (!roleId) return;

    const matchedRole = ROLES.find(r => r.id === roleId);
    if (matchedRole) {
      setSelectedRole(matchedRole.id);
      setEmail(matchedRole.demoEmail);
      setPassword('••••••••••••');
      executeQuickLogin(matchedRole.id, matchedRole.demoEmail);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const matchedRole = ROLES.find(r => r.id === selectedRole) || ROLES[0];
    const activeEmail = email.trim() || matchedRole.demoEmail;

    executeQuickLogin(selectedRole, activeEmail);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    notifySuccess('Password Reset Requested', `A secure reset link has been dispatched to ${email || 'your registered official email'}.`);
  };

  return (
    <div className="innosetu-login-container">
      <div className="login-split-wrapper">

        {/* =================================================================
           LEFT SIDE — BRANDING / PLATFORM INTRO (approx 45% screen width)
           ================================================================= */}
        <div className="login-left-brand">
          <div className="brand-bg-pattern" aria-hidden="true" />

          {/* Top Brand Header */}
          <div className="brand-header">
            <div className="brand-logo-mark">
              <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="8" fill="#2563EB" />
                <path d="M8 24C12 16 24 16 28 24" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
                <path d="M12 18C15 13 21 13 24 18" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="18" cy="10" r="3" fill="#10B981" />
              </svg>
            </div>
            <div className="brand-text-block">
              <h1 className="brand-title">InnoSetu</h1>
              <p className="brand-subtitle">Government Innovation Procurement Platform</p>
            </div>
          </div>

          {/* Core Intro Description */}
          <div className="brand-body">
            <p className="brand-description">
              Connecting government challenges with innovative solutions through transparent evaluation, structured pilots and evidence-based scale-up.
            </p>

            {/* Visual Process Flow: Challenge -> Startup -> Pilot -> Evidence -> Scale */}
            <div className="innovation-flow-container">
              <div className="flow-title">PROCUREMENT LIFECYCLE</div>
              <div className="flow-steps">
                <div className="flow-step">
                  <div className="flow-icon">🎯</div>
                  <span className="flow-label">Challenge</span>
                </div>

                <div className="flow-arrow">→</div>

                <div className="flow-step">
                  <div className="flow-icon">🚀</div>
                  <span className="flow-label">Startup</span>
                </div>

                <div className="flow-arrow">→</div>

                <div className="flow-step">
                  <div className="flow-icon">⚡</div>
                  <span className="flow-label">Pilot</span>
                </div>

                <div className="flow-arrow">→</div>

                <div className="flow-step">
                  <div className="flow-icon">📊</div>
                  <span className="flow-label">Evidence</span>
                </div>

                <div className="flow-arrow">→</div>

                <div className="flow-step">
                  <div className="flow-icon">🌐</div>
                  <span className="flow-label">Scale</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Side Footer */}
          <div className="brand-footer">
            <span className="prototype-tag font-mono">Prototype Platform</span>
          </div>
        </div>

        {/* =================================================================
           RIGHT SIDE — LOGIN CARD (approx 55% screen width)
           ================================================================= */}
        <div className="login-right-panel">
          <div className="login-card">

            {/* Card Heading */}
            <div className="login-card-header">
              <h2 className="login-heading">Welcome back</h2>
              <p className="login-subheading">Sign in to continue to InnoSetu</p>
            </div>

            {/* Success State Banner */}
            {successMessage && (
              <div className="login-status-banner success" role="status">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{successMessage}. Redirecting to dashboard...</span>
              </div>
            )}

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="login-status-banner error" role="alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* SECTION 4: ROLE SELECTOR */}
            <div className="role-selector-section">
              <label className="field-label bold-label" id="role-selector-label">
                Sign in as
              </label>
              <div className="role-cards-grid" role="radiogroup" aria-labelledby="role-selector-label">
                {ROLES.map((role) => {
                  const isActive = selectedRole === role.id;
                  return (
                    <button
                      type="button"
                      key={role.id}
                      className={`role-card-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleRoleSelect(role.id)}
                      role="radio"
                      aria-checked={isActive}
                      tabIndex={0}
                    >
                      <div className="role-card-header">
                        <span className="role-icon">{role.icon}</span>
                        <span className="role-title">{role.title}</span>
                      </div>
                      <span className="role-desc">{role.description}</span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                className="btn-signin-primary"
                style={{ marginTop: '12px', background: 'var(--primary-700)', padding: '10px' }}
                onClick={() => executeQuickLogin(selectedRole)}
              >
                ⚡ Launch Demo Portal as {ROLES.find(r => r.id === selectedRole)?.title}
              </button>
            </div>

            {/* SECTION 5: LOGIN FORM */}
            <form onSubmit={handleLoginSubmit} noValidate className="login-form">

              {/* Field 1: Official Email */}
              <div className="form-group">
                <label className="field-label" htmlFor="login-email">
                  {selectedRole === 'GOVERNMENT' ? 'Official Email / Gov ID' :
                    selectedRole === 'STARTUP' ? 'Email Address / Founder Email' :
                      selectedRole === 'EXPERT' ? 'Institutional Email' :
                        selectedRole === 'VALIDATOR' ? 'Validator Email Address' :
                          'Administrator Email'}
                </label>
                <input
                  id="login-email"
                  type="email"
                  className={`form-input ${fieldErrors.email ? 'input-error' : ''}`}
                  placeholder={currentRoleDetail.placeholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  autoComplete="email"
                  required
                />
                {fieldErrors.email && (
                  <span className="field-error-msg" role="alert">{fieldErrors.email}</span>
                )}
              </div>

              {/* Field 2: Password */}
              <div className="form-group">
                <div className="field-header-row">
                  <label className="field-label" htmlFor="login-password">
                    Password
                  </label>
                  <a
                    href="#forgot-password"
                    onClick={handleForgotPassword}
                    className="forgot-password-link"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="password-input-wrapper">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input ${fieldErrors.password ? 'input-error' : ''}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <span className="field-error-msg" role="alert">{fieldErrors.password}</span>
                )}
              </div>

              {/* Field 3: Remember me */}
              <div className="form-options-row">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkbox-label">Keep me signed in</span>
                </label>
              </div>

              {/* SECTION 6: PRIMARY BUTTON */}
              <button
                type="submit"
                className="btn-signin-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-loading-state">
                    <svg className="spinner-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  `Sign In`
                )}
              </button>

            </form>

            {/* SECTION 7: DEMO LOGIN SUPPORT */}
            <div className="demo-access-container">
              <div className="demo-header-row">
                <span className="demo-tag">Demo access</span>
                <span className="demo-subtitle">Try a demo account</span>
              </div>

              <button
                type="button"
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  padding: '12px 18px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                  background: 'var(--bg-muted)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--navy-900)',
                  cursor: 'pointer'
                }}
                onClick={() => executeQuickLogin(selectedRole)}
              >
                <span>🚀</span> Continue as Demo User ({currentRoleDetail.title})
              </button>

              <div className="demo-selector-wrapper">
                <select
                  className="demo-dropdown-select"
                  value={selectedDemoKey}
                  onChange={handleDemoSelect}
                  aria-label="Select demo credentials to populate"
                >
                  <option value="">-- Choose a fictional demo persona --</option>
                  <option value="GOVERNMENT">🏛️ Government Officer (officer.demo@innosetu.example)</option>
                  <option value="STARTUP">🚀 Startup Representative (startup.demo@innosetu.example)</option>
                  <option value="EXPERT">🔬 Expert Evaluator (expert.demo@innosetu.example)</option>
                  <option value="VALIDATOR">⚖️ Independent Validator (validator.demo@innosetu.example)</option>
                  <option value="ADMIN">🛡️ Administrator (admin.demo@innosetu.example)</option>
                </select>
              </div>
              <div className="demo-disclaimer">
                Demo credentials are for prototype demonstration only.
              </div>
            </div>

            {/* SECTION 8: REGISTER SECTION */}
            <div className="register-section">
              <span className="register-text">Don't have an account?</span>
              <div className="register-buttons-row">
                <button
                  type="button"
                  className="btn-register-secondary"
                  onClick={() => setCurrentView('public-register')}
                >
                  Register as Startup
                </button>
                <button
                  type="button"
                  className="btn-register-secondary"
                  onClick={() => setCurrentView('public-register')}
                >
                  Request Government Access
                </button>
              </div>
            </div>

            {/* SECTION 9: SECURITY INFORMATION */}
            <div className="security-info-box">
              <div className="security-icon-title">
                <span className="security-lock-icon">🔒</span>
                <span className="security-title">Secure authentication</span>
              </div>
              <p className="security-description">
                Your information is handled through role-based access controls.
              </p>
            </div>

            {/* SECTION 10: FOOTER */}
            <footer className="login-card-footer">
              <div className="footer-copyright">
                © 2026 InnoSetu
              </div>
              <div className="footer-links">
                <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy</a>
                <span className="dot-divider">•</span>
                <a href="#terms" onClick={(e) => e.preventDefault()}>Terms</a>
                <span className="dot-divider">•</span>
                <a href="#support" onClick={(e) => e.preventDefault()}>Help & Support</a>
              </div>
              <div className="footer-demo-label">
                Prototype / Demonstration Platform
              </div>
            </footer>

          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;

