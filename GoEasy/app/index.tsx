import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler"; //enhances touch and gesture handling in React Native applications
import { Map } from "../components/Map";

//GestureHandlerRootHOC is a top-level component to enhance gesture handling across the entire application.
const Root = gestureHandlerRootHOC(() => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider style={{ flex: 1 }}>
          <Map />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
});

export default Root;
