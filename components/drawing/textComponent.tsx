import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import {
  Canvas,
  Text as SkiaText,
  useFont,
  SkFont,
} from "@shopify/react-native-skia";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  HandlerStateChangeEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

const TextComponent: React.FC = () => {
  const [text, setText] = useState<string>("Tap to edit");
  const panRef = useRef<any>(null);

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 100,
    y: 100,
  });
  const [scale, setScale] = useState<number>(1);
  const [textSize, setTextSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const startX = useRef(position?.x || 0);

  const baseFontSize = 32;
  const font: SkFont | null | any = useFont(
    require("../../assets/fonts/Lato-Regular.ttf"),
    baseFontSize * scale
  );

  useEffect(() => {
    if (font && text) {
      const { width } = font.measureText(text);
      const height = baseFontSize * scale; // Approximation, you can refine it.
      setTextSize({ width, height });
    }
  }, [font, text, scale]);

  const onMoveHandlerStateChange = (
    event: HandlerStateChangeEvent
    // shapeId: string
  ) => {};

  const handleShapeTap = () => {
    console.log("handleShapeTap");
  };

  const onMoveGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, translationY } = event.nativeEvent;
    setPosition({
      x: translationX,
      y: translationY,
    });
  };
  return (
    <ThemedView style={styles.container}>
      <Canvas style={styles.canvas}>
        <SkiaText text={text} y={position?.y} x={position?.x} font={font} />
      </Canvas>
      <TapGestureHandler
        key={"shape.id"}
        onHandlerStateChange={(event: TapGestureHandlerGestureEvent) => {
          if (event.nativeEvent.state === State.END) {
            handleShapeTap();
          }
        }}
      >
        <View
          style={[
            styles.shapeOverlay,
            {
              left: position.x,
              top: position.y - textSize?.height,
              width: textSize?.width + 10,
              height: textSize?.height + 10,
              position: "absolute",
              backgroundColor: "red", // Make the overlay invisible
            },
          ]}
        >
          <TextInput
            onChangeText={(text) => setText(text)}
            value={text}
            style={{
              width: "100%",
              height: "100%",
              fontSize: baseFontSize,
              padding: 5,
            }}
          />
        </View>
      </TapGestureHandler>
      <PanGestureHandler
        ref={panRef}
        onGestureEvent={(event) => onMoveGestureEvent(event)}
        onHandlerStateChange={(event) => onMoveHandlerStateChange(event)}
      >
        <View
          style={{
            backgroundColor: "yellow",
            width: 40,
            height: 40,
            position: "absolute",
            left: position.x + textSize?.width / 2 - 20,
            top: position.y - textSize.height - 40,
          }}
        ></View>
      </PanGestureHandler>
    </ThemedView>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
  textInput: {
    position: "absolute",
    backgroundColor: "transparent",
    borderWidth: 0,
    fontSize: 32,
    color: "black", // You can match the color with the SkiaText color
  },
  shapeOverlay: {
    borderColor: "transparent",
    borderWidth: 1,
  },
});
