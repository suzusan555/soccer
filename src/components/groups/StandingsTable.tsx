import { useMatchStore, useTeamStore } from '../../store';
import { computeStandings } from '../../store/groupStore';
import type { GroupName } from '../../types';

interface StandingsTableProps {
  group: GroupName;
}

export default function StandingsTable({ group }: StandingsTableProps) {
  const matches = useMatchStore(s => s.matches);
  const teams = useTeamStore(s => s.teams);

  const allStandings = computeStandings(matches, teams);
  const groupStandings = allStandings
    .filter(s => s.group === group)
    .sort((a, b) =>
      b.points - a.points ||
      b.goalDifference - a.goalDifference ||
      b.goalsFor - a.goalsFor
    );

  const getTeamById = (id: string) => teams.find(t => t.id === id);

  const thStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 700,
    color: '#64748B',
    letterSpacing: '0.08em',
    padding: '6px 8px',
    textAlign: 'center',
    borderBottom: '1px solid #E2E8F0',
  };

  const tdStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#1E293B',
    padding: '8px 8px',
    textAlign: 'center',
    borderBottom: '1px solid rgba(15,30,64,0.06)',
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, textAlign: 'left', width: '28px' }}>順</th>
            <th style={{ ...thStyle, textAlign: 'left', minWidth: '120px' }}>チーム</th>
            <th style={thStyle}>試</th>
            <th style={thStyle}>勝</th>
            <th style={thStyle}>分</th>
            <th style={thStyle}>負</th>
            <th style={thStyle}>得</th>
            <th style={thStyle}>失</th>
            <th style={thStyle}>差</th>
            <th style={{ ...thStyle, color: '#C9A84C' }}>勝点</th>
          </tr>
        </thead>
        <tbody>
          {groupStandings.map((standing, idx) => {
            const team = getTeamById(standing.teamId);
            const isAdvancing = idx < 2;
            const isEliminated = idx >= 2 && standing.played === 3;

            const rowBorderLeft = isAdvancing
              ? '3px solid #C9A84C'
              : isEliminated
              ? '3px solid rgba(239,68,68,0.5)'
              : '3px solid transparent';

            return (
              <tr key={standing.teamId} style={{ borderLeft: rowBorderLeft }}>
                <td style={{ ...tdStyle, textAlign: 'left', paddingLeft: '10px', color: isAdvancing ? '#C9A84C' : '#64748B', fontWeight: 700 }}>
                  {idx + 1}
                </td>
                <td style={{ ...tdStyle, textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{team?.flag ?? '🏳️'}</span>
                    <span style={{ fontWeight: 600 }}>{team?.shortName ?? '???'}</span>
                  </div>
                </td>
                <td style={tdStyle}>{standing.played}</td>
                <td style={tdStyle}>{standing.won}</td>
                <td style={tdStyle}>{standing.drawn}</td>
                <td style={tdStyle}>{standing.lost}</td>
                <td style={tdStyle}>{standing.goalsFor}</td>
                <td style={tdStyle}>{standing.goalsAgainst}</td>
                <td style={{ ...tdStyle, color: standing.goalDifference > 0 ? '#22c55e' : standing.goalDifference < 0 ? '#ef4444' : '#1E293B' }}>
                  {standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference}
                </td>
                <td style={{ ...tdStyle, fontWeight: 900, fontSize: '15px', color: '#C9A84C' }}>
                  {standing.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
