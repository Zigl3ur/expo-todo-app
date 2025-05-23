import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function TodoScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 25 }}>
      <Text style={styles.title}>Edit a Todo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "900",
  },
});
