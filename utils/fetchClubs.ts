import axios from 'axios';
import { ChampionshipClubsResponse, Club } from '../types/CustomTypes';
import { errorAlert } from './errorAlert';

type FunctionParams = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setClubs: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Club;
    }>
  >;
};

export const fetchClubs = async ({
  setClubs,
  setIsLoading,
}: FunctionParams) => {
  setIsLoading(true);
  try {
    const {
      data: { championshipClubs },
    }: ChampionshipClubsResponse = await axios.get(
      'https://api.mpg.football/api/data/championship-clubs'
    );

    const clubs = championshipClubs;

    setClubs(clubs);
    setIsLoading(false);
    return clubs;
  } catch (err) {
    errorAlert();
  }
  setIsLoading(false);
};
