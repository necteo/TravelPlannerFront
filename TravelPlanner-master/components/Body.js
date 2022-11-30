import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { Destination } from "./Destination";
import { Plans } from "./Main";
import { TravelGraph } from "./TravelGraph";
import { styles } from "../Styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { TabNavigator } from "./TabNavigator";
import { Tourist } from "./Tourist";
import { Vote } from "./Vote";
import { PostTools } from "./PostTool";
const { height, width } = Dimensions.get("window");
const viewHeight = height;

const Stack = createNativeStackNavigator();

export const Body = () => {
  const postTool = new PostTools("http://192.168.0.6:3000/");

  const [plans, setPlans] = useState({});
  const [modalVisibleNew, setModalVisibleNew] = useState(false);
  const [modalVisibleCode, setModalVisibleCode] = useState(false);
  const headerLeft = () => (
    <Image
      source={require("../icon/none_image.png")}
      style={{ width: 45, height: 35 }}
    ></Image>
  );
  const headerRight = () => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => setModalVisibleCode(true)}>
        <Text
          style={{
            borderRadius: 20,
            borderWidth: 3,
            fontSize: 16,
            width: 55,
            height: 40,
            textAlign: "center",
            paddingTop: 8,
          }}
        >
          CODE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisibleNew(true)}>
        <Text
          style={{
            borderRadius: 20,
            borderWidth: 3,
            fontSize: 16,
            width: 55,
            height: 40,
            textAlign: "center",
            marginLeft: 10,
            paddingTop: 8,
          }}
        >
          NEW
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={{
        ...styles.contents,
        height: viewHeight,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Plans"
            component={Plans}
            options={() => ({
              title: "",
              headerStyle: styles.header,
              headerLeft,
              headerRight,
            })}
            plans={plans}
          />
          <Stack.Screen
            name="Tourist"
            component={Tourist}
            options={() => ({
              title: "",
              headerStyle: styles.header,
              headerLeft,
            })}
          />
          <Stack.Screen
            name="Destination"
            component={Destination}
            options={() => ({
              title: "",
              headerStyle: styles.header,
              headerLeft,
            })}
          />
          <Stack.Screen
            name="TravelGraph"
            component={TravelGraph}
            options={() => ({
              title: "",
              headerStyle: styles.header,
              headerLeft,
              headerRight,
            })}
          />
          <Stack.Screen
            name="Vote"
            component={Vote}
            options={() => ({
              title: "",
              headerStyle: styles.header,
              headerLeft,
            })}
          />
          {/* <View>
        <ScrollView horizontal contentContainerStyle={styles.timeline}>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
        </ScrollView>
      </View> */}
          {/* <Destination></Destination>
          <Plans viewHeight={viewHeight}></Plans>
          <NonPlan viewHeight={viewHeight}></NonPlan>
          <TravelGraph viewHeight={viewHeight}></TravelGraph> */}
        </Stack.Navigator>
      </NavigationContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleNew}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleNew(!modalVisibleNew);
        }}
      >
        <View
          style={{
            backgroundColor: "#bbb",
            marginTop: 300,
            width: 300,
            borderRadius: 20,
            padding: 10,
            marginLeft: 40,
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ fontSize: 30 }}>제목 : </Text>
            <TextInput style={{ fontSize: 30, width: 180 }}></TextInput>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ fontSize: 20 }}>날짜 :</Text>

            <TextInput style={{ fontSize: 20, width: 80 }}></TextInput>
            <Text style={{ fontSize: 20, marginLeft: 5, marginRight: 5 }}>
              ~
            </Text>
            <TextInput style={{ fontSize: 20, width: 80 }}></TextInput>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ fontSize: 20 }}>아이디 : </Text>
            <TextInput style={{ fontSize: 20, width: 80 }}></TextInput>
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisibleNew(!modalVisibleNew)}
          >
            <Text style={styles.textStyle}>생성</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleCode}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleCode(!modalVisibleCode);
        }}
      >
        <View
          style={{
            backgroundColor: "#bbb",
            marginTop: 300,
            width: 300,
            borderRadius: 20,
            padding: 10,
            marginLeft: 40,
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ fontSize: 25 }}>코드 : </Text>
            <TextInput style={{ fontSize: 25, width: 180 }}></TextInput>
          </View>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisibleCode(!modalVisibleCode)}
          >
            <Text style={styles.textStyle}>생성</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};
