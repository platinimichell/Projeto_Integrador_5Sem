// App.js
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const TABS = ["Home", "Entrada", "Saída", "Buscar Item", "Relatórios"];

export default function App() {
  const [tab, setTab] = useState("Home");
  const { width } = useWindowDimensions();
  const isPhone = width < 480;
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;

  return (
    <SafeAreaView style={styles.root}>
      {/* HEADER */}
      <View style={[styles.header, { paddingHorizontal: isTablet ? 20 : 12 }]}>
        <Pressable onPress={() => setTab("Home")} accessibilityRole="button">
          <Image
            source={require("./assets/logo-estoque-car.png")}
            resizeMode="contain"
            style={{
              height: isPhone ? 34 : isTablet ? 56 : 48,
              aspectRatio: 4.56,
            }}
          />
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable style={styles.profileBtn} onPress={() => Alert.alert("Perfil")}>
          <Ionicons name="person-circle-outline" size={isPhone ? 28 : 34} color="#0B3A70" />
          {!isPhone && <Text style={styles.profileText}>MEU PERFIL</Text>}
        </Pressable>
      </View>

      {/* NAVBAR (rolável no mobile) */}
      <View style={styles.navbar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navbarInner}
        >
          {TABS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setTab(item)}
              style={[styles.navItem, tab === item && styles.navItemActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: tab === item }}
            >
              <Text
                style={[
                  styles.navText,
                  isPhone && { fontSize: 15, fontWeight: "700" },
                  tab === item && styles.navTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* CONTEÚDO */}
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        {tab === "Home" && <HomeScreen isPhone={isPhone} isTablet={isTablet} isDesktop={isDesktop} />}
        {tab === "Entrada" && <EntradaScreen />}
        {tab === "Saída" && <SaidaScreen />}
        {tab === "Buscar Item" && <BuscarItemScreen />}
        {tab === "Relatórios" && <RelatoriosScreen />}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ============ HOME ============ */
function HomeScreen({ isPhone, isTablet, isDesktop }) {
  return (
    <>
      <PageTitle title="Home" isPhone={isPhone} />
      <View style={[styles.container, { paddingHorizontal: isPhone ? 12 : 16 }]}>
        {/* Linha 1: no desktop lado a lado; no mobile empilha */}
        <View style={{ flexDirection: isDesktop ? "row" : "column" }}>
          {/* Card grande */}
          <Card style={{ flex: 2, minHeight: isPhone ? 180 : isTablet ? 260 : 220, marginRight: isDesktop ? 16 : 0 }}>
            <View style={styles.bigPlaceholder} />
          </Card>

          {/* Card azul */}
          <Card style={{ flex: 1, minHeight: 150, marginTop: isDesktop ? 0 : 12 }}>
            <View style={[styles.infoBlue, { padding: isPhone ? 12 : 16 }]}>
              <MaterialCommunityIcons name="cube-outline" size={isPhone ? 40 : 48} color="#64748B" style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.infoTitle, { fontSize: isPhone ? 16 : 18 }]}>
                  Total de itens em estoque
                </Text>
                <Pressable onPress={() => Alert.alert("Detalhes")}>
                  <Text style={[styles.link, { fontSize: isPhone ? 14 : 16 }]}>Ver mais detalhes.</Text>
                </Pressable>
              </View>
            </View>
          </Card>
        </View>

        {/* Linha 2: 3 cartões (coluna no mobile) */}
        <View style={{ flexDirection: isDesktop ? "row" : "column", marginTop: 12 }}>
          <SmallCard title="Itens que foram movimentados mais vezes." style={{ marginRight: isDesktop ? 16 : 0 }} />
          <SmallCard title="Itens com menor movimentação no estoque." style={{ marginRight: isDesktop ? 16 : 0, marginTop: isDesktop ? 0 : 12 }} />
          <SmallCard title="Peças com maior rotatividade no estoque." style={{ marginTop: isDesktop ? 0 : 12 }} />
        </View>

        {/* Coluna da direita (alerta): abaixo no mobile; ao lado no desktop */}
        <View style={{ marginTop: 12 }}>
          <Card style={{ minHeight: isPhone ? 160 : 220 }}>
            <View style={styles.sidePanel}>
              <Text style={[styles.alertText, { fontSize: isPhone ? 16 : 18 }]}>
                Você tem um novo Alerta.
              </Text>
              <Pressable onPress={() => Alert.alert("Alertas")}>
                <Text style={[styles.link, { fontSize: isPhone ? 14 : 16 }]}>
                  Clique aqui para visualizar.
                </Text>
              </Pressable>
            </View>
          </Card>
        </View>
      </View>
    </>
  );
}

/* ============ ENTRADA ============ */
function EntradaScreen() {
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
      <PageTitle title="Entrada de Itens" />
      <View style={styles.container}>
        <Card style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          <Text style={styles.formTitle}>INFORMAÇÕES PARA ENTRADA</Text>

          <Label>Nome do item:</Label>
          <Input value={nome} onChangeText={setNome} placeholder="Ex.: Pastilha de freio" />

          <Label>Quantidade:</Label>
          <Input
            value={qtd}
            onChangeText={(t) => setQtd(t.replace(",", "."))}
            keyboardType={Platform.select({ web: "numeric", default: "number-pad" })}
            placeholder="Ex.: 10"
          />

          <Label>Quantidade mínima:</Label>
          <Input
            value={min}
            onChangeText={(t) => setMin(t.replace(",", "."))}
            keyboardType={Platform.select({ web: "numeric", default: "number-pad" })}
            placeholder="Opcional"
          />

          <Label>Quantidade máxima:</Label>
          <Input
            value={max}
            onChangeText={(t) => setMax(t.replace(",", "."))}
            keyboardType={Platform.select({ web: "numeric", default: "number-pad" })}
            placeholder="Opcional"
          />

          <PrimaryButton title="Salvar" color="#10B981" onPress={salvar} />
        </Card>
      </View>
    </>
  );
}

