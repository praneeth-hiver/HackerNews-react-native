import React, { useContext } from "react";
import { Animated, Text, StyleSheet, AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import Colors from "../Utils/Colors";

export const renderMenu = ({ w, navigation, ty, userData }) => {
  return (
    <Animated.View style={{ width: w }}>
      <Animated.Text
        style={{
          ...styles.menu,
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
        Favs
      </Animated.Text>

      <Animated.Text
        style={{
          ...styles.menu,
          transform: [
            { rotate: "-90deg" },
            { translateX: -100 * 2 }
            // { translateY: ty }
          ]
        }}
      >
        Account
      </Animated.Text>

      <Animated.Text
        style={{
          ...styles.menu,
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
    height: 25,
    color: Colors.fontColor()
  }
});
