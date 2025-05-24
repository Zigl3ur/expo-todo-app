import { Platform, Pressable, StyleSheet, Switch, Text } from "react-native";

interface SwitchSettingsProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function SwitchSettings({
  value,
  onChange,
}: SwitchSettingsProps) {
  return (
    <Pressable style={styles.pressable}>
      <Switch value={value} onValueChange={onChange} />
      <Text style={[styles.text, { alignSelf: "center" }]}>
        Delete todo on complete
      </Text>
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
  },
});
