import { filterPlayers } from '../utils/filterPlayers';
import axios from 'axios';
import { Player, PoolPlayerData, PositionValues } from '../types/CustomTypes';

describe('Filter function tests', () => {
  let players: Player[];
  const setRessourceMock = jest.fn(() => null);

  beforeAll(async () => {
    const league = 1;
    const {
      data: { poolPlayers },
    }: PoolPlayerData = await axios.get(
      `https://api.mpg.football/api/data/championship-players-pool/${league}`
    );

    players = poolPlayers;
  });

  it('Players ressource is accessible after beforeAll data fetching', async () => {
    expect(players).toBeDefined();
  });

  it('Triggers setRessourceMock on api request success', async () => {
    const name = 'Arkadiusz';
    const position: PositionValues = 10;

    filterPlayers({
      name,
      players,
      position,
      setFilteredList: setRessourceMock,
    });

    expect(setRessourceMock).toBeCalled();
  });

  it('Filters players by ultraPosition WITHOUT name', async () => {
    const position: PositionValues = 40;

    const list = filterPlayers({
      name: '',
      players,
      position,
      setFilteredList: setRessourceMock,
    });

    expect(list.length).toBeLessThan(players.length);
    expect(players[0].ultraPosition).not.toEqual(position);

    expect(list[0]).toBeDefined();
    expect(list[0].ultraPosition).toEqual(position);
  });

  it('Filters players by ultraPosition WITH name as player.lastName', async () => {
    const name = 'Payet';
    const position: PositionValues = 31;

    const list = filterPlayers({
      name,
      players,
      position,
      setFilteredList: setRessourceMock,
    });

    expect(list[0]).toBeDefined();
    expect(list[0].ultraPosition).toEqual(position);
    expect(list[0].lastName).toEqual(name);
  });

  it('Filters players by ultraPosition WITH name as player.firstName', async () => {
    const name = 'Arkadiusz';
    const position: PositionValues = 40;

    const list = filterPlayers({
      name,
      players,
      position,
      setFilteredList: setRessourceMock,
    });

    expect(list[0]).toBeDefined();
    expect(list[0].ultraPosition).toEqual(position);
    expect(list[0].firstName).toEqual(name);
  });

  it('Returns no results if wrong ultraPosition for existing player.firstName', async () => {
    const name = 'Arkadiusz';
    const position: PositionValues = 10;

    const list = filterPlayers({
      name,
      players,
      position,
      setFilteredList: setRessourceMock,
    });

    expect(list[0]).toBeUndefined();
  });

  it('Filter is case insensitive', async () => {
    const name = "M'baye";
    const position: PositionValues = 40;

    const capitalizedResult = filterPlayers({
      name,
      players,
      position,
      setFilteredList: setRessourceMock,
    });

    const lowercaseResult = filterPlayers({
      name: name.toLowerCase(),
      players,
      position,
      setFilteredList: setRessourceMock,
    });

    expect(capitalizedResult[0]).toBeDefined();
    expect(lowercaseResult[0]).toBeDefined();
  });
});
