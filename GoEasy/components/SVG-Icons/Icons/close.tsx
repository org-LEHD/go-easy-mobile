import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export const Close = (props: any) => {
  return (
    <View style={{ aspectRatio: 1 }}>
      <Svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} {...props}>
        <Path
          fill="#aaa"
          d="m6.315 5.111 3.649-3.65A.855.855 0 0 0 8.755.251l-3.64 3.648L1.466.249a.855.855 0 1 0-1.209 1.21l3.649 3.65-3.649 3.65a.855.855 0 0 0 1.209 1.21l3.649-3.65 3.649 3.65a.855.855 0 1 0 1.209-1.21Z"
          id="Close"
          opacity={0.61}
        />
      </Svg>
    </View>
  );
};
