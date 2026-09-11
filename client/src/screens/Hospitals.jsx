export function HospitalList({ hospitals, onOpenHospital }) {
  if (!hospitals) return <div className="loading-note">Finding hospitals near you&hellip;</div>;
  return (
    <>
      <input className="input" value="Nashik &middot; 10 km" readOnly />
      {hospitals.map((h) => (
        <button
          key={h.id}
          onClick={() => onOpenHospital(h.id)}
          style={{ textAlign: 'left', width: '100%', padding: '14px 0', border: 0, borderBottom: '1px solid var(--color-divider)', background: 'transparent', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 16 }}>{h.name}</div>
            <span style={{ fontSize: 12, fontVariantNumeric: 'tabular-nums', color: 'var(--color-accent)' }}>{h.dist}</span>
          </div>
          <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 60%, transparent)', marginTop: 3 }}>{h.sub}</div>
        </button>
      ))}
    </>
  );
}

export function HospitalDetail({ hospital, onOpenCost, loading }) {
  if (loading || !hospital) return <div className="loading-note">Loading hospital details&hellip;</div>;
  return (
    <>
      <h3 style={{ fontSize: 26 }}>{hospital.name}</h3>
      <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>{hospital.sub} &middot; {hospital.dist}</div>
      <div style={{ height: 1, background: 'var(--color-divider)' }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {hospital.schemes.map((s, i) => (
          <span key={s} className={`tag ${i === 0 ? 'tag-accent' : i === 1 ? 'tag-accent' : 'tag-outline'}`}>{s}</span>
        ))}
      </div>
      <div className="kv rule-b" style={{ paddingTop: 4 }}>
        <span style={{ color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>Ayushman Mitra desk</span>
        <span>{hospital.mitraDesk}</span>
      </div>
      <div className="kv" style={{ paddingBottom: 4 }}>
        <span style={{ color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>Refusals reported</span>
        <span>{hospital.refusals90d} in 90 days</span>
      </div>
      <button className="btn btn-primary" onClick={onOpenCost}>What will this cost me?</button>
    </>
  );
}

export function HospitalCost({ cost, loading, error }) {
  if (loading) return <div className="loading-note">Working out the package rate&hellip;</div>;
  if (error) return <div className="error-note">{error}</div>;
  if (!cost) return null;
  const pkg = cost.package;
  return (
    <>
      <div className="kick">What will this cost me?</div>
      <input className="input" value={cost.procedure} readOnly />
      <div className="card on-accent">
        <div className="kick">PJ-OR-19 &middot; HBP 2022</div>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 18, marginTop: 4 }}>{pkg.title}</div>
        <div style={{ height: 1, background: 'var(--color-divider)', margin: '8px 0' }} />
        <div className="kv" style={{ padding: '3px 0' }}><span>Package rate</span><span>&#8377;{pkg.rate.toLocaleString('en-IN')}</span></div>
        <div className="kv" style={{ padding: '3px 0' }}><span>Covered by PM-JAY</span><span>&#8377;{pkg.covered.toLocaleString('en-IN')}</span></div>
        <div className="kv total" style={{ paddingTop: 5 }}><span>You pay</span><span>&#8377;{cost.youPay}</span></div>
      </div>
      <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 65%, transparent)' }}>
        Includes ward, surgeon, implant, medicines, and 15 days of follow-up at {cost.hospital}.
      </div>
    </>
  );
}
