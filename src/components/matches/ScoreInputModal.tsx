import { useState, useEffect } from 'react';
import { useUIStore, useMatchStore, useTeamStore } from '../../store';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function ScoreInputModal() {
  const scoreModalMatchId = useUIStore(s => s.scoreModalMatchId);
  const closeScoreModal = useUIStore(s => s.closeScoreModal);
  const getMatchById = useMatchStore(s => s.getMatchById);
  const updateScore = useMatchStore(s => s.updateScore);
  const setMatchLive = useMatchStore(s => s.setMatchLive);
  const getTeamById = useTeamStore(s => s.getTeamById);

  const match = scoreModalMatchId ? getMatchById(scoreModalMatchId) : null;

  const [homeScore, setHomeScore] = useState('0');
  const [awayScore, setAwayScore] = useState('0');
  const [homePenalty, setHomePenalty] = useState('');
  const [awayPenalty, setAwayPenalty] = useState('');
  const [minute, setMinute] = useState('45');
  const [showPenalties, setShowPenalties] = useState(false);

  useEffect(() => {
    if (match) {
      setHomeScore(match.homeScore !== null ? String(match.homeScore) : '0');
      setAwayScore(match.awayScore !== null ? String(match.awayScore) : '0');
      setHomePenalty(match.homePenalty !== undefined ? String(match.homePenalty) : '');
      setAwayPenalty(match.awayPenalty !== undefined ? String(match.awayPenalty) : '');
      setMinute(match.minute !== undefined ? String(match.minute) : '45');
      setShowPenalties(match.homePenalty !== undefined || match.awayPenalty !== undefined);
    }
  }, [match]);

  if (!match) return null;

  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);

  const isKnockout = match.stage !== 'group';

  const handleFullTime = () => {
    const hs = parseInt(homeScore) || 0;
    const as_ = parseInt(awayScore) || 0;
    const hp = showPenalties && homePenalty !== '' ? parseInt(homePenalty) : undefined;
    const ap = showPenalties && awayPenalty !== '' ? parseInt(awayPenalty) : undefined;
    updateScore(match.id, hs, as_, hp, ap);
    closeScoreModal();
  };

  const handleSetLive = () => {
    const m = parseInt(minute) || 1;
    setMatchLive(match.id, m);
    closeScoreModal();
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#F8FAFF',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    color: '#1E293B',
    fontSize: '24px',
    fontWeight: 900,
    textAlign: 'center',
    padding: '12px',
    width: '80px',
    outline: 'none',
  };

  const smallInputStyle: React.CSSProperties = {
    ...inputStyle,
    fontSize: '16px',
    padding: '8px',
    width: '64px',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#64748B',
    fontWeight: 600,
    letterSpacing: '0.05em',
    marginBottom: '4px',
    display: 'block',
  };

  return (
    <Modal
      isOpen={!!scoreModalMatchId}
      onClose={closeScoreModal}
      title="スコア入力"
    >
      {/* Teams */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        {/* Home */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '36px', marginBottom: '4px' }}>{homeTeam?.flag ?? '🏳️'}</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>
            {homeTeam?.name ?? 'ホーム'}
          </div>
          <span style={{ fontSize: '11px', color: '#64748B' }}>{homeTeam?.shortName ?? 'HOME'}</span>
        </div>

        {/* Score inputs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{ textAlign: 'center' }}>
            <label style={labelStyle}>ホーム</label>
            <input
              type="number"
              min="0"
              value={homeScore}
              onChange={e => setHomeScore(e.target.value)}
              style={inputStyle}
            />
          </div>
          <span style={{ fontSize: '20px', color: '#64748B', fontWeight: 700 }}>-</span>
          <div style={{ textAlign: 'center' }}>
            <label style={labelStyle}>アウェイ</label>
            <input
              type="number"
              min="0"
              value={awayScore}
              onChange={e => setAwayScore(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Away */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '36px', marginBottom: '4px' }}>{awayTeam?.flag ?? '🏳️'}</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>
            {awayTeam?.name ?? 'アウェイ'}
          </div>
          <span style={{ fontSize: '11px', color: '#64748B' }}>{awayTeam?.shortName ?? 'AWAY'}</span>
        </div>
      </div>

      {/* Minute input */}
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <label style={labelStyle}>経過時間（分）</label>
          <input
            type="number"
            min="1"
            max="120"
            value={minute}
            onChange={e => setMinute(e.target.value)}
            style={smallInputStyle}
          />
        </div>
      </div>

      {/* Penalty inputs (knockout only) */}
      {isKnockout && (
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '12px' }}>
            <input
              type="checkbox"
              checked={showPenalties}
              onChange={e => setShowPenalties(e.target.checked)}
              style={{ accentColor: '#C9A84C' }}
            />
            <span style={{ fontSize: '13px', color: '#64748B' }}>PK戦</span>
          </label>
          {showPenalties && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <label style={labelStyle}>ホームPK</label>
                <input
                  type="number"
                  min="0"
                  value={homePenalty}
                  onChange={e => setHomePenalty(e.target.value)}
                  style={smallInputStyle}
                />
              </div>
              <span style={{ fontSize: '16px', color: '#64748B' }}>-</span>
              <div style={{ textAlign: 'center' }}>
                <label style={labelStyle}>アウェイPK</label>
                <input
                  type="number"
                  min="0"
                  value={awayPenalty}
                  onChange={e => setAwayPenalty(e.target.value)}
                  style={smallInputStyle}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: '16px' }}>
        <Button variant="secondary" onClick={closeScoreModal}>
          キャンセル
        </Button>
        <Button variant="secondary" onClick={handleSetLive}>
          試合中にする
        </Button>
        <Button variant="primary" onClick={handleFullTime}>
          試合終了
        </Button>
      </div>
    </Modal>
  );
}
