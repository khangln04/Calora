import { View, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export default function BodyMetricsScreen() {
  const { colors } = useTheme();

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      className="items-center justify-center"
    >
      <Text style={{ color: colors.text.primary, fontSize: 20 }}>
        Khai báo chỉ số cơ thể
      </Text>
    </View>
  );
}
