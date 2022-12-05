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
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { PostTools } from "./PostTool";

export const Destination = ({ navigation, route }) => {
  var postTool = new PostTools();
  const [details, setDetails] = useState();
  const [changed, setChanged] = useState(true);

  useEffect(() => {
    const read = async () => {
      const p = await readPlanDetailOne();

      setDetails(p);
    };
    read();
  }, []);

  useEffect(() => {
    console.log("useEffect Destination : " + changed);
    changePromise();
  }, [details]);

  const readPlanDetailOne = async () => {
    const p = await postTool.postWithData(
      "destination/read",
      JSON.stringify({
        trip_id: route.params.trip_id,
        plan_id: route.params.plan_id,
        index: route.params.index,
      })
    );
    return JSON.parse(p);
  };

  const updatePlanDetailOneDate = async (date) => {
    postTool = new PostTools();
    console.log("updateDate");
    const p = await postTool.postWithData(
      "destination/update/date",
      JSON.stringify({
        trip_id: route.params.trip_id,
        plan_id: route.params.plan_id,
        index: route.params.index,
        date: date,
      })
    );
  };
  const updatePlanDetailOneStartTime = async (startTime) => {
    const p = await postTool.postWithData(
      "destination/update/startTime",
      JSON.stringify({
        trip_id: route.params.trip_id,
        plan_id: route.params.plan_id,
        index: route.params.index,
        startTime: startTime,
      })
    );
  };

  const updatePlanDetailOneEndTime = async (endTime) => {
    const p = await postTool.postWithData(
      "destination/update/endTime",
      JSON.stringify({
        trip_id: route.params.trip_id,
        plan_id: route.params.plan_id,
        index: route.params.index,
        endTime: endTime,
      })
    );
  };

  const updatePlanDetailOnedetails = async (detail) => {
    const p = await postTool.postWithData(
      "destination/update/details",
      JSON.stringify({
        trip_id: route.params.trip_id,
        plan_id: route.params.plan_id,
        index: route.params.index,
        details: detail,
      })
    );
  };

  //change listener
  const changePlanDetailOne = async () => {
    const p = await postTool.postWithData(
      "destination/change",
      JSON.stringify({
        trip_id: route.params.trip_id,
        plan_id: route.params.plan_id,
        index: route.params.index,
      })
    );

    return JSON.parse(p);
  };

  const changePromise = async () => {
    if (changed) {
      setChanged(false);
      const p = await changePlanDetailOne();
      setChanged(true);
      setDetails(p);
    }
  };

  return (
    <View
      style={{ backgroundColor: "white" }}
      keyboardVerticalOffset={200}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity
        style={{ marginTop: 20, marginLeft: 330 }}
        onPress={() =>
          navigation.push("TravelGraph", {
            trip_id: route.params.trip_id,
          })
        }
      >
        <AntDesign name="rightcircle" size={46} color="black" />
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            backgroundColor: "#cfd4da",
            borderRadius: 20,
            height: 550,
            marginTop: 20,
            marginBottom: 50,
            marginLeft: 30,
            marginRight: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../icon/none_image.png")}
              style={{
                height: 120,
                width: 120,
                marginLeft: 10,
                marginTop: 30,
              }}
            ></Image>
            <TouchableOpacity
              onPress={() =>
                navigation.push("Tourist", {
                  trip_id: route.params.trip_id,
                  plan_id: route.params.plan_id,
                  index: route.params.index,
                  isNew: route.params.isNew,
                })
              }
            >
              <Text
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
                {route.params.placeName === undefined
                  ? "여행지 목록"
                  : route.params.placeName}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 90, marginRight: 5 }}>
              <AntDesign name="download" size={34} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10, alignItems: "center", fontSize: 15 }}>
            <Text>날짜</Text>
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
                  onChangeText={(text) => {
                    updatePlanDetailOneDate(text);
                  }}
                >
                  {details !== undefined ? details.date : null}
                </TextInput>
              </View>
            </View>
          </View>
          <View>
            <View style={{ marginTop: 10, alignItems: "center", fontSize: 15 }}>
              <Text>시간</Text>
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
                    onChangeText={(text) => {
                      updatePlanDetailOneStartTime(text);
                    }}
                  >
                    {details !== undefined ? details.startTime : null}
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
                    onChangeText={(text) => {
                      updatePlanDetailOneEndTime(text);
                    }}
                  >
                    {details !== undefined ? details.endTime : null}
                  </TextInput>
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  alignItems: "center",
                  marginTop: 15,
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
                  height: 200,
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
                      updatePlanDetailOnedetails(text);
                    }}
                  >
                    {details !== undefined ? details.details : null}
                  </TextInput>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
