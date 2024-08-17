import React, { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";

interface IProps {
  getColorPicker: (color: string) => void;
  defaultColor: string;
}
export default function ColorPickerComponent({
  getColorPicker,
  defaultColor,
}: IProps) {
  const [showModal, setShowModal] = useState(false);

  // Note: 👇 This can be a `worklet` function.
  const onSelectColor = ({ hex }: any) => {
    // do something with the selected color.
    getColorPicker(hex);
    console.log(hex);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <View
          style={[styles.buttonSeleted, { backgroundColor: defaultColor }]}
        ></View>
      </TouchableOpacity>
      {showModal && (
        <View style={styles.contentColorPicker}>
          <ColorPicker
            style={{ width: "100%" }}
            value={defaultColor}
            onComplete={onSelectColor}
          >
            <Preview />
            <Panel1
              style={{
                height: 100,
              }}
            />
            <HueSlider />
            <OpacitySlider />
          </ColorPicker>
          <Button title="Ok" onPress={() => setShowModal(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    position: "relative",
    width: "auto",
  },
  buttonSeleted: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  contentColorPicker: {
    position: "absolute",
    bottom: 40,
    left: -100,
    width: 200,
    zIndex: 10000,
    backgroundColor: "#FFF",
  },
});
