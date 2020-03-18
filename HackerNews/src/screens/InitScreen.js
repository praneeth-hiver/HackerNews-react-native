import React from "react";
import { Button, View, Text, SafeAreaView, StyleSheet } from "react-native";

const InitScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.view}>
        <Button
          title={"Home"}
          onPress={() => navigation.navigate("Home")}
        ></Button>
        {/* <Text>sdvksdnk</Text> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  }
});

export default InitScreen;
