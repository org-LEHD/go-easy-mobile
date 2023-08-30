import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  InteractionManager,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePermission } from "../hooks/usePermission";
import { SVGIcons } from "./SVG-Icons/Svg";
import { BottomSheetMarkers } from "./BottomSheet/BottomSheetMarkers";
import { CARD_WIDTH, HEIGHT } from "../constants/constants";
import { MapContext, AnimationContext } from "../context/mapContextProvider";
import { Markers } from "./Markers";
import { Coords } from "./Types";
import { animateToRegion } from "../Utils/utils";

export const Map = () => {
  //Safearea for contents on the device
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { markersContext } = useContext(MapContext);

  //Define useRefs for later use
  const _mapRef = useRef<MapView | null>(null);
  const _scrollViewRef = useRef<ScrollView | null>(null);
  const _debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationRef = useRef<any>(null);

  const _previousUserLocation = useRef<Coords>({
    latitude: null,
    longitude: null,
  });

  //Define useStates for later use
  const [followUser, setFollowUser] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<Coords>({
    latitude: null,
    longitude: null,
  });

  const [sortedMarkers, setSortedMarkers] = useState<any>(markersContext);

  //Defining a state variable inner city copenhagen as fallback
  const [initialRegion, setInitialRegion] = useState({
    coords: {
      latitude: 55.68375507989918,
      longitude: 12.57572185309855,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  //Using an empty dependency array with useMemo helps to avoid unnecessary permission calls on state change
  const location: any = useMemo(
    () =>
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
      }),
    []
  );

  useEffect(() => {
    //By using InteractionManager.runAfterInteractions(), we can ensure that the animation is
    //triggered only after the user's interactions with the app have completed.
    //This can provide a smoother and more seamless user experience.
    InteractionManager.runAfterInteractions(() =>
      animateToRegion(initialRegion.coords, 1, _mapRef)
    );
  }, [initialRegion]);

  const onUserLocationChange = useCallback((e: any) => {
    if (!followUser) return;
    const { latitude, longitude } = e.nativeEvent.coordinate;
    // console.log(latitude, _previousUserLocation.current.latitude);
    //The property onUserLocationChange will keep update with coords
    //even when coords haven't changed. For this not to be to expencive we only need
    //to update users location when moving device.
    if (
      latitude !== _previousUserLocation.current.latitude ||
      longitude !== _previousUserLocation.current.longitude
    ) {
      //Debounce will reduce result to only recent updates ensuring a pause where we can execute other commands
      //in this case we wan't to pan and stop the updates and animations caused of this.
      if (_debounceRef.current !== null) {
        clearTimeout(_debounceRef.current);
      }
      _debounceRef.current = setTimeout(() => {
        console.log("updates location");
        setUserLocation({
          ...userLocation,
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }, 800);
    }

    //Save the state for later use
    _previousUserLocation.current = { latitude, longitude };
  }, []);

  useEffect(() => {
    //cancelAnimationFrame is a function provided by the browser's JavaScript environment,
    //and it's used to cancel a scheduled animation frame request that was previously initiated
    //using the requestAnimationFrame function.
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (followUser === false) return;
    const { latitude, longitude } = userLocation;
    if (latitude && longitude) {
      animationRef.current = requestAnimationFrame(() => {
        InteractionManager.runAfterInteractions(() =>
          animateToRegion(userLocation, 350, _mapRef)
        );
      });
    }
  }, [userLocation, followUser]);

  useEffect(() => {
    // On the first update (initial render), disregard.
    // On the second update (sorting and context update), set sorted markers.
    return () => {
      // Set sorted markers after the second update.
      setSortedMarkers(markersContext);
    };
  }, [markersContext]);

  const onPanDrag = () => {
    setFollowUser(false);
  };

  const handleFollowUser = (state: any) => {
    setFollowUser(state);
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
          <SVGIcons.Center color={!followUser ? "#666" : null} />
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
        {/* We check if any of the properties values in userLocation is null */}
        {/* We check if any of the properties values in userLocation is null */}
        {Object.values(userLocation)?.some((m) => m !== null) ? (
          <Markers
            userLocation={userLocation}
            radius={110}
            _mapRef={_mapRef}
            _scrollViewRef={_scrollViewRef}
            handleFollowUser={handleFollowUser}
          />
        ) : null}
      </MapView>
      {Object.values(userLocation)?.some((m) => m !== null) &&
      sortedMarkers &&
      markersContext ? (
        <BottomSheetMarkers _scrollViewRef={_scrollViewRef} />
      ) : null}
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
