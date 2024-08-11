// rectangle
// import React, { useState, useRef } from "react";
// import { SafeAreaView, StyleSheet } from "react-native";
// import { Canvas, Rect, Skia } from "@shopify/react-native-skia";
// import {
//   GestureHandlerRootView,
//   PanGestureHandler,
//   PanGestureHandlerGestureEvent,
//   HandlerStateChangeEvent,
// } from "react-native-gesture-handler";

// interface RectShape {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// const ResizableRectangle: React.FC = () => {
//   const [rect, setRect] = useState<RectShape>({
//     x: 50,
//     y: 50,
//     width: 200,
//     height: 100,
//   });
//   const startWidth = useRef(rect.width);
//   const startHeight = useRef(rect.height);

//   const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
//     const { translationX, translationY } = event.nativeEvent;
//     setRect((prevRect) => ({
//       ...prevRect,
//       width: startWidth.current + translationX,
//       height: startHeight.current + translationY,
//     }));
//   };

//   const onHandlerStateChange = (event: HandlerStateChangeEvent) => {
//     if (event.nativeEvent.state === 5) {
//       // 5 means the gesture is finished
//       startWidth.current = rect.width;
//       startHeight.current = rect.height;
//     }
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container}>
//         <Canvas
//           style={{ flex: 1, backgroundColor: "green", width: 400, height: 400 }}
//         >
//           <Rect
//             x={rect.x}
//             y={rect.y}
//             width={rect.width}
//             height={rect.height}
//             color={Skia.Color("blue")}
//           />
//         </Canvas>
//         <PanGestureHandler
//           onGestureEvent={onGestureEvent}
//           onHandlerStateChange={onHandlerStateChange}
//         >
//           <SafeAreaView
//             style={[
//               styles.resizer,
//               {
//                 left: rect.x + rect.width - 20,
//                 top: rect.y + rect.height - 20,
//               },
//             ]}
//           />
//         </PanGestureHandler>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "red",
//   },
//   resizer: {
//     width: 40,
//     height: 40,
//     position: "absolute",
//     backgroundColor: "transparent",
//   },
// });

// export default ResizableRectangle;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//resize and moviable rectaingle
// import React, { useState, useRef } from "react";
// import { SafeAreaView, StyleSheet } from "react-native";
// import { Canvas, Rect, Skia } from "@shopify/react-native-skia";
// import {
//   GestureHandlerRootView,
//   PanGestureHandler,
//   PanGestureHandlerGestureEvent,
//   HandlerStateChangeEvent,
// } from "react-native-gesture-handler";

// interface RectShape {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// const ResizableMovableRectangle: React.FC = () => {
//   const [rect, setRect] = useState<RectShape>({
//     x: 50,
//     y: 50,
//     width: 200,
//     height: 100,
//   });
//   const startWidth = useRef(rect.width);
//   const startHeight = useRef(rect.height);
//   const startX = useRef(rect.x);
//   const startY = useRef(rect.y);

//   const onResizeGestureEvent = (event: PanGestureHandlerGestureEvent) => {
//     const { translationX, translationY } = event.nativeEvent;
//     setRect((prevRect) => ({
//       ...prevRect,
//       width: startWidth.current + translationX,
//       height: startHeight.current + translationY,
//     }));
//   };

//   const onResizeHandlerStateChange = (event: HandlerStateChangeEvent) => {
//     if (event.nativeEvent.state === 5) {
//       // 5 means the gesture is finished
//       startWidth.current = rect.width;
//       startHeight.current = rect.height;
//     }
//   };

//   const onMoveGestureEvent = (event: PanGestureHandlerGestureEvent) => {
//     const { translationX, translationY } = event.nativeEvent;
//     setRect((prevRect) => ({
//       ...prevRect,
//       x: startX.current + translationX,
//       y: startY.current + translationY,
//     }));
//   };

