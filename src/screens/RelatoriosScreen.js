// src/screens/RelatoriosScreen.js
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import Header from "../components/Header";
import { ScreenWrap, Card, Input, PrimaryButton, DashedBox, styles } from "../components/UI";

export default function RelatoriosScreen() {
  const [filtro, setFiltro] = useState("");

  return (
    <>
      <Header />
      <ScreenWrap title="Relatórios">
        <Card>
          <Text style={styles.subtleTitle}>Busque pelo código, lote, data ou fornecedor</Text>
          <View style={[styles.searchRow, { gap: 10 }]}>
            <Input style={{ flex: 1 }} value={filtro} onChangeText={setFiltro} placeholder="Digite aqui..." />
            <PrimaryButton title="Filtrar" onPress={() => Alert.alert("Filtrar", filtro || "vazio")} />
            <PrimaryButton title="Exportar Relatório" onPress={() => Alert.alert("Exportar")} />
          </View>
        </Card>

        <Card style={{ marginTop: 24 }}>
          <DashedBox text="Espaço reservado para a tabela dinâmica" />
        </Card>
      </ScreenWrap>
    </>
  );
}
