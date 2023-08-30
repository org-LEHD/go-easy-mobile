import React, { useContext, useEffect, useState, useRef } from "react";
import { Tabs } from "expo-router";
import { MapContext } from "../../context/mapContextProvider";
import { useSearchParams } from "expo-router";

import { SVGIcons } from "../../components/SVG-Icons/Svg";
import { Alert, Linking } from "react-native";

const TabsLayout = () => {
  const handleButtonPhone = () => {
    // Call the phone number
    Linking.openURL("tel:23265722");
  };
  const handleButtonWeb = () => {
    // Call the web
    Linking.openURL("https://pappaspizza-lynge.dk/");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { paddingTop: 20 },
      }}
    >
      <Tabs.Screen
        name="home/[id]"
        options={{
          // href: null,
          headerTitle: "",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon(props) {
            return <SVGIcons.Home />;
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          //href: null,
          headerTitle: "",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon(props) {
            return <SVGIcons.HeartOutline />;
          },
        }}
      />
      <Tabs.Screen
        name="web"
        options={{
          //href: null,
          headerTitle: "",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon(props) {
            return <SVGIcons.Web />;
          },
        }}
        listeners={{
          tabPress: (e: { preventDefault: () => void; }) => {
            // Prevent default action
            e.preventDefault();
            handleButtonWeb();
          },
        }}
      />
      <Tabs.Screen
        name="phone"
        options={{
          headerTitle: "",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon(props) {
            return <SVGIcons.Phone />;
          },
        }}
        listeners={{
          tabPress: (e: { preventDefault: () => void; }) => {
            // Prevent default action
            e.preventDefault();
            Alert.alert("Call:", "23265722", [
              {
                text: "Cancel",
                style: "default",
              },
              {
                text: "OK",
                onPress: handleButtonPhone,
                style: "default",
              },
            ]);
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
