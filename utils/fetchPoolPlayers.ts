import axios from 'axios';
import { Player, PoolIndex, PoolPlayerData } from '../types/CustomTypes';
import { errorAlert } from './errorAlert';

type FunctionParams = {
  league: PoolIndex;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

export const fetchPoolPlayers = async ({
  league,
  setPlayers,
}: FunctionParams) => {
  try {
    const {
      data: { poolPlayers },
    }: PoolPlayerData = await axios.get(
      `https://api.mpg.football/api/data/championship-players-pool/${league}`
    );

    const sortedList = poolPlayers.sort((a: Player, b: Player) =>
      a.lastName.localeCompare(b.lastName)
    );

    setPlayers(sortedList);
  } catch (err) {
    errorAlert();
  }
};
