const TABS = [
  { key: 'home', label: 'Home' },
  { key: 'cards', label: 'Cards' },
  { key: 'hospitals', label: 'Hospitals' },
  { key: 'help', label: 'Help' }
];

export default function TabBar({ active, onNavigate }) {
  return (
    <nav className="tabbar">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className="tabbtn"
          data-on={active === tab.key ? '1' : '0'}
          onClick={() => onNavigate(tab.key)}
        >
          <span className="bar" />
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
