import {
  DrawingContext,
  Shape,
} from "@/components/contexts/DrawingPageContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

function SeatsCounter() {
  const { selectedShapeId, setShapes, shapes } = useContext(DrawingContext);
  const [counter, setCounter] = useState(0);
  const increaseCounter = () => {
    const newShapes = shapes.map((shape: Shape) => {
      if (shape?.id === selectedShapeId) {
        return {
          ...shape,
          seats: counter + 1,
        };
      } else {
        return shape;
      }
    });

    setCounter(counter + 1);
    setShapes(newShapes);
  };
  const decreaseCounter = () => {
    if (counter >= 1) {
      const newShapes = shapes.map((shape: Shape) => {
        if (shape?.id === selectedShapeId) {
          return {
            ...shape,
            seats: counter - 1,
          };
        } else {
          return shape;
        }
      });
      setCounter(counter - 1);
      setShapes(newShapes);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={decreaseCounter}>
        <ThemedText style={styles.text}>-</ThemedText>
      </TouchableOpacity>
      <ThemedText>{counter}</ThemedText>
      <TouchableOpacity onPress={increaseCounter}>
        <ThemedText style={styles.text}>+</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

export default SeatsCounter;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: Colors.gray.gray_10,
    marginVertical: 5,
    height: 45,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.dark.black,
    paddingHorizontal: 10,
  },
});
