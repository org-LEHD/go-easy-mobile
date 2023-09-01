import React, { useEffect } from "react";
// import { initialMarkers } from "../data/api";
import { initialMarkers } from "../data/apiMarkers";
import { Animated } from "react-native";
import { Action, AppState, MapContextProviderProps } from "../components/Types";

export const AnimationContext = React.createContext<Animated.Value | null>(
  null
);

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
};

const actions = {
  SET_MARKERSCONTEXT: "SET_MARKERSCONTEXT",
  SET_BOTTOMSHEETCONTEXT: "SET_BOTTOMSHEETCONTEXT",
  SET_FAVORITECONTEXT: "SET_FAVORITECONTEXT",
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case actions.SET_MARKERSCONTEXT:
      return { ...state, markersContext: action.value };
    case actions.SET_BOTTOMSHEETCONTEXT:
      return { ...state, bottomSheetContext: action.value };
    case actions.SET_FAVORITECONTEXT:
      return { ...state, favoriteContext: action.value };
    default:
      return state;
  }
}

export const MapContext = React.createContext<AppState>(initialState);

export function MapContextProvider({ children }: MapContextProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({
      type: actions.SET_MARKERSCONTEXT,
      value: initialMarkers.markers,
    });
  }, []);

  const value = {
    markersContext: state.markersContext,
    bottomSheetContext: state.bottomSheetContext,
    favoriteContext: state.favoriteContext,
    setMarkersContext: (value: AppState) => {
      dispatch({ type: actions.SET_MARKERSCONTEXT, value });
    },
    setBottomSheetContext: (value: AppState) => {
      dispatch({ type: actions.SET_BOTTOMSHEETCONTEXT, value });
    },
    setFavoriteContext: (value: AppState) => {
      dispatch({ type: actions.SET_FAVORITECONTEXT, value });
    },
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
