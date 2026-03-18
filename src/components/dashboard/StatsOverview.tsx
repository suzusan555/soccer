import { useMatchStore, useTeamStore } from '../../store';

export default function StatsOverview() {
  const matches = useMatchStore(s => s.matches);
  const teams = useTeamStore(s => s.teams);
  const completed = matches.filter(m => m.status === 'completed').length;
  const live = matches.filter(m => m.status === 'live').length;

  const stats = [
    { icon: '⚽', value: matches.length, label: '総試合数', highlight: false },
    { icon: '✅', value: completed, label: '終了試合', highlight: false },
    { icon: '⚡', value: live, label: '進行中', highlight: live > 0 },
    { icon: '🏟', value: teams.length, label: '参加チーム', highlight: false },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '24px 32px' }}>
      {stats.map((s, i) => (
        <div key={i} style={{ backgroundColor: '#FFFFFF', border: `1px solid ${s.highlight ? 'rgba(34,197,94,0.4)' : '#E2E8F0'}`, borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 12px rgba(15,30,64,0.08)' }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: s.highlight ? '#22c55e' : '#C9A84C', marginBottom: '4px' }}>{s.value}</div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', letterSpacing: '0.06em' }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
