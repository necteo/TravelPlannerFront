import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { PostTools } from "./PostTool";
import { styles } from "../Styles";
import { GetMembers } from "./GetMembers";
import { deleteMember } from "./deleteMember";
import { deletePlan } from "./deletePlan";

const postTool = new PostTools();

const Member = ({ member, members, setMembers, isHost }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 20 }}>
      {member.host ? (
        <Image
          source={require("../icon/crown.png")}
          style={{ width: 40, height: 40 }}
        ></Image>
      ) : (
        <Image
          source={require("../icon/person.png")}
          style={{ width: 40, height: 40 }}
        ></Image>
      )}
      <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 20, width: 160 }}>
        {member.member_id}
      </Text>
      {isHost ? (
        member.host ? null : (
          <TouchableOpacity
            onPress={() => {
              deleteMember(member);
              setMembers(members);
            }}
          >
            <Image
              source={require("../icon/minus.png")}
              style={{ width: 30, height: 30 }}
            ></Image>
          </TouchableOpacity>
        )
      ) : null}
    </View>
  );
};

const Members = ({ trip_id }) => {
  const [members, setMembers] = useState([]);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const rm = async () => {
      const m = await memberRead();
      setMembers(m);
    };
    rm();
  }, []);

  useEffect(() => {
    const getMyMembers = async () => {
      const myMembers = await GetMembers();
      Object.keys(myMembers).map((key, _) =>
        myMembers[key].trip_id === trip_id
          ? members.map((m, _) =>
              m.member_id === myMembers[key].member_id
                ? setIsHost(m.host)
                : null
            )
          : null
      );
    };
    getMyMembers();
  }, [members]);

  const memberRead = async () => {
    const p = await postTool.postWithData(
      "Main/member/read",
      JSON.stringify({
        trip_id: trip_id,
      })
    );
    return JSON.parse(p);
  };

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
      {members.map((member, idx) => (
        <Member
          key={idx}
          member={member}
          members={members}
          setMembers={setMembers}
          isHost={isHost}
        ></Member>
      ))}
    </View>
  );
};

const Plan = ({ plan, setPlns, navigation }) => {
  const [memberVisibility, setMemberVisibility] = useState(false);
  const [dotsVisibility, setDotsVisibility] = useState(false);

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
          source={require("../icon/logo.png")}
        ></Image>
        <View style={{ marginLeft: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 25, width: 215 }}>{plan.name}</Text>
            <TouchableOpacity
              onPress={() => {
                setDotsVisibility(true);
              }}
            >
              <Image
                source={require("../icon/dots.png")}
                style={{ height: 40, width: 40 }}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text>{plan.date}</Text>
        </View>
      </View>
      {/* 아래쪽 */}
      <View style={{ alignItems: "flex-end" }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <TouchableOpacity
            onPress={() => {
              if (memberVisibility == false) {
                setMemberVisibility(true);
              } else {
                setMemberVisibility(false);
              }
            }}
          >
            <Image
              style={{ height: 25, width: 45, marginLeft: 5 }}
              source={require("../icon/people.png")}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TravelGraph", {
                trip_id: plan.trip_id,
              })
            }
          >
            <Image
              style={{ height: 45, width: 45, marginLeft: 15 }}
              source={require("../icon/right_arrow.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {memberVisibility ? (
          <Members trip_id={plan.trip_id}></Members>
        ) : (
          <View></View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={dotsVisibility}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setDotsVisibility(!dotsVisibility);
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
            <Text style={{ fontSize: 20 }}>참가 코드 :</Text>
            <TextInput
              style={{ fontSize: 20 }}
              editable={false}
              multiline={true}
            >
              {plan.write_code}
            </TextInput>
          </View>

          <View
            style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}
          >
            <Text style={{ fontSize: 20 }}>복사 코드 :</Text>
            <TextInput
              style={{ fontSize: 20 }}
              editable={false}
              multiline={true}
            >
              {plan.share_code}
            </TextInput>
          </View>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setDotsVisibility(!dotsVisibility);
              setPlns(deletePlan(plan));
            }}
          >
            <Text style={styles.textStyle}>삭제</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setDotsVisibility(!dotsVisibility);
            }}
          >
            <Text style={styles.textStyle}>닫기</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export const Plans = ({ viewHeight, plans, navigation }) => {
  const [plns, setPlns] = useState(plans);

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
        <ScrollView style={{ height: viewHeight - 120 }}>
          {Object.keys(plans).map((key) => (
            <Plan
              key={key}
              plan={plans[key]}
              setPlns={setPlns}
              navigation={navigation}
            ></Plan>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
