import React, { useContext } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import Voice from "@react-native-community/voice";
import Colors from "../Utils/Colors";

const SearchBar = ({ term, onTermChangeGetNews }) => {
  return (
    <View
      style={{
        ...styles.background,
        height: 35
      }}
    >
      <FontAwesomeIcon icon={faSearch} style={styles.icon} size={20} />
      <TextInput
        style={styles.text}
        placeholder={"                "}
        value={term}
        onChangeText={onTermChangeGetNews}
        autoCapitalize="none"
        autoCorrect={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 15,
    marginHorizontal: 30,
    marginTop: 10,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    backgroundColor: Colors.background(0.7),
    shadowColor: Colors.shadowColor()
  },
  text: {
    fontSize: 16,
    alignSelf: "center",
    padding: 0
  },
  icon: {
    alignSelf: "center",
    color: Colors.icon(),
    margin: 8
  }
});

export default SearchBar;
