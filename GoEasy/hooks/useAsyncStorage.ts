import AsyncStorage from "@react-native-async-storage/async-storage";
export const useAsyncStorageGet = async (KEY: string) => {
  try {
    const retrivedFavorites = await AsyncStorage.getItem(KEY);
    return retrivedFavorites ? JSON.parse(retrivedFavorites) : [];
  } catch (error) {
    console.log(error);
  }
};

export const useAsyncStorageSet = async (KEY: string, array: string) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(array));
  } catch (error) {
    console.log(error);
  }
};
