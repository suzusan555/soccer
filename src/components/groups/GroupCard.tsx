import type { GroupName } from '../../types';
import Card from '../ui/Card';
import StandingsTable from './StandingsTable';

interface GroupCardProps {
  group: GroupName;
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3
            style={{
              margin: 0,
              fontSize: '15px',
              fontWeight: 900,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C9A84C',
            }}
          >
            グループ {group}
          </h3>
          <span style={{ fontSize: '20px' }}>⚽</span>
        </div>
        <StandingsTable group={group} />
        <div style={{ marginTop: '10px', display: 'flex', gap: '12px', fontSize: '11px', color: '#64748B' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '10px', height: '10px', borderLeft: '3px solid #C9A84C' }} />
            <span>勝ち抜け</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '10px', height: '10px', borderLeft: '3px solid rgba(239,68,68,0.5)' }} />
            <span>敗退</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
