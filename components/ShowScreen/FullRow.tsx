import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../Themed';

type RowProps = {
  label: string;
  value?: number | string;
};

export const FullRow = ({ label, value }: RowProps) => (
  <View style={styles.rowContainer}>
    <View style={styles.header}>
      <Text style={styles.bold}>{label}</Text>
    </View>
    <View style={styles.content}>
      <Text style={styles.normal}>{value === undefined ? '-' : value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginBottom: 2,
    height: 50,
    borderRadius: 5,
  },
  header: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.05)',

    alignItems: 'flex-start',
  },
  bold: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  normal: {
    textTransform: 'capitalize',
  },
  content: {
    padding: 15,
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});
