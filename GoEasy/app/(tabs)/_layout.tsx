import React, { useContext, useEffect, useState, useRef } from "react";
import { Tabs } from "expo-router";
import { MapContext } from "../../context/mapContextProvider";
import { useSearchParams } from "expo-router";

import { SVGIcons } from "../../components/SVG-Icons/Svg";
import { Alert, Linking } from "react-native";

const TabsLayout = () => {

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
    </Tabs>
  );
};

export default TabsLayout;
