import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import InitScreen from "./src/screens/InitScreen";
import Browser from "./src/screens/Browser";
import Favs from "./src/screens/Favs";
import Slider from "./src/screens/SliderTest";
import { ThemeProvider } from "./src/contexts/Theme";
import React from "react";

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Init: {
      screen: InitScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Browser: {
      screen: Browser,
      navigationOptions: {
        headerShown: false
      }
    },
    Favs: {
      screen: Favs,
      navigationOptions: {
        headerShown: false
      }
    },
    Slider: Slider
  },
  {
    initialRouteName: "Init"
  }
);

const App = createAppContainer(MainNavigator);

const AppProvider = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default AppProvider;
