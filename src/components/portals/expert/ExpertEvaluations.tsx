import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/StatusBadge';
import { AIProposalSummaryModal, AIRiskAssistantModal } from '../../common/AIAssistantComponents';

export const ExpertEvaluations: React.FC = () => {
  const { applications, experts, submitEvaluation } = useApp();

  const currentExpert = experts[0] || {
    id: 'exp-01',
    name: 'Prof. Anand R. Swaminathan',
    designation: 'Chair, Intelligent Transportation Systems',
    institution: 'IIT Delhi'
  };

  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || 'app-501');
  const [evalScores, setEvalScores] = useState({
    techFeasibility: 18,   // Max 20
    innovation: 18,        // Max 20
    impact: 18,            // Max 20
    scalability: 13,       // Max 15
    costEffectiveness: 14, // Max 15
    cybersecurity: 9       // Max 10
  });

  const [evidenceInput, setEvidenceInput] = useState<string>(
    'https://github.com/aerotraffic-ai/gov-benchmarks/report-trl8-cert.pdf (NIC Penetration Audit Certificate & Hardware TPM 2.0 Logs attached)'
  );

  const [commentsInput, setCommentsInput] = useState<string>(
    'The proposed edge computer vision architecture satisfies all ISO 26262 functional safety requirements. Sub-10ms adaptive signal control verified during 30-day field trial. Recommended for sandbox trial award.'
  );

  const [hasNoConflictOfInterest, setHasNoConflictOfInterest] = useState<boolean>(true);
  const [submissionSuccessMsg, setSubmissionSuccessMsg] = useState<string | null>(null);

  const [isAiSummaryOpen, setIsAiSummaryOpen] = useState(false);
  const [isAiRiskOpen, setIsAiRiskOpen] = useState(false);

  const totalScore = 
    Number(evalScores.techFeasibility) +
    Number(evalScores.innovation) +
    Number(evalScores.impact) +
    Number(evalScores.scalability) +
    Number(evalScores.costEffectiveness) +
    Number(evalScores.cybersecurity);

  const activeApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasNoConflictOfInterest) {
      alert('You must confirm the Conflict of Interest declaration before submitting the evaluation.');
      return;
    }

    const rec = totalScore >= 80 ? 'APPROVE_FOR_SANDBOX' : totalScore >= 60 ? 'REQUEST_MODIFICATION' : 'REJECT';

    submitEvaluation({
      applicationId: activeApp.id,
      challengeId: activeApp.challengeId,
      expertId: currentExpert.id,
      expertName: currentExpert.name,
      expertDesignation: `${currentExpert.designation}, ${currentExpert.institution}`,
      totalScore: totalScore,
      criteriaScores: [
        { id: 'c1', name: 'Technical Feasibility', criterion: 'Technical Feasibility', givenScore: Number(evalScores.techFeasibility), score: Number(evalScores.techFeasibility), maxScore: 20, weightPct: 20, comments: 'Verified architecture', comment: 'Verified architecture' },
        { id: 'c2', name: 'Innovation Level', criterion: 'Innovation Level', givenScore: Number(evalScores.innovation), score: Number(evalScores.innovation), maxScore: 20, weightPct: 20, comments: 'Novel approach', comment: 'Novel approach' },
        { id: 'c3', name: 'Impact Potential', criterion: 'Impact Potential', givenScore: Number(evalScores.impact), score: Number(evalScores.impact), maxScore: 20, weightPct: 20, comments: 'High public ROI', comment: 'High public ROI' },
        { id: 'c4', name: 'Scalability & Replication', criterion: 'Scalability & Replication', givenScore: Number(evalScores.scalability), score: Number(evalScores.scalability), maxScore: 15, weightPct: 15, comments: 'Modular deployment', comment: 'Modular deployment' },
        { id: 'c5', name: 'Cost Effectiveness', criterion: 'Cost Effectiveness', givenScore: Number(evalScores.costEffectiveness), score: Number(evalScores.costEffectiveness), maxScore: 15, weightPct: 15, comments: 'Within budget cap', comment: 'Within budget cap' },
        { id: 'c6', name: 'Cybersecurity Controls', criterion: 'Cybersecurity Controls', givenScore: Number(evalScores.cybersecurity), score: Number(evalScores.cybersecurity), maxScore: 10, weightPct: 10, comments: 'TPM 2.0 verified', comment: 'TPM 2.0 verified' }
      ],
      overallComments: `${commentsInput} | Evidence: ${evidenceInput}`,
      recommendation: rec as any
    });

    setSubmissionSuccessMsg(
      `Evaluation for '${activeApp.startupName}' successfully recorded with total score ${totalScore}/100. Recommendation: ${rec}.`
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease-in-out' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Assigned Evaluations & Scoring Rubric
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Evaluate deep-tech startup proposals against government specifications.
        </p>
      </div>

      {submissionSuccessMsg && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px 18px', borderRadius: '8px', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><strong>✓ Success:</strong> {submissionSuccessMsg}</div>
          <button onClick={() => setSubmissionSuccessMsg(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#166534', fontWeight: 700 }}>✕</button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
        {/* Left Column: Assigned Proposals List */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--navy-900)', textTransform: 'uppercase', marginBottom: '12px' }}>
            Assigned Proposals ({applications.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {applications.map(app => {
              const isSelected = app.id === activeApp?.id;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1.5px solid ${isSelected ? 'var(--primary-color)' : 'var(--border-color)'}`,
                    background: isSelected ? 'rgba(37, 99, 235, 0.06)' : 'var(--card-bg)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--navy-900)' }}>{app.startupName}</strong>
                    <StatusBadge status={app.status} />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {app.challengeTitle}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                    <span>Proposed Budget: <strong>${app.proposedBudget.toLocaleString()}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Structured Evaluation Form */}
        {activeApp && (
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge badge-info" style={{ fontSize: '0.72rem', fontWeight: 700 }}>STRUCTURED EXPERT RUBRIC</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '4px' }}>
                  {activeApp.startupName}
                </h3>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Challenge: <strong>{activeApp.challengeTitle}</strong> • Submission Date: {activeApp.submissionDate}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ borderColor: '#0284c7', color: '#0284c7', background: 'rgba(2, 132, 199, 0.05)' }}
                  onClick={() => setIsAiSummaryOpen(true)}
                >
                  ✨ AI Proposal Summary
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ borderColor: '#ef4444', color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)' }}
                  onClick={() => setIsAiRiskOpen(true)}
                >
                  ✨ AI Risk Scan
                </button>
                <div style={{ textAlign: 'right', background: 'var(--bg-muted)', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Calculated Total Score</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: totalScore >= 80 ? '#16a34a' : totalScore >= 60 ? '#d97706' : '#dc2626' }}>
                    {totalScore} / 100
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitEvaluation} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Architecture Summary */}
              <div style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '4px' }}>
                  Submitted Technical Architecture Summary:
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {activeApp.technicalArchitectureSummary}
                </div>
              </div>

              {/* 6 Structured Evaluation Criteria */}
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--navy-900)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Evaluation Criteria Scoring (Out of 100 Points):
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* 1. Technical Feasibility */}
                <div style={{ border: '1px solid var(--border-color)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                    <span>1. Technical Feasibility</span>
                    <span style={{ color: 'var(--primary-color)' }}>{evalScores.techFeasibility} / 20 pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={evalScores.techFeasibility}
                    onChange={(e) => setEvalScores({ ...evalScores, techFeasibility: Number(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Hardware/software readiness, sub-second latency, ISO compliance
                  </div>
                </div>

                {/* 2. Innovation */}
                <div style={{ border: '1px solid var(--border-color)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                    <span>2. Innovation & IP Novelty</span>
                    <span style={{ color: 'var(--primary-color)' }}>{evalScores.innovation} / 20 pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={evalScores.innovation}
                    onChange={(e) => setEvalScores({ ...evalScores, innovation: Number(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Proprietary patents, deep-tech breakthrough, unique approach
                  </div>
                </div>

                {/* 3. Impact */}
                <div style={{ border: '1px solid var(--border-color)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                    <span>3. Societal & Operational Impact</span>
                    <span style={{ color: 'var(--primary-color)' }}>{evalScores.impact} / 20 pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={evalScores.impact}
                    onChange={(e) => setEvalScores({ ...evalScores, impact: Number(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Outcome achievement magnitude, public benefit & efficiency gain
                  </div>
                </div>

                {/* 4. Scalability */}
                <div style={{ border: '1px solid var(--border-color)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                    <span>4. Scalability & Replicability</span>
                    <span style={{ color: 'var(--primary-color)' }}>{evalScores.scalability} / 15 pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={evalScores.scalability}
                    onChange={(e) => setEvalScores({ ...evalScores, scalability: Number(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Cross-departmental deployment ease & modular expansion
                  </div>
                </div>

                {/* 5. Cost Effectiveness */}
                <div style={{ border: '1px solid var(--border-color)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                    <span>5. Cost Effectiveness</span>
                    <span style={{ color: 'var(--primary-color)' }}>{evalScores.costEffectiveness} / 15 pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={evalScores.costEffectiveness}
                    onChange={(e) => setEvalScores({ ...evalScores, costEffectiveness: Number(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Value for money, budget alignment, long-term maintenance cost
                  </div>
                </div>

                {/* 6. Cybersecurity */}
                <div style={{ border: '1px solid var(--border-color)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                    <span>6. Cybersecurity & Data Sovereignty</span>
                    <span style={{ color: 'var(--primary-color)' }}>{evalScores.cybersecurity} / 10 pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={evalScores.cybersecurity}
                    onChange={(e) => setEvalScores({ ...evalScores, cybersecurity: Number(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    TPM 2.0 hardware encryption, DISHA/DPDP Act 2023 compliance
                  </div>
                </div>
              </div>

              {/* Evidence Field */}
              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--navy-900)', display: 'block', marginBottom: '4px' }}>
                  Verified Evidence / Technical Attachments Link:
                </label>
                <input
                  type="text"
                  value={evidenceInput}
                  onChange={(e) => setEvidenceInput(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                  placeholder="Insert lab benchmark URL, NIC audit hash, or hardware test certificate link..."
                />
              </div>

              {/* Comments Field */}
              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--navy-900)', display: 'block', marginBottom: '4px' }}>
                  Evaluator Rationale & Qualitative Comments:
                </label>
                <textarea
                  rows={3}
                  value={commentsInput}
                  onChange={(e) => setCommentsInput(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                />
              </div>

              {/* Conflict of Interest Declaration */}
              <div style={{ background: '#fffbeb', border: '1px solid #fef08a', padding: '14px', borderRadius: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.825rem', color: '#92400e' }}>
                  <input
                    type="checkbox"
                    checked={hasNoConflictOfInterest}
                    onChange={(e) => setHasNoConflictOfInterest(e.target.checked)}
                    style={{ marginTop: '2px' }}
                  />
                  <span>
                    <strong>Mandatory Conflict of Interest Declaration:</strong> I hereby certify under penalty of administrative disqualification that I have zero personal, financial, consulting, or equity interest in <strong>{activeApp.startupName}</strong> or its founding officers.
                  </span>
                </label>
              </div>

              {/* Submit Evaluation Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem', fontWeight: 700 }}>
                  ✓ Submit Evaluation & Sign Off Score
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <AIProposalSummaryModal
        isOpen={isAiSummaryOpen}
        onClose={() => setIsAiSummaryOpen(false)}
        application={activeApp}
      />

      <AIRiskAssistantModal
        isOpen={isAiRiskOpen}
        onClose={() => setIsAiRiskOpen(false)}
        entityName={activeApp?.startupName}
      />
    </div>
  );
};
