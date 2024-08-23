import {
  DrawingContext,
  Shape,
} from "@/components/contexts/DrawingPageContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface IPropsSeatsCounter {
  getCountNumber: (n: number) => void;
}
function SeatsCounter({ getCountNumber }: IPropsSeatsCounter) {
  const { editSeats } = useContext(DrawingContext);
  const [counter, setCounter] = useState(0);
  const increaseCounter = () => {
    setCounter(counter + 1);
    getCountNumber(counter + 1);
  };
  const decreaseCounter = () => {
    if (counter >= 1) {
      setCounter(counter - 1);
      getCountNumber(counter - 1);
    }
  };
  useEffect(() => {
    setCounter(editSeats?.numberOfSeats);
  }, [editSeats?.tableNumber]);
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
