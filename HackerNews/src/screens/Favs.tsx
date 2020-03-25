import React, { useEffect, useState } from "react";
import NewsComponent from "../components/NewsComponent";
import { FlatList, Text, SafeAreaView, View, StyleSheet } from "react-native";
import firebase from "react-native-firebase";
import { MenuIcon } from "../components/MenuIcon";

const Favs = ({ navigation }) => {
  const userData = navigation.state.params.userInfo;
  const { uid } = userData.user;
  const [results, setResults] = useState();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const ref = firebase
      .firestore()
      .collection("Articles")
      .doc(`${uid}`);

    firebase
      .firestore()
      .runTransaction(async transaction => {
        const doc = await transaction.get(ref);
        if (!doc.exists) {
          setResults["Nothing left"];
        }
        const results = Object.values(doc.data());
        setResults(results);
      })
      .catch(error => {
        console.log("Transaction failed: ", error);
      });
    if (updated) {
      setUpdated(false);
    }
  }, [updated]);

  return (
    <SafeAreaView style={{ backgroundColor: "rgba(245,255,245,1)" }}>
      <View style={styles.header}>
        <MenuIcon onlyBack={true} navigation={navigation} />
        <Text style={styles.hello}></Text>
      </View>
      <FlatList
        data={results}
        keyExtractor={item => item.objectID}
        renderItem={({ item }) => {
          return (
            <NewsComponent
              item={item}
              navigation={navigation}
              userData={userData}
              setUpdated={setUpdated}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  hello: {
    // fontFamily: "Montserrat-Light",
    fontSize: 30,
    padding: 15
    // backgroundColor: "rgba(245,255,245,1)"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});

export default Favs;
