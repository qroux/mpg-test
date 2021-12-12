import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Player } from '../../types/CustomTypes';
import { FullRow } from './FullRow';

export default function PlayerStats({ player }: { player: Player }) {
  const playingTime = player.stats.matches.reduce(
    (acc, match) =>
      match.playerPerformance.minutesPlayed
        ? acc + match.playerPerformance.minutesPlayed
        : acc,
    0
  );

  return (
    <View style={styles.container}>
      <FullRow
        label='Note Moyenne'
        value={player.stats.averageRating?.toFixed(2)}
      />
      <FullRow label='Buts' value={player.stats.totalGoals} />
      <FullRow label='Matchs joués' value={player.stats.totalPlayedMatches} />
      <FullRow label='Temps de jeu cumulé (min)' value={playingTime} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
