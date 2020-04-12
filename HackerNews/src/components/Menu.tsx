import React, { useContext } from "react";
import { Animated, Text, StyleSheet, AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import { ThemeContext } from "../contexts/Theme";

export const renderMenu = ({ w, navigation, ty, userData }) => {
  const { Colors } = useContext(ThemeContext);
  return (
    <Animated.View style={{ width: w }}>
      <Animated.Text
        style={{
          ...styles.menu,
          color: Colors.fontColor(0.7),
          transform: [
            { rotate: "-90deg" },
            { translateX: -90 }
            // { translateY: ty }
          ]
        }}
        onPress={() => {
          navigation.navigate("Favs", { userInfo: userData });
        }}
      >
        Saved
      </Animated.Text>

      <Animated.Text
        style={{
          ...styles.menu,
          color: Colors.fontColor(0.7),
          transform: [
            { rotate: "-90deg" },
            { translateX: -105 * 2 }
            // { translateY: ty }
          ]
        }}
        onPress={() => {
          navigation.navigate("Chat", { userInfo: userData });
        }}
      >
        ChatRoom
      </Animated.Text>

      <Animated.Text
        style={{
          ...styles.menu,
          color: Colors.fontColor(0.7),
          transform: [
            { rotate: "-90deg" },
            { translateX: -100 * 3 }
            // { translateY: ty }
          ]
        }}
        onPress={() => {
          AsyncStorage.removeItem("userInfo")
            .then(() => {
              navigation.reset(
                [NavigationActions.navigate({ routeName: "Init" })],
                0
              );
            })
            .catch(error => {
              console.warn(error);
            });
        }}
      >
        Logout
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menu: {
    fontWeight: "500",
    fontSize: 20,
    height: 25
  }
});
