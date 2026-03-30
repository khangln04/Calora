import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function OnboardingScreen() {
  const { colors, brand } = useTheme();
  const router = useRouter();

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      className="items-center justify-center px-8"
    >
      <Text
        style={{ color: brand.orange, fontSize: 32, fontWeight: "700" }}
        className="mb-2"
      >
        CalSnap
      </Text>
      <Text
        style={{ color: colors.text.secondary, fontSize: 15 }}
        className="mb-12 text-center"
      >
        Chụp ảnh. Theo dõi calo. Cùng bạn bè.
      </Text>

      <Pressable
        onPress={() => router.push("/(auth)/sign-up")}
        style={{ backgroundColor: brand.orange }}
        className="w-full h-[52px] rounded-2xl items-center justify-center mb-3"
      >
        <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "600" }}>
          Đăng ký
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/(auth)/login")}
        style={{ borderColor: colors.border.default }}
        className="w-full h-[52px] rounded-2xl items-center justify-center border"
      >
        <Text
          style={{
            color: colors.text.primary,
            fontSize: 17,
            fontWeight: "600",
          }}
        >
          Đăng nhập
        </Text>
      </Pressable>
    </View>
  );
}
