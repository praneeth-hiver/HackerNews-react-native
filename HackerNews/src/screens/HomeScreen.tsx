import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Animated
} from "react-native";
import SearchBar from "../components/SearchBar";
import useNews from "../hooks/useNews";
import NewsComponent from "../components/NewsComponent";
import LottieView from "lottie-react-native";
import { MenuIcon } from "../components/MenuIcon";
import { renderMenu } from "../components/Menu";
import UIText from "../UI/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from "../contexts/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdjust } from "@fortawesome/free-solid-svg-icons";

const HomeScreen = ({ navigation }) => {
  const userData = navigation.state.params.obj;
  const [term, setTerm] = useState();
  const [refr, setRefresh] = useState(false);
  const [results, getResults, getInitialResults] = useNews();
  const bodyOpacity = new Animated.Value(1);
  const menuWidth = new Animated.Value(0);
  const ty = new Animated.Value(-60);
  const { dark, toggleTheme, Colors } = useContext(ThemeContext);

  useEffect(() => {
    getInitialResults();
  }, []);

  console.log(Colors);
  return (
    <View style={{ ...styles.home, backgroundColor: Colors.background() }}>
      <SafeAreaView>
        <View style={styles.header}>
          <MenuIcon
            bodyOpacity={bodyOpacity}
            w={menuWidth}
            ty={ty}
            onlyBack={false}
            navigation={navigation}
          />
          <UIText style={styles.hello}>
            Hello, {userData.user.displayName.split(" ")[0]} !
          </UIText>
          <TouchableOpacity
            style={styles.darkMode}
            onPress={() => {
              toggleTheme(!dark);
            }}
          >
            <FontAwesomeIcon
              icon={faAdjust}
              style={{ color: Colors.icon(0.7) }}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.container }}>
          {renderMenu({ w: menuWidth, navigation, ty, userData })}
          <Animated.View style={{ ...styles.main, opacity: bodyOpacity }}>
            <SearchBar
              term={term}
              onTermChangeGetNews={newText => {
                setTerm(newText);
                getResults(term);
              }}
            />

            {results ? null : (
              <LottieView
                style={styles.lotte}
                source={require("../assets/content_loader.json")}
                autoPlay
                loop
              />
            )}
            <FlatList
              data={results}
              keyExtractor={item => item.objectID}
              refreshing={refr}
              onRefresh={() => {
                setRefresh(true);
                getResults(term).then(setRefresh(false));
              }}
              renderItem={({ item }) => {
                return (
                  <NewsComponent
                    item={item}
                    navigation={navigation}
                    userData={userData}
                  />
                );
              }}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1
  },
  main: {},
  darkMode: {
    marginLeft: 30
  },
  container: {
    display: "flex",
    flexDirection: "row"
  },
  hello: {
    // fontFamily: "Montserrat-Light",
    fontSize: 30,
    padding: 15
    // backgroundColor: Colors.background()
  },
  lotte: {
    position: "relative",
    top: "10%",
    left: "-4%",
    width: 500
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});

export default HomeScreen;
