import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SVGIcons } from "../components/SVG-Icons/Svg";
import { CARD_WIDTH, SPACING, WIDTH } from "../constants/constants";
import { TouchableOpacity } from "react-native-gesture-handler";

import { MapContext } from "../context/mapContextProvider";

export const SwipeableItem = ({
  data,
  handleSelectedItem,
  handleDeleteItem,
}: any) => {
  const leftSwipe = () => {
    return (
      <TouchableOpacity onPress={() => handleDeleteItem(data.id)}>
        <View style={styles.deletebox}>
          <SVGIcons.Trashcan />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => handleSelectedItem(data.id)}
        >
          <View style={styles.screenIcon}>
            <SVGIcons.Heart color={"#888888"} scale={0.85} />
          </View>
          <View style={styles.textContent}>
            <Text style={styles.title}>{data?.title}</Text>
            <Text style={styles.address}>{data?.address}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  deletebox: {
    backgroundColor: "#FE0045",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 60,
    marginBottom: 20,
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
    width: CARD_WIDTH,
    alignItems: "center",
    height: 60,
    marginBottom: 20,
    borderBottomColor: "#DEDEDE",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  screenIcon: {
    backgroundColor: "#E8E9E9",
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 3,
  },
  address: {
    fontSize: 10,
    marginBottom: 3,
  },
});
