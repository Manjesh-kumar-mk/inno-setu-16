import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="national-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand & Mandate Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#1E3A8A"/>
                <path d="M6 22C10 14 22 14 26 22" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round"/>
                <path d="M10 16C13 11 19 11 22 16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="16" cy="9" r="2.5" fill="#10B981"/>
              </svg>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                InnoSetu
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.6, maxWidth: '400px', marginBottom: '14px' }}>
              National Outcome-Based Innovation Procurement Gateway connecting Ministries, State Departments, and DPIIT-recognized deep-tech startups under GFR Rule 194 sandbox framework.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '0.9rem' }}>🏛️</span>
              <span style={{ fontSize: '0.72rem', color: '#CBD5E1', fontWeight: 600 }}>Smart India Hackathon 2024 Initiative</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <div className="footer-links-list">
              <button className="footer-link-btn" onClick={() => setCurrentView('public-home')}>National Overview</button>
              <button className="footer-link-btn" onClick={() => setCurrentView('public-challenges')}>Open Marketplace</button>
              <button className="footer-link-btn" onClick={() => setCurrentView('public-how-it-works')}>9-Stage Lifecycle</button>
              <button className="footer-link-btn" onClick={() => setCurrentView('public-about')}>Section 16 Pathway</button>
              <button className="footer-link-btn" onClick={() => setCurrentView('public-success-stories')}>Scale-Up Case Studies</button>
              <button className="footer-link-btn" onClick={() => setCurrentView('public-resources')}>Circulars & Legal Specs</button>
            </div>
          </div>

          {/* Portals & Access */}
          <div>
            <h4 className="footer-col-title">Portals</h4>
            <div className="footer-links-list">
              <button className="footer-link-btn" onClick={() => setCurrentView('public-login')}>Government Officer Sign In</button>
              <button className="footer-link-btn" onClick={() => setCurrentView('public-login')}>Startup Command Center</button>
              <button className="footer-link-btn" onClick={() => setCurrentView('public-login')}>Expert Review Panel</button>
              <button className="footer-link-btn" onClick={() => setCurrentView('public-login')}>Validator Escrow Gateway</button>
              <button className="footer-link-btn" onClick={() => setCurrentView('public-register')}>Register DPIIT Startup</button>
              <button className="footer-link-btn" onClick={() => setCurrentView('public-register')}>Onboard Department</button>
            </div>
          </div>

          {/* Governance & Compliance */}
          <div>
            <h4 className="footer-col-title">Governance</h4>
            <div className="footer-links-list">
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>GFR 2017 Rule 194 Compliant</span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>DPIIT Startup India Aligned</span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>PFMS Escrow Integration</span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>ISO 27001 & DPDP Act 2023</span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>GeM Fast-Track Onboarding</span>
              <span style={{ fontSize: '0.8rem', color: '#38BDF8', fontWeight: 600 }}>NIC Cloud Ready</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div style={{ color: '#64748B' }}>
            © {new Date().getFullYear()} InnoSetu — Ministry of Commerce & Industry / DPIIT Innovation Sandbox. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '16px', color: '#64748B' }}>
            <span>Security Policy</span>
            <span>•</span>
            <span>Privacy Guidelines</span>
            <span>•</span>
            <span>Terms of Procurement</span>
            <span>•</span>
            <span>National Helpdesk 1800-115-565</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
