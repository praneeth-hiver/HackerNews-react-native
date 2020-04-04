import React from "react";
import {
  StyleSheet,
  Share,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  View,
  SafeAreaView
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

var { height } = Dimensions.get("screen");

const tranY = new Animated.Value(40);

const Slider = () => {
  const panCard = Animated.event(
    [
      {
        nativeEvent: {
          y: tranY
        }
      }
    ]
    // { useNativeDriver: true }
    // { listener: event => console.log(event.nativeEvent) }
  );
  const getSnap = () => {
    if (tranY._value < height / 4) {
      return 40;
    } else if (tranY._value < height / 3) {
      return height / 2;
    }
    return height;
  };

  const onLeave = e => {
    if (e.nativeEvent.oldState == State.ACTIVE) {
      Animated.spring(tranY, {
        toValue: getSnap(),
        speed: 20
        // useNativeDriver: true
      }).start();
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.main}>
        <PanGestureHandler
          onGestureEvent={panCard}
          onHandlerStateChange={onLeave}
          minPointers={1}
        >
          <Animated.View
            style={[styles.slider, { height: tranY }]}
          ></Animated.View>
        </PanGestureHandler>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {},
  slider: {
    backgroundColor: "#555",
    justifyContent: "center"
  }
});

export default Slider;
