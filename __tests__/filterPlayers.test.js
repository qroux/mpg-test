import { filterPlayers } from '../utils/filterPlayers';
import axios from 'axios';

describe('Filter function tests', () => {
  let players;
  const setRessourceMock = jest.fn(() => null);

  beforeAll(async () => {
    const league = 1;
    const {
      data: { poolPlayers },
    } = await axios.get(
      `https://api.mpg.football/api/data/championship-players-pool/${league}`
    );

    players = poolPlayers;
  });

  it('Players ressource is accessible after beforeAll data fetching', async () => {
    expect(players).toBeDefined();
  });

  it('Filters players by ultraPosition WITHOUT name', async () => {
    const position = 40;

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
    const position = 31;

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
    const position = 40;

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
    const position = 10;

    const list = filterPlayers({
      name,
      players,
      position,
      setFilteredList: setRessourceMock,
    });

    expect(list[0]).toBeUndefined();
  });
});
