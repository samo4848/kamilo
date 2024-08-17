import React, { useContext, useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useImage } from "@shopify/react-native-skia";
import { DrawingContext, Shape } from "../contexts/DrawingPageContext";

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
  const { setShapes } = useContext(DrawingContext);
  // const [iconUriState, setIconUriState] = useState(
  //   "data:image/svg+xml,%5Bobject%20Object%5D"
  // );
  // let iconImage;
  // if (iconUriState !== "") {
  //   iconImage = useImage(iconUriState);
  // }

  const handleSelectedMaterialIcon = (name: string) => {
    const newIcon = {
      type: "icon",
      name: "home",
      size: 40,
      color: "black",
      x: 200,
      y: 200,
      scale: 1,
    };
    setShapes((prevState: Shape[]) => [...prevState, newIcon]);
    // const Icon: any = (
    //   <MaterialCommunityIcons
    //     name={name}
    //     size={50}
    //     color="#000"
    //     style={{ width: 100, height: 100 }}
    //   />
    // );
    // console.log(Icon);
    // const iconUri = `data:image/svg+xml,${encodeURIComponent(Icon)}`;

    // setIconUriState(iconUri);
    // console.log(useOnlineStatus(iconUri));
  };

  return (
    <ThemedView style={styles.container}>
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
