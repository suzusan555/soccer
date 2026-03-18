import { useUIStore } from '../../store';
import { CATEGORY_LABELS } from '../../types';
import { INITIAL_TOURNAMENT } from '../../data/initialData';

export default function TournamentBanner() {
  const selectedCategory = useUIStore(s => s.selectedCategory);

  return (
    <div style={{ background: 'linear-gradient(180deg, #1B2B5E 0%, #0F1E40 100%)', padding: '32px 32px 24px', textAlign: 'center', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
      <div style={{ fontSize: '48px', marginBottom: '8px' }}>⚽</div>
      <h1 className="gold-gradient-text" style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: 900, letterSpacing: '0.12em' }}>
        サッカー管理システム
      </h1>
      <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#B8C5E0' }}>
        チーム・試合・トーナメント管理プラットフォーム
      </p>
      <div style={{ display: 'inline-block', backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '8px', padding: '6px 20px' }}>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#C9A84C' }}>
          現在のカテゴリ：{CATEGORY_LABELS[selectedCategory]} — {INITIAL_TOURNAMENT.hostRegion}
        </span>
      </div>
    </div>
  );
}
