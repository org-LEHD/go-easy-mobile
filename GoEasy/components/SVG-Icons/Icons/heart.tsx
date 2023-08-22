import React from "react";
import Svg, { Path } from "react-native-svg";

export const Heart = ({ color, scale, ...props }: any) => {
  const colors = {
    fill: color ?? "#0064fe",
  };

  if (scale === undefined) scale = 1;

  const viewBoxWidth = 22; // Original viewBox width
  const viewBoxHeight = 19; // Original viewBox height
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
        id="heart"
        fill={`${colors.fill}`}
        d="M19.865 1.299a5.931 5.931 0 0 0-8.018.577l-.846.861-.846-.861a5.931 5.931 0 0 0-8.018-.577 6.036 6.036 0 0 0-.425 8.817l8.314 8.474a1.359 1.359 0 0 0 1.946 0l8.314-8.474a6.032 6.032 0 0 0-.421-8.817Z"
      />
    </Svg>
  );
};
export const HeartOutline = (props: any) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={19} {...props}>
      <Path
        fill="#0064fe"
        d="M5.74 2a3.548 3.548 0 0 0-2.315.829 3.972 3.972 0 0 0-1.424 2.879 4.03 4.03 0 0 0 1.134 3.007l7.866 8.011 7.86-8.011a4.028 4.028 0 0 0 1.137-3.007 3.969 3.969 0 0 0-1.418-2.879 3.547 3.547 0 0 0-2.315-.83 4.227 4.227 0 0 0-2.99 1.278l-2.274 2.312-2.275-2.314A4.217 4.217 0 0 0 5.74 2m0-2a6.216 6.216 0 0 1 4.414 1.876l.847.861.846-.861a5.931 5.931 0 0 1 8.018-.577 6.032 6.032 0 0 1 .421 8.817l-8.314 8.473a1.359 1.359 0 0 1-1.946 0l-8.315-8.473a6.036 6.036 0 0 1 .425-8.817A5.554 5.554 0 0 1 5.74 0Z"
        id="heartoutline"
      />
    </Svg>
  );
};
