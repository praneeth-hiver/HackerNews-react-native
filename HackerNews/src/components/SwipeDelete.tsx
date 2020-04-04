import React from "react";
import { View, StyleSheet } from "react-native";
import UIText from "../UI/Text";

const renderDelete = () => {
  return (
    <View
      style={{
        ...styles.saveView,
        marginLeft: 10,
        marginRight: 0,
        backgroundColor: "rgba(50,50,50,.3)"
      }}
    >
      <UIText style={styles.delete}>Delete</UIText>
    </View>
  );
};

const styles = StyleSheet.create({
  saveView: {
    margin: 10,
    marginLeft: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 20
  },
  delete: {
    fontSize: 24,
    paddingHorizontal: 10
  }
});

export default renderDelete;
