import { View, Text } from "react-native";
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";

export default function BottomSheetController() {
  return (
    <BottomSheet
      //ref={_sheetRef}
      index={1}
      snapPoints={["12%", "37%"]}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>BottomSheetController</Text>
      </View>
    </BottomSheet>
  );
}
