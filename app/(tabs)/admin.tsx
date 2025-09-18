import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function App() {
  const [colorTexto, setColorTexto] = useState("#000"); // color inicial

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={() => setColorTexto("red")}    // cuando presiona
        onPressOut={() => setColorTexto("blue")}  // cuando suelta
      >
        <Text style={[styles.texto, { color: colorTexto }]}>
          ¡Tócame!
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  texto: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
