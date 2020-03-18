import React from "react";
import { View, Text, StyleSheet } from "react-native";

const renderSave = () => {
  return (
    <View style={{ ...styles.saveView, backgroundColor: "rgba(0,100,0,.4)" }}>
      <Text style={styles.save}>Save</Text>
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
  save: {
    color: "white",
    fontSize: 24,
    paddingHorizontal: 10
  }
});

export default renderSave;
