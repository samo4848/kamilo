import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  topAnimation: SharedValue<number>;
  openHeight: number;
  closeHeight: number;
  close: () => void;
};
function BackDrop({ close, closeHeight, openHeight, topAnimation }: Props) {
  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      topAnimation.value,
      [closeHeight, openHeight],
      [0, 0.5]
    );
    const display = opacity === 0 ? "none" : "flex";
    return {
      opacity,
      display,
    };
  });
  return (
    <TouchableWithoutFeedback onPress={close}>
      <Animated.View
        style={[styles.container, backDropAnimation]}
      ></Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default BackDrop;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    display: "none",
    zIndex: 100,
  },
});
