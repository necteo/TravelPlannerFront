import { StatusBar } from "expo-status-bar";
import { View, TextInput, Text, ScrollView } from "react-native";
import { styles } from "../Styles";
import React, { useState, KeyboardEvent } from "react";

import { PostTools } from "./PostTool";

export const Test = ({}) => {
  const postTool = new PostTools("http://192.168.0.4:3000/");
  const [strings, setStrings] = useState("");

  const updateTest = async (text) => {
    let data = await postTool.postWithData(
      "OtTest/change",
      JSON.stringify({ name: text })
    );
    console.log("updateTest");
    console.log(data);
    //setStrings(data);
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
