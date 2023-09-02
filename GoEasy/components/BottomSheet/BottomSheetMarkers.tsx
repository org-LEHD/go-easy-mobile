import { StyleSheet, View, Text, Animated } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import {
  WIDTH,
  CARD_WIDTH,
  SPACING,
  CARD_HEIGHT,
  FLEX_HEIGHT,
} from "../../constants/constants";
import { MapContext, AnimationContext } from "../../context/mapContextProvider";
import { BottomSheetMarkerHeader } from "./BottomsheetMarkerHeader";
import { BottomSheetMarkerMeta } from "./BottomsheetMarkerMeta";
import { BottomSheetMarkerDesc } from "./BottomsheetMarkerDesc";
import { MarkerType } from "../Types";

export const BottomSheetMarkers = ({ _scrollViewRef }: any) => {
  //todo types
  const { markersContext, setMarkersContext } = useContext(MapContext);
  const mapAnimation = useContext(AnimationContext);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [snapIndex, setSnapIndex] = useState<number>(0);

  // useRefs
  const _sheetRef = useRef<BottomSheet>(null);
  const _debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (_scrollViewRef.current) {
      let x = (mapAnimation as any)._value;
      _scrollViewRef.current.scrollTo({ x: x, y: 0, animated: true });
    }
  }, []);

  //open or closed state for the bottomsheet
  useEffect(() => {
    if (!markersContext) return;
    if (markersContext.length === 0) {
      setSnapIndex(-1);
      if (!_sheetRef.current) return;
      _sheetRef.current.close();
      return;
    }
    setSnapIndex(0);

    return () => {
      if (_scrollViewRef.current && markersContext.length === 1) {
        _scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false }); // Reset scroll position
      }
    };
  }, [markersContext]);

  // callbacks
  const handleSheetChange = useCallback(() => {
    setScrollEnabled((prev) => !prev);
  }, []);

  return (
    <BottomSheet
      ref={_sheetRef}
      index={snapIndex}
      snapPoints={["12%", "37%"]}
      enablePanDownToClose={false}
      enableContentPanningGesture={true} // Make gesture possible with content
      enableOverDrag={true}
      enableHandlePanningGesture={true}
      onChange={handleSheetChange}
    >
      <ScrollView
        ref={_scrollViewRef}
        style={styles.scrollView}
        horizontal
        pagingEnabled
        scrollEnabled={scrollEnabled}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING * 0.8}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: CARD_WIDTH * 0.0045,
          bottom: 0,
          right: CARD_WIDTH * 0.0085,
        }}
        onScroll={
          // _scrollViewRef.current && // On mount onScroll triggers unnessary animation event
          Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation!, // The ! symbol indicates to TypeScript that we are sure mapAnimation won't be null at this point
                  },
                },
              },
            ],
            { useNativeDriver: false }
          )
        }
        nestedScrollEnabled={true}
      >
        {markersContext?.map((marker: MarkerType, index: number) => (
          <View key={index} style={styles.card}>
            <BottomSheetMarkerHeader title={marker.title} />
            <BottomSheetMarkerMeta marker={marker} />
            <BottomSheetMarkerDesc marker={marker} />
          </View>
        ))}
      </ScrollView>
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
