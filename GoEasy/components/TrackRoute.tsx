import { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SVGIcons } from "./SVG-Icons/Svg";
import { MapContext } from "../context/mapContextProvider";
import { MarkerType } from "./Types";

interface MarkerProps {
  marker: MarkerType;
}

export const TrackRoute = ({ marker }: MarkerProps) => {
  const { trackRouteContext, setTrackRouteContext } = useContext(MapContext);

  const handleTrackRoute = () => {
    setTrackRouteContext({
      ...trackRouteContext,
      destination: marker.coords,
    });
  };

  return (
    <TouchableOpacity style={styles.routeOval} onPress={handleTrackRoute}>
      <SVGIcons.Route />
      <Text style={styles.routeText}>Rute</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  routeOval: {
    width: 70,
    height: 30,
    backgroundColor: "blue",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  routeText: {
    color: "white",
    marginLeft: 5,
  },
});
