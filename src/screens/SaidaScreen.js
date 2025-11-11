// src/screens/SaidaScreen.js
import React, { useState } from "react";
import { View, Text, Alert, ActivityIndicator, ScrollView, Modal, TextInput, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { ScreenWrap, Card, Input, PrimaryButton, DashedBox, styles } from "../components/UI";
import api from "../services/api";

export default function SaidaScreen() {
  const [busca, setBusca] = useState("");
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modal de quantidade
  const [modalVisible, setModalVisible] = useState(false);
  const [quantidadeBaixa, setQuantidadeBaixa] = useState("");
  const [erroQuantidade, setErroQuantidade] = useState(""); // <-- nova variável de estado

  async function buscarItem() {
    if (!busca.trim()) return Alert.alert("Informe o ID do item.");
    setLoading(true);
    setItem(null);
    try {
      const resposta = await api.get(`/cadastroProdutos/${busca}`);
      setItem(resposta.data);
    } catch (erro) {
      console.log("Erro ao buscar item:", erro.message);
      Alert.alert("Erro", "Item não encontrado!");
    } finally {
      setLoading(false);
    }
  }

  async function confirmarBaixa() {
    setErroQuantidade(""); // limpa erro anterior
    const quantidade = Number(quantidadeBaixa.replace(",", "."));

    // Verifica se a quantidade é válida
    if (!Number.isFinite(quantidade) || quantidade <= 0) {
      return setErroQuantidade("Quantidade inválida!");
    }

    // Bloqueia saída se quantidade for maior que o estoque
    if (quantidade > item.qtd) {
      return setErroQuantidade("Quantidade maior do que há no estoque, verifique");
    }

    try {
      const novaQtd = item.qtd - quantidade;

      // Atualiza o item no backend
      const resposta = await api.put(`/cadastroProdutos/${item.id}`, {
        ...item,
        qtd: novaQtd,
      });

      if (resposta.status === 200 || resposta.status === 204) {
        Alert.alert("Sucesso", `Baixa realizada! Novo estoque: ${novaQtd}`);
        setItem({ ...item, qtd: novaQtd });
      } else {
        Alert.alert("Erro", "Não foi possível atualizar o item.");
      }

      setModalVisible(false);
      setQuantidadeBaixa("");
      setErroQuantidade("");
    } catch (erro) {
      console.log("Erro ao atualizar item:", erro.message);
      Alert.alert("Erro", "Não foi possível atualizar o item.");
    }
  }

  return (
    <>
      <Header />
      <ScreenWrap title="Saída de Itens">
        {/* Busca pelo ID */}
        <Card>
          <Text style={styles.subtleTitle}>Busque pelo Id do item</Text>
          <View style={styles.searchRow}>
            <Input
              style={{ flex: 1 }}
              value={busca}
              onChangeText={setBusca}
              placeholder="Digite aqui..."
            />
            <PrimaryButton title="Buscar" onPress={buscarItem} />
          </View>
        </Card>

        {/* Item encontrado */}
        <Card style={{ marginTop: 16, padding: 16 }}>
          <Text style={styles.sectionTitle}>Item Encontrado</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#64748B" />
          ) : item ? (
            <ScrollView>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#E2E8F0",
                  paddingVertical: 8,
                }}
              >
                <Text style={{ fontSize: 16, color: "#1E293B", fontWeight: "600" }}>
                  ID: {item.id}
                </Text>
                <Text style={{ fontSize: 16, color: "#1E293B", fontWeight: "600" }}>
                  Nome: {item.nome}
                </Text>
                {item.marca && <Text style={{ color: "#475569" }}>Marca: {item.marca}</Text>}
                <Text style={{ color: "#475569" }}>Quantidade: {item.qtd}</Text>
                {item.min_qtd && <Text style={{ color: "#94A3B8" }}>Mínimo: {item.min_qtd}</Text>}
                {item.max_qtd && <Text style={{ color: "#94A3B8" }}>Máximo: {item.max_qtd}</Text>}
              </View>
              <View style={{ alignItems: "flex-end", marginTop: 16 }}>
                <PrimaryButton title="Baixar Item" color="#EF4444" onPress={() => setModalVisible(true)} />
              </View>
            </ScrollView>
          ) : (
            <DashedBox text="Nenhum item selecionado" />
          )}
        </Card>

        {/* Modal de quantidade */}
        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Card style={{ width: "80%", padding: 20 }}>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Informe a quantidade a baixar:
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                  borderRadius: 8,
                  padding: 8,
                  marginBottom: 8,
                }}
                keyboardType="numeric"
                value={quantidadeBaixa}
                onChangeText={setQuantidadeBaixa}
                placeholder="Ex.: 5"
              />
              {erroQuantidade ? (
                <Text style={{ color: "#EF4444", marginBottom: 8 }}>{erroQuantidade}</Text>
              ) : null}
              <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginRight: 12 }}>
                  <Text style={{ color: "#64748B" }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmarBaixa}>
                  <Text style={{ color: "#10B981", fontWeight: "600" }}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        </Modal>
      </ScreenWrap>
    </>
  );
}
