import { colors } from "@/lib/colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Pressable, Text, StyleSheet, ColorValue } from "react-native";

interface ColorSelectorProps {
  theme: typeof colors.dark | typeof colors.light;
  color: ColorValue;
  onChange: (value: ColorValue) => void;
}

export default function ColorSelector({
  theme,
  color,
  onChange,
}: ColorSelectorProps) {
  return (
    <>
      <View style={styles.pressable}>
        <Ionicons name="color-palette" size={20} color={theme.text} />
        <Text style={[styles.text, { color: theme.text }]}>
          Todo priority color
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
        <Pressable
          onPress={() => onChange(colors.priorityColors[0].value)}
          style={[
            styles.colorButton,
            {
              backgroundColor:
                color === colors.priorityColors[0].value
                  ? colors.priorityColors[0].value
                  : theme.background,
            },
          ]}
        >
          <Text style={[styles.text, { color: theme.text }]}>
            {colors.priorityColors[0].name}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onChange(colors.priorityColors[1].value)}
          style={[
            styles.colorButton,
            {
              backgroundColor:
                color === colors.priorityColors[1].value
                  ? colors.priorityColors[1].value
                  : theme.background,
            },
          ]}
        >
          <Text style={[styles.text, { color: theme.text }]}>
            {colors.priorityColors[1].name}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onChange(colors.priorityColors[2].value)}
          style={[
            styles.colorButton,
            {
              backgroundColor:
                color === colors.priorityColors[2].value
                  ? colors.priorityColors[2].value
                  : theme.background,
            },
          ]}
        >
          <Text style={[styles.text, { color: theme.text }]}>
            {colors.priorityColors[2].name}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onChange(colors.priorityColors[3].value)}
          style={[
            styles.colorButton,
            {
              backgroundColor:
                color === colors.priorityColors[3].value
                  ? colors.priorityColors[3].value
                  : theme.background,
            },
          ]}
        >
          <Text style={[styles.text, { color: theme.text }]}>
            {colors.priorityColors[3].name}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onChange(colors.priorityColors[4].value)}
          style={[
            styles.colorButton,
            {
              backgroundColor:
                color === colors.priorityColors[4].value
                  ? colors.priorityColors[4].value
                  : theme.background,
            },
          ]}
        >
          <Text style={[styles.text, { color: theme.text }]}>
            {colors.priorityColors[4].name}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onChange(colors.priorityColors[5].value)}
          style={[
            styles.colorButton,
            {
              backgroundColor:
                color === colors.priorityColors[5].value
                  ? colors.priorityColors[5].value
                  : theme.background,
            },
          ]}
        >
          <Text style={[styles.text, { color: theme.text }]}>
            {colors.priorityColors[5].name}
          </Text>
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

  colorButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
