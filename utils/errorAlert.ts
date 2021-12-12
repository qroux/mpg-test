import { Alert } from 'react-native';

export const errorAlert = () =>
  Alert.alert(
    'Erreur',
    'Une erreur est survenue lors du chargement. Réessayer dans un instant.',
    [{ text: 'OK' }]
  );
