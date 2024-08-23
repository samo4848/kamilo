// import React, { useState } from "react";
// import { StyleSheet, View } from "react-native";
// import { Canvas, Rect, Circle, Skia } from "@shopify/react-native-skia";
// import {
//   GestureHandlerRootView,
//   TapGestureHandler,
//   TapGestureHandlerGestureEvent,
//   State,
//   TouchableWithoutFeedback,
// } from "react-native-gesture-handler";

// interface Shape {
//   id: number;
//   type: "rectangle" | "circle";
//   x: number;
//   y: number;
//   width?: number;
//   height?: number;
//   radius?: number;
//   color: string;
// }

// const ResizableMovableShapes: React.FC = () => {
//   const [shapes, setShapes] = useState<Shape[]>([
//     {
//       id: 1,
//       type: "rectangle",
//       x: 50,
//       y: 50,
//       width: 100,
//       height: 100,
//       color: "blue",
//     },
//     { id: 2, type: "circle", x: 200, y: 200, radius: 50, color: "red" },
//   ]);
//   const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

//   const handleTapCanvas = () => {
//     setSelectedShape(null);
//   };

//   const handleShapeTap = (shape: Shape) => {
//     setSelectedShape(shape);
//   };

//   return (
//     <TouchableWithoutFeedback onPress={handleTapCanvas}>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <Canvas style={styles.canvas}>
//           {shapes.map((shape) => {
//             const isSelected = selectedShape?.id === shape.id;

//             return shape.type === "rectangle" ? (
//               <Rect
//                 key={shape.id}
//                 x={shape.x}
//                 y={shape.y}
//                 width={shape.width || 0}
//                 height={shape.height || 0}
//                 color={isSelected ? "green" : shape.color}
//                 // onPress={() => handleShapeTap(shape)}
//               />
//             ) : (
//               <Circle
//                 key={shape.id}
//                 cx={shape.x}
//                 cy={shape.y}
//                 r={shape.radius || 0}
//                 color={isSelected ? "green" : shape.color}
//                 // onPress={() => handleShapeTap(shape)}
//               />
//             );
//           })}
//         </Canvas>
//       </GestureHandlerRootView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   canvas: {
//     flex: 1,
//     backgroundColor: "white",
//   },
// });

// export default ResizableMovableShapes;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add icon to canvas

import React, { useRef, useState } from "react";
import { View, Button } from "react-native";
import {
  Canvas,
  Skia,
  Image as SkiaImageComponent,
} from "@shopify/react-native-skia";
import { captureRef } from "react-native-view-shot";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Buffer } from "buffer"; // Import the Buffer polyfill

global.Buffer = global.Buffer || Buffer; // Ensure Buffer is available globally

type SkiaIconProps = {
  name?: string;
  size?: number;
  color?: string;
  x?: number;
  y?: number;
};

const SkiaIcon: React.FC<SkiaIconProps> = ({
  name = "home",
  size = 35,
  color = "red",
  x = 100,
  y = 100,
}) => {
  let iconRef = useRef<View>(null);
  const [image, setImage] = useState<ReturnType<
    typeof Skia.Image.MakeImageFromEncoded
  > | null>(null);

  const captureIcon = async () => {
    console.log("capturing");

    if (iconRef.current) {
      console.log("current");
      try {
        const uri = await captureRef(iconRef, {
          format: "png",
          quality: 1,
          result: "data-uri",
        });
        console.log("uri", uri);

        const imageBuffer = Buffer.from(uri.split(",")[1], "base64");
        const skData = Skia.Data.fromBytes(new Uint8Array(imageBuffer));
        const skImage = Skia.Image.MakeImageFromEncoded(skData);
        console.log("skImage", skImage);
        setImage(skImage);
      } catch (e) {
        console.log("e", e);
      }
    }
  };

  return (
    <>
      {/* Hidden view to render the icon */}
      <View
        ref={iconRef}
        style={{
          position: "absolute",
          left: -1050, // Adjust these values as needed
          top: -1050, // Adjust these values as needed
          opacity: 0, // Hide the icon from view
        }}
      >
        <MaterialCommunityIcons name={name} size={size} color={color} />
      </View>

      {/* Button to capture and display icon (for demo purposes) */}
      <Button title="Add Icon to Canvas" onPress={captureIcon} />

      {/* Skia Canvas to render the captured icon */}
      <Canvas style={{ flex: 1 }}>
        {image && (
          <SkiaImageComponent
            image={image}
            x={x}
            y={y}
            width={size}
            height={size}
          />
        )}
      </Canvas>
    </>
  );
};

export default SkiaIcon;
