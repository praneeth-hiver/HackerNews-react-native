import React, { useEffect } from "react";
import { NavigationActions } from "react-navigation";
import { googleLogin } from "../Firebase/GoogleSignin";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import LottieView from "lottie-react-native";
import { storeLocal, retrieveLocal } from "../asyncActivities/getSet";
import firebase from "react-native-firebase";

const { height, width } = Dimensions.get("screen");

const InitScreen = ({ navigation }) => {
  const navigateHome = obj => {
    const { uid } = obj.user;

    const user = {};
    user[uid] = obj;

    const ref = firebase
      .firestore()
      .collection("users")
      .doc(`${uid}`);

    firebase
      .firestore()
      .runTransaction(async transaction => {
        const doc = await transaction.get(ref);
        if (!doc.exists) {
          transaction.set(ref, user);
          console.log("New user: ", user);
        }
      })
      .then(() => {
        console.log("Transaction Successful");
      })
      .catch(error => {
        console.log("Transaction failed: ", error);
      });
    navigation.reset(
      [NavigationActions.navigate({ routeName: "Home", params: { obj } })],
      0
    );
  };

  const handleSignin = async () => {
    await googleLogin().then(user => {
      storeLocal("userInfo", user).then(() => {
        navigateHome(user);
      });
    });
  };

  useEffect(() => {
    retrieveLocal("userInfo").then(data => {
      if (data) {
        console.log("Getting data from local storage", data);
        const json = JSON.parse(data);
        navigateHome(json);
      }
    });
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.Topview}>
        <LottieView
          style={Platform.OS === "android" ? styles.lotteAndroid : styles.lotte}
          source={require("../assets/abstract2.json")}
          autoPlay
          loop
          autoSize={true}
          speed={0.3}
        />
      </View>
      <View style={styles.view}>
        <TouchableOpacity style={styles.button} onPress={handleSignin}>
          <Image
            style={styles.img}
            source={require("../assets/google-logo.png")}
          />
          {/* <Text style={styles.btntxt}>Continue with Google</Text> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Topview: {
    height: height / 1.5
  },
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  google: {
    margin: 30,
    borderColor: "white",
    borderWidth: 8,
    borderRadius: 20
  },
  lotteAndroid: {
    top: 40,
    transform: [{ scaleX: 1.9 }, { scaleY: 1.9 }]
  },
  lotte: {
    position: "relative",
    left: -200,
    top: -150,
    height: height * 1.9
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0)",
    borderRadius: 40,
    marginTop: 30
  },
  img: {
    height: 50,
    width: 50,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  btntxt: {
    alignSelf: "center",
    fontSize: 20,
    color: "blue",
    padding: 5
  }
});

export default InitScreen;
