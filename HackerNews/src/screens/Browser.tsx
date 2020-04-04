import React, { useEffect } from "react";
import { StyleSheet, StatusBar, BackHandler } from "react-native";
import { WebView } from "react-native-webview";

const Browser = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });
  const url = navigation.state.params.uri;
  return (
    <>
      <WebView
        source={{ uri: url }}
        onNavigationStateChange={state => {
          state.canGoBack = true;
          console.log(state);
        }}
        style={styles.web}
      />
    </>
  );
};

const styles = StyleSheet.create({
  web: {
    marginTop: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
});
export default Browser;
