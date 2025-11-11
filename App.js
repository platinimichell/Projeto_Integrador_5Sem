// App.js
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";

const NavTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "#F3F4F6" },
};

export default function App() {
  return (
    <NavigationContainer theme={NavTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
}

