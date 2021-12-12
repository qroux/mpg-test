import axios from 'axios';
import { ChampionshipClubsResponse, Club, Player } from '../types/CustomTypes';
import { errorAlert } from './errorAlert';

type FunctionParams = {
  setClubs: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Club;
    }>
  >;
};

export const fetchClubs = async ({ setClubs }: FunctionParams) => {
  try {
    const {
      data: { championshipClubs },
    }: ChampionshipClubsResponse = await axios.get(
      'https://api.mpg.football/api/data/championship-clubs'
    );

    const clubs = championshipClubs;

    setClubs(clubs);
    return clubs;
  } catch (err) {
    errorAlert();
  }
};
