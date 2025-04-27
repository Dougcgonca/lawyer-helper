import { View, Text, StyleSheet } from "react-native";

export default function CustomHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Lawyer Helper</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#008080",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
