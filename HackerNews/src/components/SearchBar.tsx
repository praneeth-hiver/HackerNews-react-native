import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ term, onTermChangeGetNews, kind }) => {
  return (
    <View style={{ ...styles.background, height: 35 }}>
      <FontAwesomeIcon icon={faSearch} style={styles.icon} size={20} />
      <TextInput
        style={styles.text}
        placeholder={"                "}
        value={term}
        onChangeText={onTermChangeGetNews}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(245,255,245,.5)",
    borderRadius: 15,
    marginHorizontal: 30,
    marginTop: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 7
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
    alignSelf: "center",
    padding: 0
  },
  icon: {
    alignSelf: "center",
    color: "black",
    margin: 8
  }
});

export default SearchBar;
