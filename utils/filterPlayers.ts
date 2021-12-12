import { Player, PositionValues } from '../types/CustomTypes';

type FilterParams = {
  name: string;
  players: Player[];
  position: PositionValues;
  setFilteredList: React.Dispatch<React.SetStateAction<Player[]>>;
};

export const filterPlayers = ({
  name,
  players,
  position,
  setFilteredList,
}: FilterParams) => {
  const filtered = name
    ? players.filter(
        (player) =>
          player.ultraPosition === position &&
          (player.firstName?.includes(name) || player.lastName?.includes(name))
      )
    : players.filter((player) => player.ultraPosition === position);

  setFilteredList(filtered);
};
