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
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../Styles";
import { PostTools } from "./PostTool";

const postTool = new PostTools();
//read Place

export const Tourist = ({ navigation, route }) => {
  const [places, setPlaces] = useState();
  const [modalVisiblePlace, setModalVisiblePlace] = useState(false);
  const [checked, setChecked] = React.useState("first");

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
    console.log(p);
    return JSON.parse(p);
  };
  //create Place
  const [placeName, setPlaceName] = useState("");
  const [placeType, setPlaceType] = useState("관광지");
  const newPlaces = async () => {
    await postTool.postWithData(
      "Place/create",
      JSON.stringify({
        trip_id: code,
        name: placeName,
        place_type: placeType,
      })
    );
    const p = await readPlaces();
    setPlaces(p);
  };

  //delete Place
  const deletePlace = async (placeId) => {
    const a = await postTool.postWithData(
      "Place/delete",
      JSON.stringify({
        place_id: placeId,
      })
    );
    const p = await readPlaces();
    setPlaces(p);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        data={places}
        renderItem={({ item }) => (
          <View style={styles.swipeListItem}>
            <Text>{item.name}</Text>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.swipeHiddenItemContainer}>
            <TouchableOpacity onPress={() => deletePlace(data.item.place_id)}>
              <View
                style={[styles.swipeHiddenItem, { backgroundColor: "red" }]}
              >
                <Text style={styles.swipeHiddenItemText}>Delete</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deletePlace(data.item.place_id)}>
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
            onPress={() =>
              navigation.navigate("TravelGraph", { trip_id: code })
            }
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
                setPlaceName(text);
              }}
              style={{ fontSize: 25, width: 180 }}
            ></TextInput>
          </View>
          <View>
            <RadioButton.Item
              label="관광지"
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("first");
                setPlaceType("관광지");
              }}
            />
            <RadioButton.Item
              label="음식점"
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("second");
                setPlaceType("음식점");
              }}
            />
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisiblePlace(!modalVisiblePlace);
              newPlaces();
              setPlaceName();
            }}
          >
            <Text style={styles.textStyle}>생성</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
