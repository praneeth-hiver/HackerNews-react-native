import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";

export const storeLocal = async (key: string, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(error);
  }
};

export const retrieveLocal = async key => {
  try {
    await AsyncStorage.getItem(key).then(data => {
      if (data) {
        console.log("Getting data from local storage", data);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
