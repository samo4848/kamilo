import CustomDrawing from "@/components/drawing/CustomDrawing";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useCallback, useContext, useRef } from "react";
import Constants from "expo-constants";
import CustomHeader from "@/components/custom/CustomHeader";
import { Button, StyleSheet, View } from "react-native";
import CustomButton from "@/components/custom/CustomButton";
import CustomFooter from "@/components/custom/CustomFooter";
import { AddButton } from "@/components/icons";
import BottomSheet, {
  BottomSheetMethods,
} from "@/components/custom/bottomSheet/BottomSheet";
import DrawingPageContext, {
  DrawingContext,
} from "@/components/contexts/DrawingPageContext";
import Drawing from "@/components/drawing/Drawing";
import MinimalCanvas from "@/components/drawing/testingTap";
import CustomSearch from "@/components/custom/CustomSearch";
import MainFilter from "@/components/filterIcons/MainFilter";

function HomePage() {
  const { bottomSheetRef } = useContext(DrawingContext);
  // const bottomSheetRef = useRef<BottomSheetMethods>(null);

  // const expandHandler = useCallback(() => {
  //   bottomSheetRef.current?.expand();
  // }, []);
  // const closeHandler = useCallback(() => {
  //   bottomSheetRef.current?.close();
  // }, []);
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
      {/* <Button title="open" onPress={expandHandler} />
        <Button title="close" onPress={closeHandler} /> */}
      <ThemedView>
        <CustomHeader />
      </ThemedView>
      <ThemedView style={{ flex: 1 }}>
        <ThemedView style={styles.topBattonContainer}>
          <CustomButton title={"Floor 1"} textColor="#fff" />
          <CustomButton
            title={"Add floor"}
            Icon={<AddButton />}
            background="#00000033"
          />
        </ThemedView>
        <ThemedView style={{ flex: 1, paddingHorizontal: 20 }}>
          <ThemedView style={{ height: 100 }}></ThemedView>
          {/* <CustomDrawing /> */}
          <Drawing />
          {/* <MinimalCanvas /> */}
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
    // backgroundColor: "red",
  },
  bottomSheetContainer: {
    padding: 20,
  },
});
export default HomePage;
