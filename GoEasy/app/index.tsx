import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler"; //enhances touch and gesture handling in React Native applications
import { Map } from "../components/Map";
import {
  MapContextProvider,
  AnimationContext,
} from "../context/mapContextProvider";
import { useMemo } from "react";
import { Animated } from "react-native";

//GestureHandlerRootHOC is a top-level component to enhance gesture handling across the entire application.
const Root = gestureHandlerRootHOC(() => {
  /**
   * onUserLocationChange will cause a state change every time location change
   * we don't want to reset the animation when onUserLocationChange state changes, only when animation is invoked.
   */
  let mapAnimation = useMemo(() => {
    return new Animated.Value(0);
  }, []);

  return (
    <>
      <MapContextProvider>
        <AnimationContext.Provider value={mapAnimation}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider style={{ flex: 1 }}>
              <Map />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </AnimationContext.Provider>
      </MapContextProvider>
    </>
  );
});

export default Root;
