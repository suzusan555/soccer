import { useTeamStore } from '../store';
import Card from '../components/ui/Card';
import type { GroupName } from '../types';

const groupColors: Record<GroupName, string> = {
  A: '#C9A84C',
  B: '#6366f1',
  C: '#22c55e',
  D: '#f97316',
  E: '#06b6d4',
  F: '#ec4899',
  G: '#a855f7',
  H: '#14b8a6',
};

export default function TeamsPage() {
  const teams = useTeamStore(s => s.teams);
  const searchQuery = useTeamStore(s => s.searchQuery);
  const setSearchQuery = useTeamStore(s => s.setSearchQuery);

  const filtered = teams.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.prefecture.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: 900,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <span className="gold-gradient-text">チーム一覧</span>
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#64748B' }}>
            {filtered.length} / {teams.length} チーム
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="チームを検索..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            backgroundColor: '#F8FAFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            color: '#1E293B',
            fontSize: '14px',
            padding: '10px 16px',
            outline: 'none',
            width: '240px',
          }}
        />
      </div>

      {/* Team grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
        }}
      >
        {filtered.map(team => (
          <Card key={team.id}>
            <div style={{ padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>{team.flag}</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#1E293B', marginBottom: '4px' }}>
                {team.name}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>
                📍 {team.prefecture}
              </div>
              <div
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  backgroundColor: `${groupColors[team.group]}22`,
                  border: `1px solid ${groupColors[team.group]}55`,
                  color: groupColors[team.group],
                }}
              >
                グループ {team.group}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748B', fontSize: '15px' }}>
          「{searchQuery}」に一致するチームが見つかりませんでした
        </div>
      )}
    </div>
  );
}