//   const onMoveHandlerStateChange = (event: HandlerStateChangeEvent) => {
//     if (event.nativeEvent.state === 5) {
//       // 5 means the gesture is finished
//       startX.current = rect.x;
//       startY.current = rect.y;
//     }
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container}>
//         <Canvas
//           style={{ flex: 1, backgroundColor: "green", width: 400, height: 400 }}
//         >
//           <Rect
//             x={rect.x}
//             y={rect.y}
//             width={rect.width}
//             height={rect.height}
//             color={Skia.Color("blue")}
//           />
//         </Canvas>
//         <PanGestureHandler
//           onGestureEvent={onMoveGestureEvent}
//           onHandlerStateChange={onMoveHandlerStateChange}
//         >
//           <SafeAreaView
//             style={[
//               styles.rectangle,
//               {
//                 left: rect.x,
//                 top: rect.y,
//                 width: rect.width,
//                 height: rect.height,
//               },
//             ]}
//           />
//         </PanGestureHandler>
//         <PanGestureHandler
//           onGestureEvent={onResizeGestureEvent}
//           onHandlerStateChange={onResizeHandlerStateChange}
//         >
//           <SafeAreaView
//             style={[
//               styles.resizer,
//               {
//                 left: rect.x + rect.width - 20,
//                 top: rect.y + rect.height - 20,
//               },
//             ]}
//           />
//         </PanGestureHandler>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   rectangle: {
//     position: "absolute",
//     backgroundColor: "transparent",
//   },
//   resizer: {
//     width: 40,
//     height: 40,
//     position: "absolute",
//     backgroundColor: "transparent",
//   },
// });

// export default ResizableMovableRectangle;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// resize and moviable with view of resizable rectangles
// import React, { useState, useRef } from "react";
// import { SafeAreaView, StyleSheet, View } from "react-native";
// import { Canvas, Rect, Skia } from "@shopify/react-native-skia";
// import {
//   GestureHandlerRootView,
//   PanGestureHandler,
//   PanGestureHandlerGestureEvent,
//   HandlerStateChangeEvent,
// } from "react-native-gesture-handler";

// interface RectShape {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// const ResizableMovableRectangle: React.FC = () => {
//   const [rect, setRect] = useState<RectShape>({
//     x: 50,
//     y: 50,
//     width: 200,
//     height: 100,
//   });
//   const startWidth = useRef(rect.width);
//   const startHeight = useRef(rect.height);
//   const startX = useRef(rect.x);
//   const startY = useRef(rect.y);

//   const onResizeGestureEvent = (event: PanGestureHandlerGestureEvent) => {
//     const { translationX, translationY } = event.nativeEvent;
//     setRect((prevRect) => ({
//       ...prevRect,
//       width: startWidth.current + translationX,
//       height: startHeight.current + translationY,
//     }));
//   };

//   const onResizeHandlerStateChange = (event: HandlerStateChangeEvent) => {
//     if (event.nativeEvent.state === 5) {
//       // 5 means the gesture is finished
//       startWidth.current = rect.width;
//       startHeight.current = rect.height;
//     }
//   };

//   const onMoveGestureEvent = (event: PanGestureHandlerGestureEvent) => {
//     const { translationX, translationY } = event.nativeEvent;
//     setRect((prevRect) => ({
//       ...prevRect,
//       x: startX.current + translationX,
//       y: startY.current + translationY,
//     }));
//   };

//   const onMoveHandlerStateChange = (event: HandlerStateChangeEvent) => {
//     if (event.nativeEvent.state === 5) {
//       // 5 means the gesture is finished
//       startX.current = rect.x;
//       startY.current = rect.y;
//     }
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container}>
//         <Canvas
//           style={{ flex: 1, backgroundColor: "green", height: 400, width: 400 }}
//         >
//           <Rect
//             x={rect.x}
//             y={rect.y}
//             width={rect.width}
//             height={rect.height}
//             color={Skia.Color("blue")}
//           />
//         </Canvas>
//         <PanGestureHandler
//           onGestureEvent={onMoveGestureEvent}
//           onHandlerStateChange={onMoveHandlerStateChange}
//         >
//           <SafeAreaView
//             style={[
//               styles.rectangle,
//               {
//                 left: rect.x,
//                 top: rect.y,
//                 width: rect.width,
//                 height: rect.height,
//               },
//             ]}
//           >
//             <PanGestureHandler
//               onGestureEvent={onResizeGestureEvent}
//               onHandlerStateChange={onResizeHandlerStateChange}
//             >
//               <View
//                 style={[
//                   styles.resizer,
//                   {
//                     left: rect.width - 27,
//                     top: rect.height - 25,
//                   },
//                 ]}
//               >
//                 <View style={styles.resizerHandle} />
//               </View>
//             </PanGestureHandler>
//           </SafeAreaView>
//         </PanGestureHandler>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   rectangle: {
//     position: "absolute",
//     backgroundColor: "transparent",
//   },
//   resizer: {
//     position: "absolute",
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "transparent",
//   },
//   resizerHandle: {
//     width: 10,
//     height: 10,
//     backgroundColor: "gray",

