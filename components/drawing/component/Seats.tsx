import CustomInput from "@/components/custom/CustomInput";
import { ThemedView } from "@/components/ThemedView";
import React, { useContext, useState } from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import SeatsCounter from "./SeatsCounter";
import CustomButton from "@/components/custom/CustomButton";
import { Colors } from "@/constants/Colors";
import {
  DrawingContext,
  SeatsType,
  Shape,
} from "@/components/contexts/DrawingPageContext";

function Seats() {
  const {
    shapes,
    setShapes,
    selectedShapeId,
    bottomSheetRefSeats,
    setEditSeats,
    editSeats,
  } = useContext(DrawingContext);
  const [seatsState, setSeatsState] = useState({
    tableNumber: 1,
    numberOfSeats: 1,
    showError: false,
  });
  // const [showError, setShowError] = useState(false);
  const handleGetTableNumber = (num: number, showError: boolean) => {
    setSeatsState((pevState) => ({
      ...pevState,
      tableNumber: num,
      showError,
    }));
  };
  const handleGetNumberOfSeats = (num: number) => {
    setSeatsState((pevState) => ({
      ...pevState,
      numberOfSeats: num,
    }));
  };

  const handleSaveSeatsFunction = () => {
    if (seatsState?.showError) return;
    const shapeSelected = shapes?.map((shape: Shape) => {
      console.log("shape?.seats", shape?.seats);
      if (selectedShapeId === shape.id) {
        let newSeats: SeatsType[] = [];
        if (editSeats?.id !== "") {
          newSeats =
            shape.seats?.map((seat: SeatsType) => {
              if (seat.tableNumber === seatsState?.tableNumber) {
                return {
                  ...seat,
                  numberOfSeats: seatsState?.numberOfSeats,
                };
              } else return seat;
            }) || [];
        } else {
          newSeats = [
            ...(shape?.seats ? shape.seats : []),
            {
              id: Math.random().toString(36).substr(2, 9),
              numberOfSeats: seatsState.numberOfSeats,
              tableNumber: seatsState?.tableNumber,
              type: "circle",
              raduse: 15,
            },
          ];
        }
        return {
          ...shape,
          seats: newSeats,
        };
      } else return shape;
    });

    setShapes(shapeSelected);
    setEditSeats({
      id: "",
      tableNumber: 0,
      numberOfSeats: 0,
    });
    bottomSheetRefSeats?.current?.close();
  };
  return (
    <ThemedView style={{ position: "relative" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{}}>
            <Text style={styles.text}>Table №</Text>
            <CustomInput getNumberOfSeats={handleGetTableNumber} />

            <View style={{ height: 100 }}>
              <Text style={{ marginBottom: 5 }}>№ of seats</Text>
              <SeatsCounter getCountNumber={handleGetNumberOfSeats} />
            </View>
            <View style={styles.btnContainer}>
              <CustomButton
                id={2}
                title={"Save"}
                background={
                  seatsState?.showError
                    ? Colors.gray.gray_30
                    : Colors.dark.black
                }
                onPress={handleSaveSeatsFunction}
                textColor="#FFF"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

export default Seats;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    // borderBottomWidth: 1,
    marginBottom: 36,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    height: 20,
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "LatoRegular",
  },
  btnContainer: {
    // backgroundColor: "white",
    marginTop: 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textError: {
    fontWeight: "400",
    fontSize: 12,
    fontFamily: "LatoRegular",
    color: "#FF0000",
    paddingTop: 3,
    height: 50,
  },
});
