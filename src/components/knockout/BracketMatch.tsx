import { useMatchStore, useTeamStore, useUIStore } from '../../store';
import type { Match } from '../../types';

interface BracketMatchProps {
  matchId?: string;
  label: string;
}

function getWinnerId(match: Match): string | null {
  if (match.status !== 'completed') return null;
  if (match.homeScore === null || match.awayScore === null) return null;
  if (match.homePenalty !== undefined && match.awayPenalty !== undefined) {
    return match.homePenalty > match.awayPenalty ? match.homeTeamId : match.awayTeamId;
  }
  if (match.homeScore > match.awayScore) return match.homeTeamId;
  if (match.awayScore > match.homeScore) return match.awayTeamId;
  return null;
}

export default function BracketMatch({ matchId, label }: BracketMatchProps) {
  const getMatchById = useMatchStore(s => s.getMatchById);
  const getTeamById = useTeamStore(s => s.getTeamById);
  const openScoreModal = useUIStore(s => s.openScoreModal);

  const match = matchId ? getMatchById(matchId) : null;

  const homeTeam = match ? getTeamById(match.homeTeamId) : null;
  const awayTeam = match ? getTeamById(match.awayTeamId) : null;

  const winnerId = match ? getWinnerId(match) : null;
  const isTBD = !match || match.homeTeamId === 'tbd';
  const hasScore = match && match.status !== 'upcoming';

  const teamRowStyle = (teamId: string | null): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6px 10px',
    borderRadius: '6px',
    backgroundColor: winnerId && teamId === winnerId
      ? 'rgba(201,168,76,0.15)'
      : 'transparent',
    border: winnerId && teamId === winnerId
      ? '1px solid rgba(201,168,76,0.3)'
      : '1px solid transparent',
  });

  return (
    <div
      style={{
        width: '180px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: matchId ? 'pointer' : 'default',
        transition: 'all 0.2s',
        boxShadow: '0 2px 12px rgba(15,30,64,0.08)',
      }}
      onClick={() => matchId && openScoreModal(matchId)}
      onMouseEnter={e => {
        if (matchId) (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.8)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#E2E8F0';
      }}
    >
      {/* Label */}
      <div style={{
        padding: '4px 10px',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.07em',
        color: '#64748B',
        backgroundColor: 'rgba(15,30,64,0.03)',
        borderBottom: '1px solid #E2E8F0',
      }}>
        {label}
      </div>

      {/* Teams */}
      <div style={{ padding: '6px' }}>
        {isTBD ? (
          <>
            <div style={{ padding: '8px 10px', color: '#94A3B8', fontSize: '13px' }}>未定</div>
            <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '0 6px' }} />
            <div style={{ padding: '8px 10px', color: '#94A3B8', fontSize: '13px' }}>未定</div>
          </>
        ) : (
          <>
            <div style={teamRowStyle(homeTeam?.id ?? null)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '16px' }}>{homeTeam?.flag ?? '🏳️'}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>
                  {homeTeam?.shortName ?? '???'}
                </span>
              </div>
              {hasScore && (
                <span style={{ fontSize: '14px', fontWeight: 900, color: winnerId === homeTeam?.id ? '#C9A84C' : '#1E293B' }}>
                  {match?.homeScore ?? 0}
                </span>
              )}
            </div>
            <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '2px 0' }} />
            <div style={teamRowStyle(awayTeam?.id ?? null)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '16px' }}>{awayTeam?.flag ?? '🏳️'}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>
                  {awayTeam?.shortName ?? '???'}
                </span>
              </div>
              {hasScore && (
                <span style={{ fontSize: '14px', fontWeight: 900, color: winnerId === awayTeam?.id ? '#C9A84C' : '#1E293B' }}>
                  {match?.awayScore ?? 0}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
