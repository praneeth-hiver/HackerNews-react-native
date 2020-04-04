import React, { useEffect, useState } from "react";
import {
  Share,
  Animated,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import renderSave from "./SwipeSave";
import Card from "./Card";

const NewsComponent = ({ item, navigation, userData, setUpdated = null }) => {
  const size = new Animated.Value(0);
  const opacity = new Animated.Value(1);
  const [fadeIn] = useState(new Animated.Value(0));
  const { height, width } = Dimensions.get("window");

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500
    }).start();

    // setInterval(() => {
    //   for (let i = 0; i < 1000; i++) {
    //     console.log("Blocking JS Thread");
    //   }
    // }, 500);
  }, []);

  const bg = e => {
    Animated.timing(D, {
      toValue: {
        x: e.nativeEvent.locationX,
        y: e.nativeEvent.locationY
      },
      duration: 1
    }).start(() => {
      Animated.timing(size, {
        toValue: 15000,
        duration: 1000,
        delay: 10
      }).start(() => {
        // navigation.navigate("Browser", { uri: item.url });
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300
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
    });
  };

  const text = navigation.state.routeName === "Favs" ? "Delete" : "Save";
  const D = new Animated.ValueXY({ x: 0, y: 0 });

  const tranX = new Animated.Value(0);
  const tranY = new Animated.Value(0);
  const op = tranY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0]
    // extrapolate: "extend"
  });
  const panCard = Animated.event(
    [
      {
        nativeEvent: {
          translationY: tranY,
          translationX: tranX
        }
      }
    ],
    { useNativeDriver: true }

    // { listener: event => console.log(event) }
  );

  const onLeave = e => {
    if (e.nativeEvent.oldState == State.ACTIVE) {
      Animated.spring(tranX, {
        toValue: 0,
        speed: 20,
        useNativeDriver: true
      }).start();
      Animated.spring(tranY, {
        toValue: 0,
        speed: 20,
        useNativeDriver: true
      }).start();
    }
  };

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
            renderSave({ userData, item, text, setUpdated })
          }
          renderRightActions={null}
        >
          <Animated.View style={{ opacity: fadeIn, alignItems: "center" }}>
            <TouchableWithoutFeedback
              onPress={e => {
                console.log(D);
                bg(e);
              }}
              delayLongPress={500}
              onLongPress={() =>
                Share.share({ message: `${item.url}`, url: item.url })
              }
            >
              <Card
                item={item}
                stylee={{ op: op, opacity: opacity, size: size }}
              />
            </TouchableWithoutFeedback>
          </Animated.View>
        </Swipeable>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default NewsComponent;
