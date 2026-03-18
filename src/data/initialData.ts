import type { Team, Group, Match, Tournament, MatchRecord } from '../types';
import type { GroupName } from '../types';

// PRO category teams (Japanese J-League style)
export const INITIAL_TEAMS: Team[] = [
  // Group A
  { id: 'urawa', name: '浦和レッズ', shortName: '浦和', group: 'A', flag: '🔴', color: '#CC0000', category: 'pro', prefecture: '埼玉', password: 'urawa2026', players: [] },
  { id: 'kashima', name: '鹿島アントラーズ', shortName: '鹿島', group: 'A', flag: '🦌', color: '#CC0000', category: 'pro', prefecture: '茨城', password: 'kashima2026', players: [] },
  { id: 'gamba', name: 'ガンバ大阪', shortName: 'G大阪', group: 'A', flag: '🔵', color: '#0033A0', category: 'pro', prefecture: '大阪', password: 'gamba2026', players: [] },
  { id: 'cerezo', name: 'セレッソ大阪', shortName: 'C大阪', group: 'A', flag: '🌸', color: '#FF69B4', category: 'pro', prefecture: '大阪', password: 'cerezo2026', players: [] },
  // Group B
  { id: 'yokohama', name: '横浜F・マリノス', shortName: '横浜FM', group: 'B', flag: '🔵', color: '#003087', category: 'pro', prefecture: '神奈川', password: 'yokohama2026', players: [] },
  { id: 'kawasaki', name: '川崎フロンターレ', shortName: '川崎', group: 'B', flag: '🔵', color: '#00A0E9', category: 'pro', prefecture: '神奈川', password: 'kawasaki2026', players: [] },
  { id: 'nagoya', name: '名古屋グランパス', shortName: '名古屋', group: 'B', flag: '🔴', color: '#CC0033', category: 'pro', prefecture: '愛知', password: 'nagoya2026', players: [] },
  { id: 'hiroshima', name: 'サンフレッチェ広島', shortName: '広島', group: 'B', flag: '🟣', color: '#6600CC', category: 'pro', prefecture: '広島', password: 'hiroshima2026', players: [] },
  // Group C
  { id: 'kobe', name: 'ヴィッセル神戸', shortName: '神戸', group: 'C', flag: '⚫', color: '#000000', category: 'pro', prefecture: '兵庫', password: 'kobe2026', players: [] },
  { id: 'sapporo', name: '北海道コンサドーレ札幌', shortName: '札幌', group: 'C', flag: '🔴', color: '#CC0000', category: 'pro', prefecture: '北海道', password: 'sapporo2026', players: [] },
  { id: 'sendai', name: 'ベガルタ仙台', shortName: '仙台', group: 'C', flag: '🟡', color: '#FFD700', category: 'pro', prefecture: '宮城', password: 'sendai2026', players: [] },
  { id: 'tosu', name: 'サガン鳥栖', shortName: '鳥栖', group: 'C', flag: '🔵', color: '#0033FF', category: 'pro', prefecture: '佐賀', password: 'tosu2026', players: [] },
  // Group D
  { id: 'kashiwa', name: '柏レイソル', shortName: '柏', group: 'D', flag: '🟡', color: '#FFD700', category: 'pro', prefecture: '千葉', password: 'kashiwa2026', players: [] },
  { id: 'fc_tokyo', name: 'FC東京', shortName: 'FC東京', group: 'D', flag: '🔵', color: '#003087', category: 'pro', prefecture: '東京', password: 'fctokyo2026', players: [] },
  { id: 'shimizu', name: '清水エスパルス', shortName: '清水', group: 'D', flag: '🟠', color: '#FF6600', category: 'pro', prefecture: '静岡', password: 'shimizu2026', players: [] },
  { id: 'jubilo', name: 'ジュビロ磐田', shortName: '磐田', group: 'D', flag: '🔵', color: '#0033A0', category: 'pro', prefecture: '静岡', password: 'jubilo2026', players: [] },
  // Group E
  { id: 'fukuoka', name: 'アビスパ福岡', shortName: '福岡', group: 'E', flag: '🔵', color: '#003087', category: 'pro', prefecture: '福岡', password: 'fukuoka2026', players: [] },
  { id: 'kyoto', name: '京都サンガF.C.', shortName: '京都', group: 'E', flag: '🟣', color: '#6600CC', category: 'pro', prefecture: '京都', password: 'kyoto2026', players: [] },
  { id: 'niigata', name: 'アルビレックス新潟', shortName: '新潟', group: 'E', flag: '🟠', color: '#FF6600', category: 'pro', prefecture: '新潟', password: 'niigata2026', players: [] },
  { id: 'shonan', name: '湘南ベルマーレ', shortName: '湘南', group: 'E', flag: '🔵', color: '#0033FF', category: 'pro', prefecture: '神奈川', password: 'shonan2026', players: [] },
  // Group F
  { id: 'omiya', name: '大宮アルディージャ', shortName: '大宮', group: 'F', flag: '🟠', color: '#FF6600', category: 'pro', prefecture: '埼玉', password: 'omiya2026', players: [] },
  { id: 'tochigi', name: '栃木SC', shortName: '栃木', group: 'F', flag: '🟡', color: '#FFD700', category: 'pro', prefecture: '栃木', password: 'tochigi2026', players: [] },
  { id: 'tokushima', name: '徳島ヴォルティス', shortName: '徳島', group: 'F', flag: '🔵', color: '#003087', category: 'pro', prefecture: '徳島', password: 'tokushima2026', players: [] },
  { id: 'ehime', name: 'FC今治', shortName: '今治', group: 'F', flag: '🟠', color: '#FF4500', category: 'pro', prefecture: '愛媛', password: 'ehime2026', players: [] },
  // Group G
  { id: 'renofa', name: 'レノファ山口FC', shortName: '山口', group: 'G', flag: '🔴', color: '#CC0000', category: 'pro', prefecture: '山口', password: 'renofa2026', players: [] },
  { id: 'mito', name: '水戸ホーリーホック', shortName: '水戸', group: 'G', flag: '🔵', color: '#003087', category: 'pro', prefecture: '茨城', password: 'mito2026', players: [] },
  { id: 'matsumoto', name: '松本山雅FC', shortName: '松本', group: 'G', flag: '🟢', color: '#00CC44', category: 'pro', prefecture: '長野', password: 'matsumoto2026', players: [] },
  { id: 'grulla', name: 'グルージャ盛岡', shortName: '盛岡', group: 'G', flag: '🔵', color: '#0066CC', category: 'pro', prefecture: '岩手', password: 'grulla2026', players: [] },
  // Group H
  { id: 'giravanz', name: 'ギラヴァンツ北九州', shortName: '北九州', group: 'H', flag: '🟡', color: '#FFD700', category: 'pro', prefecture: '福岡', password: 'giravanz2026', players: [] },
  { id: 'gainare', name: 'ガイナーレ鳥取', shortName: '鳥取', group: 'H', flag: '🔴', color: '#CC3300', category: 'pro', prefecture: '鳥取', password: 'gainare2026', players: [] },
  { id: 'fcgifu', name: 'FC岐阜', shortName: '岐阜', group: 'H', flag: '🟢', color: '#006633', category: 'pro', prefecture: '岐阜', password: 'fcgifu2026', players: [] },
  { id: 'azul', name: 'アスルクラロ沼津', shortName: '沼津', group: 'H', flag: '🔵', color: '#0099CC', category: 'pro', prefecture: '静岡', password: 'azul2026', players: [] },
];

