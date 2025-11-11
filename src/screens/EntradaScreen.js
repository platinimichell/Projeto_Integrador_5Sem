// src/screens/EntradaScreen.js
import React, { useState } from "react";
import { Alert, Text } from "react-native";
import Header from "../components/Header";
import { ScreenWrap, Card, Label, Input, PrimaryButton, styles } from "../components/UI";
import api from "../services/api"; // importando o axios já configurado

export default function EntradaScreen() {
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [qtd, setQtd] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [loading, setLoading] = useState(false);

  async function salvar() {
    if (!nome.trim()) return Alert.alert("Informe o nome do item.");
    if (!marca.trim()) return Alert.alert("Informe a marca do item.");

    const nQtd = Number(qtd),
          nMin = Number(min),
          nMax = Number(max);

    if (!Number.isFinite(nQtd) || nQtd <= 0) return Alert.alert("Quantidade inválida.");
    if (min && !Number.isFinite(nMin)) return Alert.alert("Qtd. mínima inválida.");
    if (max && !Number.isFinite(nMax)) return Alert.alert("Qtd. máxima inválida.");

    const novoItem = {
      nome,
      marca,
      qtd: nQtd,
      min_qtd: min ? nMin : 0,
      max_qtd: max ? nMax : 99999,
    };

    try {
      setLoading(true);
      await api.post("/cadastroProdutos", novoItem);
      Alert.alert("Entrada salva!", `Item: ${nome}\nQtd: ${qtd}\nMin: ${min || "-"} | Max: ${max || "-"}`);
      
      // resetando campos
      setNome(""); setMarca(""); setQtd(""); setMin(""); setMax("");
    } catch (erro) {
      console.log("Erro ao salvar item:", erro.message);
      Alert.alert("Erro", "Não foi possível salvar o item.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <ScreenWrap title="Entrada de Itens">
        <Card style={{ paddingHorizontal: 20 }}>
          <Text style={styles.sectionTitle}>INFORMAÇÕES PARA ENTRADA</Text>

          <Label>Nome do item:</Label>
          <Input value={nome} onChangeText={setNome} placeholder="Ex.: Pastilha de freio" />

          <Label>Marca:</Label>
          <Input value={marca} onChangeText={setMarca} placeholder="Ex.: Bosch" />

          <Label>Quantidade:</Label>
          <Input value={qtd} onChangeText={(t) => setQtd(t.replace(",", "."))} keyboardType="numeric" placeholder="Ex.: 10" />

          <Label>Quantidade mínima:</Label>
          <Input value={min} onChangeText={(t) => setMin(t.replace(",", "."))} keyboardType="numeric" placeholder="Opcional" />

          <Label>Quantidade máxima:</Label>
          <Input value={max} onChangeText={(t) => setMax(t.replace(",", "."))} keyboardType="numeric" placeholder="Opcional" />

          <PrimaryButton title={loading ? "Salvando..." : "Salvar"} color="#10B981" onPress={salvar} disabled={loading} />
        </Card>
      </ScreenWrap>
    </>
  );
}
