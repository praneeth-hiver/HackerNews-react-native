import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdjust } from "@fortawesome/free-solid-svg-icons";
import { storeLocal } from "../asyncActivities/getSet";
import React, { useState, useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../contexts/Theme";

export const DarkModeToggle = () => {
  const [timeout, setT] = useState(false);
  const { dark, toggleTheme, Colors } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={styles.darkMode}
      onPress={() => {
        toggleTheme(!dark);
        const t = setTimeout(() => {
          timeout ? clearTimeout(t) : storeLocal("theme", !dark);
          setT(false);
        }, 2000);
        setT(!timeout);
      }}
    >
      <FontAwesomeIcon
        icon={faAdjust}
        style={{ color: Colors.icon(0.7) }}
        size={25}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  darkMode: {
    marginLeft: 30,
  },
});
