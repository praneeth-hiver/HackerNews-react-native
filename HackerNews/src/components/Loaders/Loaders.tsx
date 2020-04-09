import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet } from "react-native";

export const Loader = (props) => {
  const { check } = props;
  if (check) {
    return null;
  }
  return (
    <LottieView
      style={styles.lotte}
      source={require("../../assets/content_loader.json")}
      autoPlay
      loop
    />
  );
};
const styles = StyleSheet.create({
  lotte: {
    position: "relative",
    top: "10%",
    left: "-4%",
    width: 500,
  },
});
