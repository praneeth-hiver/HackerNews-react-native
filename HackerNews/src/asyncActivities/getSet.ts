import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";

export const storeLocal = async (store, key, value) => {
  try {
    await AsyncStorage.setItem(`@${store}:${key}`, JSON.stringify(value));
  } catch (error) {
    console.warn(error);
  }
};

export const retrieveLocal = async (store, key) => {
  try {
    await AsyncStorage.getItem(`@${store}:${key}`).then(data => {
      if (data) {
        console.log("Getting data from local storage", data);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
