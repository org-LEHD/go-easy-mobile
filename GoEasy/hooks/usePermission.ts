import * as Location from "expo-location";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

type LocationCallback = (coords: LocationCoords) => void;

let foregroundSubscription: Location.LocationSubscription | null = null;
export const usePermission = async (callback: LocationCallback) => {
  const requestPermissions = async () => {
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (foreground.granted) startForegroundUpdate();
  };

  requestPermissions();

  // Start location tracking in foreground
  const startForegroundUpdate = async () => {
    // Check if foreground permission is granted
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      return;
    }

    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove();

    // Start watching position in real-time
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.Highest,
        // timeInterval: 1000, not working
        // distanceInterval: 1, not working
      },
      (location) => {
        if (location.coords === null) return;

        // the callback
        callback(location.coords);

        // copy mapRegion, set status, set a copy of location.coords
        console.log("location tracking granted");
      }
    );
  };
  return;
};
