import React, { useState } from "react";
import { StyleSheet, FlatList, Animated, View, Dimensions } from "react-native";
import NewsComponent from "./NewsComponent";
import Scrollbar from "../components/Scrollbar";

const { height, width } = Dimensions.get("screen");
export const ResultsList = (props) => {
  const { results, getResults, userData, navigation, term, scrollY } = props;
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const getList = () => {
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={1}
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          data={results}
          keyExtractor={(item) => item.objectID}
          refreshing={refresh}
          onRefresh={() => {
            setRefresh(true);
            getResults(term);
          }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } },
          ])}
          onEndReached={() => {
            if (term) {
              getResults(term + `&page=${page}`, true).then(() => {
                setPage(page + 1);
              });
            }
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
        <Scrollbar scrollY={scrollY} />
      </View>
    );
  };
  return React.useMemo(() => {
    return getList();
  }, [results]);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});
