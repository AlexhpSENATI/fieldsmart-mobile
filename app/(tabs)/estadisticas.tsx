import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useFirebaseData } from "../../hooks/useFirebaseData";

const screenWidth = Dimensions.get("window").width;

export default function Estadisticas() {
  const { historial, loading } = useFirebaseData();

  if (loading || !historial) return null;

  // Extraer datos
  const labels = historial.map((h: any) => h.fecha_texto.split(" ")[1]); // solo hora
  const temperaturas = historial.map((h: any) => h.temperatura);
  const humedadSuelo = historial.map((h: any) => h.humedadSuelo);
  const humedadAmbiental = historial.map((h: any) => h.humedadAmbiental);

  return (
    <ScrollView>
      {/* Temperatura */}
      <LineChart
        data={{
          labels,
          datasets: [{ data: temperaturas }],
        }}
        width={screenWidth - 16}
        height={220}
        yAxisSuffix="°C"
        chartConfig={{
          backgroundColor: "#1e2923",
          backgroundGradientFrom: "#08130D",
          backgroundGradientTo: "#1e2923",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{ margin: 8, borderRadius: 8 }}
      />

      {/* Humedad Suelo */}
      <LineChart
        data={{
          labels,
          datasets: [{ data: humedadSuelo }],
        }}
        width={screenWidth - 16}
        height={220}
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: "#1e2923",
          backgroundGradientFrom: "#0d47a1",
          backgroundGradientTo: "#1976d2",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{ margin: 8, borderRadius: 8 }}
      />

      {/* Humedad Ambiental */}
      <LineChart
        data={{
          labels,
          datasets: [{ data: humedadAmbiental }],
        }}
        width={screenWidth - 16}
        height={220}
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: "#1e2923",
          backgroundGradientFrom: "#388e3c",
          backgroundGradientTo: "#4caf50",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{ margin: 8, borderRadius: 8 }}
      />
    </ScrollView>
  );
}
