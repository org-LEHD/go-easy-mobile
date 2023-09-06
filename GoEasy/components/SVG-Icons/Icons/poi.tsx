import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Poi = ({ color, scale, ...props }: any) => {
  const colors = {
    fill: color ?? "#0064fe",
  };

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19.098}
      height={24.482}
      {...props}
    >
      <Path
        fill="#0064fe"
        stroke="#e7f0ff"
        strokeWidth={2}
        d="M8.671 23.029C2.2 13.779 1 12.83 1 9.431A8.491 8.491 0 0 1 9.549 1 8.491 8.491 0 0 1 18.1 9.431c0 3.4-1.2 4.349-7.671 13.6a1.078 1.078 0 0 1-1.757 0Zm.879-10.085a3.513 3.513 0 1 0-3.563-3.513 3.538 3.538 0 0 0 3.562 3.513Z"
        data-name="Icon awesome-map-marker-alt"
      />
    </Svg>
  );
};
