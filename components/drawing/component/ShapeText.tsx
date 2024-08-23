import { Colors } from "@/constants/Colors";
import { pixelsToCm } from "@/util/pixelsToCm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ColorPickerComponent from "./ColorPicker";
import {
  DrawingContext,
  SeatsType,
  Shape,
} from "@/components/contexts/DrawingPageContext";

interface IProps {
  left: number;
  top: number;
  width: number;
  height: number;
  shapeId: string;
  handleDeleteShape: (shapeId: string) => void;
  shapeColor: string;
  handleChangeColor: (color: string, shapeId: string) => void;
}
function ShapeText({
  left,
  top,
  width,
  height,
  handleDeleteShape,
  shapeId,
  shapeColor,
  handleChangeColor,
}: IProps) {
  const { bottomSheetRefSeats, setEditSeats } = useContext(DrawingContext);

  const handleChangeColorFunction = (color: string) => {
    handleChangeColor(color, shapeId);
  };

  const expandHandler = useCallback(() => {
    setEditSeats({
      id: "",
      numberOfSeats: 0,
      tableNumber: 0,
    });
    bottomSheetRefSeats.current?.expand();
  }, []);
  if (width && height) {
    return (
      <View style={[styles.container, { left: 35, top: top - 45 }]}>
        <View style={styles.content}>
          <Text style={styles.text}>{pixelsToCm(width || 0)} m</Text>
          <Text>x</Text>
          <Text style={styles.text}>{pixelsToCm(height || 0)} m</Text>
        </View>
        <View style={styles.iconContent}>
          <ColorPickerComponent
            defaultColor={shapeColor}
            getColorPicker={handleChangeColorFunction}
          />
          <TouchableOpacity onPress={() => handleDeleteShape(shapeId)}>
            <MaterialCommunityIcons name="delete" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={expandHandler}>
            <Text style={styles.textIcon}>Seats</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else return <View />;
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",

    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  content: {
    backgroundColor: "#FFF",
    // left: shape.x,
    // top: shape.y - 55,
    // width: "auto",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    gap: 5,
    elevation: 20,
    shadowColor: "#52006A",
  },
  text: {
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.dark.black_60,
  },
  iconContent: {
    backgroundColor: "#FFF",
    height: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    elevation: 20,
    shadowColor: "#52006A",
  },
  colors: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.gray.gray_50,
  },
  textIcon: {
    fontFamily: "LatoRegular",
    fontSize: 12,
    color: Colors.dark.black,
    fontWeight: "700",
    // fontWeight: "bold",
  },
});
export default ShapeText;
