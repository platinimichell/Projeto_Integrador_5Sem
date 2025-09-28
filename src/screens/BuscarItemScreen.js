// src/screens/BuscarItemScreen.js
import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import Header from "../components/Header";
import { ScreenWrap, Card, Input, PrimaryButton, DashedBox, styles } from "../components/UI";
import { Ionicons } from "@expo/vector-icons";

export default function BuscarItemScreen() {
  const [q, setQ] = useState("");

  return (
    <>
      <Header />
      <ScreenWrap title="Buscar Itens">
        <Card>
          <Text style={styles.sectionTitle}>Busca por Item</Text>
          <View style={styles.searchRow}>
            <Input style={{ flex: 1 }} value={q} onChangeText={setQ} placeholder="Digite o código ou nome da peça..." />
            <Pressable onPress={() => Alert.alert("Buscar", q || "vazio")} style={{
              paddingVertical: 12, paddingHorizontal: 16, backgroundColor: "#D35400", borderRadius: 10, alignItems: "center", borderWidth: 1.5, borderColor: "#222",
            }}>
              <Ionicons name="search" size={20} color="#fff" />
            </Pressable>
          </View>
        </Card>

        <Card style={{ marginTop: 24 }}>
          <Text style={styles.sectionTitle}>Lista de Itens</Text>
          <DashedBox text="Espaço reservado para a tabela dinâmica" />
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <PrimaryButton title="Gerar lista" onPress={() => Alert.alert("Gerar lista")} />
          </View>
        </Card>
      </ScreenWrap>
    </>
  );
}
