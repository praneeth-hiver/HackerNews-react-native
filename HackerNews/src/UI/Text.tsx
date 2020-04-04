import { Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

const UIText = props => {
  const { Colors } = useContext(ThemeContext);
  return (
    <Text style={{ ...props.style, color: Colors.fontColor(0.7) }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {}
});

export default UIText;
