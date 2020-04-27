import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";
import SearchBar from "../components/SearchBar";
import useNews from "../hooks/useNews";
import { renderMenu } from "../components/Menu";
import Header from "../components/Header";
import { ThemeContext } from "../contexts/Theme";
import { enableAllPlugins } from "immer";
import { Loader } from "../components/Loaders/Loaders";
import { ResultsList } from "../components/ResultsList";

const HomeScreen = ({ navigation }) => {
  const userData = navigation.state.params.obj;
  const theme = JSON.parse(navigation.state.params.theme);

  const [term, setTerm] = useState();
  const [results, getResults, getInitialResults] = useNews();
  const { dark, toggleTheme, Colors } = useContext(ThemeContext);

  const bodyOpacity = new Animated.Value(1);
  const menuWidth = new Animated.Value(0);
  const ty = new Animated.Value(-60);
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    getInitialResults();
    enableAllPlugins();
    toggleTheme(theme || false);
  }, []);

  const getList = () => {
    return (
      <View style={{ ...styles.home, backgroundColor: Colors.background() }}>
        <SafeAreaView>
          <Header
            scrollY={scrollY}
            userData={userData}
            bodyOpacity={bodyOpacity}
            menuWidth={menuWidth}
            ty={ty}
            navigation
          />
          <View style={{ ...styles.container }}>
            {renderMenu({ w: menuWidth, navigation, ty, userData })}
            <Animated.View style={{ ...styles.main, opacity: bodyOpacity }}>
              <SearchBar
                scrollY={scrollY}
                term={term}
                onTermChangeGetNews={(newText) => {
                  setTerm(newText);
                  getResults(term);
                }}
              />
              <Loader check={results.length} />
              <ResultsList
                results={results}
                userData={userData}
                navigation={navigation}
                getResults={getResults}
                term={term}
                scrollY={scrollY}
              />
            </Animated.View>
          </View>
        </SafeAreaView>
      </View>
    );
  };

  return React.useMemo(() => {
    return getList();
  }, [results, term, dark]);
};

const styles = StyleSheet.create({
  home: {
    alignItems: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  main: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
});

export default HomeScreen;
