export type MatchStatus = 'upcoming' | 'live' | 'completed';
export type Stage = 'group' | 'round_of_16' | 'quarter_final' | 'semi_final' | 'third_place' | 'final';
export type GroupName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type Category = 'pro' | 'youth' | 'shakaijin' | 'shougakkou' | 'chuugakkou' | 'futsal';

export const CATEGORY_LABELS: Record<Category, string> = {
  pro: 'プロ',
  youth: 'ユース',
  shakaijin: '社会人',
  shougakkou: '小学校',
  chuugakkou: '中学校',
  futsal: 'フットサル',
};

export const STAGE_LABELS: Record<Stage, string> = {
  group: 'グループステージ',
  round_of_16: 'ラウンド16',
  quarter_final: '準々決勝',
  semi_final: '準決勝',
  third_place: '3位決定戦',
  final: '決勝',
};

export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DF' | 'MF' | 'FW';
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  group: GroupName;
  flag: string; // emoji or initials
  color: string; // hex
  category: Category;
  prefecture: string; // 都道府県
  password: string; // team login password (plain text for demo)
  players: Player[];
}

export interface ScoreEvent {
  playerName: string;
  minute: number;
  isPenalty: boolean;
  isOwnGoal: boolean;
}

export interface CardEvent {
  playerName: string;
  teamId: string;
  minute: number;
}

export interface MatchRecord {
  matchId: string;
  homeScorers: ScoreEvent[];
  awayScorers: ScoreEvent[];
  yellowCards: CardEvent[];
  redCards: CardEvent[];
  mvp: string;
  note: string;
  weather: string;
  attendance: string;
}

export interface GoalEvent {
  id: string;
  matchId: string;
  teamId: string;
  playerName: string;
  minute: number;
  isPenalty: boolean;
  isOwnGoal: boolean;
}

export interface Match {
  id: string;
  stage: Stage;
  group?: GroupName;
  matchday?: number;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  homePenalty?: number;
  awayPenalty?: number;
  status: MatchStatus;
  date: string;
  time: string;
  venue: string;
  minute?: number;
  scorers: GoalEvent[];
}

export interface GroupStanding {
  teamId: string;
  group: GroupName;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  qualified: boolean;
}

export interface Group {
  name: GroupName;
  teamIds: string[];
  matchIds: string[];
}

export interface Tournament {
  id: string;
  name: string;
  year: number;
  category: Category;
  hostRegion: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  winnerId?: string;
}
