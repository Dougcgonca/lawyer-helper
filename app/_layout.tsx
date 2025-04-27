import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import userData from "../data/user.json";

export default function RootLayout() {
  // const [user, setUser] = useState(null);
  // const [settings, setSettings] = useState(null);

  // useEffect(() => {
  //   carregarDados();
  // }, []);

  // async function carregarDados() {
  //   try {
  //     // Carregar usuário
  //     const usuarioSalvo = await AsyncStorage.getItem("@usuario");
  //     if (usuarioSalvo !== null) {
  //       setUser(JSON.parse(usuarioSalvo));
  //     } else {
  //       setUser(userData);
  //       await AsyncStorage.setItem("@usuario", JSON.stringify(userData));
  //     }

  //     // Carregar configurações
  //     const settingsSalvos = await AsyncStorage.getItem("@configuracoes");
  //     if (settingsSalvos !== null) {
  //       setSettings(JSON.parse(settingsSalvos));
  //     } else {
  //       setSettings(settingsData);
  //       await AsyncStorage.setItem(
  //         "@configuracoes",
  //         JSON.stringify(processData)
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Erro ao carregar dados:", error);
  //   }
  // }
  return <Stack screenOptions={{ headerShown: false }} />;
}
