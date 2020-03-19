import {
  GoogleSignin,
  statusCodes
} from "@react-native-community/google-signin";
import firebase from "react-native-firebase";
import { Alert } from "react-native";

// Calling this function will open Google for login.
export async function googleLogin() {
  try {
    await GoogleSignin.hasPlayServices();
    // add any configuration settings here:
    GoogleSignin.configure({
      webClientId:
        "877760635365-k34sk45o4vqeekelckj1sh80di8ods72.apps.googleusercontent.com", // required
      offlineAccess: true,
      forceCodeForRefreshToken: true
    });

    const data = await GoogleSignin.signIn();

    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(
      data.idToken,
      data.serverAuthCode
    );
    // login with credential
    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential);

    return firebaseUserCredential;
  } catch (error) {
    if (error.code === statusCodes.IN_PROGRESS) {
      Alert.alert("Progress");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert("Make sure you have play services installed.");
    } else {
      console.warn(error);
    }
  }
}
