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
import { RadioButton } from "react-native-paper";
import { SaveMembers } from "./SaveMembers";
import { GetMembers } from "./GetMembers";
const { height, width } = Dimensions.get("window");
const viewHeight = height;

const postTool = new PostTools();

const Stack = createNativeStackNavigator();

export const Body = () => {
  const [plans, setPlans] = useState({});
  const [members, setMembers] = useState({});
  const [modalVisibleNew, setModalVisibleNew] = useState(false);
  const [modalVisibleCode, setModalVisibleCode] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [checked, setChecked] = useState("first");
  const [codeType, setCodeType] = useState("참가");

  useEffect(() => {
    SavePlans(plans);
  }, [plans]);

  useEffect(() => {
    SaveMembers(members);
  }, [members]);

  //create trip
  var title = null;
  var id = null;

  const newPlan = async () => {
    if (id == null || title == null) return;
    const strp = await postTool.postWithData(
      "Main/trip/create",
      JSON.stringify({
        name: title,
        member_id: id,
      })
    );
    const p = JSON.parse(strp);

    const plan = await GetPlans();
    // const member = await GetMembers();

    // const strm = {
    //   trip_id: p.trip_id,
    //   member_id: id,
    // };

    if (plan === null) {
      setPlans(p);
      // setMembers(strm);
    } else {
      setPlans({ ...plan, ...p });
      // setMembers(...member, ...strm);
    }
    title = null;
    id = null;
  };

  var code = "";
  //join trip by code
  const joinPlanWithCode = async () => {
    if (id == null || code == null) return;
    const strp = await postTool.postWithData(
      "Main/trip/join/code",
      JSON.stringify({
        write_code: code,
        member_id: id,
      })
    );
    const p = JSON.parse(strp);
    console.log(p[0]);
    console.log(p.length);
    if (p.length != 0) {
      const plan = await GetPlans();
      console.log(plan);
      setPlans({ ...plan, [p[0].trip_id]: { ...p[0] } });
      SavePlans(plans);
    }

    code = null;
    id = null;
  };
  //create trip by code
  const newPlanWithCode = async () => {
    if (id == null || code == null) return;
    const p = await postTool.postWithData(
      "Main/trip/create/code",
      JSON.stringify({
        share_code: code,
        member_id: id,
      })
    );
    const plan = GetPlans();
    setPlans({ ...plan, ...p });
    SavePlans(plans);

    code = null;
    id = null;
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
  const headerRightGraph = () => (
    <TouchableOpacity onPress={() => setIsNew(true)}>
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
                isNew={isNew}
                setIsNew={setIsNew}
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
              headerRight: headerRightGraph,
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
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>아이디 : </Text>
            <TextInput
              onChangeText={(text) => {
                id = text;
              }}
              style={{ fontSize: 20, width: 80 }}
            ></TextInput>
          </View>
          {/* 라디오 코드 식별 */}
          <View style={{ flexDirection: "row" }}>
            <RadioButton.Item
              label="참가코드"
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("first");
                setCodeType("참가");
              }}
            />
            <RadioButton.Item
              label="복사코드"
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("second");
                setCodeType("복사");
              }}
            />
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisibleCode(!modalVisibleCode);
              if (codeType == "참가") {
                joinPlanWithCode();
              } else if (codeType == "복사") {
                newPlanWithCode();
              }
            }}
          >
            <Text style={styles.textStyle}>생성</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};
