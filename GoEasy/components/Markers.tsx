import React, {
  useEffect,
  useContext,
  FC,
  MutableRefObject,
  useMemo,
} from "react";
import { Animated, InteractionManager, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MapContext, AnimationContext } from "../context/mapContextProvider";
import { useDistancePrecise } from "../hooks/useDistance";
import { Coords } from "./Types";
import { CARD_WIDTH } from "../constants/constants";
import { animateToRegion } from "../Utils/utils";

interface MarkersProps {
  radius: number;
  userLocation: Coords;
  _mapRef: MutableRefObject<MapView | null>;
}

export const Markers: FC<MarkersProps> = ({
  radius,
  userLocation,
  _mapRef,
}) => {
  const { markersContext, setMarkersContext } = useContext(MapContext);
  const mapAnimation = useContext(AnimationContext);

  const filteredMarkers = useMemo(() => {
    const addDistanceToMarkers = markersContext.map((marker: any) => {
      const { latitude, longitude } = userLocation;
      const coords = {
        location: { latitude, longitude },
        distination: { ...marker.coords },
      };
      const meters = useDistancePrecise(coords);
      return { ...marker, ...{ distance: meters } };
    });

    return addDistanceToMarkers
      .filter((marker: any) => marker.distance <= radius)
      .sort((a: any, b: any) => a.distance - b.distance);
  }, [userLocation]);

  useEffect(() => {
    setMarkersContext(filteredMarkers);
  }, [filteredMarkers]);

  useEffect(() => {
    mapAnimation.addListener(({ value }: any) => {
      //Create index from x coordinate we get from gesture
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      //Exclude numbers below 0 and the total size of the array
      index = Math.min(Math.max(index, 0), markersContext.length - 1);
      //Get the coords from array
      const { coords } = markersContext[index] || {};
      const newCoords = {
        ...coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      InteractionManager.runAfterInteractions(() =>
        animateToRegion(newCoords, 350, _mapRef)
      );
    });
    //Cleanup function. This will ensure that markers don't hold a reference to the initial state and uses the updated state.
    return () => {
      mapAnimation.removeAllListeners();
    };
  }, [markersContext]);

  return (
    <>
      {markersContext?.map((marker: any) => {
        const markerImageSource =
          marker.id !== null
            ? require("../assets/map_marker.png")
            : require("../assets/map_favorite.png");

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
