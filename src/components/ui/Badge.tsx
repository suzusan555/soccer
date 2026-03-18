interface BadgeProps {
  label: string;
  variant: 'live' | 'upcoming' | 'completed' | 'gold';
}

const styles: Record<BadgeProps['variant'], React.CSSProperties> = {
  live: {
    backgroundColor: 'rgba(34,197,94,0.2)',
    border: '1px solid rgba(34,197,94,0.5)',
    color: '#22c55e',
  },
  upcoming: {
    backgroundColor: 'transparent',
    border: '1px solid rgba(201,168,76,0.4)',
    color: '#A89B7A',
  },
  completed: {
    backgroundColor: 'rgba(100,116,139,0.2)',
    border: '1px solid rgba(100,116,139,0.4)',
    color: '#94a3b8',
  },
  gold: {
    backgroundColor: 'rgba(201,168,76,0.2)',
    border: '1px solid rgba(201,168,76,0.5)',
    color: '#C9A84C',
  },
};

export default function Badge({ label, variant }: BadgeProps) {
  return (
    <span
      style={{
        ...styles[variant],
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: '999px',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </span>
  );
}
