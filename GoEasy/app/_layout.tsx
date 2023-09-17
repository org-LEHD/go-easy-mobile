import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { SVGIcons } from "../components/SVG-Icons/Svg";
import { MapContextProvider } from "../context/mapContextProvider";

const StackLayout = () => {
  const router = useRouter();
  return (
    <MapContextProvider>
      <Stack
        screenOptions={{
          headerTintColor: "blue",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: "",
            headerShown: true,
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  router.back();
                }}
              >
                <SVGIcons.Arrow right={true} />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: "#fff",
            },
          }}
        />
      </Stack>
    </MapContextProvider>
  );
};
const styles = StyleSheet.create({
  backButton: {
    width: 20,
    aspectRatio: 1,
    zIndex: 1,
    marginLeft: 0,
  },
});
export default StackLayout;
