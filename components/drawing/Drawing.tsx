import React, { useContext, useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { ThemedView } from "../ThemedView";
import {
  Canvas,
  Group,
  Skia,
  Rect,
  Circle,
  SkFont,
  Text as SkiaText,
  useFont,
  Image as SkiaImageComponent,
} from "@shopify/react-native-skia";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
  TextInput,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DrawingContext,
  SeatsType,
  Shape,
} from "../contexts/DrawingPageContext";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { pixelsToCm } from "@/util/pixelsToCm";
import ShapeText from "./component/ShapeText";
import ResizeShape from "./component/resizeShape";
import ColorPickerComponent from "./component/ColorPicker";
import { calculatePosition } from "@/util/calculatePosition";

function Drawing() {
  const {
    shapes,
    setShapes,
    history,
    setHistory,
    setHistoryIndex,
    historyIndex,
    selectedShapeId,
    setSelectedShapeId,
    setEditSeats,
    bottomSheetRefSeats,
  } = useContext(DrawingContext);
  const { width: canvasWidth } = Dimensions.get("window");

  const [currentShape, setCurrentShape] = useState<Shape | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [textSize, setTextSize] = useState<{ width: number; height: number }>({
    width: 25,
    height: 25,
  });

  const resizeRef = useRef<any>(null);
  const panRef = useRef<any>(null);

  const startX = useRef(currentShape?.x || 0);
  const startY = useRef(currentShape?.y || 0);
  const startWidth = useRef(currentShape?.width || 0);
  const startHeight = useRef(currentShape?.height || 0);
  const startRadius = useRef(currentShape?.radius || 0);

  const baseFontSize = 16;
  const font: SkFont | null | any = useFont(
    require("../../assets/fonts/Lato-Regular.ttf"),
    baseFontSize * scale
  );

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
    if (shape.type === "rect" || shape.type === "icon") {
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
    if (shape.type === "icon") {
      return {
        left: shape.x,
        top: shape.y,
        width: shape.width,
        height: shape.height,
      };
    }
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

  const handleChangeText = (text: string, shapeId: string) => {
    const { width } = font.measureText(text);
    const newShapes = shapes?.map((item: Shape) => {
      if (item?.id === shapeId) {
        return {
          ...item,
          text,
        };
      } else return item;
    });
    setTextSize({ width, height: baseFontSize * scale });
    setShapes(newShapes);
  };

  const handleDeleteShape = (shapeId: string) => {
    const newShapes = shapes.filter((item: Shape) => item.id !== shapeId);
    setShapes(newShapes);
  };

  const changeShapeColor = (color: string, shapeId: string) => {
    const newShapes = shapes.map((shape: Shape) => {
      if (shape?.id === shapeId) {
        return {
          ...shape,
          color: color,
        };
      } else return shape;
    });
    setShapes(newShapes);
  };

  const handleSelectedSeats = (shapeId: string, seatId: string) => {
    setSelectedShapeId(shapeId);
    const findShape = shapes?.find((sh: Shape) => sh.id === shapeId);
    const seats = findShape?.seats?.find(
      (seat: SeatsType) => seat.id === seatId
    );
    console.log("seatId: " + seats?.id);
    console.log("seatsTable number ", seats?.tableNumber);
    console.log("number of seats ", seats?.numberOfSeats);
    setEditSeats({
      id: seats?.id,
      tableNumber: seats?.tableNumber,
      numberOfSeats: seats?.numberOfSeats,
    });
    bottomSheetRefSeats.current?.expand();
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <Canvas style={{ backgroundColor: "#D9D9D9", height: 400 }}>
        {shapes.map((shape: Shape) => {
          if (shape?.type === "rect") {
            return (
              <Group key={"group" + shape.id}>
                <Rect
                  key={shape.id}
                  x={shape.x || 0}
                  y={shape.y || 0}
                  width={shape.width || 0}
                  height={shape.height || 0}
                  color={Skia.Color(shape.color)}
                />
                <Group>
                  {shape?.seats?.map((seat: SeatsType, index) => {
                    const { x, y } = calculatePosition(shape, index);
                    if (seat.type === "rect") {
                      return (
                        <Group key={"seats-group" + seat?.id}>
                          <Circle
                            cx={x}
                            cy={y}
                            r={15}
                            color={Skia.Color("#FFF")}
                          />
                          <SkiaText
                            key={shape?.id}
                            font={font}
                            x={x - 5}
                            y={y + 5}
                            color={Colors.dark.black}
                            text={`${1}`}
                          />
                        </Group>
                      );
                    } else {
                      return (
                        <Group key={"seats-group" + seat?.id}>
                          <Circle
                            cx={x}
                            cy={y}
                            r={seat?.raduse || 0}
                            color={Skia.Color("#FFF")}
                          />
                          <SkiaText
                            key={shape?.id}
                            font={font}
                            x={x - 5}
                            y={y + 5}
                            color={Colors.dark.black}
                            text={`${seat?.tableNumber}`}
                          />
                        </Group>
                      );
                    }
                  })}
                </Group>
              </Group>
            );
          } else if (shape?.type === "circle") {
            return (
              <Circle
                key={shape.id}
                cx={shape.x + (shape.radius || 0)}
                cy={shape.y + (shape.radius || 0)}
                r={shape.radius || 0}
                color={Skia.Color(shape.color)}
              />
            );
          } else if (shape?.type === "icon") {
            if (shape?.image) {
              return (
                <SkiaImageComponent
                  key={shape.id}
                  image={shape?.image}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width || 0}
                  height={shape.height || 0}
                />
              );
            } else return null;
          } else {
            return (
              <SkiaText
                key={shape.id}
                text={shape.text || ""}
                y={shape?.y}
                x={shape?.x}
                font={font}
                color={shape.color}
              />
            );
          }
        })}
      </Canvas>
      <TapGestureHandler key={"mian_top"}>
        <TouchableOpacity
          onPress={() => setSelectedShapeId("null")}
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: "absolute",
          }}
        ></TouchableOpacity>
      </TapGestureHandler>
      {shapes?.map((shape: Shape) => {
        if (shape?.type === "rect") {
          return shape?.seats?.map((seat, index) => {
            const { x, y } = calculatePosition(shape, index);
            return (
              <TapGestureHandler key={"tap-seat" + seat?.id}>
                <TouchableWithoutFeedback
                  onPress={() => handleSelectedSeats(shape?.id, seat?.id)}
                  style={{
                    top: y - 15,
                    left: x - 15,
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    position: "absolute",
                    zIndex: 100,
                  }}
                >
                  <View
                    style={{
                      top: y - 15,
                      left: x - 15,
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      position: "absolute",
                      zIndex: 100,
                    }}
                  ></View>
                </TouchableWithoutFeedback>
              </TapGestureHandler>
            );
          });
        } else return null;
      })}
      {shapes.map((shape: Shape) => {
        const { left, top, width, height } = getShapeDimensions(shape);
        if (shape.type !== "text") {
          return (
            <TapGestureHandler
              key={"tap-text" + shape.id}
              onHandlerStateChange={(event: TapGestureHandlerGestureEvent) => {
                if (event.nativeEvent.state === State.END) {
                  handleShapeTap(shape.id);
                }
              }}
            >
              <View
                style={[
                  shape.id === selectedShapeId ? styles.shapeOverlay : {},
                  {
                    left,
                    top,
                    width,
                    height,
                    position: "absolute",
                    backgroundColor: "transparent", // Make the overlay invisible
                  },
                ]}
              ></View>
            </TapGestureHandler>
          );
        } else {
          return (
            <TapGestureHandler
              key={"top-input" + shape.id}
              onHandlerStateChange={(event: TapGestureHandlerGestureEvent) => {
                if (event.nativeEvent.state === State.END) {
                  handleShapeTap(shape.id);
                }
              }}
            >
              <View
                style={[
                  shape.id === selectedShapeId ? styles.shapeOverlay : {},
                  {
                    left: shape.x,
                    top: shape.y - textSize?.height,
                    width: textSize?.width + 35,
                    height: textSize?.height + 16,
                    position: "absolute",
                    backgroundColor: "transparent", // Make the overlay invisible
                  },
                ]}
              >
                {shape.id === selectedShapeId && (
                  <TextInput
                    onChangeText={(text) => handleChangeText(text, shape.id)}
                    value={shape.text}
                    style={{
                      width: "100%",
                      height: "100%",
                      fontSize: baseFontSize,
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      backgroundColor: "#FFF",
                      borderColor: Colors.gray.gray_30,
                      borderWidth: 1,
                      color: shape.color,
                    }}
                  />
                )}
              </View>
            </TapGestureHandler>
          );
        }
      })}
      {shapes.map((shape: Shape) => {
        if (shape.id === selectedShapeId && shape.type !== "text") {
          return (
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
                }}
              ></View>
            </PanGestureHandler>
          );
        } else if (shape.id === selectedShapeId && shape.type === "text") {
          return (
            <View
              style={{ position: "absolute" }}
              key={"move-text" + shape?.id}
            >
              <PanGestureHandler
                ref={panRef}
                onGestureEvent={(event) => onMoveGestureEvent(event, shape.id)}
                onHandlerStateChange={(event) =>
                  onMoveHandlerStateChange(event, shape.id)
                }
              >
                <View
                  style={{
                    backgroundColor: "#FFF",
                    width: 40,
                    height: 40,
                    position: "absolute",
                    left: shape.x + 47,
                    top: shape.y - textSize.height - 40,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 20,
                    shadowColor: "#52006A",
                  }}
                >
                  <Feather name="move" size={25} />
                </View>
              </PanGestureHandler>
              <View>
                <View
                  style={{
                    backgroundColor: "#FFF",
                    width: 40,
                    height: 40,
                    left: shape.x + 95,
                    top: shape.y - textSize.height - 40,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 20,
                    shadowColor: "#52006A",
                  }}
                >
                  <TouchableOpacity onPress={() => handleDeleteShape(shape.id)}>
                    <MaterialCommunityIcons name="delete" size={25} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor: "#FFF",
                    width: 40,
                    height: 40,
                    left: shape.x,
                    top: shape.y - textSize.height - 80,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 20,
                    shadowColor: "#52006A",
                  }}
                >
                  <ColorPickerComponent
                    defaultColor={shape.color}
                    getColorPicker={(color: string) =>
                      changeShapeColor(color, shape?.id)
                    }
                  />
                </View>
              </View>
            </View>
          );
        } else return null;
      })}
      {shapes.map((shape: Shape) =>
        shape.id === selectedShapeId && shape.type === "rect" ? (
          <View style={{ position: "absolute" }} key={`resize-view${shape.id}`}>
            <PanGestureHandler
              key={`resize-${shape.id}`}
              ref={resizeRef}
              onGestureEvent={(event) => onResizeGestureEvent(event, shape?.id)}
              onHandlerStateChange={(event) =>
                onResizeHandlerStateChange(event, shape?.id)
              }
            >
              <View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    position: "absolute",
                    left: shape.x - 20,
                    top: shape.y - 20,
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
                    position: "absolute",
                    left: shape.x + (shape.width || 0) - 20,
                    top: shape.y - 20,
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
                    position: "absolute",
                    left: shape.x - 20,
                    top: shape.y + (shape.height || 0) - 20,
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
                      left: shape.x + (shape.width || 0) - 20,
                      top: shape.y + (shape.height || 0) - 20,
                    },
                  ]}
                >
                  <View style={styles.resizerHandle} />
                </View>
              </View>
            </PanGestureHandler>
            <ShapeText
              left={shape.x}
              top={shape.y}
              width={shape.width || 0}
              height={shape.height || 0}
              handleDeleteShape={handleDeleteShape}
              shapeId={shape.id}
              shapeColor={shape.color}
              handleChangeColor={changeShapeColor}
            />
          </View>
        ) : null
      )}
      {shapes.map((shape: Shape) =>
        shape.id === selectedShapeId && shape.type === "icon" ? (
          <View
            style={{ position: "absolute" }}
            key={`resize-view-icon${shape.id}`}
          >
            <PanGestureHandler
              key={`resize-${shape.id}`}
              ref={resizeRef}
              onGestureEvent={(event) => onResizeGestureEvent(event, shape?.id)}
              onHandlerStateChange={(event) =>
                onResizeHandlerStateChange(event, shape?.id)
              }
            >
              <View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    // backgroundColor: "red",
                    position: "absolute",
                    left: shape.x - 20,
                    top: shape.y - 20,
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
                    left: shape.x + (shape.width || 0) - 20,
                    top: shape.y - 20,
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
                    left: shape.x - 20,
                    top: shape.y + (shape.height || 0) - 20,
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
                      left: shape.x + (shape.width || 0) - 20,
                      top: shape.y + (shape.height || 0) - 20,
                    },
                  ]}
                >
                  <View style={styles.resizerHandle} />
                </View>
              </View>
            </PanGestureHandler>
            <View
              style={{
                backgroundColor: "#FFF",
                width: 40,
                height: 40,
                left: shape.x + (shape.width || 0) / 2 - 20,
                top: shape.y - 45,
                alignItems: "center",
                justifyContent: "center",
                elevation: 20,
                shadowColor: "#52006A",
                borderRadius: 5,
              }}
            >
              <TouchableOpacity onPress={() => handleDeleteShape(shape.id)}>
                <MaterialCommunityIcons name="delete" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null
      )}
      {shapes.map((shape: Shape) =>
        shape.id === selectedShapeId && shape.type === "circle" ? (
          <View
            style={{ position: "absolute" }}
            key={`resize-view-circle${shape.id}`}
          >
            <PanGestureHandler
              key={`resize-${shape.id}`}
              ref={resizeRef}
              onGestureEvent={(event) => onResizeGestureEvent(event, shape?.id)}
              onHandlerStateChange={(event) =>
                onResizeHandlerStateChange(event, shape?.id)
              }
            >
              <View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    position: "absolute",
                    left: shape.x - 20,
                    top: shape.y - 20,
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
                    position: "absolute",
                    left: shape.x + (shape.radius || 0) * 2 - 20,
                    top: shape.y - 20,
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
                    position: "absolute",
                    left: shape.x - 20,
                    top: shape.y + (shape.radius || 0) * 2 - 20,
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
                      left: shape.x + (shape.radius || 0) * 2 - 20,
                      top: shape.y + (shape.radius || 0) * 2 - 20,
                    },
                  ]}
                >
                  <View style={styles.resizerHandle} />
                </View>
              </View>
            </PanGestureHandler>
            <ShapeText
              left={shape.x}
              top={shape.y}
              width={shape.x + (shape.radius || 1) * 2 || 0}
              height={shape.y + (shape?.radius || 1) * 2 || 0}
              handleDeleteShape={handleDeleteShape}
              shapeId={shape.id}
              handleChangeColor={changeShapeColor}
              shapeColor={shape.color}
            />
          </View>
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
    // borderColor: "transparent",
    borderWidth: 1,
  },
});
