import React, { useState } from "react";
import { Animated } from "react-native";

const RandomContext = React.createContext({
  w: null,
  opacity: new Animated.Value(1),
  transY: new Animated.Value(-60)
});

const RandomProvider = (props: any) => {
  const w = useState(new Animated.Value(0));
  const transY = new Animated.Value(-60);
  const opacity = new Animated.Value(1);

  return (
    <RandomContext.Provider value={{ w, opacity, transY }}>
      {props.children}
    </RandomContext.Provider>
  );
};

export { RandomContext, RandomProvider };
