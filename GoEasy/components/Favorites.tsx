import React, { useEffect, useContext } from "react";
import { StyleSheet, Animated, Text } from "react-native";
import { LatLng, Marker } from "react-native-maps";

import { MapContext } from "../context/mapContextProvider";
import { Coords, MarkerType } from "./Types";

export const Favorites = () => {
  const { favoriteContext } = useContext(MapContext);
  const { coords } = favoriteContext as MarkerType;
  return (
    <Marker coordinate={coords as LatLng}>
      <Animated.View style={[styles.markerWrap]}>
        <Animated.Image
          source={require("../assets/map_favorite.png")}
          style={[styles.marker]}
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
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
});
