import React from "react";
import { StyleSheet, FlatList, Dimensions } from "react-native";
import { Message } from "../../screens/Chatroom/Message";
const { height, width } = Dimensions.get("window");

function MList(props) {
  const { messages, flatlist, uid } = props;
  return (
    <FlatList
      ref={flatlist}
      style={styles.list}
      data={messages}
      renderItem={({ item }) => {
        return <Message item={item} uid={uid} />;
      }}
    />
  );
}

export const MessageList = React.memo(MList);

const styles = StyleSheet.create({
  list: {
    height: height / 1.35
  }
});
