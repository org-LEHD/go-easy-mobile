import React, {
  useEffect,
  useContext,
  FC,
  MutableRefObject,
  useMemo,
  useRef,
} from "react";
import {
  Animated,
  InteractionManager,
  ScrollView,
  StyleSheet,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MapContext, AnimationContext } from "../context/mapContextProvider";
import { useDistancePrecise } from "../hooks/useDistance";
import { Coords } from "./Types";
import { CARD_WIDTH } from "../constants/constants";
import { animateToRegion } from "../Utils/utils";
import { initialMarkers } from "./../data/apiMarkers";

interface MarkersProps {
  radius: number;
  userLocation: Coords;
  _mapRef: MutableRefObject<MapView | null>;
  _scrollViewRef: MutableRefObject<ScrollView | null>;
  handleFollowUser: any;
}

export const Markers: FC<MarkersProps> = ({
  radius,
  userLocation,
  _mapRef,
  _scrollViewRef,
  handleFollowUser,
}) => {
  const { markersContext, setMarkersContext } = useContext(MapContext);
  const mapAnimation = useContext(AnimationContext);

  //useRefs
  let _mapIndex = useRef<any>(null);

  const filteredMarkers = useMemo(() => {
    const addDistanceToMarkers = initialMarkers.markers?.map((marker: any) => {
      const { latitude, longitude } = userLocation;
      const coords = {
        location: { latitude, longitude },
        distination: { ...marker.coords },
      };
      const meters = useDistancePrecise(coords);
      return { ...marker, ...{ distance: meters } };
    });

    return addDistanceToMarkers
      ?.filter((marker: any) => marker.distance <= radius)
      .sort((a: any, b: any) => a.distance - b.distance);
  }, [userLocation]);

  useEffect(() => {
    setMarkersContext(filteredMarkers);
  }, [filteredMarkers]);

  useEffect(() => {
    mapAnimation?.addListener(({ value }: any) => {
      //Create index from x coordinate we get from gesture
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      //Exclude numbers below 0 and the total size of the array
      index = Math.min(Math.max(index, 0), markersContext.length - 1);
      if (index < 0) index = 0;
      if (_mapIndex.current !== index) {
        _mapIndex.current = index;
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

        handleFollowUser(false);
      }
    });
    //Cleanup function. This will ensure that markers don't hold a reference to the initial state and uses the updated state.
    return () => {
      mapAnimation?.removeAllListeners();
    };
  }, [markersContext]);

  const interpolations = filteredMarkers?.map((_: undefined, index: number) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
    const scale = mapAnimation?.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });
    return { scale };
  });

  const handleOnMarkerPress = (index: number) => {
    let x = index * CARD_WIDTH + index * 20;
    console.log("markers", x);

    _scrollViewRef.current?.scrollTo({ x: x, y: 0, animated: true });
    handleFollowUser(false);
  };

  return (
    <>
      {filteredMarkers?.map((marker: any, index: number) => {
        // console.log(index);
        const scaleStyle: any = {
          transform: [{ scale: interpolations[index].scale }],
        };
        const markerImageSource =
          marker.id !== null
            ? require("../assets/map_marker.png")
            : require("../assets/map_favorite.png");

        return (
          <Marker
            coordinate={marker.coords}
            key={marker.id}
            onPress={() => handleOnMarkerPress(index)}
          >
            <Animated.View style={[styles.markerWrap, scaleStyle]}>
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
