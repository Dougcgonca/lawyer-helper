import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userData from "../../data/user.json"; // Verifique o caminho do seu arquivo JSON
import { MaterialCommunityIcons } from "@expo/vector-icons";

type User = {
  id: number;
  name: string;
};

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null); // Tipo User ou null

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      // Carregar dados do AsyncStorage
      const savedUser = await AsyncStorage.getItem("@usuario");

      if (savedUser) {
        setUser(JSON.parse(savedUser)); // Carregar usuário salvo
      } else {
        setUser(userData[0]); // Carregar dados de userData (assumindo que você tem um array com um usuário)
        await AsyncStorage.setItem("@usuario", JSON.stringify(userData[0])); // Salvar userData no AsyncStorage
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        padding: 20,
      }}
    >
      <Text>🏠Home</Text>
      <Text>
        Olá, {user?.name}. Aqui vocês poderá organizar de forma pontual seus
        prazos e afazeres do exercício de advocacia!
      </Text>
      <Text>
        Para nós, será um prazer enorme ingressar nessa caminhada com você. 🤝
      </Text>
    </View>
  );
}
