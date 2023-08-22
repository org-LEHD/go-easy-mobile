import React from "react";
import Svg, { Path } from "react-native-svg";

export const Route = ({ invertColor, scale, ...props }: any) => {
  const colors = {
    fill: invertColor ? "#0064fe" : "#fff",
    stroke: invertColor ? "#fff" : "#0064fe",
  };

  if (scale === undefined) scale = 1;
  const viewBoxWidth = 17.65; // Original viewBox width
  const viewBoxHeight = 17.65; // Original viewBox height
  const scaledWidth = viewBoxWidth * scale;
  const scaledHeight = viewBoxHeight * scale;

  return (
    <Svg
      id="Route"
      data-name="Route"
      xmlns="http://www.w3.org/2000/svg"
      width={scaledWidth}
      height={scaledHeight}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      {...props}
    >
      <Path
        id="Path_11510"
        data-name="Path 11510"
        d="M3.314,12.585l7.753,7.752a1.072,1.072,0,0,0,1.518,0l7.752-7.752a1.074,1.074,0,0,0,0-1.518L12.585,3.315a1.074,1.074,0,0,0-1.518,0L3.315,11.067a1.074,1.074,0,0,0,0,1.518Z"
        transform="translate(-3.001 -3.001)"
        fill={`${colors.fill}`}
      />
      <Path
        id="Path_11511"
        data-name="Path 11511"
        d="M8,12h7.355"
        transform="translate(-3.097 -3.176)"
        fill="none"
        stroke={`${colors.stroke}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <Path
        id="Path_11512"
        data-name="Path 11512"
        d="M12,8.5l3.432,3.432L12,15.364"
        transform="translate(-3.175 -3.107)"
        fill="none"
        stroke={`${colors.stroke}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </Svg>
  );
};
