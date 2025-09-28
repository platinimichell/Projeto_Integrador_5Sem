// src/components/Header.js
import React from "react";
import { View, Image, Pressable, Text, StyleSheet, useWindowDimensions, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { width } = useWindowDimensions();
  const isPhone = width < 480;

  return (
    <View style={[styles.header, { paddingHorizontal: isPhone ? 8 : 16, paddingVertical: isPhone ? 6 : 10 }]}>
      <Image source={require("../../assets/logo-estoque-car.png")} resizeMode="contain" style={{ height: isPhone ? 30 : 48, aspectRatio: 4.56 }} />
      <View style={{ flex: 1 }} />
      <Pressable style={styles.profileBtn} onPress={() => Alert.alert("Perfil")}>
        <Ionicons name="person-circle-outline" size={isPhone ? 26 : 32} color="#0B3A70" />
        {!isPhone && <Text style={styles.profileText}>MEU PERFIL</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  profileBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  profileText: { color: "#1769D2", fontWeight: "700" },
});
