export default function Home({ onStartCashless, onStartEligibility, onGoHospitals }) {
  return (
    <>
      <h3 style={{ fontSize: 30 }}>What do you need today?</h3>
      <div className="stack">
        <button className="tile" onClick={onStartCashless}>
          <div className="kick">01</div>
          <div className="tile-title">Get admitted free</div>
          <div className="tile-sub">Show your card, we handle the pre-authorisation</div>
        </button>
        <button className="tile" onClick={onStartEligibility}>
          <div className="kick">02</div>
          <div className="tile-title">Check what I&rsquo;m owed</div>
          <div className="tile-sub">Seven schemes checked against your details</div>
        </button>
        <button className="tile" onClick={onGoHospitals}>
          <div className="kick">03</div>
          <div className="tile-title">Find a free hospital</div>
          <div className="tile-sub">Empanelled and currently accepting cases</div>
        </button>
      </div>
    </>
  );
}
