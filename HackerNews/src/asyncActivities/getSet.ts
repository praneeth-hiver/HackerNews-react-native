import { AsyncStorage } from "react-native";

export const storeLocal = async (key: string, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(error);
  }
};

export const retrieveLocal = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(error);
  }
};
