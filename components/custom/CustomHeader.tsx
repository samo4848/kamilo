import React, { useContext } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ArrowBack, InfoBackOne, InfoBackTwo } from "@/components/icons";
import { DrawingContext } from "../contexts/DrawingPageContext";

function CustomHeader() {
  const { historyIndex, history, setShapes, setHistoryIndex } =
    useContext(DrawingContext);
  const handleUndo = () => {
    if (historyIndex > 0) {
      const previousShapes = history[historyIndex - 1];
      setShapes(previousShapes);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextShapes = history[historyIndex + 1];
      setShapes(nextShapes);
      setHistoryIndex(historyIndex + 1);
    }
  };
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity>
        <ArrowBack />
      </TouchableOpacity>
      <ThemedView>
        <ThemedText style={styles.text}>Floor plan</ThemedText>
      </ThemedView>
      <ThemedView style={styles.infoIconContent}>
        <TouchableOpacity onPress={handleUndo}>
          <InfoBackOne />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRedo}>
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
