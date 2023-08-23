import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  InteractionManager,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePermission } from "../hooks/usePermission";
import { SVGIcons } from "./SVG-Icons/Svg";
import { BottomSheetController } from "./BottomSheet/BottomSheetController";
import { CARD_WIDTH } from "../constants/constants";

interface Coords {
  latitude: number | null;
  longitude: number | null;
  latitudeDelta?: number | null;
  longitudeDelta?: number | null;
}

export const Map = () => {
  const mapAnimation = useMemo(() => {
    return new Animated.Value(0);
  }, []);

  //Safearea for contents on the device
  const insets = useSafeAreaInsets();

  //Define useRefs for later use
  const _mapRef = useRef<MapView | null>(null);
  const _previousUserLocation = useRef<Coords>({
    latitude: null,
    longitude: null,
  });
  const _scrollViewRef = useRef<ScrollView | null>(null);

  //Define useStates for later use
  const [followUser, setFollowUser] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<Coords>({
    latitude: null,
    longitude: null,
  });

  //Defining a state variable inner city copenhagen as fallback
  const [initialRegion, setInitialRegion] = useState({
    coords: {
      latitude: 55.68375507989918,
      longitude: 12.57572185309855,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  useEffect(() => {
    //The callback function is executed after the async operation, it will
    // will await the promise before proceeding whith the logic.
    usePermission(function (result: Coords) {
      try {
        if (result.latitude !== null && result.longitude !== null) {
          setInitialRegion({
            ...initialRegion,
            coords: {
              ...initialRegion.coords,
              latitude: result.latitude,
              longitude: result.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
          });
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });
  }, []);

  useEffect(() => {
    //By using InteractionManager.runAfterInteractions(), we can ensure that the animation is
    //triggered only after the user's interactions with the app have completed.
    //This can provide a smoother and more seamless user experience.
    InteractionManager.runAfterInteractions(() =>
      animateToRegion(initialRegion.coords, 1)
    );
  }, [initialRegion]);

  const onUserLocationChange = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    //The property onUserLocationChange will keep update with coords
    //even when coords haven't changed. For this not to be to expencive we only need
    //to update users location when moving device.
    if (
      latitude !== _previousUserLocation.current.latitude ||
      longitude !== _previousUserLocation.current.longitude
    ) {
      setUserLocation({
        ...userLocation,
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    _previousUserLocation.current = { latitude, longitude };
  };

  useEffect(() => {
    const { latitude, longitude } = userLocation;
    if (latitude && longitude && followUser) {
      // InteractionManager.runAfterInteractions(() =>
      //   animateToRegion(userLocation, 350)
      // );
    }
  }, [userLocation, followUser]);

  const onPanDrag = () => {
    setFollowUser(false);
  };

  const handleFollowUser = () => {
    setFollowUser(true);
  };

  const markers = [
    { latitude: 55.827324, longitude: 12.248818 },
    { latitude: 55.827564, longitude: 12.252668 },
  ];

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      //Create index from x coordinate we get from gesture
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      console.log("fff", index);
      //Exclude numbers below 0 and the total size of the array
      index = Math.min(Math.max(index, 0), markers.length - 1);
      //Get the coords from array
      const { latitude, longitude } = markers[index] || {};

      const coords = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      InteractionManager.runAfterInteractions(() =>
        animateToRegion(coords, 350)
      );
    });
    //Cleanup function. This will ensure that markers don't hold a reference to the initial state and uses the updated state.
    return () => {
      mapAnimation.removeAllListeners();
    };
  }, [markers]);

  const interpolations = markers.map((_, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const handleOnMarkerPress = (e: any) => {
    const markerID = e._targetInst.return.key;
    let x = markerID * CARD_WIDTH + markerID * 20;
    _scrollViewRef.current?.scrollTo({ x: x, y: 0, animated: true });
  };

  const animateToRegion = (coords: any, speed: number) => {
    if (_mapRef.current) {
      _mapRef?.current?.animateToRegion(coords, speed);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 20,
          paddingRight: insets.right + 20,
        },
      ]}
    >
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[styles.toolbarIcon]}
          onPress={handleFollowUser}
        >
          <SVGIcons.Center />
        </TouchableOpacity>
      </View>
      <MapView
        ref={_mapRef}
        style={styles.map}
        initialRegion={initialRegion.coords}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        showsMyLocationButton={false}
        onPanDrag={onPanDrag}
        mapType={"standard"}
      >
        {markers.map((item, index) => {
          const scaleStyle = {
            transform: [{ scale: interpolations[index].scale }],
          };
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={"title"}
              description={"description"}
              onPress={handleOnMarkerPress}
            >
              <Animated.View style={[styles.markerWrap, scaleStyle]}>
                <Animated.Image
                  source={require("../assets/images/map_marker.png")}
                  resizeMode="cover"
                  style={[styles.marker]}
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
      <BottomSheetController
        mapAnimation={mapAnimation}
        _scrollViewRef={_scrollViewRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  toolbar: {
    flex: 0,
    flexBasis: 0,
    alignSelf: "flex-end",
    backgroundColor: "lightgrey",
    zIndex: 1,
  },
  toolbarIcon: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginTop: 15,
  },
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
