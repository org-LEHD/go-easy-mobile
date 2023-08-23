import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler"; //enhances touch and gesture handling in React Native applications
import { Map } from "../components/Map";
import { MapContextProvider } from "../context/mapContextProvider";

//GestureHandlerRootHOC is a top-level component to enhance gesture handling across the entire application.
const Root = gestureHandlerRootHOC(() => {
  return (
    <>
      <MapContextProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider style={{ flex: 1 }}>
            <Map />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </MapContextProvider>
    </>
  );
});

export default Root;
