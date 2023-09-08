import React from "react";
import { render } from "@testing-library/react-native";
import { Map } from "../Map";
import { NativeModules } from "react-native";
import "react-native-maps";

// Mock AsyncStorage to avoid NativeModule related issues
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  mergeItem: jest.fn(),
}));

// Mock NativeModules for AsyncStorage
NativeModules.AsyncStorage =
  require("@react-native-async-storage/async-storage").default;

// Mock 'react-native-maps' to prevent rendering the actual MapView
jest.mock("react-native-maps", () => "MapView");

// Mock any context or dependencies used by your Map component
jest.mock("./__mocks__/mapContextProvider", () => ({
  MapContext: {
    Consumer: ({ children }: any) =>
      children({
        markersContext: [],
        bottomSheetContext: {},
        favoriteContext: {},
        setFavoriteContext: jest.fn(),
        trackRouteContext: {},
        setTrackRouteContext: jest.fn(),
      }),
  },
}));
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock("../../hooks/usePermission", () => ({
  usePermission: jest.fn(() => ({ latitude: 0, longitude: 0 })),
}));

describe("Map component", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Map />);
    expect(toJSON()).toMatchSnapshot();
  });

  // Add more test cases as needed
});
