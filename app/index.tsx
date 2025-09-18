// app/index.tsx
import { Text } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
