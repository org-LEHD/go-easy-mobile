import React, { useEffect, useContext } from "react";
import { StyleSheet, Animated, Text } from "react-native";
import { LatLng, Marker } from "react-native-maps";
import { MapContext } from "../context/mapContextProvider";
import { MarkerType } from "./Types";

export const Search = () => {
  const { searchContext, isPoiContext } = useContext(MapContext);
  const { coords, category } = searchContext as MarkerType;
  const url =
    (category as any).url ?? require("../assets/images/map_search.png");
  console.log(category);
  return (
    <Marker coordinate={coords as LatLng}>
      <Animated.View style={[styles.markerWrap]}>
        <Animated.Image
          source={url}
          style={[isPoiContext ? styles.poi : styles.marker]}
          resizeMode="cover"
        />
      </Animated.View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerWrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: 60,
    height: 60,
  },
  marker: {
    width: 30,
    height: 30,
  },
  poi: {
    width: 60,
    height: 60,
  },
});
