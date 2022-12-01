import React, { useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { PostTools } from "./PostTool";

export const Destination = ({ navigation }) => {
  const postTool = new PostTools("http://192.168.0.6:3000/");
  const [detail, setDetail] = useState("");

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
      <View>
        <View>
          <Text>날짜 </Text>
          <View>
            <TextInput></TextInput>
            <Text>~</Text>
            <TextInput></TextInput>
          </View>
        </View>
        {/* 세부계획 */}
        <View>
          <Text>세부 계획 </Text>
          <TextInput
            onChangeText={(text) => {
              console.log(text);
              console.log("text : " + text.length);
              // console.log(detail);
              console.log("detail : " + detail.length);
              var textLen = text.length;
              var detailLen = detail.length;
              var i = 0;
              if (textLen > detailLen) {
                for (i = 0; i < textLen; i++) {
                  console.log("text[i] : " + text[i]);
                  console.log("detail[i] : " + detail[i]);
                  if (text[i] != detail[i]) {
                    console.log("글자 추가");
                    break;
                  } else {
                    console.log("왜?");
                  }
                }
              } else if (textLen == detailLen) {
                console.log("text[i] : " + text[i]);
                console.log("detail[i] : " + detail[i]);
                for (i = 0; i < detailLen; i++) {
                  if (text[i] != detail[i]) {
                    console.log("성추가");
                    break;
                  }
                }
              } else {
                for (i = 0; i < detailLen; i++) {
                  console.log("text[i] : " + text[i]);
                  console.log("detail[i] : " + detail[i]);
                  if (text[i] != detail[i]) {
                    console.log("글자 삭제");
                    break;
                  }
                }
              }
              setDetail(text);
            }}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity
        style={{ marginTop: 340 }}
        onPress={() => navigation.navigate("TravelGraph")}
      >
        <AntDesign name="pluscircleo" size={48} color="black" />
      </TouchableOpacity>
    </View>
  );
};
