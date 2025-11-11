// src/screens/BuscarItemScreen.js
import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import Header from "../components/Header";
import { ScreenWrap, Card, Input, PrimaryButton, styles } from "../components/UI";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

export default function BuscarItemScreen() {
  const [id, setId] = useState("");
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  async function buscarItem() {
    if (!id.trim()) return Alert.alert("Informe o ID do item.");

    try {
      setLoading(true);

      // Certifique-se de concatenar o ID corretamente
      const resposta = await api.get(`/cadastroProdutos/${id}`);

      if (!resposta.data) {
        Alert.alert("Item não encontrado");
        setItem(null);
      } else {
        setItem(resposta.data);
      }
    } catch (erro) {
      console.log("Erro ao buscar item:", erro.message);
      Alert.alert("Erro", "Não foi possível buscar o item.");
      setItem(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <ScreenWrap title="Buscar Itens">
        {/* Bloco de busca */}
        <Card>
          <Text style={styles.sectionTitle}>Busca por ID</Text>
          <View style={styles.searchRow}>
            <Input
              style={{ flex: 1 }}
              value={id}
              onChangeText={setId}
              placeholder="Digite o ID do item..."
              keyboardType="numeric"
            />
            <Pressable
              onPress={buscarItem}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor: "#D35400",
                borderRadius: 10,
                alignItems: "center",
                borderWidth: 1.5,
                borderColor: "#222",
              }}
            >
              <Ionicons name="search" size={20} color="#fff" />
            </Pressable>
          </View>
        </Card>

        {/* Bloco de resultado */}
        <Card style={{ marginTop: 24, minHeight: 100 }}>
          <Text style={styles.sectionTitle}>Item Encontrado</Text>
          {loading ? (
            <Text style={{ textAlign: "center", marginTop: 16 }}>Carregando...</Text>
          ) : item ? (
            <Card style={{ marginTop: 8, padding: 12 }}>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>{item.nome}</Text>
              {item.marca && <Text>Marca: {item.marca}</Text>}
              <Text>Quantidade: {item.qtd}</Text>
              {item.min_qtd !== undefined && <Text>Qtd. mínima: {item.min_qtd}</Text>}
              {item.max_qtd !== undefined && <Text>Qtd. máxima: {item.max_qtd}</Text>}
            </Card>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 16, color: "#64748B" }}>
              Nenhum item carregado.
            </Text>
          )}
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <PrimaryButton title="Gerar lista" onPress={() => Alert.alert("Gerar lista")} />
          </View>
        </Card>
      </ScreenWrap>
    </>
  );
}
