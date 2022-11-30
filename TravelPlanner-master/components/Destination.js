import React from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const Destination = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "#cfd4da",
        borderRadius: 20,
        height: 550,
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../icon/none_image.png")}
          style={{ height: 100, width: 100, marginLeft: 30, marginTop: 50 }}
        ></Image>

        <TextInput
          style={{
            fontSize: 20,
            marginLeft: 10,
            marginTop: 60,
            width: 150,
            height: 20,
            borderBottomWidth: 1,
          }}
          onChangeText={(text) => {}}
        >
          제목을 입력하세요
        </TextInput>
      </View>
      <TouchableOpacity
        style={{ marginTop: 440 }}
        onPress={() => navigation.navigate("TravelGraph")}
      >
        <AntDesign name="pluscircleo" size={48} color="black" />
      </TouchableOpacity>
    </View>
  );
};