//     borderTopStartRadius: 25,

//     // borderRadius: 5,
//   },
// });

// export default ResizableMovableRectangle;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// undo and redraw
import React, { useState, useRef } from "react";
import { SafeAreaView, StyleSheet, View, Button } from "react-native";
import { Canvas, Rect, Skia } from "@shopify/react-native-skia";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  HandlerStateChangeEvent,
} from "react-native-gesture-handler";

interface RectShape {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ResizableMovableRectangle: React.FC = () => {
  const [rect, setRect] = useState<RectShape>({
    x: 50,
    y: 50,
    width: 200,
    height: 100,
  });
  const [undoStack, setUndoStack] = useState<RectShape[]>([]);
  const [redoStack, setRedoStack] = useState<RectShape[]>([]);

  const startWidth = useRef(rect.width);
  const startHeight = useRef(rect.height);
  const startX = useRef(rect.x);
  const startY = useRef(rect.y);

  const saveState = () => {
    setUndoStack((prevStack) => [...prevStack, rect]);
    setRedoStack([]);
  };

  const onResizeGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, translationY } = event.nativeEvent;
    setRect((prevRect) => ({
      ...prevRect,
      width: startWidth.current + translationX,
      height: startHeight.current + translationY,
    }));
  };

  const onResizeHandlerStateChange = (event: HandlerStateChangeEvent) => {
    if (event.nativeEvent.state === 5) {
      // 5 means the gesture is finished
      startWidth.current = rect.width;
      startHeight.current = rect.height;
      saveState();
    }
  };

  const onMoveGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, translationY } = event.nativeEvent;
    setRect((prevRect) => ({
      ...prevRect,
      x: startX.current + translationX,
      y: startY.current + translationY,
    }));
  };

  const onMoveHandlerStateChange = (event: HandlerStateChangeEvent) => {
    if (event.nativeEvent.state === 5) {
      // 5 means the gesture is finished
      startX.current = rect.x;
      startY.current = rect.y;
      saveState();
    }
  };

  const handleUndo = () => {
    setUndoStack((prevStack) => {
      if (prevStack.length === 0) return prevStack;
      const newUndoStack = [...prevStack];
      const previousState = newUndoStack.pop() as RectShape;
      setRedoStack((prevRedoStack) => [...prevRedoStack, rect]);
      setRect(previousState);
      return newUndoStack;
    });
  };

  const handleRedo = () => {
    setRedoStack((prevStack) => {
      if (prevStack.length === 0) return prevStack;
      const newRedoStack = [...prevStack];
      const nextState = newRedoStack.pop() as RectShape;
      setUndoStack((prevUndoStack) => [...prevUndoStack, rect]);
      setRect(nextState);
      return newRedoStack;
    });
  };

  return (
    <GestureHandlerRootView style={{}}>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.buttonsContainer}>
          <Button
            title="Undo"
            onPress={handleUndo}
            disabled={undoStack.length === 0}
          />
          <Button
            title="Redo"
            onPress={handleRedo}
            disabled={redoStack.length === 0}
          />
        </View> */}
        <Canvas
          style={{ backgroundColor: "#D9D9D9", height: 400, width: "100%" }}
        >
          <Rect
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            color={Skia.Color("#837A7A")}
          />
        </Canvas>
        <PanGestureHandler
          onGestureEvent={onMoveGestureEvent}
          onHandlerStateChange={onMoveHandlerStateChange}
        >
          <SafeAreaView
            style={[
              styles.rectangle,
              {
                left: rect.x,
                top: rect.y,
                width: rect.width,
                height: rect.height,
              },
            ]}
          >
            <PanGestureHandler
              onGestureEvent={onResizeGestureEvent}
              onHandlerStateChange={onResizeHandlerStateChange}
            >
              <View
                style={[
                  styles.resizer,
                  {
                    left: rect.width - 27,
                    top: rect.height + 30,
                  },
                ]}
              >
                <View style={styles.resizerHandle} />
              </View>
            </PanGestureHandler>
          </SafeAreaView>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  },
  resizerHandle: {
    width: 10,
    height: 10,
    backgroundColor: "gray",

    borderTopStartRadius: 25,
  },
});

