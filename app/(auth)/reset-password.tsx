import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordScreen() {
  const { colors, brand } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleReset() {
    if (!email.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase()
    );
    setLoading(false);

    if (error) {
      Alert.alert("Lỗi", error.message);
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <View
        style={{ flex: 1, backgroundColor: colors.bg.base }}
        className="items-center justify-center px-8"
      >
        <Text
          style={{ color: colors.text.primary, fontSize: 28, fontWeight: "700" }}
          className="mb-3 text-center"
        >
          Kiểm tra email
        </Text>
        <Text
          style={{ color: colors.text.secondary, fontSize: 15, lineHeight: 22 }}
          className="mb-8 text-center"
        >
          Chúng tôi đã gửi link đặt lại mật khẩu đến{"\n"}
          <Text style={{ color: brand.orange, fontWeight: "600" }}>
            {email.trim().toLowerCase()}
          </Text>
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{ backgroundColor: brand.orange }}
          className="w-full h-[52px] rounded-2xl items-center justify-center"
        >
          <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "600" }}>
            Quay lại đăng nhập
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-8">
          {/* Back */}
          <Pressable onPress={() => router.back()} className="mb-8">
            <Text style={{ color: colors.text.secondary, fontSize: 15 }}>
              ← Quay lại
            </Text>
          </Pressable>

          {/* Header */}
          <Text
            style={{ color: colors.text.primary, fontSize: 28, fontWeight: "700" }}
            className="mb-2"
          >
            Quên mật khẩu
          </Text>
          <Text
            style={{ color: colors.text.secondary, fontSize: 15 }}
            className="mb-8"
          >
            Nhập email để nhận link đặt lại mật khẩu
          </Text>

          {/* Email */}
          <Text
            style={{ color: colors.text.secondary, fontSize: 13 }}
            className="mb-2"
          >
            Email
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.bg.input,
              borderColor: colors.border.default,
              color: colors.text.primary,
              fontSize: 15,
            }}
            className="h-[52px] rounded-xl border px-4 mb-8"
            placeholder="email@example.com"
            placeholderTextColor={colors.text.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
          />

          {/* Submit */}
          <Pressable
            onPress={handleReset}
            disabled={loading}
            style={{
              backgroundColor: loading ? colors.bg.elevated : brand.orange,
              opacity: loading ? 0.7 : 1,
            }}
            className="h-[52px] rounded-2xl items-center justify-center"
          >
            <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "600" }}>
              {loading ? "Đang gửi..." : "Gửi link reset"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
