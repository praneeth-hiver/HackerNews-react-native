import React from "react";
import { View, Text, StyleSheet } from "react-native";

const renderDelete = () => {
  return (
    <View
      style={{
        ...styles.saveView,
        marginLeft: 10,
        marginRight: 0,
        backgroundColor: "rgba(150,0,0,.3)"
      }}
    >
      <Text style={styles.save}>Delete</Text>
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

export default renderDelete;
