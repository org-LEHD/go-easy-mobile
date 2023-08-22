import React from "react";
import Svg, { Path } from "react-native-svg";

export const Star = (props: any) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="14.272"
      height="13.38"
      viewBox="0 0 14.272 13.38"
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