export default ResizableMovableRectangle;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add more buttons to add rectangle and circle buttons

// import React, { useState, useRef } from "react";
// import { SafeAreaView, StyleSheet, View, Button } from "react-native";
// import { Canvas, Rect, Circle, Skia } from "@shopify/react-native-skia";
// import {
//   GestureHandlerRootView,
//   PanGestureHandler,
//   PanGestureHandlerGestureEvent,
//   HandlerStateChangeEvent,
//   State,
//   TapGestureHandler,
//   TapGestureHandlerGestureEvent,
// } from "react-native-gesture-handler";

// interface Shape {
//   id: string;
//   type: "rect" | "circle";
//   x: number;
//   y: number;
//   width?: number;
//   height?: number;
//   radius?: number;
// }

// const ResizableMovableShapes: React.FC = () => {
//   const [shapes, setShapes] = useState<Shape[]>([]);
//   const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
//   const [undoStack, setUndoStack] = useState<Shape[][]>([]);
//   const [redoStack, setRedoStack] = useState<Shape[][]>([]);

//   const panRef = useRef<any>(null);
//   const resizeRef = useRef<any>(null);

//   const saveState = () => {
//     setUndoStack((prevStack) => [...prevStack, shapes]);
//     setRedoStack([]);
//   };

//   const handleAddRectangle = () => {
//     const newShape: Shape = {
//       id: Math.random().toString(36).substr(2, 9),
//       type: "rect",
//       x: 50,
//       y: 50,
//       width: 200,
//       height: 100,
//     };
//     saveState();
//     setShapes([...shapes, newShape]);
//   };

//   const handleAddCircle = () => {
//     const newShape: Shape = {
//       id: Math.random().toString(36).substr(2, 9),
//       type: "circle",
//       x: 50,
//       y: 50,
//       radius: 50,
//     };
//     saveState();
//     setShapes([...shapes, newShape]);
//   };

//   const handleUndo = () => {
//     setUndoStack((prevStack) => {
//       if (prevStack.length === 0) return prevStack;
//       const newUndoStack = [...prevStack];
//       const previousState = newUndoStack.pop() as Shape[];
//       setRedoStack((prevRedoStack) => [...prevRedoStack, shapes]);
//       setShapes(previousState);
//       return newUndoStack;
//     });
//   };

//   const handleRedo = () => {
//     setRedoStack((prevStack) => {
//       if (prevStack.length === 0) return prevStack;
//       const newRedoStack = [...prevStack];
//       const nextState = newRedoStack.pop() as Shape[];
//       setUndoStack((prevUndoStack) => [...prevUndoStack, shapes]);
//       setShapes(nextState);
//       return newRedoStack;
//     });
//   };

//   const handleShapeTap = (shapeId: string) => {
//     setSelectedShapeId(shapeId);
//   };

//   const getShapeDimensions = (shape: Shape) => {
//     return {
//       left: shape.x,
//       top: shape.y,
//       width: shape.type === "rect" ? shape.width || 0 : (shape.radius || 0) * 2,
//       height:
//         shape.type === "rect" ? shape.height || 0 : (shape.radius || 0) * 2,
//     };
//   };

//   const onMoveGestureEvent = (event: PanGestureHandlerGestureEvent) => {
//     if (selectedShapeId === null) return;
//     const { translationX, translationY } = event.nativeEvent;
//     setShapes((prevShapes) =>
//       prevShapes.map((shape) =>
//         shape.id === selectedShapeId
//           ? {
//               ...shape,
//               x: shape.x + translationX / 2,
//               y: shape.y + translationY / 2,
//             }
//           : shape
//       )
//     );
//   };

