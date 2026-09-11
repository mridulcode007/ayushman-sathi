export default function Header({ showBack, onBack, title, showLangSwitch, lang, onSetLang }) {
  return (
    <header className="app-header">
      <div className="head-row">
        {showBack ? (
          <button className="back-btn" onClick={onBack}>&larr; Back</button>
        ) : (
          <span />
        )}
        {!showLangSwitch && title ? <div className="kick">{title}</div> : null}
        {showLangSwitch ? (
          <div className="seg">
            <button className="seg-opt" data-on={lang === 'en' ? '1' : '0'} onClick={() => onSetLang('en')}>EN</button>
            <button className="seg-opt" data-on={lang === 'hi' ? '1' : '0'} onClick={() => onSetLang('hi')}>हिं</button>
          </div>
        ) : (
          <span />
        )}
      </div>
      <div className="rule" />
    </header>
  );
}
