import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";

interface IPropsCustomButton {
  id: number;
  Icon?: React.ReactNode;
  title: String;
  textColor?: string;
  background?: string;
  onPress: (id: number) => void;
}
function CustomButton({
  id,
  title,
  Icon,
  textColor,
  background,
  onPress,
}: IPropsCustomButton) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: background || "black" }]}
      onPress={() => onPress(id)}
    >
      {Icon}
      <ThemedText style={[styles.text, { color: textColor || "black" }]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 110,
    height: 32,
    flexDirection: "row",
    columnGap: 8,
  },
  text: {
    color: "#FFF",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 13.2,
  },
});

export default CustomButton;
