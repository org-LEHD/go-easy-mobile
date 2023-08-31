import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useAsyncStorageGet,
  useAsyncStorageSet,
} from "../hooks/useAsyncStorage";
import { MarkerType } from "../components/Types";

export const useFavoriteAsyncStorage = () => {
  const FAVORITES_KEY = "favorites";
  const getSelectedFavorite = (id: number, markersContext: MarkerType[]) => {
    const selectedFavorite =
      markersContext &&
      markersContext.find((item: MarkerType) => item.id === id);
    return selectedFavorite;
  };

  const isInArray = (array: MarkerType[], selectedFavorite: any) => {
    return array?.some((item: MarkerType) => item.id === selectedFavorite?.id);
  };

  const getAllStorageFavorites = async (): Promise<any> => {
    try {
      const storedFavorites = await useAsyncStorageGet(FAVORITES_KEY);
      return storedFavorites;
    } catch (error) {
      console.log("Error returning items:", error);
    }
  };

  const getSingleStorageFavorite = async (
    id: number,
    markersContext: MarkerType[]
  ): Promise<any> => {
    try {
      const selectedFavorite = await getSelectedFavorite(id, markersContext);
      const storedFavorites = await getAllStorageFavorites();
      if (storedFavorites.length) {
        return (
          storedFavorites?.find(
            (item: MarkerType) => item.id === selectedFavorite?.id
          ) || null
        );
      }
    } catch (error) {
      console.log("Error returning item:", error);
    }
  };

  const setStorageFavorites = async (
    id: number,
    markersContext: MarkerType[]
  ): Promise<any> => {
    const selectedFavorite = await getSelectedFavorite(id, markersContext);
    const storedFavorites = await getAllStorageFavorites();

    if (!storedFavorites.length) {
      useAsyncStorageSet(FAVORITES_KEY, [selectedFavorite]);
    } else if (storedFavorites.length) {
      if (!isInArray(storedFavorites, selectedFavorite)) {
        try {
          await useAsyncStorageSet(FAVORITES_KEY, [
            ...storedFavorites,
            selectedFavorite,
          ]);
          console.log("item stored successfully.");
        } catch (error) {
          console.log("Error storing item:", error);
        }
      }
    }
  };
  const removeStorageFavorite = async (id: number): Promise<any> => {
    const storedFavorites = await getAllStorageFavorites();
    const filteredFavorites = storedFavorites?.filter(
      (item: MarkerType) => item.id !== id
    );
    try {
      await useAsyncStorageSet(FAVORITES_KEY, filteredFavorites);
      console.log("item cleared successfully.");
      return true;
    } catch (error) {
      console.log("Error clearing item:", error);
      return false;
    }
  };

  const clearStorageFavorites = async (): Promise<any> => {
    try {
      await AsyncStorage.clear();
      console.log("All items cleared successfully.");
    } catch (error) {
      console.log("Error clearing items:", error);
    }
  };

  return {
    getAllStorageFavorites,
    getSingleStorageFavorite,
    setStorageFavorites,
    removeStorageFavorite,
    clearStorageFavorites,
  };
};
