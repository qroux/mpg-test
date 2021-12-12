import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

import { Positions } from '../constants/Data';
import { Player } from '../types/CustomTypes';
import PlayerStats from '../components/ShowScreen/PlayerStats';
import ImagePlaceholder from '../components/ShowScreen/ImagePlaceholder';
import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PlayerChart from '../components/ShowScreen/PlayerChart';

export default function ShowScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Show'>) {
  const { player }: { player: Player } = route.params;
  const [club, setClub] = useState<any>();
  // const [seasons, setSeasons] = useState([]);

  const fetchClub = async () => {
    try {
      const response = await axios.get(
        'https://api.mpg.football/api/data/championship-clubs'
      );
      const club = response.data.championshipClubs[player.clubId];
      setClub(club);
    } catch (err) {
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors du chargement. Réessayer dans un instant.',
        [{ text: 'OK' }]
      );
    }
  };

  // const fetchChampionship = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.mpg.football/api/data/championship-player-stats/${player.id}/summary`
  //     );
  //     const years = response.data.statsSeasons;

  //     setSeasons(years);
  //   } catch (err) {
  //     Alert.alert(
  //       'Erreur',
  //       'Une erreur est survenue lors du chargement. Réessayer dans un instant.',
  //       [{ text: 'OK' }]
  //     );
  //   }
  // };

  useEffect(() => {
    fetchClub();
    // fetchChampionship();
  }, []);

  const renderJersey = club ? (
    <Image
      source={{
        uri: club.defaultJerseyUrl,
        height: 150,
        width: 150,
      }}
    />
  ) : (
    <ImagePlaceholder size={150} />
  );

  return (
    <View style={styles.container}>
      {renderJersey}

      <View style={styles.player}>
        <Text style={styles.title}>
          {player.firstName} {player.lastName}
        </Text>
        <Text style={styles.position}>
          {Positions[player.ultraPosition].label} à {club?.name['fr-FR']}
        </Text>
      </View>

      <View style={styles.seasonContainer}>
        <Text style={styles.season}>
          Statistiques pour la saison : 2021 - 2022
        </Text>
      </View>

      <PlayerStats player={player} />
      <PlayerChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  player: {
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  infoContainer: {
    width: '100%',
  },
  seasonContainer: {
    width: '100%',
    paddingBottom: 10,
  },
  season: {
    textAlign: 'left',
    fontSize: 14,
  },
});
