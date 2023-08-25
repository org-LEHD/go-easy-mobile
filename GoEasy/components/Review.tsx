import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SVGIcons } from "../components/SVG-Icons/Svg";
export const Review = ({ stars = 5 }) => {
  return (
    <View style={styles.reviewBox}>
      {[...Array(stars)].map((_, index) => (
        <SVGIcons.Star key={index} />
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
