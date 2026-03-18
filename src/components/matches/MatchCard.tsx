import { useMatchStore, useTeamStore, useUIStore, useMatchRecordStore } from '../../store';
import { STAGE_LABELS } from '../../types';

export default function MatchCard({ matchId }: { matchId: string }) {
  const getMatchById = useMatchStore(s => s.getMatchById);
  const getTeamById = useTeamStore(s => s.getTeamById);
  const openScoreModal = useUIStore(s => s.openScoreModal);
  const openRecordModal = useUIStore(s => s.openRecordModal);
  const getRecord = useMatchRecordStore(s => s.getRecord);

  const match = getMatchById(matchId);
  if (!match) return null;

  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);
  const hasRecord = !!getRecord(matchId);
  const isTBD = match.homeTeamId === 'tbd' || match.awayTeamId === 'tbd';

  const statusLabel = match.status === 'live' ? '⚡ 試合中' : match.status === 'completed' ? '終了' : '未開始';
  const statusColor = match.status === 'live' ? '#22c55e' : match.status === 'completed' ? '#A89B7A' : '#C9A84C';

  const dateStr = new Date(match.date).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' });

  return (
    <div
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px 20px', marginBottom: '12px', transition: 'border-color 0.2s', boxShadow: '0 2px 12px rgba(15,30,64,0.08)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.7)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#E2E8F0')}
    >
      {/* Top row: stage + status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '4px', padding: '2px 8px', color: '#C9A84C', letterSpacing: '0.04em' }}>
            {STAGE_LABELS[match.stage]}
          </span>
          {match.group && <span style={{ fontSize: '11px', color: '#64748B' }}>グループ{match.group}</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {hasRecord && <span title="試合記録あり" style={{ fontSize: '14px' }}>📋</span>}
          <span style={{ fontSize: '11px', fontWeight: 700, color: statusColor }}>{statusLabel}</span>
          {match.status === 'live' && match.minute && <span style={{ fontSize: '11px', color: '#22c55e' }}>{match.minute}'</span>}

        </div>
      </div>

      {/* Teams + Score */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <span style={{ fontSize: '22px' }}>{homeTeam?.flag ?? '❓'}</span>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>{isTBD ? '未定' : homeTeam?.name ?? ''}</span>
        </div>
        <div style={{ fontSize: '22px', fontWeight: 900, color: match.status === 'upcoming' ? '#94A3B8' : '#1E293B', minWidth: '80px', textAlign: 'center', letterSpacing: '0.05em' }}>
          {match.status === 'upcoming' ? '- : -' : `${match.homeScore} : ${match.awayScore}`}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, justifyContent: 'flex-end' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>{isTBD ? '未定' : awayTeam?.name ?? ''}</span>
          <span style={{ fontSize: '22px' }}>{awayTeam?.flag ?? '❓'}</span>
        </div>
      </div>

      {/* Penalty */}
      {match.status === 'completed' && (match.homePenalty !== undefined || match.awayPenalty !== undefined) && (
        <div style={{ textAlign: 'center', marginBottom: '8px', fontSize: '12px', color: '#64748B' }}>
          (PK: {match.homePenalty ?? 0} - {match.awayPenalty ?? 0})
        </div>
      )}

      {/* Bottom: date/venue + buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', color: '#64748B' }}>
          📅 {dateStr} {match.time}　📍 {match.venue}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => openRecordModal(matchId)} style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', backgroundColor: 'transparent', border: '1px solid #E2E8F0', borderRadius: '5px', padding: '4px 10px', cursor: 'pointer' }}>
            試合記録
          </button>
          {!isTBD && (
            <button onClick={() => openScoreModal(matchId)} style={{ fontSize: '11px', fontWeight: 700, color: '#0A0E1A', backgroundColor: '#C9A84C', border: 'none', borderRadius: '5px', padding: '4px 10px', cursor: 'pointer' }}>
              スコア入力
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
