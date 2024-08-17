import React, { useCallback, useContext, useRef } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import {
  ArrowRight,
  CircleIcon,
  Icons,
  RectangleIcon,
  TextIcon,
} from "../icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { DrawingContext, Shape } from "../contexts/DrawingPageContext";
import { Colors } from "@/constants/Colors";

function CustomFooter() {
  const { bottomSheetRef, setShapes, setSelectedShapeId } =
    useContext(DrawingContext);

  const expandHandler = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleAddRectangle = () => {
    const newShape: Shape = {
      id: Math.random().toString(36).substr(2, 9),
      type: "rect",
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      color: Colors.gray.gray_50,
    };
    setShapes((shapes: Shape[]) => [...shapes, newShape]);
    setSelectedShapeId(newShape?.id);
  };
  const handleAddCircle = () => {
    const newShape: Shape = {
      id: Math.random().toString(36).substr(2, 9),
      type: "circle",
      x: 50,
      y: 50,
      radius: 50,
      color: Colors.gray.gray_50,
    };

    setShapes((shapes: Shape[]) => [...shapes, newShape]);
    setSelectedShapeId(newShape?.id);
  };

  const handleAddText = () => {
    const newShape: Shape = {
      id: Math.random().toString(36).substr(2, 9),
      type: "text",
      x: 50,
      y: 50,
      text: "Text",
      color: Colors.gray.gray_50,
    };

    setShapes((shapes: Shape[]) => [...shapes, newShape]);
    setSelectedShapeId(newShape?.id);
  };
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.containerItem}
        onPress={handleAddRectangle}
      >
        <RectangleIcon />
        <ThemedText style={styles.textItem}>Square</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerItem} onPress={handleAddCircle}>
        <CircleIcon />
        <ThemedText style={styles.textItem}>Circle</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerItem} onPress={handleAddText}>
        <TextIcon />
        <ThemedText style={styles.textItem}>Text</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerItem} onPress={expandHandler}>
        <Icons />
        <ThemedText style={styles.textItem}>Icons</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.containerItem, { paddingStart: 25 }]}>
        <ArrowRight />
        <ThemedText style={styles.textItem}>Preview</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: "red",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  containerItem: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 7,
  },
  textItem: {
    color: "#00000066",
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 11,
  },
});
export default CustomFooter;
