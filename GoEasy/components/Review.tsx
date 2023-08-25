import React from "react";
import { View, StyleSheet } from "react-native";
import { SVGIcons } from "./SVG-Icons/Svg";
import { FLEX_HEIGHT } from "../constants/constants";

export const Review = ({ stars = 5 }) => {
  return (
    <View style={styles.reviewBox}>
      {[...Array(stars)].map((_, index) => (
        <SVGIcons.Star key={index} scale={FLEX_HEIGHT ? 1.5 : 1} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    flex: 0,
    alignSelf: "auto",
  },
});
