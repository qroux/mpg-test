export type PoolIndex = 1 | 2 | 3 | 4 | 5 | 6;
export type PositionValues = 10 | 20 | 21 | 30 | 31 | 40;

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
    rating: number;
    goals: number;
    ownGoals: number;
    minutesPlayed: number;
  };
};

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: PositionValues;
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

// CLUB
type Name = {
  'fr-FR': string;
  'en-GB': string;
  'es-ES': string;
};

type Jersey = {
  jerseys: {
    [key: string]: string;
  };
  active: boolean;
};

export type Club = {
  championships: {
    2: Jersey;
    6?: Jersey;
  };
  id: string;
  name: Name;
  shortName: string;
  defaultJerseyUrl: string;
};

export type ChampionshipClubs = {
  [key: string]: Club;
};

export type ChampionshipClubsResponse = {
  data: {
    championshipClubs: ChampionshipClubs;
  };
};
