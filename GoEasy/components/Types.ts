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
