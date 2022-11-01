import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";

import { Body } from "./components/Body";
import { styles } from "./Styles";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Body />
    </View>
  );
}
