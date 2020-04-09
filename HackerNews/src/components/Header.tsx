import React from "react";
import { StyleSheet, View } from "react-native";
import { MenuIcon } from "../components/MenuIcon";
import UIText from "../UI/Text";
import { DarkModeToggle } from "../components/DarkModeToggle";

const Header = (props) => {
  const { userData, bodyOpacity, menuWidth, ty, navigation } = props;
  return (
    <View style={styles.header}>
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
    </View>
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
