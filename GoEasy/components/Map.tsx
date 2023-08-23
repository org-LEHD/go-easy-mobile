import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  InteractionManager,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePermission } from "../hooks/usePermission";
import { SVGIcons } from "./SVG-Icons/Svg";
import BottomSheetController from "./BottomSheet/BottomSheetController";

interface Coords {
  latitude: number | null;
  longitude: number | null;
  latitudeDelta?: number | null;
  longitudeDelta?: number | null;
}

export const Map = () => {
  //Safearea for contents on the device
  const insets = useSafeAreaInsets();

  //Define useRefs for later use
  const _mapRef = useRef<MapView | null>(null);
  const _previousUserLocation = useRef<Coords>({
    latitude: null,
    longitude: null,
  });
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
      InteractionManager.runAfterInteractions(() =>
        animateToRegion(userLocation, 350)
      );
    }
  }, [userLocation, followUser]);

  const onPanDrag = () => {
    setFollowUser(false);
  };

  const handleFollowUser = () => {
    setFollowUser(true);
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
      ></MapView>
      <BottomSheetController />
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
});
