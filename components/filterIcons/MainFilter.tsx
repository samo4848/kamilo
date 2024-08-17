import React from "react";
import { ThemedView } from "../ThemedView";
import CustomSearch from "../custom/CustomSearch";
import CategoryIcons from "./CategoryIcons";

const dameData = [
  {
    category: "MaterialCommunityIcons",
    name: "Material Community Icons",
    icons: [
      { name: "home", size: 35 },
      { name: "account", size: 35 },
      { name: "bell", size: 35 },
      { name: "camera", size: 35 },
      { name: "email", size: 35 },
      { name: "magnify", size: 35 },
      { name: "heart", size: 35 },
      { name: "cart", size: 35 },
      { name: "chat", size: 35 },
    ],
  },
  {
    category: "MaterialIcons",
    name: "Material Icons",
    icons: [
      { name: "home", size: 35 },
      { name: "person", size: 35 },
      { name: "notifications", size: 35 },
      { name: "email", size: 35 },
      { name: "search", size: 35 },
      { name: "favorite", size: 35 },
      { name: "chat", size: 35 },
    ],
  },
];

function MainFilter() {
  const handleOnChangeText = (text: string) => {};

  return (
    <ThemedView>
      <CustomSearch onCheangeText={handleOnChangeText} />
      <ThemedView>
        {dameData?.map((item) => (
          <CategoryIcons
            category={item.category}
            icons={item.icons}
            name={item.name}
            key={item.category}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

export default MainFilter;
