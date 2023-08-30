export interface Coords {
  latitude: number | null;
  longitude: number | null;
  latitudeDelta?: number | null;
  longitudeDelta?: number | null;
}

export interface AlertDialogProps {
  title: string;
  message: string;
  buttonText: string;
  onButtonPress?: () => void;
}
