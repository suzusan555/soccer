import { useMatchStore, useTeamStore } from '../../store';
import Card from '../ui/Card';

export default function RecentResults() {
  const getRecentResults = useMatchStore(s => s.getRecentResults);
  const getTeamById = useTeamStore(s => s.getTeamById);

  const recentMatches = getRecentResults(5);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });

  return (
    <Card>
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 800, color: '#C9A84C', letterSpacing: '0.1em' }}>
          最近の試合結果
        </h3>

        {recentMatches.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', color: '#64748B', fontSize: '13px' }}>
            まだ終了した試合はありません
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {recentMatches.map(match => {
              const homeTeam = getTeamById(match.homeTeamId);
              const awayTeam = getTeamById(match.awayTeamId);

              const homeWon = (match.homeScore ?? 0) > (match.awayScore ?? 0);
              const awayWon = (match.awayScore ?? 0) > (match.homeScore ?? 0);

              return (
                <div
                  key={match.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(15,30,64,0.03)',
                    gap: '8px',
                  }}
                >
                  {/* Date */}
                  <div style={{ fontSize: '11px', color: '#64748B', minWidth: '44px' }}>
                    {formatDate(match.date)}
                  </div>

                  {/* Home team */}
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '13px', fontWeight: homeWon ? 800 : 400, color: homeWon ? '#1E293B' : '#64748B' }}>
                      {homeTeam?.shortName ?? '???'}
                    </span>
                    <span style={{ fontSize: '18px' }}>{homeTeam?.flag ?? '🏳️'}</span>
                  </div>

                  {/* Score */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    <span style={{ fontSize: '16px', fontWeight: 900, color: '#1E293B', minWidth: '16px', textAlign: 'center' }}>
                      {match.homeScore ?? 0}
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>-</span>
                    <span style={{ fontSize: '16px', fontWeight: 900, color: '#1E293B', minWidth: '16px', textAlign: 'center' }}>
                      {match.awayScore ?? 0}
                    </span>
                  </div>

                  {/* Away team */}
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '18px' }}>{awayTeam?.flag ?? '🏳️'}</span>
                    <span style={{ fontSize: '13px', fontWeight: awayWon ? 800 : 400, color: awayWon ? '#1E293B' : '#64748B' }}>
                      {awayTeam?.shortName ?? '???'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
