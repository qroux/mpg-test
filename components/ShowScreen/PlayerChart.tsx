import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlayerChart() {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  return (
    <View style={styles.container}>
      <Text>Tendance des derniers matchs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
