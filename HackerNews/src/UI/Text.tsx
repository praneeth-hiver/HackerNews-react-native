import { Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Colors from "../Utils/Colors";

const UIText = props => {
  return (
    <Text style={{ ...props.style, ...styles.text }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.fontColor()
  }
});

export default UIText;
