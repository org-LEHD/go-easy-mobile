import React from "react";
import Svg, { Path } from "react-native-svg";

export const Star = ({ scale, ...props }: any) => {
  if (scale === undefined) scale = 1;
  const viewBoxWidth = 14.272; // Original viewBox width
  const viewBoxHeight = 13.38; // Original viewBox height
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
      <Path
        id="star"
        data-name="star"
        d="M7.812.465,6.07,3.924l-3.9.557A.832.832,0,0,0,1.7,5.907L4.52,8.6l-.667,3.8a.85.85,0,0,0,1.238.881l3.487-1.8,3.487,1.8A.85.85,0,0,0,13.3,12.4l-.667-3.8,2.82-2.691a.832.832,0,0,0-.472-1.427l-3.9-.557L9.343.465a.862.862,0,0,0-1.531,0Z"
        transform="translate(-1.441 0.001)"
        fill="#0064fe"
        opacity="0.79"
      />
    </Svg>
  );
};
