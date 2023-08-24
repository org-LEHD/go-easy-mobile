import { StyleSheet, View, Text, Animated } from "react-native";
import React, { useCallback, useContext, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  WIDTH,
  CARD_WIDTH,
  SPACING,
  CARD_HEIGHT,
} from "../../constants/constants";
import { MapContext, AnimationContext } from "../../context/mapContextProvider";

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
      index={1}
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
        snapToInterval={CARD_WIDTH + SPACING}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
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
            <Text>{marker.title}</Text>
          </View>
        ))}
      </Animated.ScrollView>
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
  card: {
    flex: 1,
    marginHorizontal: WIDTH * 0.02,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#eee",
  },
});
