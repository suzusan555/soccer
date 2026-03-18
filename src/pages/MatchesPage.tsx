import { useState } from 'react';
import { useMatchStore } from '../store';
import MatchCard from '../components/matches/MatchCard';
import type { GroupName } from '../types';

type Filter =
  | 'all'
  | GroupName
  | 'round_of_16'
  | 'quarter_final'
  | 'semi_final'
  | 'final';

const filters: { label: string; value: Filter }[] = [
  { label: 'すべて', value: 'all' },
  { label: 'グループA', value: 'A' },
  { label: 'グループB', value: 'B' },
  { label: 'グループC', value: 'C' },
  { label: 'グループD', value: 'D' },
  { label: 'グループE', value: 'E' },
  { label: 'グループF', value: 'F' },
  { label: 'グループG', value: 'G' },
  { label: 'グループH', value: 'H' },
  { label: 'ラウンド16', value: 'round_of_16' },
  { label: '準々決勝', value: 'quarter_final' },
  { label: '準決勝', value: 'semi_final' },
  { label: '決勝', value: 'final' },
];

const groupNames: GroupName[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export default function MatchesPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const matches = useMatchStore(s => s.matches);

  const filtered = matches.filter(m => {
    if (activeFilter === 'all') return true;
    if (groupNames.includes(activeFilter as GroupName)) {
      return m.stage === 'group' && m.group === activeFilter;
    }
    return m.stage === activeFilter;
  });

  const sorted = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 900,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <span className="gold-gradient-text">試合一覧</span>
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#64748B' }}>
          {sorted.length}試合を表示中
        </p>
      </div>

      {/* Filter buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
        {filters.map(f => {
          const isActive = activeFilter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: isActive ? '#C9A84C' : '#F1F5FF',
                color: isActive ? '#0A0E1A' : '#64748B',
                border: isActive ? '1px solid #C9A84C' : '1px solid #E2E8F0',
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Match grid */}
      {sorted.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748B', fontSize: '15px' }}>
          このフィルターに一致する試合が見つかりませんでした
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '16px',
          }}
        >
          {sorted.map(m => (
            <MatchCard key={m.id} matchId={m.id} />
          ))}
        </div>
      )}
    </div>
  );
}
