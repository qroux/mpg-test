import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View, Text } from '../Themed';
import { Player } from '../../types/CustomTypes';
import { LineChart } from 'react-native-chart-kit';

type ChartProps = {
  player: Player;
};

export default function PlayerChart({ player }: ChartProps) {
  const matchData = player.stats.matches.map((match) => {
    const fullDate = match.date.toString().split(/T|\-/);
    const rating = match.playerPerformance.rating;

    if (fullDate)
      return { date: `${fullDate[2]}/${fullDate[1]}`, rating: rating || 0 };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tendance des derniers matchs</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: matchData.map((match) => (match ? match.date : '')),
            datasets: [
              { data: matchData.map((match) => (match ? match.rating : 0)) },
            ],
          }}
          yAxisInterval={1}
          fromZero={true}
          width={Dimensions.get('window').width - 30}
          height={200}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#D9D9D9',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 5 },
            propsForDots: { r: '3', strokeWidth: '2', stroke: 'teal' },
          }}
          bezier
          style={{ marginVertical: 5, borderRadius: 5 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    textAlign: 'left',
    fontSize: 14,

    marginBottom: 10,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
});
