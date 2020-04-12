import React, { useContext } from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../contexts/Theme";
import UIText from "../..//UI/Text";
const { height, width } = Dimensions.get("window");

export const Message = props => {
  const { Colors } = useContext(ThemeContext);
  const { item, uid } = props;
  return (
    <TouchableOpacity
      style={{
        ...styles.message,
        backgroundColor: Colors.cardColor(),
        alignSelf: item.uid === uid ? "flex-end" : "flex-start"
      }}
    >
      <UIText>{item.text}</UIText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 6
  }
});
