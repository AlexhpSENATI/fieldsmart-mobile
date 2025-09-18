import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useFirebaseData } from "../../hooks/useFirebaseData";

export default function Home() {
  const { sensores, loading } = useFirebaseData();

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={{ padding: 20 }}>
      <Text>🌡️ Temp: {sensores?.temperatura} °C</Text>
      <Text>💧 Humedad Suelo: {sensores?.humedadSuelo}%</Text>
      <Text>💨 Humedad Ambiental: {sensores?.humedadAmbiental}%</Text>
      <Text>⚡ Bomba: {sensores?.bomba ? "Encendida" : "Apagada"}</Text>
    </View>
  );
}
