import React from "react";
import Svg, { Path } from "react-native-svg";

export const Trashcan = (props: any) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={19.43}
      {...props}
    >
      <Path
        fill="#fff"
        d="M16.393 1.214h-4.554L11.483.5a.911.911 0 0 0-.816-.5H6.329a.9.9 0 0 0-.812.5l-.357.71H.607A.607.607 0 0 0 0 1.821v1.215a.607.607 0 0 0 .607.607h15.786A.607.607 0 0 0 17 3.036V1.821a.607.607 0 0 0-.607-.607ZM2.019 17.721a1.821 1.821 0 0 0 1.818 1.708h9.327a1.821 1.821 0 0 0 1.818-1.707l.8-12.864H1.214Z"
      />
    </Svg>
  );
};
