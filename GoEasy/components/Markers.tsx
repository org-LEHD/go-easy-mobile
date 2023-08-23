import React, { useEffect, useRef, useContext, useState } from "react";
import { StyleSheet, Animated } from "react-native";
import {  Marker } from "react-native-maps";
import { useDistancePrecise } from "../useDistance";
import { MapContext } from "../context/mapContextProvider";

interface MarkersProps {
  radius: number;
  userLocation: {
    latitude: number | null | undefined;
    longitude: number | null | undefined;
    latitudeDelta: number | null | undefined;
    longitudeDelta: number | null | undefined;
  };
}
export interface MarkerType {
  distance: number;
  id: string;
  coords: LatLng;
  // Add other properties relevant to your marker data
}

export interface LatLng {
  latitude: number;
  longitude: number;
}


export const Markers: React.FC<MarkersProps> = ({
  radius,
  userLocation
}) => {
  const { markersContext, setMarkersContext } = useContext(MapContext);

  useEffect(() => {
    if (markersContext) {
      // Calculate distance for each marker based on user's location
      const addDistanceToMarkers = markersContext.map((marker: MarkerType) => {
        const { latitude, longitude } = userLocation;
        const coords = {
          location: { latitude, longitude },
          destination: { ...marker.coords },
        };
        const meters = useDistancePrecise(coords);
        return { ...marker, ...{ distance: meters } };
      });

      // Filter and sort markers based on distance and radius
      const filteredMarkers = addDistanceToMarkers
        .filter((marker: MarkerType) => marker.distance <= radius)
        .sort((a: MarkerType, b: MarkerType) => a.distance - b.distance);

      setMarkersContext(filteredMarkers);
    }
  }, [userLocation, markersContext, setMarkersContext]);

  if (!markersContext) {
    return null; // Or render a loading indicator if needed
  }

  return markersContext.map((marker: MarkerType) => {
    const markerImageSource = marker.id
      ? require("../assets/map_favorite.png")
      : require("../assets/map_marker.png");
    return (
      <Marker
        coordinate={marker.coords}
        key={marker.id}
      >
        <Animated.View style={[styles.markerWrap]}>
          <Animated.Image
            source={markerImageSource}
            style={[styles.marker]}
            resizeMode="cover"
          />
        </Animated.View>
      </Marker>
    );
  });
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
