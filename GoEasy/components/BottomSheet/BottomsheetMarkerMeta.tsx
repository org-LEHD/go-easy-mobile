import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Review } from "../../components/Review";
import { TrackRoute } from "../TrackRoute";
import { SVGIcons } from "../SVG-Icons/Svg";
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  FLEX_HEIGHT,
} from "../../constants/constants";
import { MarkerType } from "../Types";

interface MarkerProps {
  marker: MarkerType;
}

export const BottomSheetMarkerMeta = ({ marker }: MarkerProps) => {
  const router = useRouter();
  return (
    <>
      <View style={styles.row}>
        <View style={styles.leftCol}>
          <Text style={styles.category}>{marker.category}</Text>
          <Review />
        </View>
        <View style={styles.rightCol}>
          <TrackRoute marker={marker} />
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              router.push(`../../home/${marker?.id}`);
            }}
          >
            <SVGIcons.Arrow left={true} scale={FLEX_HEIGHT ? 1.7 : 1.2} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: CARD_WIDTH,
    marginTop: 25,
    marginBottom: 10,
  },
  leftCol: {
    flex: 1,
  },
  category: {
    fontSize: FLEX_HEIGHT ? 16 + CARD_HEIGHT * 0.08 : 16 + CARD_HEIGHT * 0.03,
  },
  rightCol: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    marginRight: 8,
    marginLeft: 8,
  },
});
