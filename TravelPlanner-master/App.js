import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";

import { Body } from "./components/Body";
import { styles } from "./Styles";
import store from "./rootReducer";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        {/* <Test></Test> */}
        <Body></Body>
      </View>
    </Provider>
  );
}
