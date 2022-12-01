import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Pressable,
  RadioGroup,
  Radio,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../Styles";
import { PostTools } from "./PostTool";

const postTool = new PostTools("http://192.168.0.6:3000/");
//read Place

export const Tourist = ({ navigation, route }) => {
  const [places, setPlaces] = useState();
  const [modalVisiblePlace, setModalVisiblePlace] = useState(false);
  const [value, setValue] = useState("TOURIST_SPOT");

  console.log("route.params.trip_id");
  console.log(route.params.trip_id);
  // trip_id로 place list 가져오기
  const code = route.params.trip_id;
  useEffect(() => {
    const read = async () => {
      const p = await readPlaces();
      setPlaces(p);
    };
    read();
  }, []);

  const readPlaces = async () => {
    const p = await postTool.postWithData(
      "Place/read",
      JSON.stringify({
        trip_id: code,
      })
    );
    console.log("JSON.parse");
    console.log(p);
    return JSON.parse(p);
  };
  //create Place
  let placeName = "";
  const newPlaces = async () => {
    await postTool.postWithData(
      "Place/create",
      JSON.stringify({
        trip_id: code,
        name: placeName,
        type: "TOURIST_SPOT",
      })
    );
    const p = await readPlaces();
    setPlaces(p);
  };

  const LIST_VIEW_DATA = Array(8)
    .fill("")
    .map((_, i) => ({ key: `${i}`, text: `여행지 #${i}` }));

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        data={LIST_VIEW_DATA}
        renderItem={({ item }) => (
          <View style={styles.swipeListItem}>
            <Text>{item.text}</Text>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.swipeHiddenItemContainer}>
            <TouchableOpacity
              onPress={() => setText(`${data.item.text} left is pressed`)}
            >
              <View
                style={[styles.swipeHiddenItem, { backgroundColor: "green" }]}
              >
                <Text style={styles.swipeHiddenItemText}>Detail</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setText(`${data.item.text} right is pressed`)}
            >
              <View
                style={[styles.swipeHiddenItem, { backgroundColor: "red" }]}
              >
                <Text style={styles.swipeHiddenItemText}>Delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={70}
        rightOpenValue={-70}
      />

      <View
        style={{
          width: 300,
          height: 100,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 60,
        }}
      >
        <View style={{ marginRight: 30 }}>
          <TouchableOpacity onPress={() => setModalVisiblePlace(true)}>
            <AntDesign name="pluscircleo" size={48} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 30 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TravelGraph", { plans })}
          >
            <AntDesign name="solution1" size={48} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiblePlace}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisiblePlace(!modalVisiblePlace);
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
          <View
            style={{ flexDirection: "row", marginTop: 10, marginBottom: 20 }}
          >
            <Text style={{ fontSize: 25 }}>여행지 : </Text>
            <TextInput
              onChangeText={(text) => {
                placeName = text;
              }}
              style={{ fontSize: 25, width: 180 }}
            ></TextInput>
            <RadioGroup label="옵션 선택" value={value} onChange={setValue}>
              <Radio value="TOURIST_SPOT">관광지</Radio>
              <Radio value="RESTAURANT">음식점</Radio>
            </RadioGroup>
          </View>
          {/* radio button */}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisiblePlace(!modalVisiblePlace);
            }}
          >
            <Text style={styles.textStyle}>생성</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
