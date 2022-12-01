import React, { useState, useEffect } from "react";
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
import { SavePlans } from "./SavePlans";
import { GetPlans } from "./GetPlans";
import { containsKey } from "./containsKey";
const { height, width } = Dimensions.get("window");
const viewHeight = height;

const Stack = createNativeStackNavigator();

export const Body = () => {
  const postTool = new PostTools();

  const [plans, setPlans] = useState({});
  const [modalVisibleNew, setModalVisibleNew] = useState(false);
  const [modalVisibleCode, setModalVisibleCode] = useState(false);

  useEffect(() => {
    SavePlans(plans);
  }, [plans]);

  //create trip
  var title = "";
  var id = "";

  const newPlan = async () => {
    const strp = await postTool.postWithData(
      "Main/trip/create",
      JSON.stringify({
        name: title,
        member_id: id,
      })
    );
    const p = JSON.parse(strp);
    console.log(strp);

    //console.log(p);
    const plan = await GetPlans();
    console.log(plan);
    if (plan === null) {
      setPlans(p);
    } else {
      setPlans({ ...plan, ...p });
    }
  };
  //create trip by code
  var code = "";

  const newPlanWithCode = async () => {
    const p = await postTool.postWithData(
      "Main/trip/create/code",
      JSON.stringify({
        share_code: code,
      })
    );
    const plan = GetPlans();
    setPlans({ ...plan, p });
    SavePlans(plans);
  };

  const headerLeft = () => (
    <Image
      source={require("../icon/none_image.png")}
      style={{ width: 45, height: 35 }}
    ></Image>
  );
  //header
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
            children={({ navigation }) => (
              <Plans
                viewHeight={viewHeight}
                plans={plans}
                navigation={navigation}
              />
            )}
            options={() => ({
              title: "",
              headerStyle: styles.header,
              headerLeft,
              headerRight,
            })}
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
            <TextInput
              onChangeText={(text) => {
                title = text;
              }}
              style={{ fontSize: 30, width: 180 }}
            ></TextInput>
          </View>
          <View
            style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}
          >
            <Text style={{ fontSize: 20 }}>아이디 : </Text>
            <TextInput
              onChangeText={(text) => {
                id = text;
              }}
              style={{ fontSize: 20, width: 80 }}
            ></TextInput>
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisibleNew(!modalVisibleNew);
              newPlan();
            }}
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
            <TextInput
              onChangeText={(text) => {
                code = text;
              }}
              style={{ fontSize: 25, width: 180 }}
            ></TextInput>
          </View>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisibleCode(!modalVisibleCode);
              newPlanWithCode();
            }}
          >
            <Text style={styles.textStyle}>생성</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};
