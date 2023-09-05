import React, { MutableRefObject, useContext } from "react";
import MapViewDirections, {
  MapDirectionsResponse,
} from "react-native-maps-directions";
import { MapContext } from "../context/mapContextProvider";
import { GOOGLE_MAPS_APIKEY } from "../data/googleApiKeys";
import MapView from "react-native-maps";

interface MapViewRouteProps {
  _mapRef: MutableRefObject<MapView | null>;
}

export const MapViewRoute = ({ _mapRef }: MapViewRouteProps) => {
  const { trackRouteContext } = useContext(MapContext);

  const mapViewDirectionsOnReady = (result: MapDirectionsResponse) => {
    _mapRef.current?.fitToCoordinates(result?.coordinates, {
      edgePadding: {
        right: 50,
        bottom: 50,
        left: 50,
        top: 50,
      },
    });
    console.log("Route is made");
  };

  return (
    <MapViewDirections
      origin={trackRouteContext?.origin}
      destination={trackRouteContext?.destination}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={5}
      strokeColor="blue"
      onReady={mapViewDirectionsOnReady}
    />
  );
};
