import { useThemeColors } from "@/lib/hooks";
import { ActivityIndicator, View } from "react-native";

export default function LoadingScreen() {
  const { theme } = useThemeColors();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
