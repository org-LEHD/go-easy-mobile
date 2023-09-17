import React, { useContext, useEffect, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { MapContext } from "../../context/mapContextProvider";
import { CARD_WIDTH, WIDTH } from "../../constants/constants";
import { BottomSheetMarkerHeader } from "./BottomsheetMarkerHeader";
import { useFavoriteAsyncStorage } from "../../hooks/useFavoriteAsyncStorage";
import { SwipeableItem } from "./../SwipeableItem";
import { MarkerType } from "../Types";

export const BottomSheetFavoriteList = ({ handleOnFavoriteSelect }: any) => {
  // context
  const { bottomSheetContext, setBottomSheetContext } = useContext(MapContext);

  // useStates
  const [favorites, setFavorites] = useState<MarkerType[]>([]);
  const [isItemDeleted, setIsItemDeleted] = useState(false);

  // useRefs
  const _sheetRef = useRef<BottomSheet>(null);

  const { removeStorageFavorite } = useFavoriteAsyncStorage();

  const fetchFavorites = async () => {
    const { getAllStorageFavorites } = useFavoriteAsyncStorage();
    const allFavorites = await getAllStorageFavorites();
    allFavorites && setFavorites(allFavorites);
  };

  const onFavoriteDelete = async (item: MarkerType) => {
    const removeFavorit = await removeStorageFavorite(Number(item.id));
    removeFavorit && setIsItemDeleted(true);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (isItemDeleted) {
      fetchFavorites();
      isItemDeleted && setIsItemDeleted(false);
    }
  }, [isItemDeleted]);

  const onFavoriteSelect = (item: MarkerType) => {
    handleOnFavoriteSelect(item);
    _sheetRef.current?.close();
    handleBottomSheetonChange(-1);
  };
  const handleBottomSheetonChange = (snap: number) => {
    if (snap !== -1) {
      setBottomSheetContext({
        ...bottomSheetContext,
        favoriteListSnap: true,
      });
      return;
    }
    setBottomSheetContext({ ...bottomSheetContext, favoriteListSnap: false });
  };

  //only for testing purpose
  // const clearStorageMarkers = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log("All items cleared successfully.");
  //   } catch (error) {
  //     console.log("Error clearing items:", error);
  //   }
  // };

  return (
    <BottomSheet
      ref={_sheetRef}
      snapPoints={["55%"]}
      enablePanDownToClose={true}
      onChange={handleBottomSheetonChange}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <FlatList
          data={favorites}
          renderItem={({ item }) => {
            return (
              <SwipeableItem
                data={item}
                handleSelectedItem={() => onFavoriteSelect(item)}
                handleDeleteItem={() => onFavoriteDelete(item)}
              />
            );
          }}
          ListHeaderComponent={() => (
            <View style={styles.container}>
              <BottomSheetMarkerHeader title={"Favoritter"} height={50} />
              <Text style={styles.latest}>Seneste</Text>
            </View>
          )}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  latest: { width: CARD_WIDTH, marginBottom: 10 },
});
