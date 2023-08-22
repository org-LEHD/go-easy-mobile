import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export const Search = (props: any) => {
  return (
    <View style={{ aspectRatio: 1 }}>
      <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
        <Path
          fill="#0064fe"
          d="M19.765 18.557 14.2 12.943a7.927 7.927 0 1 0-1.2 1.219l5.526 5.578a.856.856 0 0 0 1.208.031.862.862 0 0 0 .031-1.214ZM7.974 14.229a6.259 6.259 0 1 1 4.426-1.833 6.221 6.221 0 0 1-4.426 1.833Z"
          id="search"
        />
      </Svg>
    </View>
  );
};
