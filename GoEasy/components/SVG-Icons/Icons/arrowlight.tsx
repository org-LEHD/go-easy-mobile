import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export const ArrowLight = ({ left, right, scale, ...props }: any) => {
  const deg = left ? "-90deg" : right ? "90deg" : "0deg";
  if (scale === undefined) scale = 1;
  const viewBoxWidth = 16; // Original viewBox width
  const viewBoxHeight = 15.595; // Original viewBox height
  const scaledWidth = viewBoxWidth * scale;
  const scaledHeight = viewBoxHeight * scale;
  return (
    <View style={{ aspectRatio: 1 }}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={scaledWidth}
        height={scaledHeight}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        style={{ transform: [{ rotate: deg }] }}
        {...props}
      >
        <Path
          fill="#0064fe"
          d="m9.198 14.553-.794.79a.854.854 0 0 1-1.211 0L.252 8.405a.854.854 0 0 1 0-1.211L7.194.253a.854.854 0 0 1 1.21 0l.793.793a.858.858 0 0 1-.014 1.225l-4.3 4.1h10.26a.855.855 0 0 1 .861.855v1.143a.855.855 0 0 1-.857.857H4.88l4.3 4.1a.852.852 0 0 1 .018 1.227Z"
        />
      </Svg>
    </View>
  );
};
