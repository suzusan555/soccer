import type { GroupName } from '../types';
import GroupCard from '../components/groups/GroupCard';

const GROUPS: GroupName[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export default function GroupStagePage() {
  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 900,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#1E293B',
          }}
        >
          <span className="gold-gradient-text">グループステージ</span>
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#64748B' }}>
          8グループ · 各4チーム · 上位2チームがノックアウトステージへ進出
        </p>
      </div>

      {/* Grid of group cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
        }}
      >
        {GROUPS.map(group => (
          <GroupCard key={group} group={group} />
        ))}
      </div>
    </div>
  );
}
