import React, { useEffect, useContext } from "react";
import { Animated, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { MapContext } from "../context/mapContextProvider";
import { useDistancePrecise } from "../useDistance"; // Import your distance calculation function

interface MarkersProps {
  radius: number;
  userLocation: {
    latitude: number | null;
    longitude: number | null;
    latitudeDelta: number | null | undefined;
    longitudeDelta: number | null | undefined;
  };
}

export const Markers: React.FC<MarkersProps> = ({ radius, userLocation }) => {
  const { markersContext, setMarkersContext } = useContext(MapContext);

  useEffect(() => {
    // Calculate distance for each marker based on user's location
    // const addDistanceToMarkers = markersContext?.map((marker: { coords: any; }) => {
    //   const { latitude, longitude } = userLocation;
    //   const coords = {
    //     location: { latitude, longitude },
    //     distination: { ...marker.coords },
    //   };
    //   const meters = useDistancePrecise(coords);
    //   return { ...marker, ...{ distance: meters } };
    // });

    // Filter and sort markers based on distance and radius
    // const filteredMarkers = addDistanceToMarkers
    //   ?.filter((marker: { distance: number; }) => marker.distance <= radius)
    //   .sort((a: { distance: number; }, b: { distance: number; }) => a.distance - b.distance);

    // setMarkersContext(filteredMarkers);
  }, [userLocation]);

  return (
    <>
      {markersContext?.map((marker: any) => {
        const markerImageSource = marker.id !== null
          ? require("../assets/map_favorite.png")
          : require("../assets/map_marker.png");

        return (
          <Marker coordinate={marker.coords} key={marker.id}>
            <Animated.View style={[styles.markerWrap]}>
              <Animated.Image
                source={markerImageSource}
                style={[styles.marker]}
                resizeMode="cover"
              />
            </Animated.View>
          </Marker>
        );
      })}
    </>
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

export default Markers;
