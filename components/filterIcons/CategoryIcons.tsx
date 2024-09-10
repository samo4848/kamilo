import React, { useContext, useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { DrawingContext, Shape } from "../contexts/DrawingPageContext";
import CaptureIcon from "./CaptureIcon";

type Icons = {
  name: string;
  size: number;
};
interface IPropsCategoryIcon {
  category: string;
  name: string;
  icons: Icons[];
}

function CategoryIcons({ category, name, icons }: IPropsCategoryIcon) {
  const { setShapes, bottomSheetRef } = useContext(DrawingContext);
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleSelectedMaterialIcon = (name: string) => {
    bottomSheetRef.current?.close();
    setSelectedIcon(name);
  };

  return (
    <ThemedView style={styles.container}>
      {selectedIcon !== "" && <CaptureIcon name={selectedIcon} />}
      <ThemedText style={styles.title}>{name}</ThemedText>
      <ThemedView style={styles.containerIcons}>
        {icons?.map((item, index) => {
          return (
            <View key={item.name + index} style={styles.iconItem}>
              {category === "MaterialCommunityIcons" && (
                <TouchableOpacity
                  onPress={() => handleSelectedMaterialIcon(item.name)}
                >
                  <MaterialCommunityIcons name={item.name} size={item.size} />
                  <ThemedText style={styles.iconName}>{item.name}</ThemedText>
                </TouchableOpacity>
              )}
              {category === "MaterialIcons" && (
                <TouchableOpacity>
                  <MaterialIcons name={item.name} size={item.size} />
                  <ThemedText style={styles.iconName}>{item.name}</ThemedText>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ThemedView>
    </ThemedView>
  );
}

export default CategoryIcons;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray.gray_20,
    marginTop: 15,
    padding: 15,
    borderRadius: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 13,
    color: Colors.dark.black_40,
    fontFamily: "LatoBold",
  },
  containerIcons: {
    flexWrap: "wrap",
    display: "flex",
    backgroundColor: Colors.gray.gray_20,
    flexDirection: "row",
    gap: 25,
    paddingTop: 10,
  },
  iconItem: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    backgroundColor: Colors.gray.gray_20,
  },
  iconName: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 13,
    color: Colors.dark.black,
    fontFamily: "LatoRegular",
    paddingTop: 5,
  },
});
