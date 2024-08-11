import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

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
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>{name}</ThemedText>
      <ThemedView style={styles.containerIcons}>
        {icons?.map((item, index) => {
          return (
            <ThemedView key={item.name + index} style={styles.iconItem}>
              {category === "MaterialCommunityIcons" && (
                <MaterialCommunityIcons name={item.name} size={item.size} />
              )}
              {category === "MaterialIcons" && (
                <MaterialIcons name={item.name} size={item.size} />
              )}
              <ThemedText style={styles.iconName}>{item.name}</ThemedText>
            </ThemedView>
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
