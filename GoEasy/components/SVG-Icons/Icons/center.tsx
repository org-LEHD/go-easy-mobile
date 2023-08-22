import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

export const Center = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
    <G
      stroke="#0064fe"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      data-name="Group 1"
      transform="translate(-328 -157)"
    >
      <Circle
        cx={0.5}
        cy={0.5}
        r={0.5}
        fill="#fff"
        data-name="Ellipse 122"
        transform="translate(337.5 166.5)"
      />
      <Circle
        cx={7}
        cy={7}
        r={7}
        fill="none"
        data-name="Ellipse 123"
        transform="translate(331 160)"
      />
      <Path fill="none" d="M338 158v2" data-name="Line 38" />
      <Path fill="none" d="M329 167h2" data-name="Line 39" />
      <Path fill="none" d="M338 174v2" data-name="Line 40" />
      <Path fill="none" d="M345 167h2" data-name="Line 41" />
    </G>
  </Svg>
);
