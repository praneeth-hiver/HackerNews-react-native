import { Alert, Linking } from "react-native";

const alert = url => {
  return Alert.alert(
    "Look up?",
    "",
    [
      {
        text: "Google it",
        onPress: () => Linking.openURL(url)
      },
      {
        text: "Cancel",
        style: "cancel"
      }
    ],
    { cancelable: false }
  );
};

export default alert;
