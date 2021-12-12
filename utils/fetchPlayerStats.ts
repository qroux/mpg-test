import axios from 'axios';
import { errorAlert } from './errorAlert';

type FunctionParams = {
  playerId: string;
  setStats: any;
};

export const fetchPlayerStats = async ({
  playerId,
  setStats,
}: FunctionParams) => {
  try {
    const response = await axios.get(
      `https://api.mpg.football/api/data/championship-player-stats/${playerId}/summary`
    );
    const stats = response.data;

    setStats(stats);
  } catch (err) {
    errorAlert();
  }
};
