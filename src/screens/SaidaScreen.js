// src/screens/SaidaScreen.js
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import Header from "../components/Header";
import { ScreenWrap, Card, Input, PrimaryButton, DashedBox, styles } from "../components/UI";

export default function SaidaScreen() {
  const [busca, setBusca] = useState("");

  return (
    <>
      <Header />
      <ScreenWrap title="Saída de Itens">
        <Card>
          <Text style={styles.subtleTitle}>Busque pelo Id do item</Text>
          <View style={styles.searchRow}>
            <Input style={{ flex: 1 }} value={busca} onChangeText={setBusca} placeholder="Digite aqui..." />
            <PrimaryButton title="Buscar" onPress={() => Alert.alert("Buscar", busca || "vazio")} />
          </View>
        </Card>

        <Card style={{ marginTop: 16 }}>
          <Text style={styles.sectionTitle}>Itens Disponíveis</Text>
          <DashedBox text="Espaço reservado para a tabela de itens disponíveis" />
          <View style={{ alignItems: "flex-end", marginTop: 16 }}>
            <PrimaryButton title="Baixar Item" onPress={() => Alert.alert("Baixar item")} />
          </View>
        </Card>
      </ScreenWrap>
    </>
  );
}
