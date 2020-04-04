import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import Colors from "../Utils/Colors";
import UIText from "../UI/Text";

const { height, width } = Dimensions.get("window");

const Card = props => {
  const { item, stylee } = props;
  const { size, op, opacity } = stylee;
  const negD = Animated.add(size, Animated.multiply(-1, size));
  return (
    <Animated.View
      style={{
        ...styles.card,
        opacity: op
      }}
    >
      <Animated.View
        style={{
          // ...D.getLayout(),
          // ...D.getTranslateTransform(),
          // right: D.getLayout().left,
          opacity: opacity,
          position: "absolute",
          // alignSelf: "center",
          transform: [{ translateX: negD }, { translateY: negD }],
          backgroundColor: Colors.background(),
          height: size,
          width: size,
          borderRadius: size,
          zIndex: 1
        }}
      ></Animated.View>

      <View
        style={{
          ...styles.score
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
    shadowColor: Colors.shadowColor(),
    backgroundColor: Colors.cardColor()[Math.floor(Math.random() * 6)]
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
    backgroundColor: Colors.background(),
    shadowColor: Colors.shadowColor()
  },
  title: {
    fontSize: 30,
    padding: 30,
    alignSelf: "center"
  }
});

export default Card;