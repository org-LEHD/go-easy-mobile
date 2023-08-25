import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  FLEX_HEIGHT,
} from "../../constants/constants";

export const BottomSheetMarkerHeader = ({ title }: any) => {
  return (
    <>
      <View style={[styles.row]}>
        <Text ellipsizeMode="tail" numberOfLines={3} style={styles.header}>
          {title}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: FLEX_HEIGHT ? CARD_HEIGHT * 0.5 : CARD_HEIGHT * 0.45,
    width: CARD_WIDTH,
  },
  header: {
    fontSize: FLEX_HEIGHT ? 16 + CARD_HEIGHT * 0.15 : 16 + CARD_HEIGHT * 0.1,
  },
});
