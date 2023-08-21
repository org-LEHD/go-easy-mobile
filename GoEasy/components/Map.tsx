import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Map = () => {
  const insets = useSafeAreaInsets();

  //defining a state variable inner city copenhagen as fallback
  const [initialRegion, setInitialRegion] = useState({
    coords: {
      latitude: 55.68375507989918,
      longitude: 12.57572185309855,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

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
      <MapView
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
});
