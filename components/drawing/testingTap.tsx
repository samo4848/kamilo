import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, Rect, Circle, Skia } from "@shopify/react-native-skia";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
  State,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

interface Shape {
  id: number;
  type: "rectangle" | "circle";
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  color: string;
}

const ResizableMovableShapes: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([
    {
      id: 1,
      type: "rectangle",
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      color: "blue",
    },
    { id: 2, type: "circle", x: 200, y: 200, radius: 50, color: "red" },
  ]);
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const handleTapCanvas = () => {
    setSelectedShape(null);
  };

  const handleShapeTap = (shape: Shape) => {
    setSelectedShape(shape);
  };

  return (
    <TouchableWithoutFeedback onPress={handleTapCanvas}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Canvas style={styles.canvas}>
          {shapes.map((shape) => {
            const isSelected = selectedShape?.id === shape.id;

            return shape.type === "rectangle" ? (
              <Rect
                key={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.width || 0}
                height={shape.height || 0}
                color={isSelected ? "green" : shape.color}
                // onPress={() => handleShapeTap(shape)}
              />
            ) : (
              <Circle
                key={shape.id}
                cx={shape.x}
                cy={shape.y}
                r={shape.radius || 0}
                color={isSelected ? "green" : shape.color}
                // onPress={() => handleShapeTap(shape)}
              />
            );
          })}
        </Canvas>
      </GestureHandlerRootView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ResizableMovableShapes;
