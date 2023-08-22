import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export const Arrow = ({ left, right, ...props }: any) => {
  const deg = left ? "-90deg" : right ? "90deg" : "0deg";
  return (
    <View style={{ aspectRatio: 1 }}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 23.89 13.66"
        style={{ transform: [{ rotate: deg }] }}
        {...props}
      >
        <Path
          id="arrow"
          fill="#0064fe"
          d="M11.951 9.543 20.985.502a1.7 1.7 0 0 1 2.411 0 1.722 1.722 0 0 1 0 2.419L13.16 13.164a1.7 1.7 0 0 1-2.355.05L.498 2.928A1.71 1.71 0 0 1 2.913.509Z"
        />
      </Svg>
    </View>
  );
};
