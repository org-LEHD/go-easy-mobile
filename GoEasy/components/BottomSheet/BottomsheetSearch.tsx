import React, { useContext } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View, Text } from "react-native";
import { CARD_WIDTH, SPACING } from "../../constants/constants";
import { MapContext } from "../../context/mapContextProvider";

import { BottomSheetMarkerHeader } from "./BottomsheetMarkerHeader";
import { BottomSheetMarkerMeta } from "./BottomsheetMarkerMeta";
import { BottomSheetMarkerDesc } from "./BottomsheetMarkerDesc";
import { MarkerType } from "../Types";

export const BottomSheetSearch = () => {
  const { searchContext, bottomSheetContext, setBottomSheetContext } =
    useContext(MapContext);

  const search = searchContext as MarkerType;

  const handleBottomSheetonChange = (snap: number) => {
    if (snap !== -1) {
      setBottomSheetContext({
        ...bottomSheetContext,
        searchSnap: true,
      });
      console.log("open");
      return;
    }
    setBottomSheetContext({ ...bottomSheetContext, searchSnap: false });
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
          <BottomSheetMarkerHeader title={search?.title} />
          <BottomSheetMarkerMeta marker={search} />
          <BottomSheetMarkerDesc marker={search} />
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
