import { StyleSheet, View, Text, Animated, PixelRatio } from "react-native";
import React, { useCallback, useContext, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  WIDTH,
  CARD_WIDTH,
  SPACING,
  CARD_HEIGHT,
  HEIGHT,
  FLEX_HEIGHT,
} from "../../constants/constants";
import { MapContext, AnimationContext } from "../../context/mapContextProvider";
import { BottomSheetMarkerHeader } from "./BottomsheetMarkerHeader";
import { BottomSheetMarkerMeta } from "./BottomsheetMarkerMeta";

export const BottomSheetMarkers = ({ _scrollViewRef }: any) => {
  const { markersContext, setMarkersContext } = useContext(MapContext);
  const mapAnimation = useContext(AnimationContext);

  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChange = useCallback((index: any) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index: any) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={["12%", "37%"]}
      enablePanDownToClose={false}
      enableContentPanningGesture={false} // This is needed to make Aninmated.scrollview work in android
      enableOverDrag={true}
      enableHandlePanningGesture={true}
      onChange={handleSheetChange}
    >
      <Animated.ScrollView
        ref={_scrollViewRef}
        style={styles.scrollView}
        horizontal
        pagingEnabled
        scrollEnabled={true}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING * 0.8}
        snapToAlignment="start"
        contentInset={{
          top: 0,
          left: CARD_WIDTH * 0.0045,
          bottom: 0,
          right: CARD_WIDTH * 0.0085,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation!, // The ! symbol indicates to TypeScript that we are sure mapAnimation won't be null at this point
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        nestedScrollEnabled={true}
      >
        {markersContext?.map((marker: any, index: number) => (
          <View key={index} style={styles.card}>
            <BottomSheetMarkerHeader title={marker.title} />
            <BottomSheetMarkerMeta marker={marker} />
          </View>
        ))}
      </Animated.ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    position: "absolute",
    top: FLEX_HEIGHT ? 15 : 0,
    bottom: 0,
    left: SPACING,
    right: SPACING,
  },
  card: {
    flex: 1,
    marginHorizontal: WIDTH * 0.02,
    alignItems: "center",
    height: FLEX_HEIGHT ? CARD_HEIGHT * 0.5 : CARD_HEIGHT * 0.45,
    backgroundColor: "transparent",
  },
});
