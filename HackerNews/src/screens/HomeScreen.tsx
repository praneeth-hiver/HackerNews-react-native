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
import { Menu } from "../components/Menu";

const HomeScreen = ({ navigation }) => {
  const userData = navigation.state.params.obj;
  const [term, setTerm] = useState();
  const [refr, setRefresh] = useState(false);
  const [results, getResults, getInitialResults] = useNews();
  // const Bheight = new Animated.Value(35);

  useEffect(() => {
    getInitialResults();
  }, []);

  return (
    <View style={{ ...styles.home, backgroundColor: "rgba(245,255,245,1)" }}>
      <SafeAreaView>
        <View style={styles.header}>
          <Menu />
          <Text style={styles.hello}>
            Hello, {userData.user.displayName.split(" ")[0]} !
          </Text>
        </View>

        <View>
          <SearchBar
            kind="Search"
            term={term}
            onTermChangeGetNews={newText => {
              setTerm(newText);
              getResults(term);
            }}
            // height={Bheight}
          />
        </View>
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
          renderItem={({ item }) => {
            return (
              <NewsComponent
                item={item}
                navigation={navigation}
                // Bheight={Bheight}
              />
            );
          }}
          refreshing={refr}
          onRefresh={() => {
            setRefresh(true);
            getResults(term).then(setRefresh(false));
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1
  },
  hello: {
    // fontFamily: "Montserrat-Light",
    fontSize: 30,
    padding: 15,
    backgroundColor: "rgba(245,255,245,1)"
  },
  lotte: {
    position: "relative",
    top: 60
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});

export default HomeScreen;
