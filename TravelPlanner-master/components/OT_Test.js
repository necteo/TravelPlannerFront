import { StatusBar } from "expo-status-bar";
import { View, TextInput, Text, ScrollView } from "react-native";
import { styles } from "../Styles";
import React, { useState, KeyboardEvent } from "react";

export const Test = ({}) => {
  const [strings, setStrings] = useState("");

  const updateTest = (text) => {
    fetch("http://192.168.0.5:3000/OtTest/change", {
      method: "POST",
      headers: {
        //Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Success :" + data.name);
        setStrings(data.name);
      })
      .catch((error) => console.log("Error : " + error));
  };

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
        {strings}
      </Text>
      <TextInput
        style={{
          borderWidth: 3,
          height: 200,
          padding: 20,
          fontSize: 20,
        }}
        onChangeText={(text) => {
          updateTest(text);
        }}
      ></TextInput>
    </ScrollView>
  );
};
