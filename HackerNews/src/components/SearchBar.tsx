import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ term, onTermChangeGetNews, kind }) => {
  return (
    <View style={styles.background}>
      <FontAwesomeIcon icon={faSearch} style={styles.icon} size={16} />
      <TextInput
        style={styles.text}
        placeholder={kind}
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
    backgroundColor: "white",
    height: 35,
    borderRadius: 3,
    margin: 5,
    marginTop: 10
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
    alignSelf: "center",
    padding: 0
  },
  icon: {
    alignSelf: "center",
    color: "#5F6368",
    margin: 8
  }
});

export default SearchBar;
