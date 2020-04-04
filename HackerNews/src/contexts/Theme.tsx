import React, { useState } from "react";

const ThemeContext = React.createContext({
  dark: false,
  toggleTheme: null,
  Colors: {
    background: (a = 1) => {
      return `rgba(245,255,245,${a})`;
    },
    accentColor: (a = 1) => {
      return `rgba(0,0,0,${a})`;
    },
    icon: (a = 1) => {
      return `rgba(0,0,0,${a})`;
    },
    overlay: (a = 1) => {
      return `rgba(245,255,245,${a})`;
    },
    fontColor: (a = 1) => {
      return `rgba(0,10,0,${a})`;
    },
    shadowColor: (a = 1) => {
      return `rgba(0,0,0,${a})`;
    },
    cardColor: () => [
      "#9FBCC2",
      "#AFC7BF",
      "#C7CFC0",
      "#DDD6CA",
      "#EEDFDA",
      "#9FBCC2"
    ]
  }
});

const ThemeProvider = (props: any) => {
  const [dark, toggleTheme] = useState(false);

  const Colors = {
    background: (a = 1) => {
      return dark ? `rgba(40,40,45,${a})` : `rgba(245,255,245,${a})`;
    },
    accentColor: (a = 1) => {
      return dark ? `rgba(250,130,9,${a})` : `rgba(0,0,0,${a})`;
    },
    icon: (a = 1) => {
      return dark ? `rgba(245,245,255,${a})` : `rgba(0,0,0,${a})`;
    },
    fontColor: (a = 1) => {
      return dark ? `rgba(245,245,255,${a})` : `rgba(0,10,0,${a})`;
    },
    shadowColor: (a = 1) => {
      return dark ? `rgba(0,0,0,${a})` : `rgba(0,0,0,${a})`;
    },
    overlay: (a = 1) => {
      return dark ? `rgba(70,70,70,${a})` : `rgba(245,255,245,${a})`;
    },
    cardColor: () =>
      dark
        ? ["#23232B", "#33333B", "#43434B", "#53535B", "#63636B", "#73737B"]
        : ["#9FBCC2", "#AFC7BF", "#C7CFC0", "#DDD6CA", "#EEDFDA", "#9FBCC2"]
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme, Colors }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };
