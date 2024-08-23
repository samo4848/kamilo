import { Skia } from "@shopify/react-native-skia";
import React, { useContext, useEffect, useRef } from "react";
import { View } from "react-native";
import { captureRef } from "react-native-view-shot";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Buffer } from "buffer"; // Import the Buffer polyfill
import { DrawingContext, Shape } from "../contexts/DrawingPageContext";
import { Colors } from "@/constants/Colors";

global.Buffer = global.Buffer || Buffer; // Ensure Buffer is available globally

interface IProps {
  name: string;
}

function CaptureIcon({ name }: IProps) {
  const { setShapes, setSelectedShapeId } = useContext(DrawingContext);
  let iconRef = useRef<View>(null);
  const captureIcon = async () => {
    if (iconRef.current) {
      try {
        const uri = await captureRef(iconRef, {
          format: "png",
          quality: 1,
          result: "data-uri",
        });
        const imageBuffer = Buffer.from(uri.split(",")[1], "base64");
        const skData = Skia.Data.fromBytes(new Uint8Array(imageBuffer));
        const skImage = Skia.Image.MakeImageFromEncoded(skData);
        const newShape: Shape = {
          id: Math.random().toString(36).substr(2, 9),
          type: "icon",
          x: 100,
          y: 100,
          width: 35,
          height: 35,
          image: skImage,
          color: Colors.gray.gray_50,
        };
        setShapes((shapes: Shape[]) => [...shapes, newShape]);
        setSelectedShapeId(newShape?.id);
      } catch (e) {
        console.log("e", e);
      }
    }
  };
  useEffect(() => {
    if (name !== "") {
      captureIcon();
    }
  }, [name]);
  return (
    <View
      ref={iconRef}
      style={{
        position: "absolute",
        left: 50, // Adjust these values as needed
        top: 50, // Adjust these values as needed
        opacity: 0, // Hide the icon from view
        // width: 100,
        // height: 100,
        width: "auto",
        height: "auto",
        padding: 0,
      }}
    >
      <MaterialCommunityIcons name={name} size={35} color={"#000"} />
    </View>
  );
}

export default CaptureIcon;
