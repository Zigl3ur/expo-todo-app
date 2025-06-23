import { useThemeColors } from "@/lib/hooks";
import { Platform, Pressable, StyleSheet, Switch, Text } from "react-native";

interface SwitchSettingsProps {
  text: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function CustomSwitch({
  text,
  value,
  onChange,
}: SwitchSettingsProps) {
  const { theme } = useThemeColors();

  return (
    <Pressable style={styles.pressable} onPress={() => onChange(!value)}>
      <Switch value={value} onValueChange={onChange} />
      <Text style={[styles.text, { color: theme.text }]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    ...Platform.select({
      android: {
        gap: 4,
      },
      ios: {
        gap: 8,
      },
    }),
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "center",
  },
});
