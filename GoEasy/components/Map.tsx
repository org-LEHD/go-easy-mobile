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
import { Coords, MarkerType } from "./Types";
import { animateToRegion } from "../Utils/utils";
import { BottomSheetFavoriteList } from "./BottomSheet/BottomsheetFavoriteList";
import { Favorites } from "./Favorites";
import { BottomSheetFavorite } from "./BottomSheet/BottomsheetFavorite";
import { MapViewRoute } from "./MapViewRoute";
import { SearchBarWithIcon } from "./SearchBar";
import { Search } from "./Search";
import { BottomSheetSearch } from "./BottomSheet/BottomsheetSearch";
import { Test } from "./Test";

export const Map = () => {
  //Safearea for contents on the device
  const insets = useSafeAreaInsets();
  const {
    markersContext,
    bottomSheetContext,
    favoriteContext,
    setFavoriteContext,
    trackRouteContext,
    setTrackRouteContext,
    searchContext,
    setSearchContext
  } = useContext(MapContext);

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
  const [isFavoriteInMarkers, setIsFavoriteInMarkers] = useState(false);
  const [isFavoriteListSelected, setIsFavoriteListSelected] = useState(false);
  const [isFavoriteSelected, setIsFavoriteSelected] = useState(false);
  const [isTrackRouteSelected, setIsTrackRouteSelected] = useState(false);
  const [isSearchInMarkers, setIsSearchInMarkers] = useState(false);
  const [isSearchChoosen, setIsSearchChoosen] = useState(false);


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

  //When panning stop following the user
  const onPanDrag = () => {
    setFollowUser(false);
  };

  //Function to handle the followuser state
  const handleFollowUser = (state: any) => {
    setFollowUser(state);
  };

  // Handle opening the favorite list
  const handleFavoriteList = () => {
    !isFavoriteListSelected &&
      !isFavoriteSelected &&
      setIsFavoriteListSelected(true);
    followUser && setFollowUser(false);
  };

  // Select a favorite from the list
  const handleOnFavoriteSelect = (item: MarkerType) => {
    setFavoriteContext({ ...favoriteContext, ...item });
    setIsFavoriteSelected(true);
    setIsFavoriteInMarkers(!!markersContext?.some((m) => m.id === item.id)); // make it a boolean expression
  };

  const handleOnSearchSelect = useCallback((item: MarkerType) => {
    setSearchContext({ ...searchContext, ...item });
    setIsSearchChoosen(true);
    setIsSearchInMarkers(!!markersContext?.some((m) => m.id === item.id));
    followUser && setFollowUser(false);
  }, [searchContext, markersContext])

  // Handle manual actions on bottom sheet for markers
  useEffect(() => {
    if (!bottomSheetContext.markerSnap) {
      !followUser && setFollowUser(true);
    }
    if (bottomSheetContext.markerSnap) {
      followUser && setFollowUser(false);
    }
  }, [bottomSheetContext.markerSnap]);

  // Handle manual actions on bottom sheet for favorites
  useEffect(() => {
    if (!bottomSheetContext.favoriteListSnap) {
      isFavoriteListSelected && setIsFavoriteListSelected(false);
    }
  }, [bottomSheetContext.favoriteListSnap]);

  useEffect(() => {
    if (!bottomSheetContext.favoriteSnap) {
      isFavoriteSelected && setIsFavoriteSelected(false);
      !isTrackRouteSelected && favoriteContext && setFavoriteContext(null);
      !followUser && setFollowUser(true);
    }
  }, [bottomSheetContext.favoriteSnap]);

  useEffect(() => {
    if (!bottomSheetContext.searchSnap) {
      isSearchChoosen && setIsSearchChoosen(false);
      !isTrackRouteSelected && searchContext && setSearchContext(null);
      !followUser && setFollowUser(true);
    }
  }, [bottomSheetContext.searchSnap]);

  // Handle favoriteContext actions
  useEffect(() => {
    if (favoriteContext) {
      const { latitude, longitude } = favoriteContext?.coords;
      const coords = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      InteractionManager.runAfterInteractions(() =>
        animateToRegion(coords, 350, _mapRef)
      );
      return;
    }
  }, [favoriteContext]);

  useEffect(() => {
    if (searchContext) {
      const { latitude, longitude } = searchContext?.coords;
      const coords = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      InteractionManager.runAfterInteractions(() =>
        animateToRegion(coords, 350, _mapRef)
      );
      return;
    }
  }, [searchContext]);

  // Handle trackRouteContext actions if destination is set.
  useEffect(() => {
    const { latitude, longitude } = userLocation;
    const coords = {
      latitude: latitude,
      longitude: longitude,
    };
    if (trackRouteContext.destination !== null) {
      setTrackRouteContext({
        ...trackRouteContext,
        origin: coords,
      });
      setFollowUser(false);
      setIsTrackRouteSelected(true);
    }
  }, [trackRouteContext.destination]);

  //Reset all
  const handleResetTrackRoute = () => {
    setTrackRouteContext({
      ...trackRouteContext,
      origin: null,
      destination: null,
    });
    !followUser && setFollowUser(true);
    favoriteContext && setFavoriteContext(null);
    isTrackRouteSelected && setIsTrackRouteSelected(false);
    isFavoriteSelected && setIsFavoriteSelected(false);
    searchContext && setSearchContext(null);
    isSearchChoosen && setIsSearchChoosen(false);
    InteractionManager.runAfterInteractions(() =>
      animateToRegion(userLocation, 350, _mapRef)
    );
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
      {/* <Test/> */}
        <SearchBarWithIcon handleOnSearchSelect={handleOnSearchSelect}/>
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[styles.toolbarIcon]}
          onPress={handleFollowUser}
        >
          <SVGIcons.Center color={!followUser ? "#666" : null} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolbarIcon]}
          onPress={handleFavoriteList}
        >
          <SVGIcons.Heart />
        </TouchableOpacity>
        {isTrackRouteSelected ? (
          <TouchableOpacity
            style={[styles.toolbarIcon, styles.route]}
            onPress={handleResetTrackRoute}
          >
            <SVGIcons.Route />
          </TouchableOpacity>
        ) : null}
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
        {Object.values(userLocation)?.some((m) => m !== null) ? (
          <Markers
            userLocation={userLocation}
            radius={300}
            _mapRef={_mapRef}
            _scrollViewRef={_scrollViewRef}
            handleFollowUser={handleFollowUser}
          />
        ) : null}

        {/* The Route */}
        {isTrackRouteSelected && <MapViewRoute _mapRef={_mapRef} />}
        {/* The Favorite */}
        {!isFavoriteInMarkers && favoriteContext ? <Favorites /> : null}
        {!isSearchInMarkers && searchContext ? <Search /> : null}
      </MapView>

      {/* BottomSheet Markers */}
      {!isFavoriteListSelected && !isFavoriteSelected && !isSearchChoosen && sortedMarkers ? (
        <BottomSheetMarkers
          _scrollViewRef={_scrollViewRef}
          handleFollowUser={handleFollowUser}
        />
      ) : null}
      {/* BottomSheet Favorite list */}
      {isFavoriteListSelected && !isFavoriteSelected ? (
        <BottomSheetFavoriteList
          handleOnFavoriteSelect={handleOnFavoriteSelect}
        />
      ) : null}
      {/* BottomSheet Favorite */}
      {isFavoriteSelected ? <BottomSheetFavorite /> : null}
      {isSearchChoosen ? <BottomSheetSearch /> : null}
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
  route: {
    backgroundColor: "#0064fe",
  },
});
