import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export const Menu = () => {
  return (
    <TouchableOpacity style={{ marginHorizontal: 35 }}>
      <View style={styles.lineOne}></View>
      <View style={styles.lineTwo}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lineOne: {
    backgroundColor: "black",
    height: 3,
    width: 15,
    marginBottom: 5
  },
  lineTwo: {
    backgroundColor: "black",
    height: 3,
    width: 9
  }
});
