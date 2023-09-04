import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  FLEX_HEIGHT,
} from "../../constants/constants";
import { MarkerType } from "../Types";

interface MarkerProps {
  marker: MarkerType;
}

export const BottomSheetMarkerDesc = ({ marker }: MarkerProps) => {
  console.log(marker);
  return (
    <View style={styles.row}>
      <View style={styles.leftCol}>
        <Image
          source={{ uri: marker.thumbnail }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.rightCol}>
        <Text
          style={[styles.header, { flexWrap: "wrap", flexShrink: 0 }]}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {marker.summary}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={3} style={styles.body}>
          {marker.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 0,
    gap: 25,
    marginTop: 15,
    width: CARD_WIDTH,
    height: 50,
  },
  leftCol: {},
  image: {
    width: FLEX_HEIGHT ? 180 : 100,
    height: FLEX_HEIGHT ? 180 : 100,
  },
  rightCol: {
    flex: 1,
    alignItems: "flex-start",
  },

  header: {
    fontSize: FLEX_HEIGHT ? 16 + CARD_HEIGHT * 0.03 : 15,
    fontWeight: "500",
    color: "#666",
    marginBottom: FLEX_HEIGHT ? 10 : 5,
  },
  body: {
    fontSize: FLEX_HEIGHT ? 13 + CARD_HEIGHT * 0.02 : 13,
    color: "#666",
    flexBasis: 100,
  },
});
