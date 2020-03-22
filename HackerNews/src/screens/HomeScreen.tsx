import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Text,
  Animated
} from "react-native";
import SearchBar from "../components/SearchBar";
import useNews from "../hooks/useNews";
import NewsComponent from "../components/NewsComponent";
import LottieView from "lottie-react-native";
import { MenuIcon } from "../components/MenuIcon";
import { renderMenu } from "../components/Menu";

const HomeScreen = ({ navigation }) => {
  const userData = navigation.state.params.obj;
  const [term, setTerm] = useState();
  const [refr, setRefresh] = useState(false);
  const [results, getResults, getInitialResults] = useNews();
  const bodyOpacity = new Animated.Value(1);
  const menuWidth = new Animated.Value(0);
  const ty = new Animated.Value(-60);

  useEffect(() => {
    getInitialResults();
  }, []);

  return (
    <View style={{ ...styles.home, backgroundColor: "rgba(245,255,245,1)" }}>
      <SafeAreaView>
        <View style={styles.header}>
          <MenuIcon bodyOpacity={bodyOpacity} w={menuWidth} ty={ty} />
          <Text style={styles.hello}>
            Hello, {userData.user.displayName.split(" ")[0]} !
          </Text>
        </View>
        <View style={{ ...styles.container }}>
          {renderMenu({ w: menuWidth, navigation, ty })}
          <Animated.View style={{ ...styles.main, opacity: bodyOpacity }}>
            <SearchBar
              term={term}
              onTermChangeGetNews={newText => {
                setTerm(newText);
                getResults(term);
              }}
              // height={Bheight}
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
                    // Bheight={Bheight}
                  />
                );
              }}
              // scrollEventThrottle={2}
              // onScroll={Animated.event([{nativeEvent:{contentOffset:{y.scrollY}}}])}
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
  container: {
    display: "flex",
    flexDirection: "row"
  },
  hello: {
    // fontFamily: "Montserrat-Light",
    fontSize: 30,
    padding: 15,
    backgroundColor: "rgba(245,255,245,1)"
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
