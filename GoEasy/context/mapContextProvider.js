import React, { useEffect } from "react";
// import { initialMarkers } from "../data/api";
import { initialMarkers } from "./../data/apiMarkers";

export const AnimationContext = React.createContext();

const initialState = {
  markersContext: null,
};

const actions = {
  SET_MARKERSCONTEXT: "SET_MARKERSCONTEXT",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_MARKERSCONTEXT:
      return { ...state, markersContext: action.value };
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
    markersContext: state.markersContext,
    setMarkersContext: (value) => {
      dispatch({ type: actions.SET_MARKERSCONTEXT, value });
    },
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
