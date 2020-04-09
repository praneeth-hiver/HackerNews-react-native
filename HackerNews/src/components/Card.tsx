import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import UIText from "../UI/Text";
import { ThemeContext } from "../contexts/Theme";

const { height, width } = Dimensions.get("window");

const Card = (props) => {
  const { item, stylee } = props;
  const { size, fadeMove, opacity } = stylee;
  // const negD = Animated.add(size, Animated.multiply(-1, size));
  const { Colors } = useContext(ThemeContext);
  return (
    <Animated.View
      style={{
        ...styles.card,
        opacity: fadeMove,
        shadowColor: Colors.shadowColor(),
        backgroundColor: Colors.cardColor()[Math.floor(Math.random() * 6)],
      }}
    >
      <Animated.View
        style={{
          // ...D.getLayout(),
          opacity: opacity,
          position: "absolute",
          alignSelf: "center",
          transform: [{ translateX: 20 }, { translateY: -50 }],
          backgroundColor: Colors.background(0.6),
          height: size,
          width: size,
          borderRadius: size,
          zIndex: 3,
        }}
      ></Animated.View>

      <View
        style={{
          ...styles.score,
          backgroundColor: Colors.overlay(Platform.OS === "ios" ? 0 : 1),
          shadowColor: Colors.shadowColor(),
        }}
      >
        <UIText>{item.points}</UIText>
      </View>

      <UIText style={styles.title}>{item.title}</UIText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 10,
    marginVertical: 20,
    marginHorizontal: 50,
    padding: 10,
    width: width / 1.2,
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  score: {
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    height: width / 8,
    width: width / 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    padding: 30,
    alignSelf: "center",
  },
});

export default Card;
