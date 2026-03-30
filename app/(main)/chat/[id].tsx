import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      className="items-center justify-center"
    >
      <Text style={{ color: colors.text.primary, fontSize: 20 }}>
        Chat #{id}
      </Text>
    </View>
  );
}
