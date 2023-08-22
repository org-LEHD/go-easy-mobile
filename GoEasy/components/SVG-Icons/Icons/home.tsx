import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export const Home = (props: any) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={21.01}
      height={20.367}
      {...props}
    >
      <Path
        id="home"
        fill="#0064fe"
        d="M13.008 20.367v-4.632a1 1 0 0 0-1-1H8.527a1 1 0 0 0-1 1v4.632h-5a1 1 0 0 1-1-1v-8.19H1a1 1 0 0 1-.694-1.72l9.5-9.178a1 1 0 0 1 1.391 0l9.5 9.178a1 1 0 0 1-.694 1.72h-.5v8.19a1 1 0 0 1-1 1Z"
      />
    </Svg>
  );
};
