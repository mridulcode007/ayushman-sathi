function StepBody({ step }) {
  if (step.key === 'qr') {
    return (
      <div style={{ display: 'grid', placeItems: 'center', border: '1px solid var(--color-divider)', borderRadius: 8, padding: 20 }}>
        <div className="qr-box" />
        <div className="qr-code">{step.cardNumber}</div>
      </div>
    );
  }
  if (step.key === 'package') {
    const pkg = step.package;
    return (
      <div className="card">
        <div className="kick">HBP 2022 &middot; {pkg.code}</div>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 18 }}>{pkg.title}</div>
        <div className="kv" style={{ marginTop: 8 }}><span>Package rate</span><span>&#8377;{pkg.rate.toLocaleString('en-IN')}</span></div>
        <div className="kv"><span>You pay</span><span style={{ color: 'var(--color-accent-700)' }}>&#8377;{pkg.youPay}</span></div>
      </div>
    );
  }
  if (step.key === 'timeline') {
    return (
      <>
        {step.timeline.map((row) => (
          <div className="timeline-row" key={row.label}>
            <span className={`tdot${row.done ? '' : ' pending'}`} />
            <div>
              <div className={`t-title${row.done ? '' : ' muted'}`}>{row.label}</div>
              <div className="t-meta">{row.time}</div>
            </div>
          </div>
        ))}
      </>
    );
  }
  if (step.key === 'approved') {
    const a = step.approved;
    return (
      <div className="card on-accent">
        <div className="kick">Approved &middot; &#8377;{a.blocked.toLocaleString('en-IN')} blocked</div>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 46, lineHeight: 1, margin: '9px 0 5px', fontVariantNumeric: 'tabular-nums' }}>
          &#8377;{a.youPay}
        </div>
        <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 62%, transparent)' }}>
          payable by you at discharge. Cover left after this case: &#8377;{a.coverRemaining.toLocaleString('en-IN')}.
        </div>
      </div>
    );
  }
  if (step.key === 'discharge') {
    const b = step.bill;
    return (
      <>
        <div className="kv rule-b"><span>Hospital bill</span><span>&#8377;{b.hospitalBill.toLocaleString('en-IN')}</span></div>
        <div className="kv rule-b"><span>Paid by PM-JAY</span><span>&#8377;{b.paidByScheme.toLocaleString('en-IN')}</span></div>
        <div className="kv rule-b"><span>Non-package items written off</span><span>&#8377;{b.writtenOff.toLocaleString('en-IN')}</span></div>
        <div className="kv total"><span>Collected from patient</span><span>&#8377;{b.collectedFromPatient}</span></div>
      </>
    );
  }
  return null;
}

export default function Cashless({ caseData, loading }) {
  if (loading || !caseData?.step) return <div className="loading-note">Opening your case&hellip;</div>;
  const step = caseData.step;
  return (
    <>
      <h3 style={{ fontSize: 28 }}>{step.title}</h3>
      <p style={{ fontSize: 14, margin: 0, color: 'color-mix(in srgb, var(--color-text) 72%, transparent)' }}>{step.body}</p>
      <StepBody step={step} />
    </>
  );
}
