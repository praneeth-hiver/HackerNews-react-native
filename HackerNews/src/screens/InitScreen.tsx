import React, { useState, useEffect } from "react";
import { GoogleSigninButton } from "@react-native-community/google-signin";
import { googleLogin } from "../Firebase/GoogleSignin";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Platform
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
        <GoogleSigninButton
          style={styles.google}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleSignin}
        />
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
  }
});

export default InitScreen;
