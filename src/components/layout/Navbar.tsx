import { NavLink, useNavigate } from 'react-router-dom';
import { useMatchStore, useAuthStore, useTeamStore } from '../../store';

const navLinks = [
  { to: '/', label: 'ホーム', end: true },
  { to: '/groups', label: 'グループ', end: false },
  { to: '/matches', label: '試合一覧', end: false },
  { to: '/knockout', label: 'トーナメント', end: false },
  { to: '/teams', label: 'チーム', end: false },
  { to: '/schedule', label: '日程', end: false },
];

export default function Navbar() {
  const navigate = useNavigate();
  const getLiveMatches = useMatchStore(s => s.getLiveMatches);
  const liveMatches = getLiveMatches();
  const hasLive = liveMatches.length > 0;
  const loggedInTeamId = useAuthStore(s => s.loggedInTeamId);
  const logout = useAuthStore(s => s.logout);
  const getTeamById = useTeamStore(s => s.getTeamById);
  const loggedInTeam = loggedInTeamId ? getTeamById(loggedInTeamId) : null;

  return (
    <nav style={{ backgroundColor: '#0F1629', borderBottom: '1px solid rgba(201,168,76,0.3)', height: '64px', display: 'flex', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px', gap: '24px', position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <span style={{ fontSize: '24px' }}>⚽</span>
        <span className="gold-gradient-text" style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
          サッカー管理システム
        </span>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'center' }}>
        {navLinks.map(link => (
          <NavLink key={link.to} to={link.to} end={link.end} style={({ isActive }) => ({
            padding: '6px 12px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em',
            textDecoration: 'none', color: isActive ? '#C9A84C' : '#A89B7A',
            borderBottom: isActive ? '2px solid #C9A84C' : '2px solid transparent',
            transition: 'all 0.2s', whiteSpace: 'nowrap',
          })}>
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Right: Live + Login */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {hasLive && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '999px', padding: '3px 10px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} className="live-dot" />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e' }}>LIVE</span>
          </div>
        )}
        {loggedInTeam ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#C9A84C', fontWeight: 600 }}>{loggedInTeam.flag} {loggedInTeam.name}</span>
            <button onClick={() => logout()} style={{ fontSize: '11px', color: '#A89B7A', background: 'none', border: '1px solid rgba(168,155,122,0.4)', borderRadius: '4px', padding: '3px 8px', cursor: 'pointer' }}>
              ログアウト
            </button>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} style={{ fontSize: '12px', fontWeight: 700, color: '#0F1629', backgroundColor: '#C9A84C', border: 'none', borderRadius: '6px', padding: '5px 14px', cursor: 'pointer', letterSpacing: '0.04em' }}>
            チームログイン
          </button>
        )}
      </div>
    </nav>
  );
}