/* ============ SAÍDA ============ */
function SaidaScreen() {
  const [busca, setBusca] = useState("");

  return (
    <>
      <PageTitle title="Saída de Itens" />
      <View style={styles.container}>
        <Card style={{ padding: 16 }}>
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
      </View>
    </>
  );
}

/* ============ BUSCAR ITEM ============ */
function BuscarItemScreen() {
  const [q, setQ] = useState("");
  return (
    <>
      <PageTitle title="Buscar Itens" />
      <View style={styles.container}>
        <Card style={{ padding: 16 }}>
          <Text style={styles.sectionTitle}>Busca por Item</Text>
          <View style={styles.searchRow}>
            <Input style={{ flex: 1 }} value={q} onChangeText={setQ} placeholder="Digite o código ou nome da peça..." />
            <Pressable onPress={() => Alert.alert("Buscar", q || "vazio")} style={styles.iconButton}>
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
      </View>
    </>
  );
}

/* ============ RELATÓRIOS ============ */
function RelatoriosScreen() {
  const [filtro, setFiltro] = useState("");
  return (
    <>
      <PageTitle title="Relatórios" />
      <View style={styles.container}>
        <Card style={{ padding: 16 }}>
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
      </View>
    </>
  );
}

/* ============ BASE ============ */
function PageTitle({ title, isPhone }) {
  return (
    <View style={styles.pageTitleWrap}>
      <Text style={[styles.pageTitle, isPhone && { fontSize: 22 }]}>{title}</Text>
    </View>
  );
}
function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}
function SmallCard({ title, style }) {
  return (
    <Card style={[{ flex: 1 }, style]}>
      <Text style={{ fontSize: 15, color: "#111827", fontWeight: "500", marginBottom: 8 }}>
        {title}
      </Text>
      <Pressable onPress={() => Alert.alert("Ver mais")}>
        <Text style={styles.link}>Ver mais</Text>
      </Pressable>
    </Card>
  );
}
function Label({ children }) {
  return <Text style={{ marginTop: 10, marginBottom: 6, fontWeight: "600", color: "#111827" }}>{children}</Text>;
}
function Input(props) {
  return (
    <TextInput
      {...props}
      style={[
        {
          backgroundColor: "#F8FAFC",
          borderWidth: 1,
          borderColor: "#E5E7EB",
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: Platform.select({ web: 12, default: 10 }),
        },
        props.style,
      ]}
      placeholderTextColor="#9CA3AF"
    />
  );
}
function PrimaryButton({ title, onPress, color = "#D35400" }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: color,
          borderRadius: 10,
          alignItems: "center",
          borderWidth: 1.5,
          borderColor: "#222",
        },
        pressed && { opacity: 0.9 },
      ]}
    >
      <Text style={{ color: "#fff", fontWeight: "700" }}>{title}</Text>
    </Pressable>
  );
}
function DashedBox({ text }) {
  return (
    <View
      style={{
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#D1D5DB",
        borderRadius: 8,
        minHeight: 160,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        marginTop: 8,
      }}
    >
      <Text style={{ color: "#6B7280", textAlign: "center" }}>{text}</Text>
    </View>
  );
}

/* ============ STYLES ============ */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F3F4F6" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
  },
  profileBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  profileText: { color: "#1769D2", fontWeight: "700" },

  navbar: { backgroundColor: "#0B3A70" },
  navbarInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 18,
  },
  navItem: { paddingBottom: 4, borderBottomWidth: 2, borderBottomColor: "transparent", marginRight: 18 },
  navItemActive: { borderBottomColor: "#fff" },
  navText: { color: "#DCEAF9", fontWeight: "800", fontSize: 16 },
  navTextActive: { color: "#fff" },

  pageTitleWrap: {
    backgroundColor: "#F1EEE7",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: { fontSize: 24, fontWeight: "800" },

  container: {
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
    paddingVertical: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  bigPlaceholder: { flex: 1, borderRadius: 8, backgroundColor: "#E5E7EB" },

  infoBlue: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECF4FF",
    borderRadius: 12,
  },
  infoTitle: { fontWeight: "700", color: "#0F172A", marginBottom: 6 },

  sidePanel: { flex: 1, backgroundColor: "#E3E9F0", borderRadius: 12, padding: 16, justifyContent: "center" },
  alertText: { color: "#111827", marginBottom: 8 },

  link: { color: "#1E63D9", textDecorationLine: "underline", fontWeight: "600" },

  subtleTitle: { textAlign: "center", color: "#374151", marginBottom: 8 },
  sectionTitle: { fontSize: 20, fontWeight: "800", marginBottom: 8 },

  searchRow: { flexDirection: "row", alignItems: "center", gap: 10 },
});
