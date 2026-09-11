export function HelpMenu({ onOpenClaimUpload, onOpenGrievanceForm }) {
  return (
    <>
      <h3 style={{ fontSize: 27 }}>How can we help?</h3>
      <button className="tile" onClick={onOpenClaimUpload}>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 16 }}>Upload a claim</div>
        <div className="tile-sub">Reimbursement for a non-cashless case</div>
      </button>
      <button className="tile" onClick={onOpenGrievanceForm}>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 16 }}>File a grievance</div>
        <div className="tile-sub">Asked to pay, refused, or stuck on approval</div>
      </button>
      <div style={{ textAlign: 'center', fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 62%, transparent)', marginTop: 'auto' }}>
        Or call 14555 &mdash; free, 24 hours
      </div>
    </>
  );
}

export function ClaimUpload({ requirements, checked, onToggle, onSend, error, sending }) {
  if (!requirements) return <div className="loading-note">Loading requirements&hellip;</div>;
  return (
    <>
      <h3 style={{ fontSize: 26 }}>Four things to photograph</h3>
      <div style={{ fontSize: 13, color: 'color-mix(in srgb, var(--color-text) 65%, transparent)' }}>
        Hold the phone flat over the page, then tap each once it&rsquo;s captured.
      </div>
      {requirements.map((d) => {
        const isChecked = checked.has(d.key);
        return (
          <button key={d.key} className={`doc-row${isChecked ? ' checked' : ''}`} onClick={() => onToggle(d.key)}>
            <span className="doc-thumb">{isChecked ? '✓' : ''}</span>
            <div style={{ flex: 1 }}>
              <div className="doc-name">{d.name}</div>
              <div className="doc-status">{isChecked ? 'Captured' : 'Tap to mark captured'}</div>
            </div>
          </button>
        );
      })}
      {error ? <div className="error-note">{error}</div> : null}
      <button className="btn btn-primary" onClick={onSend} disabled={sending}>{sending ? 'Sending…' : 'Send'}</button>
    </>
  );
}

export function ClaimSent({ claim, onOpenClaimHistory }) {
  if (!claim) return null;
  return (
    <div className="center-note">
      <div className="kick">Sent</div>
      <h3 style={{ fontSize: 28, margin: 0 }}>Claim submitted</h3>
      <div style={{ fontSize: 13, color: 'color-mix(in srgb, var(--color-text) 65%, transparent)' }}>
        Reference {claim.reference}. Decisions usually arrive within 30 days by SMS.
      </div>
      <button className="btn btn-primary" onClick={onOpenClaimHistory}>View claim history</button>
    </div>
  );
}

export function ClaimHistory({ claims }) {
  if (!claims) return <div className="loading-note">Loading claim history&hellip;</div>;
  return (
    <>
      <h3 style={{ fontSize: 26 }}>{claims.length} case{claims.length === 1 ? '' : 's'} on file</h3>
      <table className="table">
        <thead><tr><th>Case</th><th>Paid</th></tr></thead>
        <tbody>
          {claims.map((c) => (
            <tr key={c.reference}>
              <td>
                <div>{c.label}</div>
                <div style={{ fontSize: 11, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>
                  {c.date} &middot; {c.scheme}
                </div>
              </td>
              <td>{c.status === 'pending' ? 'Pending' : `₹${c.amountPaid.toLocaleString('en-IN')}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function GrievanceForm({ options, selectedId, onSelect, details, onDetailsChange, onFile, error, sending }) {
  if (!options) return <div className="loading-note">Loading&hellip;</div>;
  return (
    <>
      <h3 style={{ fontSize: 27 }}>What happened at the hospital?</h3>
      {options.map((g) => {
        const checked = g.id === selectedId;
        return (
          <label key={g.id} className={`radio${checked ? ' checked' : ''}`}>
            <input type="radio" name="gr" checked={checked} onChange={() => onSelect(g.id)} />
            <span className="dot-radio" />
            <span>
              <span className="radio-title">{g.title}</span>
              <span className="radio-sub">{g.sub}</span>
            </span>
          </label>
        );
      })}
      <textarea
        className="input"
        placeholder="In your own words"
        value={details}
        onChange={(e) => onDetailsChange(e.target.value)}
      />
      {error ? <div className="error-note">{error}</div> : null}
      <button className="btn btn-primary" onClick={onFile} disabled={sending}>{sending ? 'Filing…' : 'File grievance'}</button>
    </>
  );
}

export function GrievanceSent({ grievance, onDone }) {
  if (!grievance) return null;
  return (
    <div className="center-note">
      <div className="kick">Filed</div>
      <h3 style={{ fontSize: 28, margin: 0 }}>Grievance registered</h3>
      <div style={{ fontSize: 13, color: 'color-mix(in srgb, var(--color-text) 65%, transparent)' }}>
        Reference {grievance.reference} &middot; {grievance.title}. CGRMS aims to respond within 48 hours.
      </div>
      <button className="btn btn-secondary" onClick={onDone}>Done</button>
    </div>
  );
}
