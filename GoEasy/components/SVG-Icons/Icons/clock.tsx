import * as React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";

export const Clock = ({ color, scale, ...props }: any) => {
  const colors = {
    fill: color ?? "#FFF",
  };

  if (scale === undefined) scale = 1;

  const viewBoxWidth = 16; // Original viewBox width
  const viewBoxHeight = 16; // Original viewBox height
  const scaledWidth = viewBoxWidth * scale;
  const scaledHeight = viewBoxHeight * scale;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={scaledWidth}
      height={scaledHeight}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      {...props}
    >
      <G stroke={colors.fill} strokeWidth={2}>
        <G fill="none">
          <Circle cx={8} cy={8} r={8} stroke="none" />
          <Circle cx={8} cy={8} r={7} fill="none" />
        </G>
        <Path
          fill="none"
          d="M10.976 10.977 8 7.99V3.501"
          data-name="Path 11492"
        />
      </G>
    </Svg>
  );
};
