import React, { useContext } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { CARD_WIDTH, SPACING } from "../../constants/constants";
import { MapContext } from "../../context/mapContextProvider";

import { BottomSheetMarkerHeader } from "./BottomsheetMarkerHeader";
import { BottomSheetMarkerMeta } from "./BottomsheetMarkerMeta";
import { BottomSheetMarkerDesc } from "./BottomsheetMarkerDesc";
import { MarkerType } from "../Types";

export const BottomSheetFavorite = () => {
  const { favoriteContext, bottomSheetContext, setBottomSheetContext } =
    useContext(MapContext);

  const favorite = favoriteContext as MarkerType;

  const handleBottomSheetonChange = (snap: number) => {
    if (snap !== -1) {
      setBottomSheetContext({
        ...bottomSheetContext,
        favoriteSnap: true,
      });
      console.log("open");
      return;
    }
    setBottomSheetContext({ ...bottomSheetContext, favoriteSnap: false });
    console.log("close");
  };

  return (
    <BottomSheet
      snapPoints={["37%"]}
      enablePanDownToClose={true}
      onChange={handleBottomSheetonChange}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.container}>
          <BottomSheetMarkerHeader title={favorite?.title} />
          <BottomSheetMarkerMeta marker={favorite} />
          <BottomSheetMarkerDesc marker={favorite} />
        </View>
      </View>
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: SPACING,
    right: SPACING,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    width: CARD_WIDTH,
  },
});
