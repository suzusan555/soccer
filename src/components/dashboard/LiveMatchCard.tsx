import { useMatchStore, useTeamStore, useUIStore } from '../../store';
import Card from '../ui/Card';
import LivePulse from '../ui/LivePulse';
import Button from '../ui/Button';

export default function LiveMatchCard() {
  const getLiveMatches = useMatchStore(s => s.getLiveMatches);
  const getTeamById = useTeamStore(s => s.getTeamById);
  const openScoreModal = useUIStore(s => s.openScoreModal);

  const liveMatches = getLiveMatches();

  if (liveMatches.length === 0) {
    return (
      <Card>
        <div style={{ padding: '40px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📺</div>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 700, color: '#64748B', letterSpacing: '0.06em' }}>
            ライブ試合なし
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
            日程を確認して次の試合をチェックしてください
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {liveMatches.map(match => {
        const homeTeam = getTeamById(match.homeTeamId);
        const awayTeam = getTeamById(match.awayTeamId);

        return (
          <Card key={match.id}>
            <div style={{ padding: '20px 24px' }}>
              {/* Live header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LivePulse />
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#22c55e', letterSpacing: '0.08em' }}>試合中</span>
                  <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                    {match.minute}'
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: '#64748B' }}>📍 {match.venue}</span>
              </div>

              {/* Score display */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                {/* Home */}
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '44px', marginBottom: '6px' }}>{homeTeam?.flag ?? '🏳️'}</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#1E293B' }}>{homeTeam?.name ?? 'ホーム'}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{homeTeam?.shortName}</div>
                </div>

                {/* Score */}
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '52px', fontWeight: 900, color: '#1E293B', lineHeight: 1 }}>
                      {match.homeScore ?? 0}
                    </span>
                    <span style={{ fontSize: '28px', color: '#64748B' }}>-</span>
                    <span style={{ fontSize: '52px', fontWeight: 900, color: '#1E293B', lineHeight: 1 }}>
                      {match.awayScore ?? 0}
                    </span>
                  </div>
                </div>

                {/* Away */}
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '44px', marginBottom: '6px' }}>{awayTeam?.flag ?? '🏳️'}</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#1E293B' }}>{awayTeam?.name ?? 'アウェイ'}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{awayTeam?.shortName}</div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <Button variant="secondary" onClick={() => openScoreModal(match.id)}>
                  スコア更新
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
