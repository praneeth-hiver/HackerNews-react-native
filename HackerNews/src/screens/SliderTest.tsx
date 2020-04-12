import io from "socket.io-client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { InputBox } from "../screens/Chatroom/InputBox";
import { MessageList } from "../screens/Chatroom/MessageList";
import { ThemeContext } from "../contexts/Theme";
import { MenuIcon } from "../components/MenuIcon";
import UIText from "../UI/Text";

console.disableYellowBox = true;
const socket = io("http://127.0.0.1:3000");

const Slider = ({ navigation }) => {
  const { uid } = navigation.state.params.userInfo.user;
  const [message, setMessage] = useState<any>("");
  const [messages, setMessages] = useState<any[]>([]);
  const { Colors } = useContext(ThemeContext);
  const flatlist = useRef(null);
  const messs = [];
  useEffect(() => {
    socket.on("chat message", rec => {
      messs.push(rec);
      setMessages([...messs]);
    });
  }, []);

  const submitChatMessage = () => {
    socket.emit("chat message", { message, uid });
    setMessage("");
    flatlist.current.scrollToEnd();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background() }}>
      <View style={styles.header}>
        <MenuIcon onlyBack={true} navigation={navigation} />
        <UIText style={styles.hello} />
      </View>
      <View style={styles.constainer}>
        <MessageList messages={messages} flatlist={flatlist} uid={uid} />
        <InputBox
          Colors={Colors}
          message={message}
          submitChatMessage={submitChatMessage}
          setMessage={setMessage}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  constainer: {
    margin: 30,
    flexDirection: "column"
  },
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

export default Slider;
