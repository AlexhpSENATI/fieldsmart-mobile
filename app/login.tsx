import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { router, Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, loading } = useAuth();

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  // ✅ Si ya está logueado, lo mandamos directo a /(tabs)
  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Éxito', 'Inicio de sesión correcto');
      // ❌ Quitamos router.replace('/(tabs)'), el Redirect ya se encarga
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Text
        onPress={() => router.push('/register')}
        style={{ marginTop: 10, color: 'blue' }}
      >
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
};

export default LoginScreen;
