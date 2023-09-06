import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import { Action, AppState, MapContextProviderProps } from "../components/Types";
import { useMarkerApi } from "../data/useMarkerApi";

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
    searchSnap: false,
  },
  setBottomSheetContext: () => null,
  favoriteContext: null,
  setFavoriteContext: () => null,
  trackRouteContext: { origin: null, destination: null },
  setTrackRouteContext: () => null,
  initialMarkersContext: null,
  setInitialMarkersContext: () => null,
  searchContext: null,
  setSearchContext: () => null,
};

const actions = {
  SET_MARKERSCONTEXT: "SET_MARKERSCONTEXT",
  SET_BOTTOMSHEETCONTEXT: "SET_BOTTOMSHEETCONTEXT",
  SET_FAVORITECONTEXT: "SET_FAVORITECONTEXT",
  SET_TRACKROUTECONTEXT: "SET_TRACKROUTECONTEXT",
  SET_INITIALMARKERSCONTEXT: "SET_INITIALMARKERSCONTEXT",
  SET_SEARCHCONTEXT: "SET_SEARCHCONTEXT",
};

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
    case actions.SET_SEARCHCONTEXT:
      return { ...state, searchContext: action.value };
    default:
      return state;
  }
}

export const MapContext = React.createContext<AppState>(initialState);

export function MapContextProvider({ children }: MapContextProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { fetchInitialMarkers } = useMarkerApi();

  useEffect(() => {
    const initialMarkers = async () => {
      const initialMarkers = await fetchInitialMarkers(); // Await the fetchData function
      dispatch({
        type: actions.SET_INITIALMARKERSCONTEXT,
        value: initialMarkers,
      });
      dispatch({
        type: actions.SET_MARKERSCONTEXT,
        value: initialMarkers,
      });
    };
    initialMarkers();
  }, []);

  const value = {
    markersContext: state.markersContext,
    bottomSheetContext: state.bottomSheetContext,
    favoriteContext: state.favoriteContext,
    trackRouteContext: state.trackRouteContext,
    initialMarkersContext: state.initialMarkersContext,
    searchContext: state.searchContext,
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
    setSearchContext: (value: AppState) => {
      dispatch({ type: actions.SET_SEARCHCONTEXT, value });
    },
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
