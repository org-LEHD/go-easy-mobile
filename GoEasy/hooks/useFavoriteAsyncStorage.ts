import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useAsyncStorageGet,
  useAsyncStorageSet,
} from "../hooks/useAsyncStorage";

export const useFavoriteAsyncStorage = () => {
  const FAVORITES_KEY = "favorites";

  const getSelectedFavorite = (id: any, markersContext: any) => {
    const selectedFavorite =
      markersContext &&
      markersContext.find((item: any) => item.id === parseInt(id));
    return selectedFavorite;
  };

  const isInArray = (array: any, selectedFavorite: any) => {
    return array?.some((item: any) => item.id === selectedFavorite?.id);
  };

  const getAllStorageFavorites = async () => {
    try {
      const storedFavorites = await useAsyncStorageGet(FAVORITES_KEY);
      return storedFavorites;
    } catch (error) {
      console.log("Error returning items:", error);
    }
  };

  const getSingleStorageFavorite = async (id: any, markersContext: any) => {
    try {
      const selectedFavorite = await getSelectedFavorite(id, markersContext);
      const storedFavorites = await getAllStorageFavorites();
      if (storedFavorites.length) {
        return (
          storedFavorites?.find(
            (item: any) => item.id === selectedFavorite?.id
          ) || null
        );
      }
    } catch (error) {
      console.log("Error returning item:", error);
    }
  };

  const setStorageFavorites = async (id: any, markersContext: any) => {
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
  const removeStorageFavorite = async (id: any) => {
    const storedFavorites = await getAllStorageFavorites();
    const filteredFavorites = storedFavorites?.filter(
      (item: any) => item.id !== id
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

  const clearStorageFavorites = async () => {
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
