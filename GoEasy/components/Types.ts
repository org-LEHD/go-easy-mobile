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
}

export interface BottomSheetType {
  markerSnap: boolean;
  favoriteSnap: boolean;
}
export interface AppState {
  markersContext: MarkerType[] | null;
  setMarkersContext: any | null;
  bottomSheetContext: BottomSheetType;
  setBottomSheetContext: any | null;
}

export interface Action {
  type: string;
  value: any;
}

export interface MapContextProviderProps {
  children: React.ReactNode;
}