function makeGroupMatches(): Match[] {
  const groupTeams: Record<string, string[]> = {
    A: ['urawa', 'kashima', 'gamba', 'cerezo'],
    B: ['yokohama', 'kawasaki', 'nagoya', 'hiroshima'],
    C: ['kobe', 'sapporo', 'sendai', 'tosu'],
    D: ['kashiwa', 'fc_tokyo', 'shimizu', 'jubilo'],
    E: ['fukuoka', 'kyoto', 'niigata', 'shonan'],
    F: ['omiya', 'tochigi', 'tokushima', 'ehime'],
    G: ['renofa', 'mito', 'matsumoto', 'grulla'],
    H: ['giravanz', 'gainare', 'fcgifu', 'azul'],
  };

  const venues: Record<string, string> = {
    A: '埼玉スタジアム2002',
    B: '日産スタジアム',
    C: 'ノエビアスタジアム神戸',
    D: '国立競技場',
    E: 'レベルファイブスタジアム',
    F: 'NACK5スタジアム大宮',
    G: '維新みらいふスタジアム',
    H: 'ギラヴァンツ北九州スタジアム',
  };

  const times = ['13:00', '15:00', '18:00', '19:00'];
  const matches: Match[] = [];

  const groupKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  groupKeys.forEach((group, groupIdx) => {
    const teams = groupTeams[group];
    const venue = venues[group];
    const pairs: [number, number][] = [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]];
    const matchdayMap = [1,1,2,2,3,3];
    const baseDateOffsets = [0,1,7,8,14,14];
    const baseDate = new Date('2026-04-01');

    pairs.forEach(([i, j], pairIdx) => {
      const dateOffset = baseDateOffsets[pairIdx] + groupIdx;
      const matchDate = new Date(baseDate);
      matchDate.setDate(matchDate.getDate() + dateOffset);
      const dateStr = matchDate.toISOString().split('T')[0];
      const time = times[(groupIdx + pairIdx) % 4];
      matches.push({
        id: `group_${group}_${pairIdx + 1}`,
        stage: 'group',
        group: group as GroupName,
        matchday: matchdayMap[pairIdx],
        homeTeamId: teams[i],
        awayTeamId: teams[j],
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        date: dateStr,
        time,
        venue,
        scorers: [],
      });
    });
  });
  return matches;
}

