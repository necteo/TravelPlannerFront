import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { PostTools } from "./PostTool";

export const Destination = ({ navigation, route }) => {
  const postTool = new PostTools();
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (true) {
      // 새로운 PlanDetail 생성
    } else {
      // 넘겨온 데이터 표시
    }
  }, []);
  //change listener
  const changePlace = async (trip_id) => {
    const a = await postTool.postWithDataForOt(
      "Place/change",
      JSON.stringify({
        trip_id: trip_id,
      })
    );
    console.log(JSON.parse(a));

    return JSON.parse(a);
  };

  const changePromiseDetail = async (trip_id) => {
    if (changed) {
      setChanged(false);
      const p = await changePlace(trip_id);
      setChanged(true);
      setPlaces(p);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: "tomato" }}
      keyboardVerticalOffset={200}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            backgroundColor: "#cfd4da",
            borderRadius: 20,
            height: 550,
            marginTop: 70,
            marginLeft: 30,
            marginRight: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../icon/none_image.png")}
              style={{ height: 120, width: 120, marginLeft: 10, marginTop: 40 }}
            ></Image>

            <TextInput
              style={{
                fontSize: 20,
                marginLeft: 10,
                marginRight: 10,
                marginTop: 80,
                width: 150,
                height: 40,
                borderBottomWidth: 1,
              }}
              onChangeText={(text) => {}}
            >
              여행지 입력
            </TextInput>
            <TouchableOpacity
              style={{ marginTop: 90, marginRight: 5 }}
              onPress={() =>
                navigation.navigate("Tourist", {
                  trip_id: route.params.trip_id,
                })
              }
            >
              <AntDesign name="download" size={34} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <View style={{ marginTop: 30, alignItems: "center", fontSize: 15 }}>
              <Text>날짜 </Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View
                  style={{
                    borderRadius: 20,
                    width: 100,
                    height: 22,
                    backgroundColor: "#bbb",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={{
                      width: 80,
                      height: 22,
                    }}
                  >
                    20230126
                  </TextInput>
                </View>

                <Text style={{ marginLeft: 10, marginRight: 10 }}>~</Text>
                <View
                  style={{
                    borderRadius: 20,
                    width: 100,
                    height: 22,
                    backgroundColor: "#bbb",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={{
                      width: 80,
                      height: 22,
                    }}
                  >
                    20230126
                  </TextInput>
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                  marginBottom: 10,
                  fontSize: 15,
                }}
              >
                <Text>세부 계획 </Text>
              </View>
              <View
                style={{
                  borderRadius: 20,
                  width: 300,
                  height: 220,
                  backgroundColor: "#bbb",
                }}
              >
                <View>
                  <TextInput
                    style={{
                      borderRadius: 20,
                      width: 280,
                      height: 200,
                      backgroundColor: "#bbb",
                      marginLeft: 10,
                    }}
                    multiline={true}
                    onChangeText={(text) => {
                      setDetail(text);
                    }}
                  ></TextInput>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
