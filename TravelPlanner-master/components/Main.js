import React, { useState } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostTools } from "./PostTool";

const postTool = new PostTools("http://192.168.0.6:3000/");

const Member = ({ id }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 20 }}>
      <Image
        source={require("../icon/person.png")}
        style={{ width: 40, height: 40 }}
      ></Image>
      <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 20, width: 160 }}>
        {id}
      </Text>
      <Image
        source={require("../icon/minus.png")}
        style={{ width: 30, height: 30 }}
      ></Image>
    </View>
  );
};

const Members = ({ members }) => {
  return (
    <View
      style={{
        borderTopWidth: 2,
        backgroundColor: "gray",
        marginLeft: 40,
        marginRight: 40,
        marginTop: 10,
      }}
    >
      {members.map((id, idx) => (
        <Member key={idx} id={id}></Member>
      ))}
    </View>
  );
};

const Plan = ({ plan, navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "gray",
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30,
        padding: 10,
      }}
    >
      {/* 위쪽 */}
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ height: 45, width: 50, marginLeft: 10, marginTop: 5 }}
          source={require("../icon/none_image.png")}
        ></Image>
        <View style={{ marginLeft: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 25, width: 215 }}>{plan.name}</Text>
            <Image
              source={require("../icon/dots.png")}
              style={{ height: 40, width: 40 }}
            ></Image>
          </View>
          <Text>{plan.date}</Text>
        </View>
      </View>
      {/* 아래쪽 */}
      <View style={{ alignItems: "flex-end" }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Image
            style={{ height: 25, width: 45, marginLeft: 5 }}
            source={require("../icon/people.png")}
          ></Image>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Tourist", { trip_id: plan.trip_id })
            }
          >
            <Image
              style={{ height: 45, width: 45, marginLeft: 15 }}
              source={require("../icon/right_arrow.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Members members={plan.members}></Members> */}
    </View>
  );
};

export const Plans = ({ viewHeight, plans, navigation }) => {
  //데이터 받아와야함
  return (
    <View style={{ alignItems: "center" }}>
      {Object.keys(plans).length === 0 ? (
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 25,
              textDecorationLine: "underline",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            새로운 계획을 세워봐요!!
          </Text>
          <Image
            style={{ height: 40, width: 40, marginTop: 40, marginLeft: 5 }}
            source={require("../icon/arrow.png")}
          ></Image>
        </View>
      ) : (
        <ScrollView style={{ height: viewHeight }}>
          {Object.keys(plans).map((key) => (
            <Plan key={key} plan={plans[key]} navigation={navigation}></Plan>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
