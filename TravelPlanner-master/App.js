import { StatusBar } from "expo-status-bar";
import React from "react";
import { TextInput, View } from "react-native";

import { Body } from "./components/Body";
import { styles } from "./Styles";
import { Test } from "./components/OT_Test";

export default function App() {
  return (
    <View style={styles.container}>
      <Test></Test>
    </View>
  );
}
