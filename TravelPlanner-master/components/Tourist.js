import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../Styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
// console.log(SCREEN_WIDTH);

export const Tourist = ({ navigation }) => {
  const tourist1 = "첨성대";
  const tourist2 = "불국사";
  const tourist3 = "석굴암";
  const tourist4 = "금오공대";
  const tourist5 = "연세대";
  const tourist6 = "고려대";
  const tourist7 = "서울대";
  const tourist8 = "경북대";
  const touristArray = new Array(
    tourist1,
    tourist2,
    tourist3,
    tourist4,
    tourist5,
    tourist6,
    tourist7,
    tourist8
  );

  return (
    <View style={styles.travelDestinationListBox}>
      <ScrollView style={styles.touristScrollView}>
        {touristArray.map((tourist, id) => (
          <View key={id} style={styles.travelDestinationBox}>
            <Text style={{ fontSize: 20 }}>{tourist}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Destination")}>
          <AntDesign name="pluscircleo" size={48} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
