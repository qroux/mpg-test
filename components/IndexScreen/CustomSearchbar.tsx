import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type SearchBarProps = {
  value?: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
};

export default function CustomSearchbar({ value, setter }: SearchBarProps) {
  return (
    <TextInput
      placeholder='Filtrer les joueurs par nom ou prénom'
      style={styles.input}
      onChangeText={setter}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.07)',
    borderBottomColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 18,
    height: 55,
  },
});
