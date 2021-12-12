import axios from 'axios';
import { ChampionshipClubs, Club, Player } from '../types/CustomTypes';
import { errorAlert } from './errorAlert';

type FunctionParams = {
  player: Player;
  setClub: React.Dispatch<React.SetStateAction<Club | undefined>>;
};

export const fetchClub = async ({ player, setClub }: FunctionParams) => {
  try {
    const {
      data: { championshipClubs },
    }: ChampionshipClubs = await axios.get(
      'https://api.mpg.football/api/data/championship-clubs'
    );

    const club = championshipClubs[player.clubId];

    setClub(club);
    return club;
  } catch (err) {
    errorAlert();
  }
};
