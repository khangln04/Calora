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

export default function SignUpScreen() {
  const { colors, brand } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignUp() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
    });
    setLoading(false);

    if (error) {
      const msg = error.message.includes("already registered")
        ? "Email này đã được đăng ký. Hãy đăng nhập hoặc dùng email khác."
        : error.message;
      Alert.alert("Đăng ký thất bại", msg);
      return;
    }

    // Sau khi đăng ký thành công → chuyển đến Body Metrics
    router.replace("/(auth)/body-metrics");
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
            Tạo tài khoản
          </Text>
          <Text
            style={{ color: colors.text.secondary, fontSize: 15 }}
            className="mb-8"
          >
            Bắt đầu theo dõi calo cùng bạn bè
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
          <View className="relative mb-4">
            <TextInput
              style={{
                backgroundColor: colors.bg.input,
                borderColor: colors.border.default,
                color: colors.text.primary,
                fontSize: 15,
              }}
              className="h-[52px] rounded-xl border px-4 pr-14"
              placeholder="Tối thiểu 6 ký tự"
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

          {/* Confirm Password */}
          <Text
            style={{ color: colors.text.secondary, fontSize: 13 }}
            className="mb-2"
          >
            Xác nhận mật khẩu
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.bg.input,
              borderColor: colors.border.default,
              color: colors.text.primary,
              fontSize: 15,
            }}
            className="h-[52px] rounded-xl border px-4 mb-8"
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor={colors.text.placeholder}
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Submit */}
          <Pressable
            onPress={handleSignUp}
            disabled={loading}
            style={{
              backgroundColor: loading ? colors.bg.elevated : brand.orange,
              opacity: loading ? 0.7 : 1,
            }}
            className="h-[52px] rounded-2xl items-center justify-center mb-4"
          >
            <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "600" }}>
              {loading ? "Đang tạo..." : "Đăng ký"}
            </Text>
          </Pressable>

          {/* Back to Login */}
          <Pressable onPress={() => router.back()} className="items-center py-2">
            <Text style={{ color: colors.text.secondary, fontSize: 15 }}>
              Đã có tài khoản?{" "}
              <Text style={{ color: brand.orange, fontWeight: "600" }}>
                Đăng nhập
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
