import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { ref, set } from 'firebase/database'; 
import { router, Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { user, loading } = useAuth();

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  const handleRegister = async () => {
    // ===================VALIDACIONES BASICAS===================
    if (!name.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      //===================CREAR USUARIO EN FIREBASE===================
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      //===================GUARDAR DATOS=============================
      await set(ref(db, 'userss/' + newUser.uid), {
        name: name,
        email: email,
      });

      Alert.alert('Éxito', 'Usuario registrado correctamente');
      router.replace('/(tabs)');
    } catch (error: any) {
      console.log('Firebase error:', error.code, error.message);

      let mensaje = 'Ocurrió un error inesperado';
      if (error.code === 'auth/email-already-in-use') {
        mensaje = 'El correo ya está en uso';
      } else if (error.code === 'auth/invalid-email') {
        mensaje = 'El correo no es válido';
      } else if (error.code === 'auth/weak-password') {
        mensaje = 'La contraseña es demasiado débil';
      }

      Alert.alert('Error', mensaje);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <Button title="Registrarse" onPress={handleRegister} />
      <Text
        onPress={() => router.push('/login')}
        style={{ marginTop: 10, color: 'blue' }}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
};

export default RegisterScreen;
