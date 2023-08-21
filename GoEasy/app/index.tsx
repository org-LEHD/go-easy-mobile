import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import { Map } from '../components/Map';
// import { Map } from "../components/Map"

const Root = gestureHandlerRootHOC(() => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider style={{ flex: 1 }}>
          {/* <View ><Text>Hej</Text></View> */}
          <Map />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
})

export default Root;


