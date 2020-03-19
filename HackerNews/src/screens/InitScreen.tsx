import React, { useState } from "react";
import { GoogleSigninButton } from "@react-native-community/google-signin";
import { googleLogin } from "../Firebase/GoogleSignin";
import { View, SafeAreaView, StyleSheet } from "react-native";

const InitScreen = ({ navigation }) => {
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

  return (
    <SafeAreaView>
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
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  google: {
    borderRadius: 30,
    height: 60,
    padding: 0
  }
});

export default InitScreen;
