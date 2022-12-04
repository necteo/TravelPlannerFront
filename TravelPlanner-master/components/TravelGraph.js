import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  Animated,
  PanResponder,
  View,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Svg, { Line } from "react-native-svg";
import styled from "styled-components";
import { plans } from "../PlanData";
import { styles } from "../Styles";
import { Entypo } from "@expo/vector-icons";
import { PostTools } from "./PostTool";

const { height, width } = Dimensions.get("window");
const viewHeight = height - 100;

const getDateDiff = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffDate = date1.getTime() - date2.getTime();

  return diffDate / (1000 * 60 * 60); // 밀리세컨 * 초 * 분 = 시
};

const Box = styled.View`
  background-color: white;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export const TravelGraph = ({ navigation, route }) => {
  const [planss, setPlanss] = useState();

  useEffect(() => {
    const read = async () => {
      const p = await readPlaces();
      setPlanss(p);
    };
    read();
  }, []);

  const postTool = new PostTools();

  const readPlaces = async () => {
    const p = await postTool.postWithData(
      "PlanDetail/read",
      JSON.stringify({
        trip_id: code,
      })
    );
    console.log(p);
    return JSON.parse(p);
  };

  const code = route.params.trip_id;

  let firstTime = [plans[0][0].date, 24];
  plans.map((plan) => {
    const dd = getDateDiff(firstTime[0], plan[0].date);
    const len =
      parseInt(plan[0].startTime.split(":")[0]) +
      parseInt(plan[0].startTime.split(":")[1]) / 60;
    if (dd < 0) {
      firstTime[0] = plan[0].date;
      firstTime[1] = len;
    } else {
      if (firstTime[1] > len + dd) {
        firstTime[0] = plan[0].date;
        firstTime[1] = len + dd;
      }
    }
  });
  const firstWidth = [];
  plans.map((plan) => {
    firstWidth.push(
      60 *
        (parseInt(plan[0].startTime.split(":")[0]) +
          parseInt(plan[0].startTime.split(":")[1]) / 60 -
          firstTime[1] +
          getDateDiff(plan[0].date, firstTime[0]))
    );
  });

  let maxLen = 0;
  plans.map((plan) => {
    const dd = getDateDiff(plan[plan.length - 1].date, firstTime[0]);
    const len =
      parseInt(plan[plan.length - 1].endTime.split(":")[0]) +
      parseInt(plan[plan.length - 1].endTime.split(":")[1]) / 60 -
      firstTime[1] +
      dd;
    if (maxLen < len) maxLen = len;
  });

  const CONTENTS_HEIGHT = 120 * plans.length;
  const CONTENTS_WIDTH = 61 * maxLen;

  var xOffset,
    yOffset = 0;
  const xDiff = width - CONTENTS_WIDTH >= 0 ? 0 : width - CONTENTS_WIDTH;
  const yDiff =
    viewHeight - CONTENTS_HEIGHT >= 0 ? 0 : viewHeight - CONTENTS_HEIGHT;
  const POSITION = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const locWidth = [];
  plans.map((plan, yidx) => {
    locWidth.push([]);
    plan.map((infos) => {
      const dd = getDateDiff(infos.date, infos.date);
      locWidth[yidx].push(
        60 *
          (parseInt(infos.endTime.split(":")[0]) +
            parseInt(infos.endTime.split(":")[1]) / 60 -
            (parseInt(infos.startTime.split(":")[0]) +
              parseInt(infos.startTime.split(":")[1]) / 60) +
            dd)
      );
    });
  });

  const lineWidth = [];
  plans.map((plan, idx) => {
    lineWidth.push([]);
    for (let i = 0; i < plan.length - 1; i++) {
      const dd = getDateDiff(plan[i + 1].date, plan[i].date);
      lineWidth[idx].push(
        60 *
          (parseInt(plan[i + 1].startTime.split(":")[0]) +
            parseInt(plan[i + 1].startTime.split(":")[1]) / 60 -
            (parseInt(plan[i].endTime.split(":")[0]) +
              parseInt(plan[i].endTime.split(":")[1]) / 60) +
            dd) +
          2
      );
    }
    lineWidth[idx][0] ? true : lineWidth[idx].push(0);
  });

  const setPosVal = (xVal, yVal) => {
    POSITION.setValue({ x: xVal, y: yVal });
    POSITION.setOffset({ x: 0, y: 0 });
  };

  const panResponder = useRef(
    PanResponder.create({
      // 터치가 시작되면 감지
      onStartShouldSetPanResponder: () => true,
      // 터치 시작될떄 실행되는 함수
      // setOffset은 터치가 시작될 때 값이 reset 되지 않고 저번 터치가 시작됐을 때
      // 위치에서 다시 시작되기 위해 사용함
      onPanResponderGrant: () => {
        console.log("Touch Started");
        POSITION.setOffset({
          x: POSITION.x._value,
          y: POSITION.y._value,
        });
        xOffset = POSITION.x._value;
        yOffset = POSITION.y._value;
        Keyboard.dismiss();
      },

      onPanResponderMove: (_, { dx, dy }) => {
        console.log("Finger Moving");
        if (xOffset + dx >= 0) {
          setPosVal(0, POSITION.y._value);
        } else if (xOffset + dx <= xDiff) {
          setPosVal(xDiff, POSITION.y._value);
        } else {
          setPosVal(xOffset + dx, POSITION.y._value);
        }

        if (yOffset + dy >= 0) {
          setPosVal(POSITION.x._value, 0);
        } else if (yOffset + dy <= yDiff) {
          setPosVal(POSITION.x._value, yDiff);
        } else {
          setPosVal(POSITION.x._value, yOffset + dy);
        }
      },

      // touch가 완료 된 후에 offset 값이 계속 적산된 것을 막기 위해서
      // offset을 reset 시키기 위함 POSITION.flattenOffset();
      onPanResponderRelease: () => {
        console.log("Touch Finished");
        POSITION.flattenOffset();
      },
    })
  ).current;

  return (
    <View>
      <View
        style={{
          height: 40,
          backgroundColor: "white",
          zIndex: -1,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Vote")}>
          <Text
            style={{
              fontSize: 20,
              paddingTop: 10,
              paddingHorizontal: 20,
            }}
          >
            투표
          </Text>
        </TouchableOpacity>
      </View>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          height: CONTENTS_HEIGHT,
          width: CONTENTS_WIDTH,
          zIndex: -2,
          transform: [...POSITION.getTranslateTransform()],
        }}
      >
        {plans.map((plan, yindex) => (
          <View key={yindex} style={{ height: 120, paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "row", height: 80 }}>
              <View
                style={{
                  width: firstWidth[yindex],
                }}
              ></View>
              {plan.map((infos, xindex) => (
                <View key={xindex} style={{ flexDirection: "row" }}>
                  {infos.isDup ? (
                    <View style={{ width: locWidth[yindex][xindex] }}></View>
                  ) : (
                    <Pressable
                      onPress={() =>
                        navigation.navigate("Destination", {
                          trip_id: route.params.trip_id,
                          plan_id: plan.plan_id,
                          index: xindex,
                        })
                      }
                    >
                      <View
                        style={{
                          width: locWidth[yindex][xindex],
                          borderWidth: 1,
                          borderRadius: 10,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Entypo
                          style={{ paddingLeft: 5 }}
                          name="image"
                          size={15}
                          color="black"
                        />
                        <View style={{ marginBottom: 20 }}>
                          <Text style={{}}>{infos.startTime}</Text>
                          <TextInput style={styles.text}>
                            {infos.location}
                          </TextInput>
                        </View>
                      </View>
                    </Pressable>
                  )}

                  {xindex === plan.length - 1 ? null : infos.isDup ? (
                    <View style={{ width: lineWidth[yindex][xindex] }}>
                      {yindex === 0 ? null : plan[xindex + 1].isDup ? null : (
                        <Svg height="100%" width="100%">
                          <Line
                            x1={
                              lineWidth[yindex][xindex] >
                              lineWidth[yindex - 1][xindex]
                                ? lineWidth[yindex - 1][xindex] / 2
                                : lineWidth[yindex][xindex] / 2
                            }
                            x2="100%"
                            y1="50%"
                            y2="50%"
                            stroke="black"
                            strokeWidth="2"
                          />
                          <Line
                            x1={
                              lineWidth[yindex][xindex] >
                              lineWidth[yindex - 1][xindex]
                                ? lineWidth[yindex - 1][xindex] / 2
                                : lineWidth[yindex][xindex] / 2
                            }
                            x2={
                              lineWidth[yindex][xindex] >
                              lineWidth[yindex - 1][xindex]
                                ? lineWidth[yindex - 1][xindex] / 2
                                : lineWidth[yindex][xindex] / 2
                            }
                            y1="0%"
                            y2="50%"
                            stroke="black"
                            strokeWidth="2"
                          />
                        </Svg>
                      )}
                    </View>
                  ) : (
                    <View style={{ width: lineWidth[yindex][xindex] }}>
                      {plan[xindex + 1].isDup === false ? (
                        <Svg height="150%" width="100%">
                          <Line
                            x1="0%"
                            x2="100%"
                            y1="33.3%"
                            y2="33.3%"
                            stroke="black"
                            strokeWidth="2"
                          />
                          {yindex < plans.length - 1 ? (
                            plans[yindex + 1][xindex + 1]?.isDup === false ||
                            plans[yindex + 1][xindex]?.isDup === false ? (
                              <Line
                                x1={
                                  lineWidth[yindex][xindex] >
                                  lineWidth[yindex + 1][xindex]
                                    ? lineWidth[yindex + 1][xindex] / 2
                                    : lineWidth[yindex][xindex] / 2
                                }
                                x2={
                                  lineWidth[yindex][xindex] >
                                  lineWidth[yindex + 1][xindex]
                                    ? lineWidth[yindex + 1][xindex] / 2
                                    : lineWidth[yindex][xindex] / 2
                                }
                                y1="33.3%"
                                y2="100%"
                                stroke="black"
                                strokeWidth="2"
                              />
                            ) : null
                          ) : null}
                        </Svg>
                      ) : (
                        <Svg height="100%" width="100%">
                          <Line
                            x1="0%"
                            x2={
                              lineWidth[yindex][xindex] >
                              lineWidth[yindex - 1][xindex]
                                ? lineWidth[yindex][xindex] -
                                  lineWidth[yindex - 1][xindex] / 2
                                : lineWidth[yindex - 1][xindex] -
                                  lineWidth[yindex][xindex] / 2
                            }
                            y1="50%"
                            y2="50%"
                            stroke="black"
                            strokeWidth="2"
                          />
                          <Line
                            x1={
                              lineWidth[yindex][xindex] >
                              lineWidth[yindex - 1][xindex]
                                ? lineWidth[yindex][xindex] -
                                  lineWidth[yindex - 1][xindex] / 2
                                : lineWidth[yindex - 1][xindex] -
                                  lineWidth[yindex][xindex] / 2
                            }
                            x2={
                              lineWidth[yindex][xindex] >
                              lineWidth[yindex - 1][xindex]
                                ? lineWidth[yindex][xindex] -
                                  lineWidth[yindex - 1][xindex] / 2
                                : lineWidth[yindex - 1][xindex] -
                                  lineWidth[yindex][xindex] / 2
                            }
                            y1="0%"
                            y2="50%"
                            stroke="black"
                            strokeWidth="2"
                          />
                        </Svg>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
            <View style={{ height: 40 }}></View>
          </View>
        ))}
      </AnimatedBox>
    </View>
  );
};
