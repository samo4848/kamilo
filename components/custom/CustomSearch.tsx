import React from "react";
import { ThemedView } from "../ThemedView";
import { StyleSheet, TextInput } from "react-native";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash";

interface IPropsSearch {
  onCheangeText?: (text: string) => void;
}
function CustomSearch({ onCheangeText }: IPropsSearch) {
  const debouncedSearch = React.useRef(
    debounce(async (criteria) => {
      if (onCheangeText) onCheangeText(criteria);
      //   setCharacters(await search(criteria));
      console.log(criteria);
    }, 500)
  ).current;

  const handleOnChangeText = (text: string) => {
    debouncedSearch(text);
  };
  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search icon"
        onChangeText={handleOnChangeText}
      />
      <Ionicons name="search-outline" size={25} style={styles.searchIcon} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  textInput: {
    backgroundColor: Colors.gray.gray_10,
    height: 45,
    borderRadius: 20,
    paddingLeft: 53,
    fontSize: 16,
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    left: 18,
    color: Colors.gray.gray_40,
  },
});
export default CustomSearch;
