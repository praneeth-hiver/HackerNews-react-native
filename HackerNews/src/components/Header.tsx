import React from "react";
import { StyleSheet, Animated } from "react-native";
import { MenuIcon } from "../components/MenuIcon";
import UIText from "../UI/Text";
import { DarkModeToggle } from "../components/DarkModeToggle";

const Header = (props) => {
  const { userData, bodyOpacity, menuWidth, ty, navigation, scrollY } = props;
  const clamp = Animated.diffClamp(scrollY, 0, 100);
  const transY = clamp.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolate: "clamp",
  });
  return (
    <Animated.View style={[styles.header, { height: transY }]}>
      <MenuIcon
        bodyOpacity={bodyOpacity}
        w={menuWidth}
        ty={ty}
        onlyBack={false}
        navigation={navigation}
      />
      <UIText style={styles.hello}>
        Hello, {userData.user.displayName.split(" ")[0]} !
      </UIText>
      <DarkModeToggle />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  hello: {
    fontSize: 30,
    padding: 15,
  },
});

export default Header;
