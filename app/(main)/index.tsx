import { View, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export default function CameraScreen() {
  const { colors, brand } = useTheme();

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      className="items-center justify-center"
    >
      <Text
        style={{ color: brand.orange, fontSize: 28, fontWeight: "700" }}
        className="mb-2"
      >
        CalSnap
      </Text>
      <Text style={{ color: colors.text.secondary, fontSize: 15 }}>
        Màn Camera chính
      </Text>
    </View>
  );
}
