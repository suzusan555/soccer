import { useState } from 'react';
import { useUIStore, useMatchStore, useMatchRecordStore, useTeamStore, useAuthStore } from '../../store';
import type { MatchRecord, ScoreEvent, CardEvent } from '../../types';

export default function MatchRecordModal() {
  const recordModalMatchId = useUIStore(s => s.recordModalMatchId);
  const closeRecordModal = useUIStore(s => s.closeRecordModal);
  const getMatchById = useMatchStore(s => s.getMatchById);
  const getTeamById = useTeamStore(s => s.getTeamById);
  const getRecord = useMatchRecordStore(s => s.getRecord);
  const saveRecord = useMatchRecordStore(s => s.saveRecord);
  const loggedInTeamId = useAuthStore(s => s.loggedInTeamId);

  const match = recordModalMatchId ? getMatchById(recordModalMatchId) : null;
  if (!match || !recordModalMatchId) return null;

  const existing = getRecord(recordModalMatchId);
  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);

  // canEdit: logged in as home or away team
  const canEdit = loggedInTeamId === match.homeTeamId || loggedInTeamId === match.awayTeamId;

  return (
    <MatchRecordModalInner
      matchId={recordModalMatchId}
      homeTeamName={homeTeam?.name ?? 'TBD'}
      awayTeamName={awayTeam?.name ?? 'TBD'}
      homeTeamShort={homeTeam?.shortName ?? '?'}
      awayTeamShort={awayTeam?.shortName ?? '?'}
      homeScore={match.homeScore}
      awayScore={match.awayScore}
      homeTeamId={match.homeTeamId}
      awayTeamId={match.awayTeamId}
      existing={existing}
      canEdit={canEdit}
      loggedInTeamId={loggedInTeamId}
      onSave={saveRecord}
      onClose={closeRecordModal}
    />
  );
}

interface ModalInnerProps {
  matchId: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamShort: string;
  awayTeamShort: string;
  homeScore: number | null;
  awayScore: number | null;
  homeTeamId: string;
  awayTeamId: string;
  existing: MatchRecord | undefined;
  canEdit: boolean;
  loggedInTeamId: string | null;
  onSave: (record: MatchRecord) => void;
  onClose: () => void;
}

