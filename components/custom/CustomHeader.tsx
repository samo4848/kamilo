import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ArrowBack, InfoBackOne, InfoBackTwo } from "@/components/icons";

function CustomHeader() {
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity>
        <ArrowBack />
      </TouchableOpacity>
      <ThemedView>
        <ThemedText style={styles.text}>Floor plan</ThemedText>
      </ThemedView>
      <ThemedView style={styles.infoIconContent}>
        <TouchableOpacity>
          <InfoBackOne />
        </TouchableOpacity>
        <TouchableOpacity>
          <InfoBackTwo />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    // backgroundColor: "red",
    flexDirection: "row",
    paddingHorizontal: 25,
    alignItems: "center",
    height: 56,
  },
  infoIconContent: {
    flexDirection: "row",
    columnGap: 15,
  },
  text: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 20,
    paddingStart: 35,
  },
});
export default CustomHeader;
