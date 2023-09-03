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
  return (
    <View style={styles.row}>
      <View style={styles.leftCol}>
        <Image
          source={require("../../assets/images/small_image.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.rightCol}>
        <Text style={[styles.header, { flexWrap: "wrap", flexShrink: 0 }]}>
          Kom ind og prøv vores menu. Det er den bedste nogensinde
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={3} style={styles.body}>
          Vi har stort udsalg på frokostpizza og burgerer. Vores familie menu er
          et must try. Kom forbi når du har lyst.
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
    marginBottom: FLEX_HEIGHT ? 10 : 0,
    flexBasis: 60,
  },
  body: {
    fontSize: FLEX_HEIGHT ? 13 + CARD_HEIGHT * 0.02 : 13,
    color: "#666",
    flexBasis: 100,
  },
});
