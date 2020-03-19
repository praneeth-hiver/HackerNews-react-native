import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView, Text } from "react-native";
import SearchBar from "../components/SearchBar";
import useNews from "../hooks/useNews";
import NewsComponent from "../components/NewsComponent";
import LottieView from "lottie-react-native";

const HomeScreen = ({ navigation }) => {
  const userData = navigation.state.params.userInfo;

  const [term, setTerm] = useState();
  const [refr, setRefresh] = useState(false);
  const [results, getResults, getInitialResults] = useNews();

  useEffect(() => {
    getInitialResults();
  }, []);

  return (
    <View style={{ ...styles.home, backgroundColor: "white" }}>
      <SafeAreaView>
        <Text style={styles.search}>What up {userData.user.displayName}!</Text>
        <View>
          <SearchBar
            kind="Search"
            term={term}
            onTermChangeGetNews={newText => {
              setTerm(newText);
              getResults(term);
            }}
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
            return <NewsComponent item={item} key={item.objectID} />;
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
  search: {
    fontSize: 30,
    padding: 15
    // fontFamily: ''
  },
  lotte: {
    position: "relative",
    top: 60
  }
});

export default HomeScreen;
