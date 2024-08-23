import React, { useContext, useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import { StyleSheet, Text, TextInput } from "react-native";
import { Colors } from "@/constants/Colors";
import {
  DrawingContext,
  SeatsType,
  Shape,
} from "../contexts/DrawingPageContext";

interface IPropsInput {
  getNumberOfSeats: (num: number, showError: boolean) => void;
}
function CustomInput({ getNumberOfSeats }: IPropsInput) {
  const { shapes, selectedShapeId, editSeats } = useContext(DrawingContext);
  const [showError, setShowError] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSetSeatNumber = (text: string) => {
    setInputValue(text);
    let allSeats: SeatsType[] = [];
    shapes?.forEach(
      (shape: Shape) =>
        (allSeats = [...allSeats, ...(shape?.seats ? shape.seats : [])])
    );
    setShowError(false);
    const addSeatNumber = allSeats?.find(
      (item: SeatsType) => item?.tableNumber === parseInt(text)
    );
    if (addSeatNumber?.id) {
      return setShowError(true);
    } else {
      setShowError(false);
      getNumberOfSeats(parseInt(text), false);
    }
  };
  useEffect(() => {
    setInputValue(`${editSeats?.tableNumber}`);
  }, [editSeats?.tableNumber]);

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          showError
            ? {
                borderColor: "#FF0000",
                borderWidth: 1,
              }
            : {},
        ]}
        keyboardType="numeric"
        onChangeText={handleSetSeatNumber}
        editable={editSeats?.id === ""}
        value={inputValue}
        defaultValue={inputValue || ""}
      />
      {showError && (
        <Text style={styles.textError}>This table number already exists</Text>
      )}
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
  textError: {
    fontWeight: "400",
    fontSize: 12,
    fontFamily: "LatoRegular",
    color: "#FF0000",
    paddingTop: 3,
  },
});
