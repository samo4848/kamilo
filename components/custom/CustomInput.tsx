import React from "react";
import { ThemedView } from "../ThemedView";
import { StyleSheet, TextInput } from "react-native";
import { Colors } from "@/constants/Colors";

function CustomInput() {
  return (
    <ThemedView style={styles.container}>
      <TextInput style={styles.textInput} keyboardType="numeric" />
    </ThemedView>
  );
}

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    height: 70,
  },
  textInput: {
    height: 45,
    fontSize: 18,
    paddingHorizontal: 16,
    // color: Colors.gray.gray_90,
    borderRadius: 10,
    backgroundColor: Colors.gray.gray_10,
  },
});
