import React, { useState, useEffect } from "react";
import { GoogleSigninButton } from "@react-native-community/google-signin";
import { googleLogin } from "../Firebase/GoogleSignin";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
  Text
} from "react-native";
import LottieView from "lottie-react-native";

const { height, width } = Dimensions.get("screen");

const InitScreen = ({ navigation }) => {
  // { user: { displayName: "Gunas" } }
  const [userInfo, setUserInfo] = useState();

  const navigateHome = () => {
    console.log(userInfo);
    navigation.navigate("Home", { userInfo });
  };

  const handleSignin = async () => {
    await googleLogin().then(user => {
      setUserInfo(user);
    });
  };

  useEffect(() => {
    if (userInfo) {
      navigateHome();
    }
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
        />
      </View>
      <View style={styles.view}>
        <TouchableOpacity style={styles.button} onPress={handleSignin}>
          <Image
            style={Platform.OS === "ios" ? styles.img : { elevation: 5 }}
            source={require("../assets/google-logo.png")}
          />
          {/* <Text style={styles.btntxt}>Continue with Google</Text> */}
        </TouchableOpacity>
        {userInfo ? navigateHome() : null}
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
