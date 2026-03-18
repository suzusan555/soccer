import BracketView from '../components/knockout/BracketView';

export default function KnockoutPage() {
  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 900,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <span className="gold-gradient-text">トーナメント表</span>
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#64748B' }}>
          試合をクリックしてスコアを編集できます
        </p>
      </div>

      {/* Bracket — scrollable horizontally */}
      <div
        style={{
          overflowX: 'auto',
          backgroundColor: '#F8FAFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '8px',
        }}
      >
        <BracketView />
      </div>
    </div>
  );
}
