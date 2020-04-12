import React from "react";
import { StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";

export const InputBox = props => {
  const { message, submitChatMessage, setMessage, Colors } = props;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <TextInput
        blurOnSubmit={false}
        placeholder={"Say hi"}
        style={{
          ...styles.chat,
          borderColor: Colors.accentColor(0.7),
          color: Colors.fontColor(0.9)
        }}
        autoCorrect={false}
        value={message}
        onSubmitEditing={submitChatMessage}
        onChangeText={ipText => setMessage(ipText)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  chat: {
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderRadius: 10
  }
});
