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

interface LocationResult {
  latitude: number;
  longitude: number;
}

export const Map = () => {
  //Safearea for contents on the device
  const insets = useSafeAreaInsets();

  //Define useRefs for later use
  const _mapRef = useRef<MapView | null>(null);

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
    usePermission(function (result: LocationResult) {
      try {
        const coords = {
          latitude: result.latitude,
          longitude: result.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

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

  const handleFollowUser = () => {
    console.log("follow");
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
        showsMyLocationButton={false}
        mapType={"standard"}
      ></MapView>
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
