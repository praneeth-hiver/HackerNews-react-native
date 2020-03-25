import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Share,
  Animated,
  TouchableWithoutFeedback
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import renderSave from "./SwipeSave";

const NewsComponent = ({ item, navigation, userData, setUpdated }) => {
  // const { height, width } = Dimensions.get("screen");
  const size = new Animated.Value(0);
  const opacity = new Animated.Value(1);
  const [fadeIn] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  const cardColor = [
    "#9FBCC2",
    "#AFC7BF",
    "#C7CFC0",
    "#DDD6CA",
    "#EEDFDA",
    "#9FBCC2"
  ];

  const bg = () => {
    Animated.timing(size, {
      toValue: 15000,
      duration: 700
    }).start(() => {
      navigation.navigate("Browser", { uri: item.url });
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500
      }).start(() => {
        Animated.timing(size, {
          toValue: 0,
          duration: 1
        }).start(() => {
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1
          }).start();
        });
      });
    });
  };

  const text = navigation.state.routeName === "Favs" ? "Delete" : "Save";

  return (
    <Swipeable
      renderLeftActions={() => renderSave({ userData, item, text, setUpdated })}
      renderRightActions={null}
    >
      <Animated.View style={{ opacity: fadeIn }}>
        <TouchableWithoutFeedback
          onPress={e => {
            bg();
          }}
          delayLongPress={500}
          onLongPress={() =>
            Share.share({ message: `${item.url}`, url: item.url })
          }
        >
          <View
            style={{
              ...styles.card,
              backgroundColor: cardColor[Math.floor(Math.random() * 6)]
            }}
          >
            <Animated.View
              style={{
                opacity: opacity,
                position: "absolute",
                alignSelf: "center",
                transform: [{ translateX: 0 }, { translateY: -20 }],
                backgroundColor: "rgba(245,255,245,1)",
                height: size,
                width: size,
                borderRadius: size,
                zIndex: 1
              }}
            ></Animated.View>
            <View style={styles.score}>
              <Text>{item.points}</Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  newsStyle: {
    flex: 1,
    flexDirection: "row",
    margin: 4
  },
  card: {
    elevation: 10,
    marginVertical: 20,
    marginLeft: 30,
    marginRight: 0,
    padding: 10,
    width: Math.round(Dimensions.get("window").width) / 1.056,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10
    // backgroundColor: "white"
  },
  score: {
    fontFamily: "Montserrat-Light",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    height: Math.round(Dimensions.get("window").width) / 8.5,
    width: Math.round(Dimensions.get("window").width) / 8.5,
    borderRadius: 50,
    backgroundColor: "rgba(245,255,245,1)",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 30,
    padding: 30,
    alignSelf: "center"
  },
  icon: {
    margin: 10
  },
  saveView: {
    margin: 10,
    marginLeft: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 20
  }
});

export default NewsComponent;
