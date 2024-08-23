import CustomDrawing from "@/components/drawing/CustomDrawing";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Constants from "expo-constants";
import CustomHeader from "@/components/custom/CustomHeader";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import CustomButton from "@/components/custom/CustomButton";
import CustomFooter from "@/components/custom/CustomFooter";
import { AddButton } from "@/components/icons";
import BottomSheet, {
  BottomSheetMethods,
} from "@/components/custom/bottomSheet/BottomSheet";
import DrawingPageContext, {
  DrawingContext,
  Floor,
} from "@/components/contexts/DrawingPageContext";
import Drawing from "@/components/drawing/Drawing";
import MinimalCanvas from "@/components/drawing/testingTap";
import CustomSearch from "@/components/custom/CustomSearch";
import MainFilter from "@/components/filterIcons/MainFilter";
import TextComponent from "@/components/drawing/textComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ColorPickerComponent from "@/components/drawing/component/ColorPicker";
import Seats from "@/components/drawing/component/Seats";

function HomePage() {
  const {
    bottomSheetRef,
    bottomSheetRefSeats,
    currentFloor,
    setCurrentFloor,
    floorCounter,
    setFloorCounter,
    floors,
    setFloors,
    shapes,
  } = useContext(DrawingContext);
  const [seatsHeight, setSeatsHeight] = useState("50%");

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      console.log("showSubscription");
      setSeatsHeight("65%");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      console.log("hideSubscription");
      setSeatsHeight("50%");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [bottomSheetRefSeats?.current]);

  const handlePressFloor = (floor: number) => {
    const allFloors = floors?.map((item: Floor) => {
      if (item?.floorNumber === currentFloor) {
        return {
          ...item,
          shapes: shapes,
        };
      } else return item;
    });
    console.log("allFloors", allFloors);
    setFloors(allFloors);
    setCurrentFloor(floor);
    // bottomSheetRefSeats?.current?.snapTo(floor * 100 + "%");
  };

  const handleAddFloor = (id: number) => {
    setFloors((prev: Floor[]) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        floorNumber: floorCounter + 1,
        shapes: [],
      },
    ]);
    setFloorCounter(floorCounter + 1);
  };
  return (
    <ThemedView
      style={{ flex: 1, paddingTop: Constants?.statusBarHeight || 10 }}
    >
      <BottomSheet ref={bottomSheetRef} snapTo="70%">
        <ThemedView style={styles.bottomSheetContainer}>
          {/* <CustomSearch /> */}
          <MainFilter />
        </ThemedView>
      </BottomSheet>

      <BottomSheet ref={bottomSheetRefSeats} snapTo={seatsHeight}>
        <ThemedView style={styles.bottomSheetContainer}>
          <Seats />
        </ThemedView>
      </BottomSheet>

      {/* <Button title="open" onPress={expandHandler} />
        <Button title="close" onPress={closeHandler} /> */}
      <ThemedView>
        <CustomHeader />
      </ThemedView>
      <ThemedView style={{ flex: 1 }}>
        <ThemedView style={styles.topBattonContainer}>
          {[...Array(floorCounter)?.keys()]?.map((item, index) => (
            <CustomButton
              title={`Floor ${index + 1}`}
              textColor={index + 1 === currentFloor ? "#fff" : "#000"}
              background={index + 1 === currentFloor ? "#000" : "#00000033"}
              key={"floor " + index}
              onPress={handlePressFloor}
              id={index + 1}
            />
          ))}

          <CustomButton
            title={"Add floor"}
            Icon={<AddButton />}
            background="#00000033"
            id={1000}
            onPress={handleAddFloor}
          />
        </ThemedView>
        <ThemedView style={{ flex: 1, paddingHorizontal: 20 }}>
          <ThemedView style={{ height: 100 }}></ThemedView>
          {/* <ColorPickerComponent /> */}
          {/* <CustomDrawing /> */}
          <Drawing />
          {/* <MinimalCanvas /> */}
          {/* <TextComponent /> */}
        </ThemedView>
      </ThemedView>
      <ThemedView>
        <CustomFooter />
      </ThemedView>
      {/* <ThemedView
        style={{
          width: 100,
          height: 100,
        }}
      >
        <BottomSheet />
      </ThemedView> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  topBattonContainer: {
    flexDirection: "row",
    columnGap: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    flexWrap: "wrap",
    rowGap: 10,
    // backgroundColor: "red",
  },
  bottomSheetContainer: {
    padding: 20,
  },
});
export default HomePage;
