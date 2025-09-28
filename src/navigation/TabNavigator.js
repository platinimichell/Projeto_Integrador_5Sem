// src/navigation/TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import EntradaScreen from "../screens/EntradaScreen";
import SaidaScreen from "../screens/SaidaScreen";
import BuscarItemScreen from "../screens/BuscarItemScreen";
import RelatoriosScreen from "../screens/RelatoriosScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,                // usamos Header personalizado na tela
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#C8DAF4",
        tabBarStyle: { backgroundColor: "#0B3A70" },
        tabBarLabelStyle: { fontWeight: "700" },
        tabBarIcon: ({ color, size }) => {
          const map = {
            Home: "home-outline",
            Entrada: "add-circle-outline",
            "Saída": "remove-circle-outline",
            "Buscar Item": "search-outline",
            "Relatórios": "bar-chart-outline",
          };
          return <Ionicons name={map[route.name] || "ellipse"} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Entrada" component={EntradaScreen} />
      <Tab.Screen name="Saída" component={SaidaScreen} />
      <Tab.Screen name="Buscar Item" component={BuscarItemScreen} />
      <Tab.Screen name="Relatórios" component={RelatoriosScreen} />
    </Tab.Navigator>
  );
}
