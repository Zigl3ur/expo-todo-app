import { colors } from "@/lib/colors";
import { ThemeValue } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { View, Pressable, Text, StyleSheet } from "react-native";

interface ThemeSwitcherProps {
  actualTheme: ThemeValue;
  theme: typeof colors.dark | typeof colors.light;
  onChange: (value: ThemeValue) => void;
}

export default function ThemeSwitcher({
  actualTheme,
  theme,
  onChange,
}: ThemeSwitcherProps) {
  return (
    <>
      <View style={styles.pressable}>
        <Ionicons name="color-palette" size={20} color={theme.text} />
        <Text style={[styles.text, { color: theme.text }]}>Theme</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={() => onChange("light")}
          style={[
            styles.pressable,
            {
              backgroundColor:
                actualTheme === "light" ? theme.border : theme.background,
              borderRadius: 10,
              paddingHorizontal: 15,
            },
          ]}
        >
          <Text style={[styles.text, { color: theme.text }]}>Light</Text>
        </Pressable>
        <Pressable
          onPress={() => onChange("dark")}
          style={[
            styles.pressable,
            {
              backgroundColor:
                actualTheme === "dark" ? theme.border : theme.background,
              borderRadius: 10,
              paddingHorizontal: 15,
            },
          ]}
        >
          <Text style={[styles.text, { color: theme.text }]}>Dark</Text>
        </Pressable>
        <Pressable
          onPress={() => onChange("system")}
          style={[
            styles.pressable,
            {
              backgroundColor:
                actualTheme === "system" ? theme.border : theme.background,
              borderRadius: 10,
              paddingHorizontal: 15,
            },
          ]}
        >
          <Text style={[styles.text, { color: theme.text }]}>System</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    alignContent: "center",
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
