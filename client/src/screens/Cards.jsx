export function CardsWallet({ profile, onOpenQr }) {
  if (!profile) return <div className="loading-note">Loading your cards&hellip;</div>;
  return (
    <>
      <h3 style={{ fontSize: 28 }}>Carry all four</h3>
      <button className="tile" style={{ borderColor: 'var(--color-accent)' }} onClick={onOpenQr}>
        <div className="kick">Ayushman card &middot; PM-JAY</div>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 19, marginTop: 6 }}>
          {profile.name.toUpperCase()}
        </div>
        <div style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '.12em', fontSize: 14, marginTop: 4 }}>
          {profile.cardNumber}
        </div>
      </button>
      <div className="card">
        <div className="kick">ABHA &middot; health records</div>
        <div style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '.1em', fontSize: 14, marginTop: 6 }}>{profile.abha.id}</div>
        <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>
          {profile.abha.handle} &middot; {profile.abha.linkedRecords} linked records
        </div>
      </div>
      <div className="card">
        <div className="kick">Private cover &middot; TPA</div>
        <div style={{ fontSize: 14, marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>
          Policy {profile.privateCover.policy} &middot; &#8377;{profile.privateCover.sumInsured.toLocaleString('en-IN')}
        </div>
      </div>
    </>
  );
}

export function CardsQr({ profile }) {
  if (!profile) return <div className="loading-note">Loading your card&hellip;</div>;
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="kick">Show this at the Ayushman Mitra desk</div>
      <div style={{ display: 'grid', placeItems: 'center', padding: '20px 0' }}>
        <div className="qr-box qr-big" />
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 22 }}>{profile.name.toUpperCase()}</div>
      <div style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '.14em', fontSize: 16 }}>{profile.cardNumber}</div>
      <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 65%, transparent)', marginTop: 14 }}>
        Works without network &mdash; the code is signed and cached.
      </div>
    </div>
  );
}
