export const animateToRegion = (coords: any, speed: number, ref: any) => {
  if (ref.current) {
    ref?.current?.animateToRegion(coords, speed);
  }
};
