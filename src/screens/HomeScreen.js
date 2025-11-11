// src/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  useWindowDimensions,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import Header from "../components/Header";
import { ScreenWrap, Card, SmallCard, styles } from "../components/UI";
import api from "../services/api";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isPhone = width < 480;
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;

  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const resposta = await api.get("/cadastroProdutos");
      setItens(resposta.data || []); // salva a lista inteira
    } catch (erro) {
      console.log("Erro ao buscar produtos:", erro.message);
      Alert.alert("Erro", "Não foi possível carregar os dados do estoque!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <ScreenWrap title="Home">
        {/* Linha 1 */}
        <View style={{ flexDirection: isDesktop ? "row" : "column" }}>
          <Card
            style={{
              flex: 2,
              minHeight: isPhone ? 180 : isTablet ? 260 : 220,
              marginRight: isDesktop ? 16 : 0,
              padding: 16,
            }}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#64748B" />
            ) : itens.length === 0 ? (
              <Text style={{ fontSize: 16, color: "#64748B" }}>
                Nenhum produto encontrado.
              </Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  {/* Cabeçalho da tabela */}
                  <View style={tableStyles.rowHeader}>
                    <Text style={[tableStyles.cell, { flex: 0.5 }]}>id</Text>
                    <Text style={[tableStyles.cell, { flex: 3 }]}>Nome</Text>
                    <Text style={[tableStyles.cell, { flex: 2 }]}>Marca</Text>
                    <Text style={[tableStyles.cell, { flex: 1 }]}>Quantidade</Text>
                    <Text style={[tableStyles.cell, { flex: 1.5 }]}>Quantidade mínima</Text>
                    <Text style={[tableStyles.cell, { flex: 1.5 }]}>Quantidade máxima</Text>
                    <Text style={[tableStyles.cell, { flex: 2 }]}>Entrada</Text>
                    <Text style={[tableStyles.cell, { flex: 2 }]}>Atualizado</Text>
                  </View>

                  {/* Linhas da tabela */}
                  {itens.map((item, index) => (
                    <View
                      key={item.id}
                      style={[
                        tableStyles.row,
                        index % 2 === 1 && tableStyles.rowAlternate,
                        item.qtd < item.min_qtd && tableStyles.rowAlert,
                      ]}
                    >
                      <Text style={[tableStyles.cell, { flex: 0.5 }]}>{item.id}</Text>
                      <Text style={[tableStyles.cell, { flex: 3 }]}>{item.nome}</Text>
                      <Text style={[tableStyles.cell, { flex: 2 }]}>{item.marca}</Text>
                      <Text style={[tableStyles.cell, { flex: 1, textAlign: "center" }]}>
                        {item.qtd}
                      </Text>
                      <Text style={[tableStyles.cell, { flex: 1.5, textAlign: "center" }]}>
                        {item.min_qtd}
                      </Text>
                      <Text style={[tableStyles.cell, { flex: 1.5, textAlign: "center" }]}>
                        {item.max_qtd}
                      </Text>
                      <Text style={[tableStyles.cell, { flex: 2 }]}>
                        {new Date(item.createdAt).toLocaleString()}
                      </Text>
                      <Text style={[tableStyles.cell, { flex: 2 }]}>
                        {new Date(item.updatedAt).toLocaleString()}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </Card>
        </View>

        {/* Linha 2 */}
        <View
          style={{
            flexDirection: isDesktop ? "row" : "column",
            marginTop: 12,
          }}
        >
          <SmallCard
            title="Itens que foram movimentados mais vezes."
            style={{ marginRight: isDesktop ? 16 : 0 }}
            onPress={() => Alert.alert("Ver mais")}
          />
          <SmallCard
            title="Itens com menor movimentação no estoque."
            style={{
              marginRight: isDesktop ? 16 : 0,
              marginTop: isDesktop ? 0 : 12,
            }}
            onPress={() => Alert.alert("Ver mais")}
          />
          <SmallCard
            title="Peças com maior rotatividade no estoque."
            style={{ marginTop: isDesktop ? 0 : 12 }}
            onPress={() => Alert.alert("Ver mais")}
          />
        </View>

        {/* Alerta */}
        <View style={{ marginTop: 12 }}>
          <Card style={{ minHeight: isPhone ? 160 : 220 }}>
            <View style={styles.sidePanel}>
              <Text style={[styles.alertText, { fontSize: isPhone ? 16 : 18 }]}>
                Você tem um novo Alerta.
              </Text>
              <Text style={styles.link} onPress={() => Alert.alert("Alertas")}>
                Clique aqui para visualizar.
              </Text>
            </View>
          </Card>
        </View>
      </ScreenWrap>
    </>
  );
}

const tableStyles = StyleSheet.create({
  rowHeader: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  rowAlternate: {
    backgroundColor: "#f9fafb", // fundo leve para linhas pares
  },
  rowAlert: {
    backgroundColor: "#FFF4F4", // vermelho leve para alertar estoque baixo
  },
  cell: {
    color: "#1e293b",
    fontWeight: "600",
    fontSize: 14,
    paddingHorizontal: 8,
  },
});
