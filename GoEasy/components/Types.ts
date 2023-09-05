import { LatLng } from "react-native-maps";
import { initialMarkers } from "./../data/apiMarkersMock";

export interface Coords {
  latitude: number | null;
  longitude: number | null;
  latitudeDelta?: number | null;
  longitudeDelta?: number | null;
}

export interface AlertDialog {
  title: string;
  message: string;
  buttonText: string;
  onButtonPress?: () => void;
}

export interface MarkerType {
  id: number | null;
  coords: Coords;
  title: string;
  category: string;
  thumbnail: string;
  address: string;
  phone: string;
  description: string;
  summary: string;
  website: string;
  distance: number;
}

export interface AddType {
  description: string;
  id: number;
  locationId: number;
  media: string;
  title: string;
}

export interface BottomSheetType {
  markerSnap: boolean;
  favoriteListSnap: boolean;
  favoriteSnap: boolean;
}
export interface AppState {
  markersContext: MarkerType[] | null;
  setMarkersContext: any;
  bottomSheetContext: BottomSheetType;
  setBottomSheetContext: any;
  favoriteContext: MarkerType | null;
  setFavoriteContext: any;
  trackRouteContext: any;
  setTrackRouteContext: any;
  initialMarkersContext: MarkerType[] | null;
  setInitialMarkersContext: any;
}

export interface Action {
  type: string;
  value: any;
}

export interface MapContextProviderProps {
  children: React.ReactNode;
}
