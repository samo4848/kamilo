import React, { useContext, useRef, useState } from "react";
import { ThemedView } from "../ThemedView";
import {
  Canvas,
  Group,
  Skia,
  Rect,
  Box,
  Circle,
} from "@shopify/react-native-skia";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawingContext, Shape } from "../contexts/DrawingPageContext";

interface RectShape {
  x: number;
  y: number;
  width: number;
  height: number;
}
function Drawing() {
  const {
    shapes,
    setShapes,
    history,
    setHistory,
    setHistoryIndex,
    historyIndex,
  } = useContext(DrawingContext);
  const { width: canvasWidth } = Dimensions.get("window");
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);

  const resizeRef = useRef<any>(null);
  const panRef = useRef<any>(null);

  const startX = useRef(currentShape?.x || 0);
  const startY = useRef(currentShape?.y || 0);
  const startWidth = useRef(currentShape?.width || 0);
  const startHeight = useRef(currentShape?.height || 0);
  const startRadius = useRef(currentShape?.radius || 0);

  const canvasWidthnew = canvasWidth - 42; // Width of the Canvas
  const canvasHeight = 400; // Height of the Canvas

  const saveHistory = (newShapes: Shape[]) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    setHistory([...updatedHistory, newShapes]);
    setHistoryIndex(updatedHistory.length);
  };
  const onMoveGestureEvent = (
    event: PanGestureHandlerGestureEvent,
    shapeId: string
  ) => {
    const { translationX, translationY } = event.nativeEvent;

    let newX = startX.current + translationX;
    let newY = startY.current + translationY;

    const shape = shapes?.filter((item: Shape) => item.id === shapeId)?.[0];
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX + shape.width > canvasWidthnew)
      newX = canvasWidthnew - shape.width;
    if (newY + shape.height > canvasHeight) newY = canvasHeight - shape.height;

    const newShpaes = shapes?.map((item: Shape) => {
      if (item?.id === shapeId) {
        return {
          ...item,
          x: newX,
          y: newY,
        };
      } else return item;
    });
    setShapes(newShpaes);
    // console.log("event", event);
    // setRect((prevRect) => ({
    //   ...prevRect,
    //   x: startX.current + translationX,
    //   y: startY.current + translationY,
    // }));
  };

  const onMoveHandlerStateChange = (
    event: HandlerStateChangeEvent,
    shapeId: string
  ) => {
    if (event.nativeEvent.state === 5) {
      const shape = shapes?.filter((item: Shape) => item.id === shapeId)?.[0];
      // 5 means the gesture is finished
      startX.current = shape.x;
      startY.current = shape.y;
      //   saveState();
    }
    saveHistory(shapes);
  };

  // const onResizeGestureEvent = (
  //   event: PanGestureHandlerGestureEvent,
  //   shapeId: string
  // ) => {
  //   const { translationX, translationY } = event.nativeEvent;

  //   let newWidth = startWidth.current + translationX;
  //   let newHeight = startHeight.current + translationY;
  //   const shape = shapes?.filter((item: Shape) => item.id === shapeId)?.[0];
  //   // Boundary checks for resize event
  //   if (newWidth < 50) newWidth = 50; // Minimum width
  //   if (newHeight < 50) newHeight = 50; // Minimum height
  //   if (shape.x + newWidth > canvasWidth) newWidth = canvasWidth - shape.x;
  //   if (shape.y + newHeight > canvasHeight) newHeight = canvasHeight - shape.y;

  //   const newShpaes = shapes?.map((item: Shape) => {
  //     if (item?.id === shapeId) {
  //       return {
  //         ...item,
  //         width: newWidth,
  //         height: newHeight,
  //       };
  //     } else return item;
  //   });

  //   setShapes(newShpaes);
  // };

  const onResizeGestureEvent = (
    event: PanGestureHandlerGestureEvent,
    shapeId: string
  ) => {
    const { translationX, translationY } = event.nativeEvent;

    const shape = shapes.find((item: Shape) => item.id === shapeId);
    if (!shape) return;

    let newWidth = startWidth.current + translationX;
    let newHeight = startHeight.current + translationY;
    let newRadius = startRadius.current + Math.max(translationX, translationY);

    // Boundary checks for resize event
    if (shape.type === "rect") {
      if (newWidth < 50) newWidth = 50; // Minimum width
      if (newHeight < 50) newHeight = 50; // Minimum height
      if (shape.x + newWidth > canvasWidthnew)
        newWidth = canvasWidthnew - shape.x;
      if (shape.y + newHeight > canvasHeight)
        newHeight = canvasHeight - shape.y;

      const newShapes = shapes.map((item: Shape) =>
        item.id === shapeId
          ? {
              ...item,
              width: newWidth,
              height: newHeight,
            }
          : item
      );
      setShapes(newShapes);
    } else if (shape.type === "circle") {
      if (newRadius < 25) newRadius = 25; // Minimum radius
      if (shape.x + newRadius * 2 > canvasWidthnew)
        newRadius = (canvasWidthnew - shape.x) / 2;
      if (shape.y + newRadius * 2 > canvasHeight)
        newRadius = (canvasHeight - shape.y) / 2;

      const newShapes = shapes.map((item: Shape) =>
        item.id === shapeId
          ? {
              ...item,
              radius: newRadius,
            }
          : item
      );
      setShapes(newShapes);
    }
  };
  const onResizeHandlerStateChange = (
    event: HandlerStateChangeEvent,
    shapeId: string
  ) => {
    if (event.nativeEvent.state === 5) {
      // 5 means the gesture is finished
      const shape = shapes.find((item: Shape) => item.id === shapeId);
      if (shape) {
        if (shape.type === "rect") {
          startWidth.current = shape.width || 0;
          startHeight.current = shape.height || 0;
        } else if (shape.type === "circle") {
          startRadius.current = shape.radius || 0;
        }
      }
      // const shape = shapes?.filter((item: Shape) => item.id === shapeId)?.[0];
      // startWidth.current = shape.width;
      // startHeight.current = shape.height;
      //   saveState();
      saveHistory(shapes);
    }
  };

  const getShapeDimensions = (shape: Shape) => {
    return {
      left: shape.x,
      top: shape.y,
      width: shape.type === "rect" ? shape.width || 0 : (shape.radius || 0) * 2,
      height:
        shape.type === "rect" ? shape.height || 0 : (shape.radius || 0) * 2,
    };
  };

  const handleShapeTap = (shapeId: string) => {
    const shape = shapes.find((shape: Shape) => shape.id === shapeId);
    if (shape) {
      setCurrentShape(shape);
      setSelectedShapeId(shapeId);

      startX.current = shape.x;
      startY.current = shape.y;
      if (shape.type === "rect") {
        startWidth.current = shape.width || 0;
        startHeight.current = shape.height || 0;
      } else if (shape.type === "circle") {
        startRadius.current = shape.radius || 0;
      }
    }
  };

  const handleCanvasTap = () => {
    console.log("handleCanvasTap");
    setSelectedShapeId(null);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <Canvas style={{ backgroundColor: "#D9D9D9", height: 400 }}>
        {shapes.map((shape: Shape) =>
          shape.type === "rect" ? (
            <Rect
              key={shape.id}
              x={shape.x || 0}
              y={shape.y || 0}
              width={shape.width || 0}
              height={shape.height || 0}
              color={Skia.Color(shape.color)}
            />
          ) : (
            <Circle
              key={shape.id}
              cx={shape.x + (shape.radius || 0)}
              cy={shape.y + (shape.radius || 0)}
              r={shape.radius || 0}
              color={Skia.Color(shape.color)}
            />
          )
        )}
      </Canvas>

      {shapes.map((shape: Shape) => {
        const { left, top, width, height } = getShapeDimensions(shape);

        return (
          <TapGestureHandler
            key={shape.id}
            onHandlerStateChange={(event: TapGestureHandlerGestureEvent) => {
              if (event.nativeEvent.state === State.END) {
                handleShapeTap(shape.id);
              }
            }}
          >
            <View
              style={[
                styles.shapeOverlay,
                {
                  left,
                  top,
                  width,
                  height,
                  position: "absolute",
                  backgroundColor: "transparent", // Make the overlay invisible
                },
              ]}
            />
          </TapGestureHandler>
        );
      })}
      {shapes.map((shape: Shape) =>
        shape.id === selectedShapeId ? (
          <PanGestureHandler
            key={`move-${shape.id}`}
            ref={panRef}
            onGestureEvent={(event) => onMoveGestureEvent(event, shape.id)}
            onHandlerStateChange={(event) =>
              onMoveHandlerStateChange(event, shape.id)
            }
          >
            <View
              style={{
                position: "absolute",
                // backgroundColor: "green",
                width:
                  shape.type === "circle"
                    ? (shape.radius || 1) * 2
                    : shape?.width,
                height:
                  shape.type === "circle"
                    ? (shape?.radius || 0) * 2
                    : shape?.height,
                left: shape.x,
                top: shape.y,
                borderRadius: shape.type === "circle" ? shape.radius : 0,
              }}
            >
              {/* <View
                style={{
                  width: shape.width,
                  height: shape.height,
                  backgroundColor: "trans",
                }}
              /> */}
            </View>
          </PanGestureHandler>
        ) : null
      )}
      {shapes.map((shape: Shape) =>
        shape.id === selectedShapeId && shape.type === "rect" ? (
          <PanGestureHandler
            key={`resize-${shape.id}`}
            ref={resizeRef}
            onGestureEvent={(event) => onResizeGestureEvent(event, shape?.id)}
            onHandlerStateChange={(event) =>
              onResizeHandlerStateChange(event, shape?.id)
            }
          >
            <View
              style={[
                styles.resizer,
                {
                  left: shape.x + (shape.width || 0) - 20,
                  top: shape.y + (shape.height || 0) - 20,
                },
              ]}
            >
              <View style={styles.resizerHandle} />
            </View>
          </PanGestureHandler>
        ) : null
      )}
      {shapes.map((shape: Shape) =>
        shape.id === selectedShapeId && shape.type === "circle" ? (
          <PanGestureHandler
            key={`resize-${shape.id}`}
            ref={resizeRef}
            onGestureEvent={(event) => onResizeGestureEvent(event, shape?.id)}
            onHandlerStateChange={(event) =>
              onResizeHandlerStateChange(event, shape?.id)
            }
          >
            <View
              style={[
                styles.resizer,
                {
                  // backgroundColor: "yellow",
                  left: shape.x + (shape.radius || 1) * 2 - 20,
                  top: shape.y + (shape?.radius || 1) * 2 - (shape.radius || 0),
                },
              ]}
            >
              <View style={styles.resizerHandle} />
            </View>
          </PanGestureHandler>
        ) : null
      )}
    </ThemedView>
  );
}

export default Drawing;

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
    borderColor: "transparent",
    borderWidth: 1,
  },
});
