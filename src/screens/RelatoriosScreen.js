// src/screens/RelatoriosScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import Header from "../components/Header";
import { ScreenWrap, Card, Input, PrimaryButton, styles } from "../components/UI";
import api from "../services/api";

export default function RelatoriosScreen() {
  const [filtro, setFiltro] = useState("");
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(false);

  // Buscar todos itens do backend
  const buscarItens = async () => {
    try {
      setLoading(true);
      const res = await api.get("/cadastroProdutos");
      const dados = res.data;

      // Aplicar filtro
      const filtrados = filtro
        ? dados.filter(item =>
            (item.id && item.id.toString().includes(filtro)) ||
            (item.nome && item.nome.toLowerCase().includes(filtro.toLowerCase())) ||
            (item.lote && item.lote.toLowerCase().includes(filtro.toLowerCase())) ||
            (item.fornecedor && item.fornecedor.toLowerCase().includes(filtro.toLowerCase()))
          )
        : dados;

      setItens(filtrados);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar os itens");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarItens();
  }, []);

  const exportarCSV = () => {
    if (!itens.length) return Alert.alert("Nada para exportar");

    const header = ["ID", "Nome", "Quantidade", "Mínimo", "Máximo"];
    const rows = itens.map(i => [i.id || "-", i.nome, i.qtd, i.min_qtd || "-", i.max_qtd || "-"]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "relatorio.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Header />
      <ScreenWrap title="Relatórios">
        <Card>
          <Text style={styles.subtleTitle}>Busque pelo ID, lote, nome ou fornecedor</Text>
          <View style={[styles.searchRow, { gap: 10 }]}>
            <Input
              style={{ flex: 1 }}
              value={filtro}
              onChangeText={setFiltro}
              placeholder="Digite aqui..."
            />
            <PrimaryButton title="Filtrar" onPress={buscarItens} />
            <PrimaryButton title="Exportar Relatório" onPress={exportarCSV} />
          </View>
        </Card>

        <Card style={{ marginTop: 24, padding: 16 }}>
          {loading ? (
            <Text>Carregando...</Text>
          ) : itens.length ? (
            <ScrollView horizontal>
              <View>
                {/* Cabeçalho da tabela */}
                <View style={{ flexDirection: "row", paddingVertical: 8, borderBottomWidth: 1 }}>
                  <Text style={{ width: 50, fontWeight: "bold" }}>ID</Text>
                  <Text style={{ width: 150, fontWeight: "bold" }}>Nome</Text>
                  <Text style={{ width: 80, fontWeight: "bold" }}>Qtd</Text>
                  <Text style={{ width: 80, fontWeight: "bold" }}>Mín</Text>
                  <Text style={{ width: 80, fontWeight: "bold" }}>Máx</Text>
                </View>

                {/* Linhas da tabela */}
                {itens.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      paddingVertical: 6,
                      borderBottomWidth: index === itens.length - 1 ? 0 : 0.5,
                      borderColor: "#ccc",
                    }}
                  >
                    <Text style={{ width: 50 }}>{item.id}</Text>
                    <Text style={{ width: 150 }}>{item.nome}</Text>
                    <Text style={{ width: 80 }}>{item.qtd}</Text>
                    <Text style={{ width: 80 }}>{item.min_qtd || "-"}</Text>
                    <Text style={{ width: 80 }}>{item.max_qtd || "-"}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <Text>Nenhum item encontrado.</Text>
          )}
        </Card>
      </ScreenWrap>
    </>
  );
}
