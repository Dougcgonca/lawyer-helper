import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import CustomHeader from "../customHeader";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />

      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "home") iconName = "home-outline";
            else if (route.name === "process")
              iconName = "document-text-outline";
            else if (route.name === "clients") iconName = "people-outline";

            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#008080",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      />
    </View>
  );
}
