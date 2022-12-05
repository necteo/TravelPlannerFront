import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  Animated,
  PanResponder,
  View,
  Image,
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

export const TravelGraph = ({ navigation, route }) => {
  const [planDetail, setPlanDetail] = useState();
  const [checkNew, setCheckNew] = useState("waiting");
  const [changed, setChanged] = useState(true);
  const [isDel, setIsDel] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerLeft, headerRight: headerRightGraph });
    console.log("mounted");
    const read = async () => {
      const p = await readPlanDetail();
      console.log("wait");
      setPlanDetail(p);
    };
    read();
  }, []);

  useEffect(() => {
    if (isDel === true) {
      console.log("plan delete");
      setIsDel(false);
      const read = async () => {
        const p = await readPlanDetail();
        setPlanDetail(p);
      };
      read();
    }
  }, [isDel]);

  useEffect(() => {
    const cpd = async (pid, i) => {
      const p = await createPlanDetail(pid, i);
      navigation.push("Destination", {
        trip_id: route.params.trip_id,
        plan_id: p.plan_id,
        index: i + 1,
        isNew: true,
      });
    };
    if (checkNew === "root") {
      cpd(null, -1);
    }
  }, [checkNew]);

  useEffect(() => {
    console.log("useEffect Graph : " + changed);
    changePromise(route.params.trip_id);
  }, [planDetail]);
  const headerLeft = () => (
    <TouchableOpacity onPress={() => navigation.popToTop()}>
      <Image
        source={require("../icon/brandIcon.png")}
        style={{ width: 45, height: 35 }}
      ></Image>
    </TouchableOpacity>
  );
  const headerRightGraph = () => (
    <Pressable
      onPress={() => setCheckNew("once")}
      onLongPress={() => setCheckNew("root")}
      style={({ pressed }) => [
        { backgroundColor: pressed ? "rgb(200, 200, 200)" : "white" },
      ]}
    >
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
    </Pressable>
  );

  const postTool = new PostTools();

  const readPlanDetail = async () => {
    console.log("readPost");
    const p = await postTool.postWithData(
      "PlanDetail/read",
      JSON.stringify({
        trip_id: route.params.trip_id,
      })
    );
    return JSON.parse(p);
  };

  const createPlanDetail = async (plan_id, i) => {
    const p = await postTool.postWithData(
      "PlanDetail/create",
      JSON.stringify({
        trip_id: route.params.trip_id,
        plan_id: plan_id,
        index: i,
      })
    );
    return JSON.parse(p);
  };

  const deletePlanDetail = async (plan_id, i) => {
    const p = await postTool.postWithData(
      "PlanDetail/delete",
      JSON.stringify({
        trip_id: route.params.trip_id,
        plan_id: plan_id,
        index: i,
      })
    );
  };

  const changePlanDetail = async () => {
    const p = await postTool.postWithData(
      "PlanDetail/change",
      JSON.stringify({
        trip_id: route.params.trip_id,
      })
    );

    return JSON.parse(p);
  };

  const changePromise = async (trip_id) => {
    if (changed) {
      setChanged(false);
      const p = await changePlanDetail(trip_id);
      setChanged(true);
      setPlanDetail(p);
    }
  };

  const Box = styled.View`
    background-color: white;
  `;
  const AnimatedBox = Animated.createAnimatedComponent(Box);

  let firstTime =
    planDetail === undefined
      ? ["", 24]
      : Object.keys(planDetail).length === 0
      ? ["", 24]
      : [planDetail[0].plan[0].date, 24];
  planDetail?.map((plan) => {
    let dd = getDateDiff(firstTime[0], plan.plan[0].date);
    if (isNaN(dd)) {
      dd = 0;
    }
    let len =
      parseInt(plan.plan[0].startTime.split(":")[0]) +
      parseInt(plan.plan[0].startTime.split(":")[1]) / 60;
    if (isNaN(len)) {
      len = 0;
    }
    if (dd < 0) {
      firstTime[0] = plan.plan[0].date;
      firstTime[1] = len;
    } else {
      if (firstTime[1] > len + dd) {
        firstTime[0] = plan.plan[0].date;
        firstTime[1] = len + dd;
      }
    }
  });
  const firstWidth = [];
  planDetail?.map((plan) => {
    let h = parseInt(plan.plan[0].startTime.split(":")[0]);
    let m = parseInt(plan.plan[0].startTime.split(":")[1]);
    let dd = getDateDiff(plan.plan[0].date, firstTime[0]);
    if (isNaN(h)) {
      h = 0;
    }
    if (isNaN(m)) {
      m = 0;
    }
    if (isNaN(dd)) {
      dd = 0;
    }
    firstWidth.push(60 * (h + m / 60 - firstTime[1] + dd));
  });

  let maxLen = 0;
  planDetail?.map((plan) => {
    let dd = getDateDiff(plan.plan[plan.plan.length - 1].date, firstTime[0]);
    if (isNaN(dd)) {
      dd = 0;
    }
    let h = parseInt(plan.plan[plan.plan.length - 1].endTime.split(":")[0]);
    let m = parseInt(plan.plan[plan.plan.length - 1].endTime.split(":")[1]);
    if (isNaN(h)) {
      h = 0;
    }
    if (isNaN(m)) {
      m = 0;
    }
    const len = h + m / 60 - firstTime[1] + dd;
    if (maxLen < len) maxLen = len;
  });

  var CONTENTS_HEIGHT =
    120 *
    (planDetail === undefined
      ? 0
      : Object.keys(planDetail).length === 0
      ? 0
      : planDetail.length);
  var CONTENTS_WIDTH = 61 * maxLen;

  var xOffset,
    yOffset = 0;

  const POSITION = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const locWidth = [];
  planDetail?.map((plan, yidx) => {
    locWidth.push([]);
    plan.plan.map((infos) => {
      let dd = getDateDiff(infos.date, infos.date);
      if (isNaN(dd)) {
        dd = 0;
      }
      let eh = parseInt(infos.endTime.split(":")[0]);
      let em = parseInt(infos.endTime.split(":")[1]);
      let sh = parseInt(infos.startTime.split(":")[0]);
      let sm = parseInt(infos.startTime.split(":")[1]);
      if (isNaN(eh)) {
        eh = 0;
      }
      if (isNaN(em)) {
        em = 0;
      }
      if (isNaN(sh)) {
        sh = 0;
      }
      if (isNaN(sm)) {
        sm = 0;
      }
      locWidth[yidx].push(60 * (eh + em / 60 - (sh + sm / 60) + dd));
    });
  });

  const lineWidth = [];
  planDetail?.map((plan, idx) => {
    lineWidth.push([]);
    for (let i = 0; i < plan.plan.length - 1; i++) {
      let dd = getDateDiff(plan.plan[i + 1].date, plan.plan[i].date);
      if (isNaN(dd)) {
        dd = 0;
      }
      let sh = parseInt(plan.plan[i + 1].startTime.split(":")[0]);
      let sm = parseInt(plan.plan[i + 1].startTime.split(":")[1]);
      let eh = parseInt(plan.plan[i].endTime.split(":")[0]);
      let em = parseInt(plan.plan[i].endTime.split(":")[1]);
      if (isNaN(sh)) {
        sh = 0;
      }
      if (isNaN(sm)) {
        sm = 0;
      }
      if (isNaN(eh)) {
        eh = 0;
      }
      if (isNaN(em)) {
        em = 0;
      }
      lineWidth[idx].push(60 * (sh + sm / 60 - (eh + em / 60) + dd) + 2);
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
        console.log("touched");
        POSITION.setOffset({
          x: POSITION.x._value,
          y: POSITION.y._value,
        });
        xOffset = POSITION.x._value;
        yOffset = POSITION.y._value;
        Keyboard.dismiss();
      },

      onPanResponderMove: (_, { dx, dy }) => {
        const xDiff = -100;
        const yDiff =
          viewHeight - CONTENTS_HEIGHT >= 0 ? 0 : viewHeight - CONTENTS_HEIGHT;
        console.log("moving");
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
        console.log("end");
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
        <TouchableOpacity
          onPress={() => navigation.navigate("Vote", { planDetail })}
        >
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
        {planDetail === undefined
          ? null
          : planDetail.map((plan, yindex) => (
              <View key={yindex} style={{ height: 120, paddingHorizontal: 10 }}>
                <View style={{ flexDirection: "row", height: 80 }}>
                  <View
                    style={{
                      width: firstWidth[yindex],
                    }}
                  ></View>
                  {plan.plan.map((infos, xindex) => (
                    <View key={xindex} style={{ flexDirection: "row" }}>
                      {infos.isDup ? (
                        <View
                          style={{ width: locWidth[yindex][xindex] }}
                        ></View>
                      ) : checkNew === "once" ? (
                        <Pressable
                          onPress={() => {
                            createPlanDetail(plan.plan_id, xindex);
                            navigation.push("Destination", {
                              trip_id: route.params.trip_id,
                              plan_id: plan.plan_id,
                              index: xindex + 1,
                              isNew: true,
                            });
                          }}
                          onLongPress={() => {
                            deletePlanDetail(plan.plan_id, xindex);
                            setIsDel(true);
                          }}
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
                              <TextInput style={styles.text} editable={false}>
                                {infos.place_name}
                              </TextInput>
                            </View>
                          </View>
                        </Pressable>
                      ) : (
                        <Pressable
                          onPress={() =>
                            navigation.navigate("Destination", {
                              trip_id: route.params.trip_id,
                              plan_id: plan.plan_id,
                              placeName: infos.place_name,
                              index: xindex,
                              isNew: false,
                            })
                          }
                          onLongPress={() => {
                            deletePlanDetail(plan.plan_id, xindex);
                            setIsDel(true);
                          }}
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
                              <TextInput style={styles.text} editable={false}>
                                {infos.place_name}
                              </TextInput>
                            </View>
                          </View>
                        </Pressable>
                      )}

                      {xindex === plan.plan.length - 1 ? null : infos.isDup ? (
                        <View style={{ width: lineWidth[yindex][xindex] }}>
                          {yindex === 0 ? null : plan.plan[xindex + 1]
                              .isDup ? null : (
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
                          {plan.plan[xindex + 1].isDup === false ? (
                            <Svg height="150%" width="100%">
                              <Line
                                x1="0%"
                                x2="100%"
                                y1="33.3%"
                                y2="33.3%"
                                stroke="black"
                                strokeWidth="2"
                              />
                              {yindex < planDetail.length - 1 ? (
                                planDetail[yindex + 1].plan[xindex + 1]
                                  ?.isDup === false ||
                                planDetail[yindex + 1].plan[xindex]?.isDup ===
                                  false ? (
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
