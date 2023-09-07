import React, { useEffect, useContext } from "react";
import { StyleSheet, Animated, Text } from "react-native";
import { LatLng, Marker } from "react-native-maps";

import { MapContext } from "../context/mapContextProvider";
import { MarkerType } from "./Types";

export const Search = () => {
  const { searchContext, isPoiContext } = useContext(MapContext);
  const { coords, category } = searchContext as MarkerType;

  const categoryMappings: Record<string, any> = {
    Kirke: require("../assets/images/icon_church.png"),
    Teater: require("../assets/images/icon_theater.png"),
    Restaurant: require("../assets/images/icon_restaurant.png"),
    Park: require("../assets/images/icon_park.png"),
  };

  const mappedCategory =
    categoryMappings[category] || require("../assets/images/icon_default.png");

  const updatedCategory = isPoiContext
    ? mappedCategory
    : require("../assets/map_search.png");

  return (
    <Marker coordinate={coords as LatLng}>
      <Animated.View style={[styles.markerWrap]}>
        <Animated.Image
          source={updatedCategory}
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
