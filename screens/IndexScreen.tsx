import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios';

import { Picker } from '@react-native-picker/picker';
import { Leagues, Positions } from '../constants/Data';
import {
  League,
  Player,
  PoolPlayerData,
  PositionValues,
} from '../types/CustomTypes';
import { PlayerRow } from '../components/IndexScreen/PlayerRow';
import CustomSearchbar from '../components/IndexScreen/CustomSearchbar';

export default function IndexScreen({
  navigation,
}: RootTabScreenProps<'Index'>) {
  const [name, setName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredList, setFilteredList] = useState<Player[]>([]);
  const [league, setLeague] = useState<League>(1);
  const [position, setPosition] = useState<PositionValues>(40);

  // LIFE CYCLE
  useEffect(() => {
    fetchData();
  }, [league]);

  useEffect(() => {
    const filtered = name
      ? players.filter(
          (player) =>
            player.ultraPosition === position &&
            (player.firstName?.includes(name) ||
              player.lastName?.includes(name))
        )
      : players.filter((player) => player.ultraPosition === position);

    setFilteredList(filtered);
  }, [name, league, position, players]);

  // UTILS
  const fetchData = async () => {
    const {
      data: { poolPlayers },
    }: PoolPlayerData = await axios.get(
      `https://api.mpg.football/api/data/championship-players-pool/${league}`
    );

    setPlayers(poolPlayers);
  };

  // LIST RENDERING
  const leagueItems = Leagues.map((league) => (
    <Picker.Item label={league.label} value={league.value} key={league.label} />
  ));

  const positionItems = Object.entries(Positions).map((data, index) => (
    <Picker.Item
      label={data[1].label}
      value={parseInt(data[0], 10)}
      key={index}
    />
  ));

  return (
    <View style={styles.container}>
      <CustomSearchbar setter={setName} value={name} />

      <View style={styles.pickerContainer}>
        <View style={styles.pickerWrapper}>
          <Picker
            style={styles.picker}
            selectedValue={position}
            onValueChange={(itemValue, itemIndex) => {
              setPosition(itemValue);
            }}>
            {positionItems}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            style={styles.picker}
            selectedValue={league}
            onValueChange={(itemValue, itemIndex) => {
              setLeague(itemValue);
            }}>
            {leagueItems}
          </Picker>
        </View>
      </View>

      <Text style={{ ...styles.title }}>{filteredList.length} résultat(s)</Text>

      <FlatList
        data={filteredList}
        renderItem={({ item }) => (
          <PlayerRow player={item} navigation={navigation} />
        )}
        style={{
          height: 300,
          width: '100%',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  pickerWrapper: {
    width: '49%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.07)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
