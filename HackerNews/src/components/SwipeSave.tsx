import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const renderSave = () => {
  return (
    <TouchableOpacity style={styles.saveView}>
      <Text style={styles.save}>Save</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveView: {
    marginVertical: 20,
    marginLeft: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    backgroundColor: "rgba(245,255,245,.7)"
  },
  save: {
    fontSize: 24,
    paddingHorizontal: 10
  }
});

export default renderSave;
