export default function LivePulse() {
  return (
    <div style={{ position: 'relative', width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Ring */}
      <div
        className="live-ring"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          border: '2px solid #22c55e',
        }}
      />
      {/* Dot */}
      <div
        className="live-dot"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#22c55e',
          position: 'relative',
          zIndex: 1,
        }}
      />
    </div>
  );
}
