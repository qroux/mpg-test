export type Championship = {};

export type Team = {
  clubId: string;
  score: number;
};

export type Match = {
  playerClubId: string;
  matchId: string;
  gameWeekNumber: number;
  date: Date;
  home: Team;
  away: Team;
  playerPerformance: {
    status: number;
  };
};

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: number;
  quotation: number;
  clubId: string;
  stats: {
    averageRating: number;
    totalGoals: number;
    totalMatches: number;
    totalStartedMatches: number;
    totalPlayedMatches: number;
    matches: Match[];
    id: string;
  };
};

export type PoolPlayerData = {
  data: {
    poolPlayers: Player[];
  };
};

export type League = 1 | 2 | 3 | 4 | 5 | 6;

export type PositionValues = 10 | 20 | 21 | 30 | 31 | 40;
