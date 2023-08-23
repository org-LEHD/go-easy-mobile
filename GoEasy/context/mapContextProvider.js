import React, { useEffect } from "react";
// import { initialMarkers } from "../data/api";
import { initialMarkers } from "./../data/apiMarkers";

export const AnimationContext = React.createContext();

const initialState = {
  bottomSheetContextIndex: -1,
  followUserContext: true,
  markersContext: null,
  trackRouteContext: { origin: null, destination: null },
  favoriteContext: null,
};

const actions = {
  SET_BOTTOMSHEETCONTEXTINDEX: "SET_BOTTOMSHEETCONTEXTINDEX",
  SET_FOLLOWUSERCONTEXT: "SET_FOLLOWUSERCONTEXT",
  SET_MARKERSCONTEXT: "SET_MARKERSCONTEXT",
  SET_TRACKROUTECONTEXT: "SET_TRACKROUTECONTEXT",
  SET_FAVORITECONTEXT: "SET_FAVORITECONTEXT",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_BOTTOMSHEETCONTEXTINDEX:
      return { ...state, bottomSheetContextIndex: action.value };
    case actions.SET_MARKERSCONTEXT:
      return { ...state, markersContext: action.value };
    case actions.SET_FOLLOWUSERCONTEXT:
      return { ...state, followUserContext: action.value };
    case actions.SET_TRACKROUTECONTEXT:
      return { ...state, trackRouteContext: action.value };
    case actions.SET_FAVORITECONTEXT:
      return { ...state, favoriteContext: action.value };
    default:
      return state;
  }
}

export const MapContext = React.createContext();

export function MapContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({
      type: actions.SET_MARKERSCONTEXT,
      value: initialMarkers.markers,
    });
  }, []);

  const value = {
    bottomSheetContextIndex: state.bottomSheetContextIndex,
    followUserContext: state.followUserContext,
    markersContext: state.markersContext,
    trackRouteContext: state.trackRouteContext,
    favoriteContext: state.favoriteContext,

    setBottomSheetContextIndex: (value) => {
      dispatch({ type: actions.SET_BOTTOMSHEETCONTEXTINDEX, value });
    },
    setFollowUserContext: (value) => {
      dispatch({ type: actions.SET_FOLLOWUSERCONTEXT, value });
    },
    setMarkersContext: (value) => {
      dispatch({ type: actions.SET_MARKERSCONTEXT, value });
    },
    setTrackRouteContext: (value) => {
      dispatch({ type: actions.SET_TRACKROUTECONTEXT, value });
    },
    setFavoriteContext: (value) => {
      dispatch({ type: actions.SET_FAVORITECONTEXT, value });
    },
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
