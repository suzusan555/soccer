import { useUIStore } from '../../store';
import type { Category } from '../../types';
import { CATEGORY_LABELS } from '../../types';

const categories: Category[] = ['pro', 'youth', 'shakaijin', 'shougakkou', 'chuugakkou', 'futsal'];

const categoryIcons: Record<Category, string> = {
  pro: '🏆',
  youth: '⭐',
  shakaijin: '👔',
  shougakkou: '🎒',
  chuugakkou: '📚',
  futsal: '🥅',
};

export default function CategoryBanner() {
  const selectedCategory = useUIStore(s => s.selectedCategory);
  const setSelectedCategory = useUIStore(s => s.setSelectedCategory);

  return (
    <div style={{ backgroundColor: '#0F1629', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto' }}>
      <span style={{ fontSize: '11px', color: '#B8C5E0', fontWeight: 700, letterSpacing: '0.06em', marginRight: '6px', whiteSpace: 'nowrap' }}>カテゴリ：</span>
      {categories.map(cat => (
        <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '4px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '999px', border: selectedCategory === cat ? '1px solid #C9A84C' : '1px solid rgba(201,168,76,0.2)', backgroundColor: selectedCategory === cat ? 'rgba(201,168,76,0.15)' : 'transparent', color: selectedCategory === cat ? '#C9A84C' : '#B8C5E0', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
          {categoryIcons[cat]} {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
