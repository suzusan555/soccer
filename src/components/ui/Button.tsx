import { type ReactNode, useState } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    padding: '8px 20px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s',
    border: 'none',
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: hovered ? '#E8C96D' : '#C9A84C',
    color: '#0A0E1A',
  };

  const secondaryStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: 'transparent',
    border: `1px solid ${hovered ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.4)'}`,
    color: hovered ? '#C9A84C' : '#A89B7A',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={variant === 'primary' ? primaryStyle : secondaryStyle}
      className={className}
    >
      {children}
    </button>
  );
}
