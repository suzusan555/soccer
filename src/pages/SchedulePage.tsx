import { useMatchStore, useTeamStore } from '../store';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import LivePulse from '../components/ui/LivePulse';
import { STAGE_LABELS } from '../types';

export default function SchedulePage() {
  const matches = useMatchStore(s => s.matches);
  const getTeamById = useTeamStore(s => s.getTeamById);

  // Group by date
  const byDate = new Map<string, typeof matches>();
  const sorted = [...matches].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });

  sorted.forEach(m => {
    if (!byDate.has(m.date)) byDate.set(m.date, []);
    byDate.get(m.date)!.push(m);
  });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('ja-JP', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div style={{ padding: '32px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 900,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <span className="gold-gradient-text">試合日程</span>
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#64748B' }}>
          全{matches.length}試合 · 2026年4月1日 〜 2026年6月14日
        </p>
      </div>

      {/* Date sections */}
      {Array.from(byDate.entries()).map(([date, dayMatches]) => (
        <div key={date} style={{ marginBottom: '32px' }}>
          {/* Date header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
              paddingBottom: '8px',
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#C9A84C', letterSpacing: '0.04em' }}>
              {formatDate(date)}
            </span>
            <span style={{ fontSize: '12px', color: '#64748B', backgroundColor: 'rgba(201,168,76,0.1)', borderRadius: '999px', padding: '2px 10px' }}>
              {dayMatches.length}試合
            </span>
          </div>

          {/* Matches for this day */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dayMatches.map(match => {
              const homeTeam = getTeamById(match.homeTeamId);
              const awayTeam = getTeamById(match.awayTeamId);
              const isLive = match.status === 'live';
              const isCompleted = match.status === 'completed';
              const stageLabel = match.stage === 'group' && match.group
                ? `グループ${match.group}`
                : STAGE_LABELS[match.stage];

              return (
                <Card key={match.id}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      gap: '12px',
                    }}
                  >
                    {/* Time */}
                    <div style={{ minWidth: '52px', textAlign: 'center' }}>
                      {isLive ? (
                        <LivePulse />
                      ) : (
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B' }}>
                          {match.time}
                        </span>
                      )}
                    </div>

                    {/* Stage badge */}
                    <div style={{ minWidth: '100px' }}>
                      <Badge
                        label={stageLabel}
                        variant={
                          isLive ? 'live' :
                          isCompleted ? 'completed' :
                          match.stage === 'final' ? 'gold' : 'upcoming'
                        }
                      />
                    </div>

                    {/* Match */}
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                      {/* Home */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, justifyContent: 'flex-end' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>
                          {homeTeam?.name ?? '未定'}
                        </span>
                        <span style={{ fontSize: '22px' }}>{homeTeam?.flag ?? '🏳️'}</span>
                      </div>

                      {/* Score or vs */}
                      <div style={{ minWidth: '64px', textAlign: 'center', flexShrink: 0 }}>
                        {isCompleted || isLive ? (
                          <span style={{ fontSize: '18px', fontWeight: 900, color: '#1E293B' }}>
                            {match.homeScore ?? 0} - {match.awayScore ?? 0}
                          </span>
                        ) : (
                          <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 700 }}>vs</span>
                        )}
                      </div>

                      {/* Away */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, justifyContent: 'flex-start' }}>
                        <span style={{ fontSize: '22px' }}>{awayTeam?.flag ?? '🏳️'}</span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>
                          {awayTeam?.name ?? '未定'}
                        </span>
                      </div>
                    </div>

                    {/* Venue */}
                    <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'right', minWidth: '120px' }}>
                      📍 {match.venue}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
