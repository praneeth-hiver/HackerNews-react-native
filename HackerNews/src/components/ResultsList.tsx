import React, { useState } from "react";
import { StyleSheet, FlatList, Animated } from "react-native";
import NewsComponent from "./NewsComponent";

export const ResultsList = (props) => {
  const { results, getResults, userData, navigation, term, scrollY } = props;
  const [refr, setRefresh] = useState(false);
  return (
    <FlatList
      bounces={false}
      scrollEventThrottle={16}
      onScroll={Animated.event([
        { nativeEvent: { contentOffset: { y: scrollY } } },
      ])}
      data={results}
      keyExtractor={(item) => item.objectID}
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
  );
};
const styles = StyleSheet.create({
  lotte: {
    position: "relative",
    top: "10%",
    left: "-4%",
    width: 500,
  },
});
