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
  const filter = name ? name.toLowerCase() : null;

  const filtered = filter
    ? players.filter(
        (player) =>
          player.ultraPosition === position &&
          (player.firstName?.toLowerCase().includes(filter) ||
            player.lastName?.toLowerCase().includes(filter))
      )
    : players.filter((player) => player.ultraPosition === position);

  setFilteredList(filtered);

  return filtered;
};
