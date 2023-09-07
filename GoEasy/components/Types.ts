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
export interface PoiType {
  id: number;
  coords: Coords;
  title: string;
  category: string;
  thumbnail: string;
  address: string;
  description: string;
}

export interface BottomSheetType {
  markerSnap: boolean;
  favoriteListSnap: boolean;
  favoriteSnap: boolean;
  searchSnap: boolean;
}
export interface AppState {
  initialMarkersContext: MarkerType[] | null;
  setInitialMarkersContext: any;
  markersContext: MarkerType[] | null;
  setMarkersContext: any;
  bottomSheetContext: BottomSheetType;
  setBottomSheetContext: any;
  favoriteContext: MarkerType | null;
  setFavoriteContext: any;
  searchContext: MarkerType | null;
  setSearchContext: any;
  trackRouteContext: any;
  setTrackRouteContext: any;
  initialPoiContext: MarkerType | null;
  setInitialPoiContext: any;
}

export interface Action {
  type: string;
  value: any;
}

export interface MapContextProviderProps {
  children: React.ReactNode;
}
