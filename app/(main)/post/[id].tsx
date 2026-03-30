import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      className="items-center justify-center"
    >
      <Text style={{ color: colors.text.primary, fontSize: 20 }}>
        Chi tiết bài đăng #{id}
      </Text>
    </View>
  );
}
