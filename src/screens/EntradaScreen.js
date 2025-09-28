// src/screens/EntradaScreen.js
import React, { useState } from "react";
import { Alert, Text } from "react-native";
import Header from "../components/Header";
import { ScreenWrap, Card, Label, Input, PrimaryButton, styles } from "../components/UI";

export default function EntradaScreen() {
  const [nome, setNome] = useState("");
  const [qtd, setQtd] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  function salvar() {
    if (!nome.trim()) return Alert.alert("Informe o nome do item.");
    const nQtd = Number(qtd), nMin = Number(min), nMax = Number(max);
    if (!Number.isFinite(nQtd) || nQtd <= 0) return Alert.alert("Quantidade inválida.");
    if (min && !Number.isFinite(nMin)) return Alert.alert("Qtd. mínima inválida.");
    if (max && !Number.isFinite(nMax)) return Alert.alert("Qtd. máxima inválida.");
    Alert.alert("Entrada salva!", `Item: ${nome}\nQtd: ${qtd}\nMin: ${min || "-"} | Max: ${max || "-"}`);
    setNome(""); setQtd(""); setMin(""); setMax("");
  }

  return (
    <>
      <Header />
      <ScreenWrap title="Entrada de Itens">
        <Card style={{ paddingHorizontal: 20 }}>
          <Text style={styles.sectionTitle}>INFORMAÇÕES PARA ENTRADA</Text>

          <Label>Nome do item:</Label>
          <Input value={nome} onChangeText={setNome} placeholder="Ex.: Pastilha de freio" />

          <Label>Quantidade:</Label>
          <Input value={qtd} onChangeText={(t) => setQtd(t.replace(",", "."))} keyboardType="numeric" placeholder="Ex.: 10" />

          <Label>Quantidade mínima:</Label>
          <Input value={min} onChangeText={(t) => setMin(t.replace(",", "."))} keyboardType="numeric" placeholder="Opcional" />

          <Label>Quantidade máxima:</Label>
          <Input value={max} onChangeText={(t) => setMax(t.replace(",", "."))} keyboardType="numeric" placeholder="Opcional" />

          <PrimaryButton title="Salvar" color="#10B981" onPress={salvar} />
        </Card>
      </ScreenWrap>
    </>
  );
}
