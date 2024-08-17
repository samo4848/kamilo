import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Canvas,
  Group,
  Path as SkiaPath,
  Skia,
  SkImage,
  useCanvasRef,
} from "@shopify/react-native-skia";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Svg, { G, Path } from "react-native-svg";

// Define types for icons
type IconType = {
  name: string;
  color: string;
  size: number;
  x?: number;
  y?: number;
  scale?: number;
};

// List of icons
const iconList: IconType[] = [
  { name: "home", color: "#000", size: 40 },
  { name: "account", color: "#000", size: 40 },
  { name: "bell", color: "#000", size: 40 },
  { name: "camera", color: "#000", size: 40 },
  { name: "heart", color: "#000", size: 40 },
];

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const App: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<IconType | null>(null);
  const [iconsOnCanvas, setIconsOnCanvas] = useState<IconType[]>([]);

  const addIconToCanvas = (icon: IconType) => {
    const newIcon = {
      ...icon,
      x: screenWidth / 2 - icon.size / 2,
      y: screenHeight / 2 - icon.size / 2,
      scale: 1,
    };
    setIconsOnCanvas([...iconsOnCanvas, newIcon]);
  };

  const onPanGestureEvent =
    (index: number) => (event: PanGestureHandlerGestureEvent) => {
      setIconsOnCanvas((icons) =>
        icons.map((icon, idx) => {
          if (idx === index) {
            return {
              ...icon,
              x: (icon.x ?? 0) + event.nativeEvent.translationX,
              y: (icon.y ?? 0) + event.nativeEvent.translationY,
            };
          }
          return icon;
        })
      );
    };

  const onPinchGestureEvent =
    (index: number) => (event: PinchGestureHandlerGestureEvent) => {
      setIconsOnCanvas((icons) =>
        icons.map((icon, idx) => {
          if (idx === index) {
            return {
              ...icon,
              scale: event.nativeEvent.scale,
            };
          }
          return icon;
        })
      );
    };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Icon List */}
      <View style={styles.iconList}>
        {iconList.map((icon, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconButton}
            onPress={() => setSelectedIcon(icon)}
          >
            <MaterialCommunityIcons
              name={icon.name}
              size={icon.size}
              color={icon.color}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Canvas */}
      <View style={styles.canvasContainer}>
        <Canvas style={styles.canvas}>
          {iconsOnCanvas.map((icon, index) => (
            <PanGestureHandler
              key={index}
              onGestureEvent={onPanGestureEvent(index)}
            >
              <PinchGestureHandler onGestureEvent={onPinchGestureEvent(index)}>
                <Group
                  transform={[
                    { translateX: icon.x ?? 0 },
                    { translateY: icon.y ?? 0 },
                    { scale: icon.scale ?? 1 },
                  ]}
                >
                  <Svg width={icon.size} height={icon.size} viewBox="0 0 24 24">
                    <G fill={icon.color}>
                      <Path
                        d={
                          MaterialCommunityIcons?.getIconGlyph(
                            icon.name
                          ) as string
                        }
                      />
                    </G>
                  </Svg>
                </Group>
              </PinchGestureHandler>
            </PanGestureHandler>
          ))}
        </Canvas>
      </View>

      {/* Button to Add Icon */}
      {selectedIcon && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addIconToCanvas(selectedIcon)}
        >
          <Text style={styles.addButtonText}>Add to Canvas</Text>
        </TouchableOpacity>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  iconList: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  iconButton: {
    alignItems: "center",
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  canvas: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default App;
