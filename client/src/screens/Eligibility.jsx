function SchemeCard({ scheme }) {
  const tagClass = scheme.status === 'confirmed' ? 'tag-accent' : scheme.status === 'apply' ? 'tag-outline' : 'tag-neutral';
  const tagText = scheme.status === 'confirmed' ? 'Confirmed' : scheme.status === 'apply' ? 'Apply' : 'Automatic';
  return (
    <div className={`card${scheme.status === 'confirmed' ? ' on-accent' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 17 }}>{scheme.name}</div>
        <span className={`tag ${tagClass}`}>{tagText}</span>
      </div>
      <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 62%, transparent)', marginTop: 4 }}>
        {scheme.desc}
      </div>
    </div>
  );
}

export default function Eligibility({ phase, question, qIndex, onAnswer, result, onIssueCards, loading }) {
  if (loading) return <div className="loading-note">Checking your details&hellip;</div>;

  if (phase === 'result') {
    return (
      <>
        <div className="kick">Result &middot; 3 answers</div>
        <h3 style={{ fontSize: 28 }}>You qualify for {result.schemes.length} scheme{result.schemes.length === 1 ? '' : 's'}</h3>
        <div className="rule" style={{ background: 'var(--color-divider)', height: 1 }} />
        <div className="stack">
          {result.schemes.map((s) => <SchemeCard key={s.id} scheme={s} />)}
        </div>
        <button className="btn btn-primary" onClick={onIssueCards}>Issue my cards</button>
      </>
    );
  }

  if (!question) return null;
  const pct = Math.round(((qIndex + 1) / 3) * 100);
  return (
    <>
      <div className="kick">Question {qIndex + 1} of 3</div>
      <div style={{ height: 3, background: 'var(--color-accent-200)' }}>
        <div style={{ height: '100%', background: 'var(--color-accent)', width: `${pct}%` }} />
      </div>
      <h3 style={{ fontSize: 27, marginTop: 6 }}>{question.text}</h3>
      <p style={{ fontSize: 13, margin: 0, color: 'color-mix(in srgb, var(--color-text) 65%, transparent)' }}>{question.help}</p>
      <div className="stack">
        <button className="tile" style={{ padding: '14px 16px' }} onClick={() => onAnswer('yes')}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 17 }}>Yes</span>
        </button>
        <button className="tile" style={{ padding: '14px 16px' }} onClick={() => onAnswer('no')}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 17 }}>No</span>
        </button>
      </div>
    </>
  );
}
