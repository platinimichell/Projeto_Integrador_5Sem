// src/components/UI.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";

export function ScreenWrap({ title, children }) {
  const { width } = useWindowDimensions();
  const isPhone = width < 480;
  return (
    <View style={styles.screen}>
      {/* Título */}
      <View style={[styles.pageTitleWrap, { paddingVertical: isPhone ? 8 : 12 }]}>
        <Text style={[styles.pageTitle, isPhone && { fontSize: 22 }]}>{title}</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={{ padding: isPhone ? 10 : 16, paddingBottom: isPhone ? 12 : 24 }}>
        <View style={{ width: "100%", maxWidth: 1200, alignSelf: "center" }}>{children}</View>
      </ScrollView>
    </View>
  );
}

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SmallCard({ title, style, onPress }) {
  return (
    <Card style={[{ flex: 1 }, style]}>
      <Text style={{ fontSize: 15, color: "#111827", fontWeight: "500", marginBottom: 8 }}>{title}</Text>
      <Pressable onPress={onPress}>
        <Text style={styles.link}>Ver mais</Text>
      </Pressable>
    </Card>
  );
}

export function Label({ children }) {
  return <Text style={{ marginTop: 10, marginBottom: 6, fontWeight: "600", color: "#111827" }}>{children}</Text>;
}

export function Input(props) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#9CA3AF"
      style={[
        {
          backgroundColor: "#F8FAFC",
          borderWidth: 1,
          borderColor: "#E5E7EB",
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: Platform.select({ web: 12, default: 10 }),
        },
        props.style,
      ]}
    />
  );
}

export function PrimaryButton({ title, onPress, color = "#D35400" }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: color,
          borderRadius: 10,
          alignItems: "center",
          borderWidth: 1.5,
          borderColor: "#222",
        },
        pressed && { opacity: 0.9 },
      ]}
    >
      <Text style={{ color: "#fff", fontWeight: "700" }}>{title}</Text>
    </Pressable>
  );
}

export function DashedBox({ text }) {
  return (
    <View
      style={{
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#D1D5DB",
        borderRadius: 8,
        minHeight: 160,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        marginTop: 8,
      }}
    >
      <Text style={{ color: "#6B7280", textAlign: "center" }}>{text}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3F4F6" },

  pageTitleWrap: {
    backgroundColor: "#F1EEE7",
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: { fontSize: 24, fontWeight: "800" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  bigPlaceholder: { flex: 1, borderRadius: 8, backgroundColor: "#E5E7EB" },
  infoBlue: { flexDirection: "row", alignItems: "center", backgroundColor: "#ECF4FF", borderRadius: 12 },
  infoTitle: { fontWeight: "700", color: "#0F172A", marginBottom: 6 },
  sidePanel: { flex: 1, backgroundColor: "#E3E9F0", borderRadius: 12, padding: 16, justifyContent: "center" },
  alertText: { color: "#111827", marginBottom: 8 },
  link: { color: "#1E63D9", textDecorationLine: "underline", fontWeight: "600" },
  subtleTitle: { textAlign: "center", color: "#374151", marginBottom: 8 },
  sectionTitle: { fontSize: 20, fontWeight: "800", marginBottom: 8 },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 10 },
});
