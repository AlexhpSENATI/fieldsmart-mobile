import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebaseConfig";

interface HistorialItem {
  id: string;
  bomba: boolean;
  fecha_epoch: number;
  fecha_texto: string;
  humedadAmbiental: number;
  humedadSuelo: number;
  temperatura: number;
}

export default function HomeScreen() {
  const [historial, setHistorial] = useState<HistorialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const historialRef = ref(db, "historial");
    const unsubscribe = onValue(historialRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const parsed: HistorialItem[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        parsed.sort((a, b) => b.fecha_epoch - a.fecha_epoch);
        setHistorial(parsed);
      } else {
        setHistorial([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Cargando historial...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        📊 Historial de sensores
      </Text>

      <FlatList
        data={historial}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              marginBottom: 10,
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Text>🕒 {item.fecha_texto}</Text>
            <Text>🌡️ Temperatura: {item.temperatura} °C</Text>
            <Text>💧 Humedad Ambiental: {item.humedadAmbiental} %</Text>
            <Text>🌱 Humedad Suelo: {item.humedadSuelo} %</Text>
            <Text>
              🚰 Bomba: {item.bomba ? "Encendida ✅" : "Apagada ❌"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
