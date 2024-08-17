import CustomInput from "@/components/custom/CustomInput";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import SeatsCounter from "./SeatsCounter";

function Seats() {
  return (
    <ThemedView style={{ position: "relative" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{}}>
            {/* <Text style={styles.header}>Header</Text> */}
            <Text style={styles.text}>Table №</Text>
            <CustomInput />
            <View style={{ height: 100 }}>
              <Text style={{ marginBottom: 5 }}>№ of seats</Text>
              <SeatsCounter />
            </View>
            <View style={styles.btnContainer}>
              <Button title="Submit" onPress={() => null} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

export default Seats;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    // borderBottomWidth: 1,
    marginBottom: 36,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    height: 20,
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "LatoRegular",
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
