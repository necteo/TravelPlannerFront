import { StatusBar } from "expo-status-bar";
import { View, TextInput, Text, ScrollView } from "react-native";
import { styles } from "../Styles";
import React, { useState, KeyboardEvent } from "react";

//KeyboardEvent.nativeEvent.isComposing = false;
export const Test = ({}) => {
  const [name, setName] = useState("");

  const updateTest = (text) =>
    fetch("https://112.217.167.202:8000", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updateIndex: 1,
        updateString: { text },
      }),
    }).then((res) => {
      name = text;
    });

  return (
    <ScrollView>
      <Text
        style={{
          borderWidth: 3,
          marginTop: 50,
          height: 100,
          padding: 20,
          fontSize: 20,
        }}
      >
        {name}
      </Text>
      <TextInput
        style={{
          borderWidth: 3,
          height: 200,
          padding: 20,
          fontSize: 20,
        }}
        onChangeText={(text) => {
          setName(text);
        }}
      ></TextInput>
      <TextInput
        style={{
          borderWidth: 3,
          height: 200,
          padding: 20,
          fontSize: 20,
        }}
        onKeyPress={(e) => {
          const { key } = e.nativeEvent;
          CompositionEvent.bind(key);
          let addStr = name;
          if (key == "Backspace") {
          } else {
            addStr = name + key;
          }
          setName(addStr);
        }}
      ></TextInput>
    </ScrollView>
  );
};
