import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../Styles";
import { PostTools } from "./PostTool";

const path1 = { name: "여행 경로 1", count: 0, voted: false };
const path2 = { name: "여행 경로 2", count: 0, voted: false };
const path3 = { name: "여행 경로 3", count: 0, voted: false };
const path4 = { name: "여행 경로 4", count: 0, voted: false };
const path5 = { name: "여행 경로 5", count: 0, voted: false };
const path6 = { name: "여행 경로 6", count: 0, voted: false };
const path7 = { name: "여행 경로 7", count: 0, voted: false };
const path8 = { name: "여행 경로 8", count: 0, voted: false };
const pathArray = new Array(
  path1,
  path2,
  path3,
  path4,
  path5,
  path6,
  path7,
  path8
);

const postTool = new PostTools();

// trip_id, plan_id, members[member_id]

export const Vote = ({ navigation, route }) => {
  const [paths, setPaths] = useState(pathArray);

  // useEffect(() => {
  //   const members =
  // }, []);

  const countUp = (key) => {
    const newPaths = [...paths];
    newPaths[key].count = newPaths[key].count + 1;
    newPaths[key].voted = true;
    setPaths(newPaths);
  };
  const countDown = (key) => {
    const newPaths = [...paths];
    newPaths[key].count = newPaths[key].count - 1;
    newPaths[key].voted = false;
    setPaths(newPaths);
  };

  return (
    <View style={styles.scrollBox}>
      <ScrollView style={styles.pathCountBox}>
        {paths.map((path, id) => (
          <View key={id} style={styles.pathBox}>
            <View style={styles.pathName}>
              <Text style={styles.pathText}>{path.name}</Text>
            </View>
            <View style={styles.likeIcon}>
              <Text style={styles.likeCount}>{path.count}</Text>
              <TouchableOpacity onPress={() => countUp(id)}>
                <Text
                  style={{ ...styles.likeIconN, width: path.voted ? 0 : 37 }}
                >
                  <AntDesign name="like2" size={36} color="black" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => countDown(id)}>
                <Text
                  style={{ ...styles.likeIconY, width: !path.voted ? 0 : 37 }}
                >
                  <AntDesign name="like1" size={36} color="black" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
