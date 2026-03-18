import { create } from 'zustand';
import type { Group, GroupStanding, Match, Team, GroupName } from '../types';
import { INITIAL_GROUPS } from '../data/initialData';

export function computeStandings(matches: Match[], teams: Team[]): GroupStanding[] {
  const standingsMap = new Map<string, GroupStanding>();

  teams.forEach(team => {
    standingsMap.set(team.id, {
      teamId: team.id,
      group: team.group,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      qualified: false,
    });
  });

  matches.forEach(match => {
    if (match.stage !== 'group') return;
    if (match.status !== 'completed') return;
    if (match.homeScore === null || match.awayScore === null) return;

    const home = standingsMap.get(match.homeTeamId);
    const away = standingsMap.get(match.awayTeamId);
    if (!home || !away) return;

    const hg = match.homeScore;
    const ag = match.awayScore;

    home.played++;
    away.played++;
    home.goalsFor += hg;
    home.goalsAgainst += ag;
    away.goalsFor += ag;
    away.goalsAgainst += hg;

    if (hg > ag) {
      home.won++;
      home.points += 3;
      away.lost++;
    } else if (hg < ag) {
      away.won++;
      away.points += 3;
      home.lost++;
    } else {
      home.drawn++;
      away.drawn++;
      home.points += 1;
      away.points += 1;
    }

    home.goalDifference = home.goalsFor - home.goalsAgainst;
    away.goalDifference = away.goalsFor - away.goalsAgainst;
  });

  // Mark top 2 per group as qualified
  const groups: GroupName[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  groups.forEach(group => {
    const groupTeams = Array.from(standingsMap.values())
      .filter(s => s.group === group)
      .sort((a, b) =>
        b.points - a.points ||
        b.goalDifference - a.goalDifference ||
        b.goalsFor - a.goalsFor
      );
    groupTeams.forEach((s, idx) => {
      s.qualified = idx < 2;
    });
  });

  return Array.from(standingsMap.values());
}

interface GroupState {
  groups: Group[];
}

export const useGroupStore = create<GroupState>(() => ({
  groups: INITIAL_GROUPS,
}));
