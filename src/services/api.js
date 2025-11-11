// src/services/api.js
import axios from "axios";
import { Platform } from "react-native";

let baseURL = "http://localhost:3000"; // padrão para web e iOS

if (Platform.OS === "android") {
  baseURL = "http://10.0.2.2:3000"; // emulador Android oficial
}

const api = axios.create({
  baseURL,
});

export default api;
