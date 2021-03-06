import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View } from '../Themed';
import { Player } from '../../types/CustomTypes';
import { FullRow } from './FullRow';
import PlayerChart from './PlayerChart';

export default function PlayerStats({ player }: { player: Player }) {
  const playingTime = player.stats.matches.reduce(
    (acc, match) =>
      match.playerPerformance.minutesPlayed
        ? acc + match.playerPerformance.minutesPlayed
        : acc,
    0
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.rowContainer}>
        <FullRow
          label='Note Moyenne'
          value={player.stats.averageRating?.toFixed(2)}
        />
        <FullRow label='Buts' value={player.stats.totalGoals} />
        <FullRow label='Matchs joués' value={player.stats.totalPlayedMatches} />
        <FullRow
          label='Temps de jeu cumulé (min)'
          value={playingTime === 0 ? '-' : playingTime}
        />
      </View>
      <PlayerChart player={player} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  rowContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
