import { useMatchStore } from '../../store';
import BracketMatch from './BracketMatch';

export default function BracketView() {
  const getMatchesByStage = useMatchStore(s => s.getMatchesByStage);

  const r16 = getMatchesByStage('round_of_16');
  const qf = getMatchesByStage('quarter_final');
  const sf = getMatchesByStage('semi_final');
  const finalMatch = getMatchesByStage('final');

  const colStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
    minWidth: '200px',
  };

  const colHeaderStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '0.12em',
    color: '#C9A84C',
    marginBottom: '8px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  };

  // Vertical spacing per round to create converging effect
  const r16Gap = 4;
  const qfGap = 96;
  const sfGap = 236;
  const r16Matches = r16.slice(0, 8);
  const qfMatches = qf.slice(0, 4);
  const sfMatches = sf.slice(0, 2);
  const finaleMatch = finalMatch[0];

  return (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        overflowX: 'auto',
        padding: '24px',
        alignItems: 'flex-start',
      }}
    >
      {/* Round of 16 */}
      <div style={colStyle}>
        <div style={colHeaderStyle}>ラウンド16</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${r16Gap}px` }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ marginBottom: i % 2 === 1 ? '20px' : '0' }}>
              <BracketMatch
                matchId={r16Matches[i]?.id}
                label={`R16 第${i + 1}試合`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quarter-Finals */}
      <div style={colStyle}>
        <div style={colHeaderStyle}>準々決勝</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${qfGap}px`, paddingTop: '56px' }}>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} style={{ marginBottom: i % 2 === 1 ? '20px' : '0' }}>
              <BracketMatch
                matchId={qfMatches[i]?.id}
                label={`QF ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Semi-Finals */}
      <div style={colStyle}>
        <div style={colHeaderStyle}>準決勝</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${sfGap}px`, paddingTop: '152px' }}>
          {Array.from({ length: 2 }, (_, i) => (
            <BracketMatch
              key={i}
              matchId={sfMatches[i]?.id}
              label={`SF ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Final */}
      <div style={colStyle}>
        <div style={colHeaderStyle}>決勝</div>
        <div style={{ paddingTop: '370px' }}>
          <BracketMatch
            matchId={finaleMatch?.id}
            label="決勝"
          />
          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '32px' }}>🏆</div>
        </div>
      </div>
    </div>
  );
}
