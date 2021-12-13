import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../components/Themed';

import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cette page n'existe pas.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace('Index')}
        style={styles.link}>
        <Text style={styles.linkText}>Retourner à l'écran principal !</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
