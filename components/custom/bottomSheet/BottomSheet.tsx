import { ThemedView } from "@/components/ThemedView";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import BackDrop from "./BackDrop";

interface PropsBottomSheet {
  snapTo: string;
  children: React.ReactNode;
}
export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
}
const BottomSheet = forwardRef<BottomSheetMethods, PropsBottomSheet>(
  ({ snapTo = "50%", children }: PropsBottomSheet, ref) => {
    const { height } = Dimensions.get("screen");
    const closeHeight = height;
    const precentage = parseFloat(snapTo.replace("%", "")) / 100;
    const openHeight = height - height * precentage;
    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);

    const expand = useCallback(() => {
      "worklet";
      topAnimation.value = withTiming(openHeight);
    }, [openHeight, topAnimation]);

    const close = useCallback(() => {
      "worklet";
      topAnimation.value = withTiming(closeHeight);
    }, [closeHeight, topAnimation]);

    useImperativeHandle(ref, () => ({ expand, close }), [expand, close]);

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const pan = Gesture.Pan()
      .onBegin((event) => {
        context.value = topAnimation.value;
      })
      .onUpdate((event) => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(event.translationY + context.value, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      });
    return (
      <>
        <BackDrop
          close={close}
          closeHeight={closeHeight}
          openHeight={openHeight}
          topAnimation={topAnimation}
        />
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.container, animationStyle]}>
            <ThemedView style={styles.lineContainer}>
              <ThemedView style={styles.line} />
            </ThemedView>
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFF",
    zIndex: 100,
  },
  lineContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    width: 50,
    height: 4,
    borderRadius: 20,
    backgroundColor: "black",
  },
});