//   const onMoveHandlerStateChange = (event: HandlerStateChangeEvent) => {
//     if (selectedShapeId === null) return;
//     if (event.nativeEvent.state === State.END) {
//       saveState();
//     }
//   };

//   const onResizeGestureEvent = (event: PanGestureHandlerGestureEvent) => {
//     if (selectedShapeId === null) return;
//     const { translationX, translationY } = event.nativeEvent;
//     setShapes((prevShapes) =>
//       prevShapes.map((shape) =>
//         shape.id === selectedShapeId && shape.type === "rect"
//           ? {
//               ...shape,
//               width: Math.max(0, (shape.width || 0) + translationX / 2),
//               height: Math.max(0, (shape.height || 0) + translationY / 2),
//             }
//           : shape
//       )
//     );
//   };

//   const onResizeHandlerStateChange = (event: HandlerStateChangeEvent) => {
//     if (selectedShapeId === null) return;
//     if (event.nativeEvent.state === State.END) {
//       saveState();
//     }
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.buttonsContainer}>
//           <Button title="Add Rectangle" onPress={handleAddRectangle} />
//           <Button title="Add Circle" onPress={handleAddCircle} />
//           <Button
//             title="Undo"
//             onPress={handleUndo}
//             disabled={undoStack.length === 0}
//           />
//           <Button
//             title="Redo"
//             onPress={handleRedo}
//             disabled={redoStack.length === 0}
//           />
//         </View>
//         <Canvas
//           style={{ flex: 1, backgroundColor: "green", width: 400, height: 400 }}
//         >
//           {shapes.map((shape) =>
//             shape.type === "rect" ? (
//               <Rect
//                 key={shape.id}
//                 x={shape.x}
//                 y={shape.y}
//                 width={shape.width || 0}
//                 height={shape.height || 0}
//                 color={Skia.Color("blue")}
//               />
//             ) : (
//               <Circle
//                 key={shape.id}
//                 cx={shape.x + (shape.radius || 0)}
//                 cy={shape.y + (shape.radius || 0)}
//                 r={shape.radius || 0}
//                 color={Skia.Color("red")}
//               />
//             )
//           )}
//         </Canvas>
// {shapes.map((shape) => {
//   const { left, top, width, height } = getShapeDimensions(shape);

//   return (
//     <TapGestureHandler
//       key={shape.id}
//       onHandlerStateChange={(event: TapGestureHandlerGestureEvent) => {
//         if (event.nativeEvent.state === State.END) {
//           handleShapeTap(shape.id);
//         }
//       }}
//     >
//       <View
//         style={[
//           styles.shapeOverlay,
//           {
//             left,
//             top,
//             width,
//             height,
//             position: "absolute",
//             backgroundColor: "transparent", // Make the overlay invisible
//           },
//         ]}
//       />
//     </TapGestureHandler>
//   );
// })}
// {selectedShapeId && (
//   <>
//     <PanGestureHandler
//       ref={panRef}
//       onGestureEvent={onMoveGestureEvent}
//       onHandlerStateChange={onMoveHandlerStateChange}
//     >
//       <View style={StyleSheet.absoluteFillObject} />
//     </PanGestureHandler>
//     {shapes.map((shape) =>
//       shape.type === "rect" && shape.id === selectedShapeId ? (
//         <PanGestureHandler
//           key={shape.id}
//           ref={resizeRef}
//           onGestureEvent={onResizeGestureEvent}
//           onHandlerStateChange={onResizeHandlerStateChange}
//         >
//           <View
//             style={[
//               styles.resizer,
//               {
//                 left: shape.x + (shape.width || 0) - 20,
//                 top: shape.y + (shape.height || 0) - 20,
//               },
//             ]}
//           >
//             <View style={styles.resizerHandle} />
//           </View>
//         </PanGestureHandler>
//       ) : null
//     )}
//   </>
// )}
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonsContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },
// shapeOverlay: {
//   borderColor: "transparent",
//   borderWidth: 1,
// },
//   resizer: {
//     position: "absolute",
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "transparent",
//   },
//   resizerHandle: {
//     width: 20,
//     height: 20,
//     backgroundColor: "gray",
//     borderRadius: 10,
//   },
// });

// export default ResizableMovableShapes;
