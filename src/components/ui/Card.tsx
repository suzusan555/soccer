import { type ReactNode, useState } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#FFFFFF',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.8)' : '#E2E8F0'}`,
        borderRadius: '12px',
        transition: 'all 0.2s',
        boxShadow: hovered ? '0 4px 20px rgba(15,30,64,0.12)' : '0 2px 12px rgba(15,30,64,0.08)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      className={className}
    >
      {children}
    </div>
  );
}
