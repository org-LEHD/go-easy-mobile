import React, { useEffect } from "react";
import { getDistance, getPreciseDistance } from "geolib";

export const useDistance = async (coords: any) => {
  const calculateDistance = (coords: any) => {
    const distance = getDistance(coords.location, coords.distination);
    return distance;
  };
  return calculateDistance(coords);
};

export const useDistancePrecise = (coords: any) => {
  const calculatePreciseDistance = (coords: any) => {
    const distance = getPreciseDistance(coords.location, coords.distination);
    return distance;
  };
  return calculatePreciseDistance(coords);
};
