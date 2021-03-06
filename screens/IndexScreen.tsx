import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { View, Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Picker } from '@react-native-picker/picker';
import { Leagues, Positions } from '../constants/Data';
import {
  ChampionshipClubs,
  Player,
  PoolIndex,
  PositionValues,
} from '../types/CustomTypes';
import { PlayerRow } from '../components/IndexScreen/PlayerRow';
import CustomSearchbar from '../components/IndexScreen/CustomSearchbar';
import { filterPlayers } from '../utils/filterPlayers';
import { fetchPoolPlayers } from '../utils/fetchPoolPlayers';
import { fetchClubs } from '../utils/fetchClubs';

export default function IndexScreen({
  navigation,
}: RootTabScreenProps<'Index'>) {
  const [name, setName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [clubs, setClubs] = useState<ChampionshipClubs>({});
  const [filteredList, setFilteredList] = useState<Player[]>([]);
  const [league, setLeague] = useState<PoolIndex>(1);
  const [position, setPosition] = useState<PositionValues>(40);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchClubs({ setClubs, setIsLoading });
    fetchPoolPlayers({ league, setPlayers, setIsLoading });
  }, [league]);

  useEffect(() => {
    filterPlayers({ name, position, players, setFilteredList });
  }, [name, league, position, players]);

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
            onValueChange={(itemValue) => {
              setPosition(itemValue);
            }}>
            {positionItems}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            style={styles.picker}
            selectedValue={league}
            onValueChange={(itemValue) => {
              setLeague(itemValue);
            }}>
            {leagueItems}
          </Picker>
        </View>
      </View>

      <View style={styles.listHeader}>
        <ActivityIndicator
          size='small'
          color='dodgerblue'
          animating={isLoading}
        />
        <Text style={styles.listTitle}>{filteredList.length} r??sultat(s)</Text>
      </View>

      <FlatList
        data={filteredList}
        renderItem={({ item }) => (
          <PlayerRow
            player={item}
            club={clubs[item.clubId]}
            navigation={navigation}
            rating={
              item.stats.averageRating
                ? item.stats.averageRating.toFixed(2)
                : '-'
            }
          />
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
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  listSpinner: {},
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',

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
