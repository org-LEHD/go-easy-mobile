import { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SVGIcons } from "./SVG-Icons/Svg";
import { CARD_HEIGHT, FLEX_HEIGHT } from "../constants/constants";

export const TrackRoute = () => {
  const handleTrackRoute = () => {
    console.log("press");
  };

  return (
    <TouchableOpacity style={styles.routeOval} onPress={handleTrackRoute}>
      <SVGIcons.Route scale={FLEX_HEIGHT ? 1.5 : 1} />
      <Text style={styles.routeText}>Rute</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  routeOval: {
    width: FLEX_HEIGHT ? 100 : 70,
    height: FLEX_HEIGHT ? 40 : 30,
    backgroundColor: "blue",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  routeText: {
    color: "white",
    marginLeft: FLEX_HEIGHT ? 8 : 5,
    fontSize: FLEX_HEIGHT ? 16 + CARD_HEIGHT * 0.01 : 16 + CARD_HEIGHT * 0.001,
  },
});
