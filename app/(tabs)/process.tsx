import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import processData from "../../data/process.json";

type Process = {
  id: number;
  client: string;
  process_number: string;
  court: string;
  type: string;
  data: string;
  status: string;
};

export default function ProcessosScreen() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [isFormVisible, setFormVisible] = useState(false); // Controla a visibilidade do formulário
  const [newProcess, setNewProcess] = useState<Process>({
    id: 0,
    client: "",
    process_number: "",
    court: "",
    type: "",
    data: "",
    status: "",
  });

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const savedProcesses = await AsyncStorage.getItem("@processos");
      if (savedProcesses !== null) {
        setProcesses(JSON.parse(savedProcesses));
      } else {
        setProcesses(processData);
        await AsyncStorage.setItem("@processos", JSON.stringify(processData));
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  // Função para adicionar um novo processo
  const adicionarProcesso = async () => {
    const newId = processes.length + 1; // Gerar ID simples, baseado no número de processos
    const newProcesso = { ...newProcess, id: newId };

    const updatedProcesses = [...processes, newProcesso];
    setProcesses(updatedProcesses);
    await AsyncStorage.setItem("@processos", JSON.stringify(updatedProcesses));

    setFormVisible(false); // Esconde o formulário após adicionar
    setNewProcess({
      id: 0,
      client: "",
      process_number: "",
      court: "",
      type: "",
      data: "",
      status: "",
    }); // Limpa os campos
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "stretch", // Certifica que o conteúdo ocupe toda a largura da tela
      }}
    >
      <Text style={{ fontSize: 30 }}>📄Processos</Text>

      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            paddingBottom: 5,
          }}
        >
          <Text style={styles.tableHeader}>Cliente</Text>
          <Text style={styles.tableHeader}>Tribunal</Text>
          <Text style={styles.tableHeader}>Nº do Processo</Text>
          <Text style={styles.tableHeader}>Data</Text>
          <Text style={styles.tableHeader}>Tipo</Text>
          <Text style={styles.tableHeader}>Status</Text>
        </View>

        {processes.length > 0 ? (
          processes.map((processo) => (
            <View
              key={processo.id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingVertical: 5,
              }}
            >
              <Text style={styles.tableCell}>{processo.client}</Text>
              <Text style={styles.tableCell}>{processo.court}</Text>
              <Text style={styles.tableCell}>{processo.process_number}</Text>
              <Text style={styles.tableCell}>{processo.data}</Text>
              <Text style={styles.tableCell}>{processo.type}</Text>
              <Text style={styles.tableCell}>{processo.status}</Text>
            </View>
          ))
        ) : (
          <Text>Nenhum processo encontrado.</Text>
        )}
      </View>

      {isFormVisible ? (
        <View>
          <Text>Adicionar Novo Processo</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 8, margin: 5 }}
            placeholder="Cliente"
            value={newProcess.client}
            onChangeText={(text) =>
              setNewProcess({ ...newProcess, client: text })
            }
          />
          <TextInput
            style={{ borderWidth: 1, padding: 8, margin: 5 }}
            placeholder="Número do Processo"
            value={newProcess.process_number}
            onChangeText={(text) =>
              setNewProcess({ ...newProcess, process_number: text })
            }
          />
          <TextInput
            style={{ borderWidth: 1, padding: 8, margin: 5 }}
            placeholder="Tribunal"
            value={newProcess.court}
            onChangeText={(text) =>
              setNewProcess({ ...newProcess, court: text })
            }
          />
          <TextInput
            style={{ borderWidth: 1, padding: 8, margin: 5 }}
            placeholder="Tipo"
            value={newProcess.type}
            onChangeText={(text) =>
              setNewProcess({ ...newProcess, type: text })
            }
          />
          <TextInput
            style={{ borderWidth: 1, padding: 8, margin: 5 }}
            placeholder="Data"
            value={newProcess.data}
            onChangeText={(text) =>
              setNewProcess({ ...newProcess, data: text })
            }
          />
          <TextInput
            style={{ borderWidth: 1, padding: 8, margin: 5 }}
            placeholder="Status"
            value={newProcess.status}
            onChangeText={(text) =>
              setNewProcess({ ...newProcess, status: text })
            }
          />
          <Button title="Salvar Processo" onPress={adicionarProcesso} />
          <Button title="Cancelar" onPress={() => setFormVisible(false)} />
        </View>
      ) : (
        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setFormVisible(true)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#53a2ec",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginRight: 20,
    marginBottom: 20,
  },
  addButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 25, // Ícone de "+"
  },
  tableHeader: {
    fontWeight: "bold",
    width: "15%", // Ajuste o tamanho conforme necessário
    textAlign: "center",
  },
  tableCell: {
    width: "15%", // Ajuste o tamanho conforme necessário
    textAlign: "center",
  },
});
