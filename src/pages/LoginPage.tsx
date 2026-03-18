import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeamStore, useAuthStore } from '../store';
import type { Category } from '../types';
import { CATEGORY_LABELS } from '../types';

const categories: Category[] = ['pro', 'youth', 'shakaijin', 'shougakkou', 'chuugakkou', 'futsal'];

export default function LoginPage() {
  const navigate = useNavigate();
  const teams = useTeamStore(s => s.teams);
  const login = useAuthStore(s => s.login);
  const [selectedCategory, setSelectedCategory] = useState<Category>('pro');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const filteredTeams = teams.filter(t => t.category === selectedCategory);

  const handleLogin = () => {
    const team = teams.find(t => t.id === selectedTeamId);
    if (!team) { setError('チームを選択してください'); return; }
    if (team.password !== password) { setError('パスワードが正しくありません'); return; }
    login(team.id);
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F4FF', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚽</div>
          <h1 className="gold-gradient-text" style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '0.1em', margin: 0 }}>チームログイン</h1>
          <p style={{ color: '#64748B', fontSize: '13px', marginTop: '8px' }}>チームアカウントでログインしてください</p>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 24px rgba(15,30,64,0.10)' }}>
          {/* Category */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#64748B', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '8px' }}>カテゴリ</label>
            <select value={selectedCategory} onChange={e => { setSelectedCategory(e.target.value as Category); setSelectedTeamId(''); }} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#F8FAFF', border: '1px solid #E2E8F0', borderRadius: '6px', color: '#1E293B', fontSize: '14px', outline: 'none' }}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
              ))}
            </select>
          </div>

          {/* Team */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#64748B', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '8px' }}>チーム名</label>
            <select value={selectedTeamId} onChange={e => setSelectedTeamId(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#F8FAFF', border: '1px solid #E2E8F0', borderRadius: '6px', color: '#1E293B', fontSize: '14px', outline: 'none' }}>
              <option value="">チームを選択してください</option>
              {filteredTeams.map(t => (
                <option key={t.id} value={t.id}>{t.flag} {t.name}</option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#64748B', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '8px' }}>パスワード</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="チームパスワードを入力" style={{ width: '100%', padding: '10px 12px', backgroundColor: '#F8FAFF', border: '1px solid #E2E8F0', borderRadius: '6px', color: '#1E293B', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          {error && <p style={{ color: '#ff6b6b', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}

          <button onClick={handleLogin} style={{ width: '100%', padding: '12px', backgroundColor: '#C9A84C', color: '#0A0E1A', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', letterSpacing: '0.08em' }}>
            ログイン
          </button>

          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#94A3B8' }}>
            ※ チームIDとパスワードは管理者にお問い合わせください
          </p>
        </div>

        <button onClick={() => navigate('/')} style={{ display: 'block', margin: '20px auto 0', background: 'none', border: 'none', color: '#64748B', fontSize: '13px', cursor: 'pointer' }}>
          ← ホームに戻る
        </button>
      </div>
    </div>
  );
}
