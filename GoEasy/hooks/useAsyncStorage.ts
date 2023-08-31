import AsyncStorage from "@react-native-async-storage/async-storage";
export const useAsyncStorageGet = async (KEY: any) => {
  try {
    const retrivedFavorites = await AsyncStorage.getItem(KEY);
    return retrivedFavorites ? JSON.parse(retrivedFavorites) : [];
  } catch (error) {
    console.log(error);
  }
};

export const useAsyncStorageSet = async (KEY: any, array: any) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(array));
  } catch (error) {
    console.log(error);
  }
};
