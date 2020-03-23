import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";

const width = new Animated.Value(9);
const spinValue = new Animated.Value(0);
const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "40deg"]
});
const spin2 = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "-40deg"]
});

export const MenuIcon = ({ bodyOpacity, w, ty }) => {
  const [open, setOpen] = useState(true);
  return (
    <TouchableOpacity
      style={{ marginHorizontal: 35 }}
      onPress={() => {
        setOpen(!open);
        Animated.timing(width, {
          toValue: open ? 15 : 9,
          duration: 200
        }).start();
        Animated.timing(spinValue, {
          toValue: open ? 1 : 0,
          duration: 200,
          easing: Easing.linear
        }).start();
        Animated.timing(bodyOpacity, {
          toValue: open ? 0.5 : 1,
          duration: 200
        }).start();
        !open
          ? Animated.timing(w, {
              toValue: open ? 80 : 0,
              duration: 300
            }).start()
          : Animated.spring(w, {
              toValue: open ? 80 : 0,
              overshootClamping: false,
              velocity: 2,
              bounciness: 10,
              speed: 10
            }).start();
        Animated.timing(ty, {
          toValue: open ? 0 : -65,
          duration: 200,
          delay: 250
        }).start();
      }}
    >
      <Animated.View
        style={{ ...styles.lineOne, transform: [{ rotate: spin2 }] }}
      ></Animated.View>
      <Animated.View
        style={{
          ...styles.lineTwo,
          transform: [{ rotate: spin }],
          width: width
        }}
      ></Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lineOne: {
    borderRadius: 3,
    backgroundColor: "black",
    height: 3,
    width: 15,
    marginBottom: 5
  },
  lineTwo: {
    borderRadius: 3,
    backgroundColor: "black",
    height: 3
  }
});
