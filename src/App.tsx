// @ts-nocheck
import { useState, useEffect, useCallback, useMemo } from "react";
// ========== THEME ==========
const T = {
  bg: "#f0f4f0",
  card: "#ffffff",
  cardAlt: "#f8faf8",
  headerBg: "linear-gradient(135deg, #1b6b3a, #0d8044, #1b6b3a)",
  accent: "#0d8044",
  accentLight: "#e8f5ed",
  gold: "#d4a017",
  goldLight: "#fdf3d4",
  goldGrad: "linear-gradient(135deg, #d4a017, #e6b422, #d4a017)",
  text: "#1a2a1e",
  textSub: "#5a6b5e",
  textMuted: "#8a9b8e",
  border: "#d8e4da",
  borderLight: "#e8f0ea",
  shadow: "0 2px 12px rgba(0,60,20,0.06)",
  shadowHover: "0 8px 30px rgba(0,60,20,0.12)",
};
// ========== DATA ==========
const CATEGORIES = [
  { id: "futsal", label: "フットサル", icon: "⚡", color: "#0891b2" },
  { id: "shakaijin", label: "社会人", icon: "🏢", color: "#2563eb" },
  { id: "shogakko", label: "小学校", icon: "🎒", color: "#e11d48" },
  { id: "chugakko", label: "中学校", icon: "📚", color: "#ea580c" },
  { id: "pro", label: "プロ", icon: "⭐", color: "#b45309" },
  { id: "youth", label: "ユース", icon: "🌱", color: "#16a34a" },
];
const REGIONS = ["北海道", "東北", "関東", "中部", "近畿", "中国", "四国", "九州"];
const SAMPLE_TEAMS = [
  { id: 1, name: "FC Thunder Bolt", category: "shakaijin", region: "関東", level: 4, wins: 12, losses: 3, draws: 2, logo: "⚡", desc: "社会人リーグ所属。週末活動中。試合相手募集！", members: 22, founded: 2018 },
  { id: 2, name: "キッズスターズ", category: "shogakko", region: "近畿", level: 3, wins: 8, losses: 5, draws: 1, logo: "⭐", desc: "小学3〜6年生のチーム。楽しくサッカー！", members: 18, founded: 2020 },
  { id: 3, name: "フットサルクラブ NEXUS", category: "futsal", region: "関東", level: 5, wins: 20, losses: 2, draws: 0, logo: "🔥", desc: "フットサルF2リーグ目標。真剣勝負希望。", members: 14, founded: 2016 },
  { id: 4, name: "ブルーウィングス中学", category: "chugakko", region: "中部", level: 3, wins: 6, losses: 4, draws: 3, logo: "🦅", desc: "中学校サッカー部。県大会上位目指してます。", members: 25, founded: 2019 },
  { id: 5, name: "FC GOLD RUSH", category: "pro", region: "九州", level: 5, wins: 30, losses: 5, draws: 3, logo: "👑", desc: "プロリーグ参入を目指す本格派チーム。", members: 30, founded: 2014 },
  { id: 6, name: "ユースアカデミーFC", category: "youth", region: "東北", level: 4, wins: 15, losses: 7, draws: 2, logo: "🌟", desc: "U-18ユースチーム。将来のプロ選手育成中。", members: 28, founded: 2017 },
  { id: 7, name: "サンダーキッズ", category: "shogakko", region: "関東", level: 2, wins: 4, losses: 8, draws: 2, logo: "⚽", desc: "サッカーを始めたばかりの子供たちのチーム。", members: 15, founded: 2022 },
  { id: 8, name: "VORTEX FC", category: "shakaijin", region: "近畿", level: 5, wins: 18, losses: 4, draws: 1, logo: "🌀", desc: "全国社会人大会出場経験あり。強豪チーム。", members: 24, founded: 2015 },
  { id: 9, name: "フットサルMASTERS", category: "futsal", region: "中部", level: 3, wins: 10, losses: 6, draws: 2, logo: "🎯", desc: "エンジョイフットサル。初心者歓迎！", members: 12, founded: 2021 },
  { id: 10, name: "ドラゴンズユースFC", category: "youth", region: "関東", level: 4, wins: 14, losses: 5, draws: 4, logo: "🐉", desc: "U-15ユース。技術重視の育成方針。", members: 20, founded: 2018 },
];
const SAMPLE_MATCHES = [
  { id: 1, team1: "FC Thunder Bolt", team2: "VORTEX FC", score1: 3, score2: 2, date: "2026-03-10", category: "shakaijin", venue: "多摩川グラウンド" },
  { id: 2, team1: "キッズスターズ", team2: "サンダーキッズ", score1: 1, score2: 1, date: "2026-03-08", category: "shogakko", venue: "大阪市立小学校" },
  { id: 3, team1: "フットサルクラブ NEXUS", team2: "フットサルMASTERS", score1: 5, score2: 1, date: "2026-03-05", category: "futsal", venue: "横浜アリーナ" },
  { id: 4, team1: "FC GOLD RUSH", team2: "FC Thunder Bolt", score1: 4, score2: 0, date: "2026-02-28", category: "pro", venue: "福岡ドーム" },
  { id: 5, team1: "ユースアカデミーFC", team2: "ドラゴンズユースFC", score1: 2, score2: 2, date: "2026-02-25", category: "youth", venue: "仙台ユースフィールド" },
];
const SAMPLE_REQUESTS = [
  { id: 1, teamName: "FC Thunder Bolt", category: "shakaijin", date: "2026-04-05", time: "14:00", venue: "多摩川グラウンド", level: 4, message: "4月の練習試合相手を探しています！同レベルのチーム希望。" },
  { id: 2, teamName: "キッズスターズ", category: "shogakko", date: "2026-04-12", time: "10:00", venue: "大阪市立グラウンド", level: 3, message: "春の交流試合しませんか？楽しくやりましょう！" },
  { id: 3, teamName: "フットサルクラブ NEXUS", category: "futsal", date: "2026-03-29", time: "19:00", venue: "品川フットサルコート", level: 5, message: "ガチ勝負希望。上級チームのみ。" },
];
// ========== COMPONENTS ==========
function Card({ children, style: s = {}, hover = true, ...props }) {
  return (
    <div
      style={{
        background: T.card, borderRadius: 16, border: `1px solid ${T.border}`,
        boxShadow: T.shadow, transition: "all 0.25s ease", overflow: "hidden", ...s,
      }}
      onMouseEnter={hover ? e => { e.currentTarget.style.boxShadow = T.shadowHover; e.currentTarget.style.transform = "translateY(-2px)"; } : undefined}
      onMouseLeave={hover ? e => { e.currentTarget.style.boxShadow = T.shadow; e.currentTarget.style.transform = "translateY(0)"; } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
function StarRating({ level, size = 16 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= level ? T.gold : "#ddd" }}>★</span>
      ))}
    </div>
  );
}
function CategoryBadge({ categoryId, small = false }) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: small ? "2px 8px" : "4px 12px",
      borderRadius: 20, fontSize: small ? 10 : 12, fontWeight: 700,
      background: `${cat.color}12`, color: cat.color,
      border: `1px solid ${cat.color}28`,
    }}>
      {cat.icon} {cat.label}
    </span>
  );
}
function GreenBtn({ children, style: s = {}, ...props }) {
  return (
    <button
      style={{
        padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer",
        background: T.headerBg, color: "#fff",
        fontWeight: 800, fontSize: 13, fontFamily: "'Oswald', sans-serif",
        letterSpacing: 1, textTransform: "uppercase",
        boxShadow: "0 4px 15px rgba(13,128,68,0.25)",
        transition: "all 0.2s", ...s,
      }}
      onMouseEnter={e => e.target.style.transform = "scale(1.03)"}
      onMouseLeave={e => e.target.style.transform = "scale(1)"}
      {...props}
    >
      {children}
    </button>
  );
}
function GoldBtn({ children, style: s = {}, ...props }) {
  return (
    <button
      style={{
        padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer",
        background: T.goldGrad, color: "#fff",
        fontWeight: 800, fontSize: 13, fontFamily: "'Oswald', sans-serif",
        letterSpacing: 1, textTransform: "uppercase",
        boxShadow: "0 4px 15px rgba(212,160,23,0.3)",
        transition: "all 0.2s", ...s,
      }}
      onMouseEnter={e => e.target.style.transform = "scale(1.03)"}
      onMouseLeave={e => e.target.style.transform = "scale(1)"}
      {...props}
    >
      {children}
    </button>
  );
}
function StatMini({ label, value, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 17, fontWeight: 800, color, fontFamily: "'Oswald', sans-serif" }}>{value}</div>
      <div style={{ fontSize: 10, color: T.textMuted }}>{label}</div>
    </div>
  );
}
function TeamCard({ team, onSelect, onChallenge }) {
  const cat = CATEGORIES.find(c => c.id === team.category);
  const totalGames = team.wins + team.losses + team.draws;
  const winRate = totalGames > 0 ? Math.round((team.wins / totalGames) * 100) : 0;
  return (
    <Card style={{ cursor: "pointer" }} onClick={() => onSelect(team)}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: `linear-gradient(135deg, ${cat?.color}18, ${cat?.color}08)`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
              border: `2px solid ${cat?.color}30`,
            }}>
              {team.logo}
            </div>
            <div>
              <h3 style={{ margin: 0, color: T.text, fontSize: 16, fontFamily: "'Oswald', sans-serif", letterSpacing: 1 }}>{team.name}</h3>
              <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center" }}>
                <CategoryBadge categoryId={team.category} small />
                <span style={{ fontSize: 11, color: T.textMuted }}>📍{team.region}</span>
              </div>
            </div>
          </div>
          <StarRating level={team.level} size={14} />
        </div>
        <p style={{ margin: "8px 0", fontSize: 13, color: T.textSub, lineHeight: 1.6 }}>{team.desc}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
          <div style={{ display: "flex", gap: 18 }}>
            <StatMini label="勝" value={team.wins} color="#16a34a" />
            <StatMini label="敗" value={team.losses} color="#dc2626" />
            <StatMini label="分" value={team.draws} color="#d97706" />
            <StatMini label="勝率" value={`${winRate}%`} color="#2563eb" />
          </div>
          <GoldBtn onClick={(e) => { e.stopPropagation(); onChallenge(team); }} style={{ padding: "8px 20px", fontSize: 12 }}>
            ⚔️ 対戦申込
          </GoldBtn>
        </div>
      </div>
    </Card>
  );
}
function MatchRecord({ match }) {
  const isTeam1Win = match.score1 > match.score2;
  const isTeam2Win = match.score2 > match.score1;
  const isDraw = match.score1 === match.score2;
  return (
    <Card>
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <CategoryBadge categoryId={match.category} small />
          <span style={{ fontSize: 11, color: T.textMuted }}>📅 {match.date}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "10px 0" }}>
          <div style={{ flex: 1, textAlign: "right" }}>
            <div style={{
              fontSize: 14, fontWeight: 700, color: isTeam1Win ? T.accent : T.textSub,
              fontFamily: "'Oswald', sans-serif",
            }}>{match.team1}</div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 18px", borderRadius: 10,
            background: isDraw ? T.goldLight : T.accentLight,
            border: `1px solid ${isDraw ? "#d4a01733" : "#0d804433"}`,
          }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: isTeam1Win ? T.accent : T.textMuted, fontFamily: "'Oswald', sans-serif" }}>{match.score1}</span>
            <span style={{ fontSize: 16, color: T.textMuted, fontWeight: 300 }}>–</span>
            <span style={{ fontSize: 26, fontWeight: 900, color: isTeam2Win ? T.accent : T.textMuted, fontFamily: "'Oswald', sans-serif" }}>{match.score2}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 14, fontWeight: 700, color: isTeam2Win ? T.accent : T.textSub,
              fontFamily: "'Oswald', sans-serif",
            }}>{match.team2}</div>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: T.textMuted }}>🏟️ {match.venue}</div>
      </div>
    </Card>
  );
}
function RequestCard({ request, onApply }) {
  return (
    <Card>
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <h4 style={{ margin: "0 0 6px", color: T.accent, fontFamily: "'Oswald', sans-serif", fontSize: 17 }}>{request.teamName}</h4>
            <CategoryBadge categoryId={request.category} small />
          </div>
          <StarRating level={request.level} size={13} />
        </div>
        <p style={{ margin: "10px 0", fontSize: 13, color: T.textSub, lineHeight: 1.6 }}>{request.message}</p>
        <div style={{ display: "flex", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: T.textMuted }}>📅 {request.date}</span>
          <span style={{ fontSize: 12, color: T.textMuted }}>⏰ {request.time}</span>
          <span style={{ fontSize: 12, color: T.textMuted }}>📍 {request.venue}</span>
        </div>
        <button
          onClick={() => onApply(request)}
          style={{
            width: "100%", padding: "11px", borderRadius: 10, border: `2px solid ${T.accent}`,
            background: "transparent", color: T.accent, fontWeight: 700, fontSize: 13,
            cursor: "pointer", fontFamily: "'Oswald', sans-serif", letterSpacing: 1,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.background = T.accentLight; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; }}
        >
          この募集に応募する
        </button>
      </div>
    </Card>
  );
}
// ========== LOGIN ==========
function LoginPage({ onLogin }) {
  const [teamId, setTeamId] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [regData, setRegData] = useState({ name: "", category: "shakaijin", region: "関東", password: "" });
  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: 10, border: `1.5px solid ${T.border}`,
    background: "#fff", color: T.text, fontSize: 14, outline: "none", boxSizing: "border-box",
    transition: "border 0.2s", fontFamily: "'Noto Sans JP', sans-serif",
  };
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(170deg, #e8f5ed 0%, #f0f4f0 40%, #fdf3d4 100%)`,
      padding: 20, position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
        background: "linear-gradient(0deg, #d4edda55 0%, transparent 100%)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "10%", left: "5%", width: 200, height: 200, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(13,128,68,0.06) 0%, transparent 70%)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "8%", width: 250, height: 250, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)", pointerEvents: "none",
      }} />
      <Card hover={false} style={{ maxWidth: 430, width: "100%", position: "relative", zIndex: 1, borderTop: `4px solid ${T.accent}` }}>
        <div style={{ padding: "40px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 56, marginBottom: 8 }}>🏆</div>
            <h1 style={{
              margin: 0, fontSize: 30, fontFamily: "'Oswald', sans-serif",
              fontWeight: 900, letterSpacing: 3, textTransform: "uppercase",
              background: "linear-gradient(135deg, #1b6b3a, #0d8044)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>PITCH MATCH</h1>
            <p style={{ margin: "6px 0 0", color: T.textMuted, fontSize: 13, letterSpacing: 1 }}>サッカーチーム対戦マッチング</p>
          </div>
          {!isRegister ? (
            <>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", marginBottom: 6, color: T.textSub, fontSize: 12, fontWeight: 600 }}>チームID</label>
                <input style={inputStyle} placeholder="チームIDを入力" value={teamId} onChange={e => setTeamId(e.target.value)}
                  onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", marginBottom: 6, color: T.textSub, fontSize: 12, fontWeight: 600 }}>パスワード</label>
                <input style={inputStyle} type="password" placeholder="パスワードを入力" value={password} onChange={e => setPassword(e.target.value)}
                  onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} />
              </div>
              <GreenBtn onClick={() => onLogin({ id: 1, name: "FC Thunder Bolt", category: "shakaijin", region: "関東", desc: "社会人リーグ所属。週末活動中。試合相手募集！", members: ["田中 太郎", "佐藤 次郎", "鈴木 三郎"], password: "password" })}
                style={{ width: "100%", padding: 14, fontSize: 16, letterSpacing: 2 }}>
                ログイン
              </GreenBtn>
              <p style={{ textAlign: "center", marginTop: 20, color: T.textMuted, fontSize: 13 }}>
                アカウントをお持ちでないですか？
                <span style={{ color: T.accent, cursor: "pointer", marginLeft: 6, fontWeight: 700 }} onClick={() => setIsRegister(true)}>新規登録</span>
              </p>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", marginBottom: 6, color: T.textSub, fontSize: 12, fontWeight: 600 }}>チーム名</label>
                <input style={inputStyle} placeholder="チーム名を入力" value={regData.name} onChange={e => setRegData({ ...regData, name: e.target.value })} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", marginBottom: 6, color: T.textSub, fontSize: 12, fontWeight: 600 }}>カテゴリ</label>
                <select style={{ ...inputStyle, appearance: "none" }} value={regData.category} onChange={e => setRegData({ ...regData, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", marginBottom: 6, color: T.textSub, fontSize: 12, fontWeight: 600 }}>地域</label>
                <select style={{ ...inputStyle, appearance: "none" }} value={regData.region} onChange={e => setRegData({ ...regData, region: e.target.value })}>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", marginBottom: 6, color: T.textSub, fontSize: 12, fontWeight: 600 }}>パスワード</label>
                <input style={inputStyle} type="password" placeholder="パスワードを設定" value={regData.password} onChange={e => setRegData({ ...regData, password: e.target.value })} />
              </div>
              <GreenBtn onClick={() => onLogin({ id: 99, name: regData.name || "My Team", category: regData.category, region: regData.region, desc: "", members: [], password: regData.password })}
                style={{ width: "100%", padding: 14, fontSize: 16, letterSpacing: 2 }}>
                チームを登録
              </GreenBtn>
              <p style={{ textAlign: "center", marginTop: 20, color: T.textMuted, fontSize: 13 }}>
                すでにアカウントをお持ちですか？
                <span style={{ color: T.accent, cursor: "pointer", marginLeft: 6, fontWeight: 700 }} onClick={() => setIsRegister(false)}>ログイン</span>
              </p>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
// ========== HEADER ==========
function Header({ currentUser, currentPage, setCurrentPage, onLogout }) {
  const navItems = [
    { id: "home", label: "ホーム", icon: "🏠" },
    { id: "teams", label: "チーム検索", icon: "🔍" },
    { id: "requests", label: "対戦募集", icon: "📢" },
    { id: "matches", label: "試合記録", icon: "📊" },
    { id: "myteam", label: "マイチーム", icon: "⚽" },
  ];
  return (
    <header style={{
      background: T.headerBg, position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 4px 20px rgba(0,60,20,0.15)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 26 }}>🏆</span>
            <span style={{ fontSize: 20, fontFamily: "'Oswald', sans-serif", fontWeight: 900, letterSpacing: 2, color: "#fff" }}>PITCH MATCH</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{currentUser.name}</span>
            <button onClick={onLogout} style={{
              padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 11, cursor: "pointer", fontWeight: 600,
            }}>ログアウト</button>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 0, overflowX: "auto" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)} style={{
              padding: "10px 16px", border: "none", cursor: "pointer",
              background: "transparent", color: currentPage === item.id ? "#fff" : "rgba(255,255,255,0.6)",
              fontSize: 13, fontWeight: currentPage === item.id ? 700 : 400,
              borderBottom: currentPage === item.id ? "3px solid #ffd700" : "3px solid transparent",
              transition: "all 0.2s", whiteSpace: "nowrap", fontFamily: "'Noto Sans JP', sans-serif",
            }}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
// ========== PAGES ==========
function HomePage({ setCurrentPage }) {
  return (
    <div style={{ padding: "32px 20px", maxWidth: 1200, margin: "0 auto" }}>
      <Card hover={false} style={{
        marginBottom: 32, overflow: "hidden", borderTop: `4px solid ${T.gold}`,
        background: `linear-gradient(135deg, #e8f5ed 0%, #fdf3d4 50%, #e8f5ed 100%)`,
      }}>
        <div style={{ padding: "48px 32px", textAlign: "center", position: "relative" }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.04,
            backgroundImage: "repeating-linear-gradient(90deg, #1b6b3a 0px, #1b6b3a 1px, transparent 1px, transparent 60px)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🏆</div>
            <h1 style={{
              margin: "0 0 8px", fontSize: 38, fontFamily: "'Oswald', sans-serif",
              fontWeight: 900, letterSpacing: 4, textTransform: "uppercase",
              background: "linear-gradient(135deg, #1b6b3a, #0d8044)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>PITCH MATCH</h1>
            <p style={{ color: T.textSub, fontSize: 16, marginBottom: 28, letterSpacing: 1 }}>最高の対戦相手を見つけよう</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <GreenBtn onClick={() => setCurrentPage("teams")} style={{ padding: "14px 36px", fontSize: 15 }}>
                🔍 チームを探す
              </GreenBtn>
              <button onClick={() => setCurrentPage("requests")} style={{
                padding: "14px 36px", borderRadius: 10, cursor: "pointer",
                border: `2px solid ${T.accent}`, background: "rgba(255,255,255,0.7)", color: T.accent,
                fontWeight: 700, fontSize: 15, fontFamily: "'Oswald', sans-serif", letterSpacing: 2,
              }}>📢 対戦募集を見る</button>
            </div>
          </div>
        </div>
      </Card>
      <h2 style={{ fontSize: 20, fontFamily: "'Oswald', sans-serif", color: T.accent, letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>
        カテゴリから探す
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 12, marginBottom: 36 }}>
        {CATEGORIES.map(cat => (
          <Card key={cat.id} style={{ cursor: "pointer", textAlign: "center" }} onClick={() => setCurrentPage("teams")}>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 34, marginBottom: 8 }}>{cat.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: cat.color, fontFamily: "'Oswald', sans-serif", letterSpacing: 1 }}>{cat.label}</div>
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>
                {SAMPLE_TEAMS.filter(t => t.category === cat.id).length}チーム
              </div>
            </div>
          </Card>
        ))}
      </div>
      <h2 style={{ fontSize: 20, fontFamily: "'Oswald', sans-serif", color: T.accent, letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>
        最近の試合結果
      </h2>
      <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
        {SAMPLE_MATCHES.slice(0, 3).map(m => <MatchRecord key={m.id} match={m} />)}
      </div>
    </div>
  );
}
function TeamsPage({ onChallenge }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const filteredTeams = useMemo(() => {
    return SAMPLE_TEAMS.filter(t => {
      if (selectedCategory !== "all" && t.category !== selectedCategory) return false;
      if (selectedRegion !== "all" && t.region !== selectedRegion) return false;
      if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [selectedCategory, selectedRegion, searchQuery]);
  const selectStyle = {
    padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${T.border}`,
    background: "#fff", color: T.text, fontSize: 13, outline: "none",
    fontFamily: "'Noto Sans JP', sans-serif",
  };
  if (selectedTeam) {
    const cat = CATEGORIES.find(c => c.id === selectedTeam.category);
    const totalGames = selectedTeam.wins + selectedTeam.losses + selectedTeam.draws;
    const winRate = totalGames > 0 ? Math.round((selectedTeam.wins / totalGames) * 100) : 0;
    const teamMatches = SAMPLE_MATCHES.filter(m => m.team1 === selectedTeam.name || m.team2 === selectedTeam.name);
    return (
      <div style={{ padding: "32px 20px", maxWidth: 900, margin: "0 auto" }}>
        <button onClick={() => setSelectedTeam(null)} style={{
          background: "none", border: "none", color: T.accent, cursor: "pointer",
          fontSize: 14, marginBottom: 20, fontWeight: 600,
        }}>← チーム一覧に戻る</button>
        <Card hover={false} style={{ borderTop: `4px solid ${cat?.color || T.accent}` }}>
          <div style={{ padding: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: `linear-gradient(135deg, ${cat?.color}18, ${cat?.color}08)`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40,
                border: `3px solid ${cat?.color}30`,
              }}>{selectedTeam.logo}</div>
              <div>
                <h1 style={{ margin: 0, fontSize: 28, fontFamily: "'Oswald', sans-serif", color: T.text, letterSpacing: 2 }}>{selectedTeam.name}</h1>
                <div style={{ display: "flex", gap: 10, marginTop: 6, alignItems: "center", flexWrap: "wrap" }}>
                  <CategoryBadge categoryId={selectedTeam.category} />
                  <span style={{ color: T.textMuted, fontSize: 13 }}>📍{selectedTeam.region}</span>
                  <span style={{ color: T.textMuted, fontSize: 13 }}>👥 {selectedTeam.members}人</span>
                  <span style={{ color: T.textMuted, fontSize: 13 }}>📅 {selectedTeam.founded}年設立</span>
                </div>
                <div style={{ marginTop: 4 }}><StarRating level={selectedTeam.level} size={18} /></div>
              </div>
            </div>
            <p style={{ color: T.textSub, fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>{selectedTeam.desc}</p>
            <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
              {[
                { label: "勝利", value: selectedTeam.wins, color: "#16a34a", bg: "#dcfce7" },
                { label: "敗北", value: selectedTeam.losses, color: "#dc2626", bg: "#fee2e2" },
                { label: "引分", value: selectedTeam.draws, color: "#d97706", bg: "#fef3c7" },
                { label: "勝率", value: `${winRate}%`, color: "#2563eb", bg: "#dbeafe" },
              ].map((s, i) => (
                <div key={i} style={{
                  textAlign: "center", padding: "16px 24px", borderRadius: 14,
                  background: s.bg, border: `1px solid ${s.color}20`,
                }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: s.color, fontFamily: "'Oswald', sans-serif" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: T.textMuted }}>{s.label}</div>
                </div>
              ))}
            </div>
            <GoldBtn onClick={() => onChallenge(selectedTeam)} style={{ padding: "14px 40px", fontSize: 16 }}>
              ⚔️ このチームに対戦を申し込む
            </GoldBtn>
            {teamMatches.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h3 style={{ color: T.accent, fontFamily: "'Oswald', sans-serif", marginBottom: 12 }}>対戦履歴</h3>
                <div style={{ display: "grid", gap: 12 }}>{teamMatches.map(m => <MatchRecord key={m.id} match={m} />)}</div>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }
  return (
    <div style={{ padding: "32px 20px", maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ fontSize: 24, fontFamily: "'Oswald', sans-serif", color: T.accent, letterSpacing: 2, marginBottom: 20, fontWeight: 700 }}>🔍 チーム検索</h2>
      <Card hover={false} style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 12, padding: 16, flexWrap: "wrap" }}>
          <input style={{ ...selectStyle, flex: "1 1 200px", minWidth: 200 }} placeholder="🔍 チーム名で検索..."
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <select style={selectStyle} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="all">全カテゴリ</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
          </select>
          <select style={selectStyle} value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
            <option value="all">全地域</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </Card>
      <div style={{ color: T.textMuted, fontSize: 13, marginBottom: 16 }}>{filteredTeams.length}チームが見つかりました</div>
      <div style={{ display: "grid", gap: 16 }}>
        {filteredTeams.map(team => <TeamCard key={team.id} team={team} onSelect={setSelectedTeam} onChallenge={onChallenge} />)}
        {filteredTeams.length === 0 && (
          <div style={{ textAlign: "center", padding: 48, color: T.textMuted }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>😢</div><p>該当するチームが見つかりません</p>
          </div>
        )}
      </div>
    </div>
  );
}
function RequestsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const fInputStyle = {
    width: "100%", padding: "10px 12px", borderRadius: 8,
    border: `1.5px solid ${T.border}`, background: "#fff",
    color: T.text, fontSize: 13, outline: "none", boxSizing: "border-box",
    fontFamily: "'Noto Sans JP', sans-serif",
  };
  return (
    <div style={{ padding: "32px 20px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 24, fontFamily: "'Oswald', sans-serif", color: T.accent, letterSpacing: 2, fontWeight: 700, margin: 0 }}>📢 対戦募集一覧</h2>
        <GreenBtn onClick={() => setShowCreate(!showCreate)}>➕ 新規募集を作成</GreenBtn>
      </div>
      {showCreate && (
        <Card hover={false} style={{ marginBottom: 20, borderTop: `3px solid ${T.accent}` }}>
          <div style={{ padding: 24 }}>
            <h3 style={{ color: T.accent, fontFamily: "'Oswald', sans-serif", marginBottom: 16, fontSize: 18 }}>新しい対戦募集</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 12 }}>
              {[{ label: "希望日", type: "date" }, { label: "時間", type: "time" }, { label: "会場", type: "text", placeholder: "会場名を入力" }].map((f, i) => (
                <div key={i}>
                  <label style={{ display: "block", marginBottom: 4, color: T.textSub, fontSize: 12 }}>{f.label}</label>
                  <input style={fInputStyle} type={f.type} placeholder={f.placeholder || ""} />
                </div>
              ))}
            </div>
            <label style={{ display: "block", marginBottom: 4, color: T.textSub, fontSize: 12 }}>メッセージ</label>
            <textarea style={{ ...fInputStyle, resize: "vertical", minHeight: 80 }} placeholder="対戦相手への一言メッセージ..." />
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <GreenBtn>募集を投稿</GreenBtn>
              <button onClick={() => setShowCreate(false)} style={{
                padding: "10px 24px", borderRadius: 8, border: `1px solid ${T.border}`,
                background: "transparent", color: T.textSub, cursor: "pointer", fontSize: 13,
              }}>キャンセル</button>
            </div>
          </div>
        </Card>
      )}
      <div style={{ display: "grid", gap: 16 }}>
        {SAMPLE_REQUESTS.map(req => <RequestCard key={req.id} request={req} onApply={(r) => alert(`${r.teamName} への応募を送信しました！`)} />)}
      </div>
    </div>
  );
}
function MatchesPage() {
  const [filterCat, setFilterCat] = useState("all");
  const filtered = filterCat === "all" ? SAMPLE_MATCHES : SAMPLE_MATCHES.filter(m => m.category === filterCat);
  return (
    <div style={{ padding: "32px 20px", maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ fontSize: 24, fontFamily: "'Oswald', sans-serif", color: T.accent, letterSpacing: 2, marginBottom: 20, fontWeight: 700 }}>📊 試合記録</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <button onClick={() => setFilterCat("all")} style={{
          padding: "8px 16px", borderRadius: 20, cursor: "pointer",
          border: filterCat === "all" ? `2px solid ${T.accent}` : `1px solid ${T.border}`,
          background: filterCat === "all" ? T.accentLight : "#fff",
          color: filterCat === "all" ? T.accent : T.textMuted, fontSize: 12, fontWeight: 600,
        }}>すべて</button>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setFilterCat(c.id)} style={{
            padding: "8px 16px", borderRadius: 20, cursor: "pointer",
            border: filterCat === c.id ? `2px solid ${c.color}` : `1px solid ${T.border}`,
            background: filterCat === c.id ? `${c.color}12` : "#fff",
            color: filterCat === c.id ? c.color : T.textMuted, fontSize: 12, fontWeight: 600,
          }}>{c.icon} {c.label}</button>
        ))}
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {filtered.map(m => <MatchRecord key={m.id} match={m} />)}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 48, color: T.textMuted }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div><p>試合記録がありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
function MyTeamPage({ currentUser, onUpdateUser }) {
  const [editTarget, setEditTarget] = useState(null);
  const [savedTarget, setSavedTarget] = useState(null);
  // name
  const [editName, setEditName] = useState("");
  // desc
  const [editDesc, setEditDesc] = useState("");
  // category/region
  const [editCategory, setEditCategory] = useState("");
  const [editRegion, setEditRegion] = useState("");
  // members
  const [editMembers, setEditMembers] = useState([]);
  const [newMemberInput, setNewMemberInput] = useState("");
  // password
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [showPw, setShowPw] = useState([false, false, false]);

  const team = SAMPLE_TEAMS.find(t => t.name === currentUser.name) || {
    ...currentUser, level: 3, wins: 0, losses: 0, draws: 0, logo: "⚽", founded: 2026,
  };
  const cat = CATEGORIES.find(c => c.id === (currentUser.category || team.category));

  const toggle = (target, onOpen) => {
    if (editTarget === target) { setEditTarget(null); return; }
    setSavedTarget(null);
    setPwError("");
    onOpen?.();
    setEditTarget(target);
  };

  const saveAndClose = (target, updateFn) => {
    onUpdateUser(updateFn(currentUser));
    setSavedTarget(target);
    setTimeout(() => { setEditTarget(null); setSavedTarget(null); }, 900);
  };

  const iStyle = {
    width: "100%", padding: "10px 13px", borderRadius: 8,
    border: `1.5px solid ${T.border}`, background: "#fff",
    color: T.text, fontSize: 13, outline: "none", boxSizing: "border-box",
    fontFamily: "'Noto Sans JP', sans-serif",
  };
  const focusBorder = (e) => e.target.style.borderColor = T.accent;
  const blurBorder = (e) => e.target.style.borderColor = T.border;

  const SettingPanel = ({ id, icon, label, children }) => {
    const isOpen = editTarget === id;
    return (
      <div>
        <button onClick={() => toggle(id, () => {
          if (id === "name") setEditName(currentUser.name);
          if (id === "desc") setEditDesc(currentUser.desc || "");
          if (id === "category") { setEditCategory(currentUser.category || team.category); setEditRegion(currentUser.region || team.region); }
          if (id === "members") setEditMembers([...(currentUser.members || [])]);
          if (id === "password") { setCurrentPw(""); setNewPw(""); setConfirmPw(""); }
        })} style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "13px 16px", borderRadius: isOpen ? "10px 10px 0 0" : 10,
          border: `1.5px solid ${isOpen ? T.accent : T.border}`,
          background: isOpen ? T.accentLight : T.cardAlt,
          color: T.text, cursor: "pointer", fontSize: 14,
          fontFamily: "'Noto Sans JP', sans-serif", transition: "all 0.15s",
        }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = "#eef7f1"; }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = T.cardAlt; }}
        >
          <span>{icon} {label}</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{isOpen ? "▲" : "→"}</span>
        </button>
        {isOpen && (
          <div style={{
            border: `1.5px solid ${T.accent}`, borderTop: "none",
            borderRadius: "0 0 10px 10px", background: "#fff", padding: "20px 18px",
          }}>
            {children}
          </div>
        )}
      </div>
    );
  };

  const SaveRow = ({ onSave, disabled = false }) => (
    <div style={{ display: "flex", gap: 8, marginTop: 14, alignItems: "center" }}>
      <button onClick={onSave} disabled={disabled} style={{
        padding: "9px 22px", borderRadius: 8, border: "none",
        background: savedTarget === editTarget ? "#16a34a" : disabled ? "#ccc" : `linear-gradient(135deg, ${T.accent}, #0d8044)`,
        color: "#fff", fontWeight: 700, fontSize: 13, cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s", fontFamily: "'Noto Sans JP', sans-serif",
      }}>
        {savedTarget === editTarget ? "✓ 保存しました" : "保存する"}
      </button>
      <button onClick={() => setEditTarget(null)} style={{
        padding: "9px 18px", borderRadius: 8, border: `1px solid ${T.border}`,
        background: "transparent", color: T.textSub, cursor: "pointer", fontSize: 13,
        fontFamily: "'Noto Sans JP', sans-serif",
      }}>キャンセル</button>
    </div>
  );

  return (
    <div style={{ padding: "32px 20px", maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ fontSize: 24, fontFamily: "'Oswald', sans-serif", color: T.accent, letterSpacing: 2, marginBottom: 24, fontWeight: 700 }}>⚽ マイチーム</h2>
      <Card hover={false} style={{ borderTop: `4px solid ${cat?.color || T.accent}` }}>
        <div style={{ padding: 32 }}>
          {/* チームヘッダー */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: `linear-gradient(135deg, ${cat?.color || T.accent}18, ${cat?.color || T.accent}08)`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40,
              border: `3px solid ${cat?.color || T.accent}30`,
            }}>{team.logo}</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ margin: 0, fontSize: 28, fontFamily: "'Oswald', sans-serif", color: T.text, letterSpacing: 2 }}>{currentUser.name}</h1>
              <div style={{ display: "flex", gap: 10, marginTop: 6, alignItems: "center", flexWrap: "wrap" }}>
                <CategoryBadge categoryId={currentUser.category || team.category} />
                <span style={{ color: T.textMuted, fontSize: 13 }}>📍{currentUser.region || team.region}</span>
              </div>
              {(currentUser.desc || team.desc) && (
                <p style={{ margin: "8px 0 0", fontSize: 13, color: T.textSub, lineHeight: 1.6 }}>{currentUser.desc || team.desc}</p>
              )}
            </div>
          </div>

          {/* 成績 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12, marginBottom: 28 }}>
            {[
              { label: "勝利", value: team.wins, color: "#16a34a", bg: "#dcfce7" },
              { label: "敗北", value: team.losses, color: "#dc2626", bg: "#fee2e2" },
              { label: "引分", value: team.draws, color: "#d97706", bg: "#fef3c7" },
              { label: "メンバー", value: (currentUser.members || []).length || team.members || 0, color: "#7c3aed", bg: "#ede9fe" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: 16, borderRadius: 14, background: s.bg, border: `1px solid ${s.color}18` }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: s.color, fontFamily: "'Oswald', sans-serif" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: T.textMuted }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* チーム設定 */}
          <h3 style={{ color: T.accent, fontFamily: "'Oswald', sans-serif", marginBottom: 12, fontSize: 16 }}>チーム設定</h3>
          <div style={{ display: "grid", gap: 10 }}>

            {/* 1. チーム名を変更 */}
            <SettingPanel id="name" icon="✏️" label="チーム名を変更">
              <label style={{ display: "block", marginBottom: 6, color: T.textSub, fontSize: 12, fontWeight: 600 }}>新しいチーム名</label>
              <input style={iStyle} value={editName} onChange={e => setEditName(e.target.value)}
                placeholder="チーム名を入力" maxLength={40} autoFocus
                onFocus={focusBorder} onBlur={blurBorder}
                onKeyDown={e => { if (e.key === "Enter" && editName.trim()) saveAndClose("name", u => ({ ...u, name: editName.trim() })); }}
              />
              <div style={{ textAlign: "right", fontSize: 11, color: T.textMuted, marginTop: 4 }}>{editName.length}/40</div>
              <SaveRow disabled={!editName.trim()} onSave={() => saveAndClose("name", u => ({ ...u, name: editName.trim() }))} />
            </SettingPanel>

            {/* 2. チーム紹介を編集 */}
            <SettingPanel id="desc" icon="📝" label="チーム紹介を編集">
              <label style={{ display: "block", marginBottom: 6, color: T.textSub, fontSize: 12, fontWeight: 600 }}>チーム紹介文</label>
              <textarea style={{ ...iStyle, resize: "vertical", minHeight: 90, lineHeight: 1.6 }}
                value={editDesc} onChange={e => setEditDesc(e.target.value)}
                placeholder="チームのアピールポイントや募集情報を入力..."
                maxLength={200} autoFocus
                onFocus={focusBorder} onBlur={blurBorder}
              />
              <div style={{ textAlign: "right", fontSize: 11, color: T.textMuted, marginTop: 4 }}>{editDesc.length}/200</div>
              <SaveRow onSave={() => saveAndClose("desc", u => ({ ...u, desc: editDesc }))} />
            </SettingPanel>

            {/* 3. カテゴリ・地域を変更 */}
            <SettingPanel id="category" icon="🏷️" label="カテゴリ・地域を変更">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", marginBottom: 6, color: T.textSub, fontSize: 12, fontWeight: 600 }}>カテゴリ</label>
                  <select style={{ ...iStyle, appearance: "none" }} value={editCategory} onChange={e => setEditCategory(e.target.value)}
                    onFocus={focusBorder} onBlur={blurBorder}>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: 6, color: T.textSub, fontSize: 12, fontWeight: 600 }}>地域</label>
                  <select style={{ ...iStyle, appearance: "none" }} value={editRegion} onChange={e => setEditRegion(e.target.value)}
                    onFocus={focusBorder} onBlur={blurBorder}>
                    {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <SaveRow onSave={() => saveAndClose("category", u => ({ ...u, category: editCategory, region: editRegion }))} />
            </SettingPanel>

            {/* 4. メンバー管理 */}
            <SettingPanel id="members" icon="👥" label="メンバー管理">
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 8, color: T.textSub, fontSize: 12, fontWeight: 600 }}>
                  メンバー一覧（{editMembers.length}人）
                </label>
                {editMembers.length === 0 && (
                  <p style={{ color: T.textMuted, fontSize: 13, padding: "10px 0" }}>まだメンバーが登録されていません</p>
                )}
                <div style={{ display: "grid", gap: 6, maxHeight: 200, overflowY: "auto", marginBottom: 12 }}>
                  {editMembers.map((m, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "8px 12px", borderRadius: 8, background: T.cardAlt, border: `1px solid ${T.border}`,
                    }}>
                      <span style={{ fontSize: 13 }}>👤 {m}</span>
                      <button onClick={() => setEditMembers(editMembers.filter((_, j) => j !== i))} style={{
                        background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: 16, lineHeight: 1,
                      }}>×</button>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input style={{ ...iStyle, flex: 1 }} value={newMemberInput}
                    onChange={e => setNewMemberInput(e.target.value)}
                    placeholder="メンバー名を入力"
                    onFocus={focusBorder} onBlur={blurBorder}
                    onKeyDown={e => {
                      if (e.key === "Enter" && newMemberInput.trim()) {
                        setEditMembers([...editMembers, newMemberInput.trim()]);
                        setNewMemberInput("");
                      }
                    }}
                  />
                  <button onClick={() => { if (newMemberInput.trim()) { setEditMembers([...editMembers, newMemberInput.trim()]); setNewMemberInput(""); } }} style={{
                    padding: "10px 16px", borderRadius: 8, border: "none",
                    background: T.accent, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 13,
                    whiteSpace: "nowrap",
                  }}>＋ 追加</button>
                </div>
              </div>
              <SaveRow onSave={() => saveAndClose("members", u => ({ ...u, members: editMembers }))} />
            </SettingPanel>

            {/* 5. パスワード変更 */}
            <SettingPanel id="password" icon="🔒" label="パスワード変更">
              {pwError && (
                <div style={{ padding: "8px 12px", borderRadius: 8, background: "#fee2e2", color: "#dc2626", fontSize: 13, marginBottom: 12 }}>
                  ⚠️ {pwError}
                </div>
              )}
              {[
                { label: "現在のパスワード", val: currentPw, set: setCurrentPw },
                { label: "新しいパスワード", val: newPw, set: setNewPw },
                { label: "新しいパスワード（確認）", val: confirmPw, set: setConfirmPw },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <label style={{ display: "block", marginBottom: 5, color: T.textSub, fontSize: 12, fontWeight: 600 }}>{f.label}</label>
                  <div style={{ position: "relative" }}>
                    <input style={{ ...iStyle, paddingRight: 42 }} type={showPw[i] ? "text" : "password"} value={f.val}
                      onChange={e => f.set(e.target.value)}
                      placeholder="••••••••" onFocus={focusBorder} onBlur={blurBorder} autoFocus={i === 0} />
                    <button
                      type="button"
                      onClick={() => setShowPw(prev => prev.map((v, j) => j === i ? !v : v))}
                      style={{
                        position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                        background: "none", border: "none", cursor: "pointer", padding: 4,
                        color: showPw[i] ? T.accent : T.textMuted, fontSize: 16, lineHeight: 1,
                        transition: "color 0.15s",
                      }}
                      title={showPw[i] ? "隠す" : "表示"}
                    >
                      {showPw[i] ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
              ))}
              <SaveRow onSave={() => {
                setPwError("");
                if (currentPw !== (currentUser.password || "password")) { setPwError("現在のパスワードが正しくありません"); return; }
                if (newPw.length < 6) { setPwError("パスワードは6文字以上で入力してください"); return; }
                if (newPw !== confirmPw) { setPwError("新しいパスワードが一致しません"); return; }
                saveAndClose("password", u => ({ ...u, password: newPw }));
              }} />
            </SettingPanel>

          </div>
        </div>
      </Card>
    </div>
  );
}
// ========== MODAL ==========
function ChallengeModal({ team, onClose }) {
  if (!team) return null;
  const fInputStyle = {
    width: "100%", padding: "10px 12px", borderRadius: 8,
    border: `1.5px solid ${T.border}`, background: "#fff",
    color: T.text, fontSize: 13, outline: "none", boxSizing: "border-box",
  };
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: 480, width: "100%" }}>
        <Card hover={false} style={{ borderTop: `4px solid ${T.gold}` }}>
          <div style={{ padding: 28 }}>
            <h2 style={{ color: T.accent, fontFamily: "'Oswald', sans-serif", fontSize: 22, margin: "0 0 16px", letterSpacing: 1 }}>⚔️ 対戦申込</h2>
            <p style={{ color: T.textSub, marginBottom: 20, fontSize: 14 }}>
              <strong style={{ color: T.text }}>{team.name}</strong> に対戦を申し込みます
            </p>
            {[{ label: "希望日", type: "date" }, { label: "希望時間", type: "time" }, { label: "希望会場", type: "text", placeholder: "会場名を入力" }].map((f, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 4, color: T.textSub, fontSize: 12 }}>{f.label}</label>
                <input style={fInputStyle} type={f.type} placeholder={f.placeholder || ""} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 4, color: T.textSub, fontSize: 12 }}>メッセージ</label>
              <textarea style={{ ...fInputStyle, resize: "vertical", minHeight: 60, fontFamily: "'Noto Sans JP', sans-serif" }} placeholder="対戦への一言メッセージ..." />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <GoldBtn onClick={() => { alert("対戦申込を送信しました！"); onClose(); }} style={{ flex: 1, padding: 12, fontSize: 14 }}>
                申込を送信
              </GoldBtn>
              <button onClick={onClose} style={{
                padding: "12px 24px", borderRadius: 8, border: `1px solid ${T.border}`,
                background: "transparent", color: T.textSub, cursor: "pointer", fontSize: 13,
              }}>キャンセル</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
// ========== MAIN APP ==========
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [challengeTarget, setChallengeTarget] = useState(null);
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700;800;900&family=Noto+Sans+JP:wght@300;400;500;600;700;800;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: ${T.bg}; color: ${T.text}; font-family: 'Noto Sans JP', sans-serif; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #e8f0ea; }
    ::-webkit-scrollbar-thumb { background: #0d804444; border-radius: 3px; }
    ::selection { background: #0d804433; color: ${T.text}; }
    input, select, textarea { font-family: 'Noto Sans JP', sans-serif; }
  `;
  if (!currentUser) {
    return (<><style>{globalStyles}</style><LoginPage onLogin={setCurrentUser} /></>);
  }
  const renderPage = () => {
    switch (currentPage) {
      case "home": return <HomePage setCurrentPage={setCurrentPage} />;
      case "teams": return <TeamsPage onChallenge={setChallengeTarget} />;
      case "requests": return <RequestsPage />;
      case "matches": return <MatchesPage />;
      case "myteam": return <MyTeamPage currentUser={currentUser} onUpdateUser={setCurrentUser} />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };
  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ minHeight: "100vh", background: T.bg }}>
        <Header currentUser={currentUser} currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={() => { setCurrentUser(null); setCurrentPage("home"); }} />
        {renderPage()}
        {challengeTarget && <ChallengeModal team={challengeTarget} onClose={() => setChallengeTarget(null)} />}
        <footer style={{
          textAlign: "center", padding: "28px 20px", marginTop: 40,
          borderTop: `1px solid ${T.border}`, color: T.textMuted, fontSize: 12,
        }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", color: T.accent, letterSpacing: 2 }}>PITCH MATCH</span>
          <span style={{ margin: "0 8px" }}>|</span>
          © 2026 All Rights Reserved
        </footer>
      </div>
    </>
  );
}