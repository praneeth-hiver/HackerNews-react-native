import React, { useEffect, useState } from "react";
import NewsComponent from "../components/NewsComponent";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";
import firebase from "react-native-firebase";
import { MenuIcon } from "../components/MenuIcon";
import Colors from "../Utils/Colors";
import UIText from "../UI/Text";

const Favs = ({ navigation }) => {
  const userData = navigation.state.params.userInfo;
  const { uid } = userData.user;
  const [results, setResults] = useState();
  const [updated, setUpdated] = useState(false);

  const fetchData = () => {
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
  };

  useEffect(() => {
    if (updated) {
      setUpdated(false);
    }
    fetchData();
  }, [updated]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background(0.7) }}>
      <View style={styles.header}>
        <MenuIcon onlyBack={true} navigation={navigation} />
        <UIText style={styles.hello}></UIText>
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
