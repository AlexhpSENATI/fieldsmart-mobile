import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { router } from 'expo-router';

const HomeScreen = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente");
      router.replace("/login"); 
    } catch (error: any) {
      console.log("Logout error:", error.code, error.message);
      Alert.alert("Error", "No se pudo cerrar sesión");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido xd</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
