import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import firebase from "react-native-firebase";
import Colors from "../Utils/Colors";
import UIText from "../UI/Text";

const renderSave = ({ userData, item, text, setUpdated }) => {
  const { uid } = userData.user;
  const name = item.objectID.toString();
  const obj = {};
  obj[name] = text === "Delete" ? firebase.firestore.FieldValue.delete() : item;
  return (
    <TouchableOpacity
      style={{
        ...styles.saveView
      }}
      onPress={() => {
        const ref = firebase
          .firestore()
          .collection(`Articles`)
          .doc(`${uid}`);

        firebase
          .firestore()
          .runTransaction(async transaction => {
            const doc = await transaction.get(ref);
            if (!doc.exists) {
              transaction.set(ref, obj);
              return item;
            }
            if (doc.data()[name] && text === "Save") {
              Alert.alert("Item already saved!");
              return;
            }
            transaction.update(ref, obj);
            if (text === "Delete") {
              setUpdated(true);
            }
            return item;
          })
          .then(res => {
            console.log(`Transaction successfully committed with: '${res}'.`);
          })
          .catch(error => {
            console.log("Transaction failed: ", error);
          });
      }}
    >
      <UIText style={styles.save}>{text}</UIText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveView: {
    marginVertical: 20,
    marginLeft: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 0,
    shadowColor: Colors.shadowColor(),
    backgroundColor: Colors.background(0.7),
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 7
  },
  save: {
    fontSize: 24,
    paddingHorizontal: 10
  }
});

export default renderSave;
