import React from "react";
import { StyleSheet, View } from "react-native";
interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
}
function ResizeShape({ x, y, width, height }: IProps) {
  return (
    <>
      <View
        style={{
          width: 40,
          height: 40,
          // backgroundColor: "red",
          position: "absolute",
          left: x - 20,
          top: y - 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.resizerHandle} />
      </View>
      <View
        style={{
          width: 40,
          height: 40,
          // backgroundColor: "red",
          position: "absolute",
          left: x + (width || 0) - 20,
          top: y - 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.resizerHandle} />
      </View>
      <View
        style={{
          width: 40,
          height: 40,
          // backgroundColor: "red",
          position: "absolute",
          left: x - 20,
          top: y + (height || 0) - 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.resizerHandle} />
      </View>
      <View
        style={[
          styles.resizer,
          {
            // backgroundColor: "yellow",
            left: x + (width || 0) - 20,
            top: y + (height || 0) - 20,
          },
        ]}
      >
        <View style={styles.resizerHandle} />
      </View>
    </>
  );
}

export default ResizeShape;
const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  rectangle: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  resizer: {
    position: "absolute",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    // backgroundColor: "yellow",
  },
  moving: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  resizerHandle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "blue",

    // borderTopStartRadius: 25,
  },
  shapeOverlay: {
    // borderColor: "transparent",
    borderWidth: 1,
  },
});