function makeKnockoutMatches(): Match[] {
  const matches: Match[] = [];
  const r16Dates = ['2026-05-16','2026-05-16','2026-05-17','2026-05-17','2026-05-23','2026-05-23','2026-05-24','2026-05-24'];
  for (let i = 0; i < 8; i++) {
    matches.push({ id: `r16_${i+1}`, stage: 'round_of_16', homeTeamId: 'tbd', awayTeamId: 'tbd', homeScore: null, awayScore: null, status: 'upcoming', date: r16Dates[i], time: i%2===0?'14:00':'19:00', venue: '国立競技場', scorers: [] });
  }
  const qfDates = ['2026-05-30','2026-05-30','2026-05-31','2026-05-31'];
  for (let i = 0; i < 4; i++) {
    matches.push({ id: `qf_${i+1}`, stage: 'quarter_final', homeTeamId: 'tbd', awayTeamId: 'tbd', homeScore: null, awayScore: null, status: 'upcoming', date: qfDates[i], time: i%2===0?'14:00':'19:00', venue: '埼玉スタジアム2002', scorers: [] });
  }
  matches.push({ id: 'sf_1', stage: 'semi_final', homeTeamId: 'tbd', awayTeamId: 'tbd', homeScore: null, awayScore: null, status: 'upcoming', date: '2026-06-06', time: '14:00', venue: '国立競技場', scorers: [] });
  matches.push({ id: 'sf_2', stage: 'semi_final', homeTeamId: 'tbd', awayTeamId: 'tbd', homeScore: null, awayScore: null, status: 'upcoming', date: '2026-06-07', time: '19:00', venue: '日産スタジアム', scorers: [] });
  matches.push({ id: 'third_place', stage: 'third_place', homeTeamId: 'tbd', awayTeamId: 'tbd', homeScore: null, awayScore: null, status: 'upcoming', date: '2026-06-13', time: '14:00', venue: '豊田スタジアム', scorers: [] });
  matches.push({ id: 'final', stage: 'final', homeTeamId: 'tbd', awayTeamId: 'tbd', homeScore: null, awayScore: null, status: 'upcoming', date: '2026-06-14', time: '19:00', venue: '国立競技場', scorers: [] });
  return matches;
}

const groupMatches = makeGroupMatches();
const knockoutMatches = makeKnockoutMatches();

export const INITIAL_MATCHES: Match[] = [...groupMatches, ...knockoutMatches];

export const INITIAL_GROUPS: Group[] = (['A','B','C','D','E','F','G','H'] as const).map(g => ({
  name: g,
  teamIds: INITIAL_TEAMS.filter(t => t.group === g).map(t => t.id),
  matchIds: groupMatches.filter(m => m.group === g).map(m => m.id),
}));

export const INITIAL_TOURNAMENT: Tournament = {
  id: 'jleague2026',
  name: 'Jリーグカップ 2026',
  year: 2026,
  category: 'pro',
  hostRegion: '日本全国',
  startDate: '2026-04-01',
  endDate: '2026-06-14',
  status: 'ongoing',
};

export const INITIAL_MATCH_RECORDS: MatchRecord[] = [];
