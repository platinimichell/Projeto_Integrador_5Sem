// src/screens/HomeScreen.js
import React from "react";
import { View, Text, Alert, useWindowDimensions } from "react-native";
import Header from "../components/Header";
import { ScreenWrap, Card, SmallCard, styles } from "../components/UI";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isPhone = width < 480;
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;

  return (
    <>
      <Header />
      <ScreenWrap title="Home">
        {/* Linha 1 */}
        <View style={{ flexDirection: isDesktop ? "row" : "column" }}>
          <Card style={{ flex: 2, minHeight: isPhone ? 180 : isTablet ? 260 : 220, marginRight: isDesktop ? 16 : 0 }}>
            <View style={styles.bigPlaceholder} />
          </Card>

          <Card style={{ flex: 1, minHeight: 150, marginTop: isDesktop ? 0 : 12 }}>
            <View style={[styles.infoBlue, { padding: isPhone ? 12 : 16 }]}>
              <MaterialCommunityIcons name="cube-outline" size={isPhone ? 40 : 48} color="#64748B" style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.infoTitle, { fontSize: isPhone ? 16 : 18 }]}>Total de itens em estoque</Text>
                <Text style={styles.link} onPress={() => Alert.alert("Detalhes")}>Ver mais detalhes.</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Linha 2 */}
        <View style={{ flexDirection: isDesktop ? "row" : "column", marginTop: 12 }}>
          <SmallCard title="Itens que foram movimentados mais vezes." style={{ marginRight: isDesktop ? 16 : 0 }} onPress={() => Alert.alert("Ver mais")} />
          <SmallCard title="Itens com menor movimentação no estoque." style={{ marginRight: isDesktop ? 16 : 0, marginTop: isDesktop ? 0 : 12 }} onPress={() => Alert.alert("Ver mais")} />
          <SmallCard title="Peças com maior rotatividade no estoque." style={{ marginTop: isDesktop ? 0 : 12 }} onPress={() => Alert.alert("Ver mais")} />
        </View>

        {/* Alerta */}
        <View style={{ marginTop: 12 }}>
          <Card style={{ minHeight: isPhone ? 160 : 220 }}>
            <View style={styles.sidePanel}>
              <Text style={[styles.alertText, { fontSize: isPhone ? 16 : 18 }]}>Você tem um novo Alerta.</Text>
              <Text style={styles.link} onPress={() => Alert.alert("Alertas")}>Clique aqui para visualizar.</Text>
            </View>
          </Card>
        </View>
      </ScreenWrap>
    </>
  );
}
