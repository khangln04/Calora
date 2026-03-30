import { View, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export default function SignUpScreen() {
  const { colors } = useTheme();

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      className="items-center justify-center"
    >
      <Text style={{ color: colors.text.primary, fontSize: 20 }}>
        Đăng ký
      </Text>
    </View>
  );
}
