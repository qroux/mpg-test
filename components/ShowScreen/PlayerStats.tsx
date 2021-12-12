import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Player } from '../../types/CustomTypes';
import { FullRow } from './FullRow';

export default function PlayerStats({ player }: { player: Player }) {
  return (
    <View style={styles.container}>
      {/* <FullRow
        title='Note'
        content={parseFloat(player.stats.averageRating).toFixed(2)}
      /> */}

      <FullRow label='Matchs joués' value={player.stats.totalPlayedMatches} />
      <FullRow label='Buts' value={player.stats.totalGoals} />
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
