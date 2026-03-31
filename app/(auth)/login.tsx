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

export default function LoginScreen() {
  const { colors, brand } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    setLoading(false);

    if (error) {
      Alert.alert("Đăng nhập thất bại", error.message);
    }
    // Nếu thành công → AuthGate tự redirect sang (main)
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
          {/* Header */}
          <Text
            style={{ color: colors.text.primary, fontSize: 28, fontWeight: "700" }}
            className="mb-2"
          >
            Đăng nhập
          </Text>
          <Text
            style={{ color: colors.text.secondary, fontSize: 15 }}
            className="mb-8"
          >
            Chào mừng trở lại CalSnap
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
            className="h-[52px] rounded-xl border px-4 mb-4"
            placeholder="email@example.com"
            placeholderTextColor={colors.text.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password */}
          <Text
            style={{ color: colors.text.secondary, fontSize: 13 }}
            className="mb-2"
          >
            Mật khẩu
          </Text>
          <View className="relative mb-2">
            <TextInput
              style={{
                backgroundColor: colors.bg.input,
                borderColor: colors.border.default,
                color: colors.text.primary,
                fontSize: 15,
              }}
              className="h-[52px] rounded-xl border px-4 pr-14"
              placeholder="Nhập mật khẩu"
              placeholderTextColor={colors.text.placeholder}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-0 bottom-0 justify-center"
            >
              <Text style={{ color: colors.text.secondary, fontSize: 13 }}>
                {showPassword ? "Ẩn" : "Hiện"}
              </Text>
            </Pressable>
          </View>

          {/* Forgot password */}
          <Pressable
            onPress={() => router.push("/(auth)/reset-password")}
            className="items-end mb-8"
          >
            <Text style={{ color: brand.orange, fontSize: 13, fontWeight: "500" }}>
              Quên mật khẩu?
            </Text>
          </Pressable>

          {/* Submit */}
          <Pressable
            onPress={handleLogin}
            disabled={loading}
            style={{
              backgroundColor: loading ? colors.bg.elevated : brand.orange,
              opacity: loading ? 0.7 : 1,
            }}
            className="h-[52px] rounded-2xl items-center justify-center mb-4"
          >
            <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "600" }}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Text>
          </Pressable>

          {/* Back to Sign Up */}
          <Pressable
            onPress={() => router.back()}
            className="items-center py-2"
          >
            <Text style={{ color: colors.text.secondary, fontSize: 15 }}>
              Chưa có tài khoản?{" "}
              <Text style={{ color: brand.orange, fontWeight: "600" }}>
                Đăng ký
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
