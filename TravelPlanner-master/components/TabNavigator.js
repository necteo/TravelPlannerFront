import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text } from "react-native";
import { TravelGraph } from "./TravelGraph";
import { Vote } from "./Vote";
import { Tourist } from "./Tourist";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tourist"
        component={Tourist}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../icon/map.png")}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TravelGraph"
        component={TravelGraph}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../icon/map.png")}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Vote"
        component={Vote}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../icon/map.png")}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
