import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated } from "react-native";
import {
  Action,
  AppState,
  MapContextProviderProps,
  MarkerType,
} from "../components/Types";
import { useMarkerApi } from "../data/useMarkerApi";

export const AnimationContext = React.createContext<Animated.Value | null>(
  null
);

// This defines the initial state. It's an object that contains
// various context and setContext functions to manage the state.
//
// Key Explanations:
// - 'markersContext' and 'setMarkersContext': Used for handles marker data in the app.
// - 'bottomSheetContext' and 'setBottomSheetContext': Handles the state of bottom sheets.
// - 'favoriteContext' and 'setFavoriteContext': Handles favorite markers data.
// - 'trackRouteContext' and 'setTrackRouteContext': Handles tracking route information.
// - 'initialMarkersContext' and 'setInitialMarkersContext': Used for initial marker data.
//
// Each 'setContext' function is initialized as a no-op function by default.
// You can update these functions later to set the state as needed when they are used.
// This initial state provides a template for the structure of your application's state.
const initialState: AppState = {
  markersContext: null,
  setMarkersContext: () => null,
  bottomSheetContext: {
    markerSnap: false,
    favoriteListSnap: false,
    favoriteSnap: false,
  },
  setBottomSheetContext: () => null,
  favoriteContext: null,
  setFavoriteContext: () => null,
  trackRouteContext: { origin: null, destination: null },
  setTrackRouteContext: () => null,
  initialMarkersContext: null,
  setInitialMarkersContext: () => null,
};

// Defines action types that can be dispatched to update the state.
const actions = {
  SET_MARKERSCONTEXT: "SET_MARKERSCONTEXT",
  SET_BOTTOMSHEETCONTEXT: "SET_BOTTOMSHEETCONTEXT",
  SET_FAVORITECONTEXT: "SET_FAVORITECONTEXT",
  SET_TRACKROUTECONTEXT: "SET_TRACKROUTECONTEXT",
  SET_INITIALMARKERSCONTEXT: "SET_INITIALMARKERSCONTEXT",
};

// This is a reducer function that takes the current state and an action as input and returns
// a new state based on the action type.
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case actions.SET_MARKERSCONTEXT:
      return { ...state, markersContext: action.value };
    case actions.SET_BOTTOMSHEETCONTEXT:
      return { ...state, bottomSheetContext: action.value };
    case actions.SET_FAVORITECONTEXT:
      return { ...state, favoriteContext: action.value };
    case actions.SET_TRACKROUTECONTEXT:
      return { ...state, trackRouteContext: action.value };
    case actions.SET_INITIALMARKERSCONTEXT:
      return { ...state, initialMarkersContext: action.value };
    default:
      return state;
  }
}

// This code creates a React context called 'MapContext' with an initial value of 'initialState'.
// This context can be used to share the 'AppState' throughout your React component tree.
// Components that want to access or update the application state can use this context.
export const MapContext = React.createContext<AppState>(initialState);

// This component is responsible for managing the application's state
// and actions using the 'MapContext' context. It fetches initial marker data and periodically
// updates it, as well as provides actions to update various parts of the application state.
export function MapContextProvider({ children }: MapContextProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [api, SetApi] = useState<MarkerType[]>([]);
  const { fetchInitialMarkers } = useMarkerApi();
  const previousApi = useRef<MarkerType[]>(api);

  // This useEffect hook is responsible for fetching initial markers data
  // and setting it in the application context. It also sets up an interval
  // to periodically fetch and update the markers data, if necessary.
  //
  // Parameters:
  // - hasInterval (boolean): A flag indicating whether to continue fetching
  //   and updating markers data at regular intervals.
  //
  // Workflow:
  // 1. It initially fetches the markers data using the 'fetchInitialMarkers' function.
  // 2. Compares the current markers data with the previous one to determine if
  //    there are any changes.
  // 3. If there are changes, it dispatches an action to set the initial markers
  //    data in the context and, if 'hasInterval' is true, it also dispatches an
  //    action to update the markers context.
  // 4. Updates the 'Api' state and stores the current markers data in 'previousApi.current'.
  // 5. Sets up an interval to periodically call 'handleIntitalMarkers' with 'hasInterval' as false.
  // 6. Returns a cleanup function that clears the interval when the component unmounts.
  useEffect(() => {
    const handleIntitalMarkers = async (hasInterval: boolean) => {
      try {
        const currentApi = await fetchInitialMarkers();
        if (
          JSON.stringify(previousApi.current) !== JSON.stringify(currentApi)
        ) {
          dispatch({
            type: actions.SET_INITIALMARKERSCONTEXT,
            value: currentApi,
          });
          if (hasInterval) {
            dispatch({
              type: actions.SET_MARKERSCONTEXT,
              value: currentApi,
            });
          }
          SetApi(currentApi);
          previousApi.current = currentApi;
        }
      } catch (error) {
        console.log("Error getting api:", error);
      }
    };
    handleIntitalMarkers(true);
    const interval = setInterval(() => handleIntitalMarkers(false), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // This 'value' object contains the state and functions for updating specific
  // parts of the state. It is used as the value provided by the 'MapContext.Provider' to
  // make the state and actions accessible to child components via the 'MapContext' context.
  const value = {
    markersContext: state.markersContext,
    bottomSheetContext: state.bottomSheetContext,
    favoriteContext: state.favoriteContext,
    trackRouteContext: state.trackRouteContext,
    initialMarkersContext: state.initialMarkersContext,
    setMarkersContext: (value: AppState) => {
      dispatch({ type: actions.SET_MARKERSCONTEXT, value });
    },
    setBottomSheetContext: (value: AppState) => {
      dispatch({ type: actions.SET_BOTTOMSHEETCONTEXT, value });
    },
    setFavoriteContext: (value: AppState) => {
      dispatch({ type: actions.SET_FAVORITECONTEXT, value });
    },
    setTrackRouteContext: (value: AppState) => {
      dispatch({ type: actions.SET_TRACKROUTECONTEXT, value });
    },
    setInitialMarkersContext: (value: AppState) => {
      dispatch({ type: actions.SET_INITIALMARKERSCONTEXT, value });
    },
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
