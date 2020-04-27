import React, { useContext } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { ThemeContext } from "../contexts/Theme";
const { height, width } = Dimensions.get("screen");
const Scrollbar = (props) => {
  const { scrollY } = props;
  const { Colors } = useContext(ThemeContext);
  const scrollSpeed = scrollY.interpolate({
    inputRange: [0, 7000],
    outputRange: [0, height * 3],
  });
  const IPR1 = [];
  const OPR1 = [];
  const OPR23 = [0];
  const IPR2 = [30];
  const IPR3 = [60];
  for (let i = 0; IPR1.length != 45; i += 30) {
    IPR1.push(i);
  }
  for (let i = 0; OPR1.length != 45; i++) {
    OPR1.push(0, 30, 30);
  }
  for (let i = 0; IPR2.length != 45; i++) {
    i % 2 == 0
      ? IPR2.push(IPR2[IPR2.length - 1] + 30)
      : IPR2.push(IPR2[IPR2.length - 1] + 60);
  }
  for (let i = 1; OPR23.length != 45; i++) {
    OPR23.push(30 * i, 30 * i);
  }
  for (let i = 0; IPR3.length != 45; i++) {
    i % 2 == 0
      ? IPR3.push(IPR3[IPR3.length - 1] + 30)
      : IPR3.push(IPR3[IPR3.length - 1] + 60);
  }
  const LINE_HEIGHT = scrollSpeed.interpolate({
    inputRange: IPR1,
    outputRange: OPR1,
    extrapolate: "clamp",
  });
  const TY = scrollSpeed.interpolate({
    inputRange: IPR2,
    outputRange: OPR23,
    extrapolate: "clamp",
  });
  const TYL = scrollSpeed.interpolate({
    inputRange: IPR3,
    outputRange: OPR23,
    extrapolate: "clamp",
  });
  return (
    <View style={styles.main}>
      <Animated.View
        style={{
          ...styles.circle,
          backgroundColor: Colors.accentColor(),
          transform: [{ translateY: TY }],
        }}
      />
      <Animated.View
        style={{
          ...styles.tail,
          backgroundColor: Colors.accentColor(),
          height: LINE_HEIGHT,
          transform: [{ translateY: TYL }],
        }}
      />
    </View>
  );
};

export default Scrollbar;

const styles = StyleSheet.create({
  main: {
    marginTop: 20,
    marginRight: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  circle: {
    opacity: 1,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  tail: {
    width: 2,
  },
});
