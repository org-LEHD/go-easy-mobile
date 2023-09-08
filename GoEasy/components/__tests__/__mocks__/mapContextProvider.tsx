import React from "react";

const MapContext = React.createContext({
  markersContext: [],
  bottomSheetContext: {},
  favoriteContext: {},
  setFavoriteContext: jest.fn(),
  trackRouteContext: {},
  setTrackRouteContext: jest.fn(),
});

export { MapContext };

// Add a simple test case to satisfy Jest's requirements
test("mock file should contain at least one test", () => {
  expect(true).toBe(true);
});
