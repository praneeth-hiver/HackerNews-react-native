import React, { useEffect, useState, useContext } from "react";
import {
  Share,
  Animated,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import renderSave from "./SwipeSave";
import Card from "./Card";
import { ThemeContext } from "../contexts/Theme";
import alert from "./googleAlert";

const NewsComponent = ({ item, navigation, userData, setUpdated = null }) => {
  const size = new Animated.Value(0);
  const opacity = new Animated.Value(1);
  const placeX = new Animated.Value(0);
  const placeY = new Animated.Value(0);
  const [fadeIn] = useState(new Animated.Value(0));
  const { height, width } = Dimensions.get("window");

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
    }).start();

    // setInterval(() => {
    //   for (let i = 0; i < 500; i++) {
    //     console.log("Blocking JS Thread");
    //   }
    // }, 500);
  }, []);

  const bg = (e) => {
    Animated.timing(placeX, {
      toValue: e.nativeEvent.locationX,
      duration: 0,
    }).start();
    Animated.timing(placeY, {
      toValue: e.nativeEvent.locationY,
      duration: 0,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 400,
    }).start();
    Animated.timing(size, {
      toValue: 1000,
      duration: 400,
    }).start(() => {
      // Linking.openURL(item.url);
      // alert(item.url);
      // navigation.navigate("Browser", { uri: item.url });
      Animated.timing(size, {
        toValue: 0,
        duration: 1,
      }).start();
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1,
      }).start();
      Animated.timing(placeX, {
        toValue: 0,
        duration: 10,
      }).start();
      Animated.timing(placeY, {
        toValue: 0,
        duration: 10,
      }).start();
    });
  };

  const text = navigation.state.routeName === "Favs" ? "Delete" : "Save";

  const tranX = new Animated.Value(0);
  const tranY = new Animated.Value(0);
  const fadeMove = tranY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    // extrapolate: "extend"
  });
  const panCard = Animated.event(
    [
      {
        nativeEvent: {
          translationY: tranY,
          translationX: tranX,
        },
      },
    ],
    { useNativeDriver: true }
    // { listener: event => console.log(event) }
  );

  const onLeave = (e) => {
    if (e.nativeEvent.oldState == State.ACTIVE) {
      Animated.spring(tranX, {
        toValue: 0,
        speed: 20,
        useNativeDriver: true,
      }).start();
      Animated.spring(tranY, {
        toValue: 0,
        speed: 20,
        useNativeDriver: true,
      }).start();
    }
  };

  const { Colors } = useContext(ThemeContext);

  return (
    <PanGestureHandler
      onGestureEvent={panCard}
      onHandlerStateChange={onLeave}
      minPointers={2}
    >
      <Animated.View
        style={{ transform: [{ translateY: tranY }, { translateX: tranX }] }}
      >
        <Swipeable
          renderLeftActions={() =>
            renderSave({ userData, item, text, setUpdated, Colors })
          }
          renderRightActions={null}
        >
          <Animated.View style={{ opacity: fadeIn, alignItems: "center" }}>
            <TouchableOpacity
              style={{ opacity: 1 }}
              activeOpacity={1}
              onPress={(e) => {
                bg(e);
              }}
              delayLongPress={500}
              onLongPress={() =>
                Share.share({ message: `${item.url}`, url: item.url })
              }
            >
              <Card
                item={item}
                stylee={{
                  opacity: opacity,
                  size: size,
                  placeX: placeX,
                  placeY: placeY,
                }}
              />
            </TouchableOpacity>
          </Animated.View>
        </Swipeable>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default NewsComponent;