function MatchRecordModalInner({
  matchId, homeTeamName, awayTeamName, homeTeamShort, awayTeamShort,
  homeScore, awayScore, homeTeamId, awayTeamId,
  existing, canEdit, loggedInTeamId, onSave, onClose,
}: ModalInnerProps) {
  const [tab, setTab] = useState<'scorers' | 'cards' | 'report'>('scorers');
  const [homeScorers, setHomeScorers] = useState<ScoreEvent[]>(existing?.homeScorers ?? []);
  const [awayScorers, setAwayScorers] = useState<ScoreEvent[]>(existing?.awayScorers ?? []);
  const [yellowCards, setYellowCards] = useState<CardEvent[]>(existing?.yellowCards ?? []);
  const [redCards, setRedCards] = useState<CardEvent[]>(existing?.redCards ?? []);
  const [mvp, setMvp] = useState(existing?.mvp ?? '');
  const [note, setNote] = useState(existing?.note ?? '');
  const [weather, setWeather] = useState(existing?.weather ?? '');
  const [attendance, setAttendance] = useState(existing?.attendance ?? '');

  const addHomeScorer = () => setHomeScorers(s => [...s, { playerName: '', minute: 0, isPenalty: false, isOwnGoal: false }]);
  const addAwayScorer = () => setAwayScorers(s => [...s, { playerName: '', minute: 0, isPenalty: false, isOwnGoal: false }]);
  const addYellowCard = () => setYellowCards(c => [...c, { playerName: '', teamId: homeTeamId, minute: 0 }]);
  const addRedCard = () => setRedCards(c => [...c, { playerName: '', teamId: homeTeamId, minute: 0 }]);

  const handleSave = () => {
    const record: MatchRecord = { matchId, homeScorers, awayScorers, yellowCards, redCards, mvp, note, weather, attendance };
    onSave(record);
    onClose();
  };

  const inputStyle: React.CSSProperties = { backgroundColor: '#F8FAFF', border: '1px solid #E2E8F0', borderRadius: '4px', color: '#1E293B', fontSize: '13px', padding: '4px 8px', outline: 'none' };
  const tabStyle = (active: boolean): React.CSSProperties => ({ padding: '8px 16px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: active ? '#C9A84C' : '#F1F5FF', color: active ? '#0A0E1A' : '#64748B' });

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }} onClick={onClose}>
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '560px', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 8px 32px rgba(15,30,64,0.16)' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#C9A84C' }}>📋 試合記録</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Match title */}
        <div style={{ textAlign: 'center', marginBottom: '16px', padding: '12px', backgroundColor: '#F8FAFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>
            {homeTeamName} {homeScore ?? '-'} : {awayScore ?? '-'} {awayTeamName}
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button style={tabStyle(tab === 'scorers')} onClick={() => setTab('scorers')}>得点者</button>
          <button style={tabStyle(tab === 'cards')} onClick={() => setTab('cards')}>カード</button>
          <button style={tabStyle(tab === 'report')} onClick={() => setTab('report')}>試合レポート</button>
        </div>

        {/* Scorers tab */}
        {tab === 'scorers' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#C9A84C', marginBottom: '8px' }}>🏠 {homeTeamName} 得点者</div>
              {homeScorers.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '6px', alignItems: 'center' }}>
                  <input style={{ ...inputStyle, flex: 1 }} placeholder="選手名" value={s.playerName} onChange={e => setHomeScorers(prev => prev.map((x,j) => j===i ? {...x, playerName: e.target.value} : x))} disabled={!canEdit} />
                  <input style={{ ...inputStyle, width: '50px' }} type="number" placeholder="分" value={s.minute || ''} onChange={e => setHomeScorers(prev => prev.map((x,j) => j===i ? {...x, minute: +e.target.value} : x))} disabled={!canEdit} />
                  <label style={{ fontSize: '11px', color: '#64748B' }}><input type="checkbox" checked={s.isPenalty} onChange={e => setHomeScorers(prev => prev.map((x,j) => j===i ? {...x, isPenalty: e.target.checked} : x))} disabled={!canEdit} /> PK</label>
                  {canEdit && <button onClick={() => setHomeScorers(prev => prev.filter((_,j) => j!==i))} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '14px' }}>✕</button>}
                </div>
              ))}
              {canEdit && <button onClick={addHomeScorer} style={{ fontSize: '12px', color: '#C9A84C', background: 'none', border: '1px dashed rgba(201,168,76,0.4)', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>+ 追加</button>}
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#C9A84C', marginBottom: '8px' }}>✈️ {awayTeamName} 得点者</div>
              {awayScorers.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '6px', alignItems: 'center' }}>
                  <input style={{ ...inputStyle, flex: 1 }} placeholder="選手名" value={s.playerName} onChange={e => setAwayScorers(prev => prev.map((x,j) => j===i ? {...x, playerName: e.target.value} : x))} disabled={!canEdit} />
                  <input style={{ ...inputStyle, width: '50px' }} type="number" placeholder="分" value={s.minute || ''} onChange={e => setAwayScorers(prev => prev.map((x,j) => j===i ? {...x, minute: +e.target.value} : x))} disabled={!canEdit} />
                  <label style={{ fontSize: '11px', color: '#64748B' }}><input type="checkbox" checked={s.isPenalty} onChange={e => setAwayScorers(prev => prev.map((x,j) => j===i ? {...x, isPenalty: e.target.checked} : x))} disabled={!canEdit} /> PK</label>
                  {canEdit && <button onClick={() => setAwayScorers(prev => prev.filter((_,j) => j!==i))} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '14px' }}>✕</button>}
                </div>
              ))}
              {canEdit && <button onClick={addAwayScorer} style={{ fontSize: '12px', color: '#C9A84C', background: 'none', border: '1px dashed rgba(201,168,76,0.4)', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>+ 追加</button>}
            </div>
          </div>
        )}

        {/* Cards tab */}
        {tab === 'cards' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFD700', marginBottom: '8px' }}>🟡 イエローカード</div>
              {yellowCards.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '6px', alignItems: 'center' }}>
                  <input style={{ ...inputStyle, flex: 1 }} placeholder="選手名" value={c.playerName} onChange={e => setYellowCards(prev => prev.map((x,j) => j===i ? {...x, playerName: e.target.value} : x))} disabled={!canEdit} />
                  <select style={inputStyle} value={c.teamId} onChange={e => setYellowCards(prev => prev.map((x,j) => j===i ? {...x, teamId: e.target.value} : x))} disabled={!canEdit}>
                    <option value={homeTeamId}>{homeTeamShort}</option>
                    <option value={awayTeamId}>{awayTeamShort}</option>
                  </select>
                  <input style={{ ...inputStyle, width: '50px' }} type="number" placeholder="分" value={c.minute || ''} onChange={e => setYellowCards(prev => prev.map((x,j) => j===i ? {...x, minute: +e.target.value} : x))} disabled={!canEdit} />
                  {canEdit && <button onClick={() => setYellowCards(prev => prev.filter((_,j) => j!==i))} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '14px' }}>✕</button>}
                </div>
              ))}
              {canEdit && <button onClick={addYellowCard} style={{ fontSize: '12px', color: '#FFD700', background: 'none', border: '1px dashed rgba(255,215,0,0.4)', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>+ 追加</button>}
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#ff6b6b', marginBottom: '8px' }}>🔴 レッドカード</div>
              {redCards.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '6px', alignItems: 'center' }}>
                  <input style={{ ...inputStyle, flex: 1 }} placeholder="選手名" value={c.playerName} onChange={e => setRedCards(prev => prev.map((x,j) => j===i ? {...x, playerName: e.target.value} : x))} disabled={!canEdit} />
                  <select style={inputStyle} value={c.teamId} onChange={e => setRedCards(prev => prev.map((x,j) => j===i ? {...x, teamId: e.target.value} : x))} disabled={!canEdit}>
                    <option value={homeTeamId}>{homeTeamShort}</option>
                    <option value={awayTeamId}>{awayTeamShort}</option>
                  </select>
                  <input style={{ ...inputStyle, width: '50px' }} type="number" placeholder="分" value={c.minute || ''} onChange={e => setRedCards(prev => prev.map((x,j) => j===i ? {...x, minute: +e.target.value} : x))} disabled={!canEdit} />
                  {canEdit && <button onClick={() => setRedCards(prev => prev.filter((_,j) => j!==i))} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '14px' }}>✕</button>}
                </div>
              ))}
              {canEdit && <button onClick={addRedCard} style={{ fontSize: '12px', color: '#ff6b6b', background: 'none', border: '1px dashed rgba(255,107,107,0.4)', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>+ 追加</button>}
            </div>
          </div>
        )}

        {/* Report tab */}
        {tab === 'report' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#A89B7A', marginBottom: '6px', fontWeight: 700 }}>⭐ MVP選手</label>
              <input style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} placeholder="選手名を入力" value={mvp} onChange={e => setMvp(e.target.value)} disabled={!canEdit} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#A89B7A', marginBottom: '6px', fontWeight: 700 }}>🌤 天気</label>
              <select style={{ ...inputStyle, width: '100%' }} value={weather} onChange={e => setWeather(e.target.value)} disabled={!canEdit}>
                <option value="">選択してください</option>
                <option value="晴れ">☀️ 晴れ</option>
                <option value="曇り">☁️ 曇り</option>
                <option value="雨">🌧 雨</option>
                <option value="雪">❄️ 雪</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#A89B7A', marginBottom: '6px', fontWeight: 700 }}>👥 観客数</label>
              <input style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} placeholder="例: 12,500" value={attendance} onChange={e => setAttendance(e.target.value)} disabled={!canEdit} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#A89B7A', marginBottom: '6px', fontWeight: 700 }}>📝 試合レポート</label>
              <textarea style={{ ...inputStyle, width: '100%', boxSizing: 'border-box', minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' }} placeholder="試合の内容を記録してください..." value={note} onChange={e => setNote(e.target.value)} disabled={!canEdit} />
            </div>
          </div>
        )}

        {/* Save button */}
        {canEdit ? (
          <button onClick={handleSave} style={{ marginTop: '20px', width: '100%', padding: '12px', backgroundColor: '#C9A84C', color: '#0A0E1A', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>
            💾 記録を保存
          </button>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#94A3B8' }}>
            {loggedInTeamId ? '※ この試合のチームのみ編集できます' : '※ 編集するにはチームログインが必要です'}
          </p>
        )}
      </div>
    </div>
  );
}
