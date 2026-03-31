import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/hooks/useTheme";
import { useSessionStore } from "@/store/sessionStore";
import { supabase } from "@/lib/supabase";
import { analyzeImage, uploadPostImage, type AIAnalysisResult } from "@/lib/gemini";
import { useQueryClient } from "@tanstack/react-query";

export default function PreviewScreen() {
  const { colors, brand } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const user = useSessionStore((s) => s.user);

  const { uri, logType } = useLocalSearchParams<{
    uri: string;
    logType: string;
  }>();

  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [aiFailed, setAiFailed] = useState(false);
  const [description, setDescription] = useState("");

  // Editable fields
  const [foodName, setFoodName] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [carb, setCarb] = useState("");
  const [fat, setFat] = useState("");
  const [note, setNote] = useState("");

  // Auto-analyze on mount
  useEffect(() => {
    if (uri && user) {
      handleAnalyze();
    }
  }, []);

  async function handleAnalyze() {
    if (!uri || !user) return;

    setAnalyzing(true);
    setAiFailed(false);

    try {
      // Upload image first
      const imageUrl = await uploadPostImage(user.id, uri);

      // Call AI
      const result = await analyzeImage(imageUrl, description);
      setAiResult(result);

      // Populate editable fields
      setFoodName(result.name);
      setKcal(String(result.kcal));
      setProtein(String(result.protein_g));
      setCarb(String(result.carb_g));
      setFat(String(result.fat_g));
      setNote(result.note);
    } catch (err) {
      console.warn("AI analysis failed:", err);
      setAiFailed(true);
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleSave() {
    if (!user || !kcal) {
      Alert.alert("Lỗi", "Vui lòng nhập ít nhất số kcal.");
      return;
    }

    setSaving(true);
    try {
      // If AI failed, upload image now
      let imageUrl = "";
      if (aiFailed && uri) {
        imageUrl = await uploadPostImage(user.id, uri);
      }

      const { error } = await supabase.from("posts").insert({
        user_id: user.id,
        type: logType ?? "food",
        image_url: imageUrl || aiResult ? undefined : imageUrl,
        food_name: foodName || null,
        kcal: Number(kcal),
        protein_g: Number(protein) || null,
        carb_g: Number(carb) || null,
        fat_g: Number(fat) || null,
        ai_confidence: aiResult?.confidence ?? null,
        is_manual: aiFailed,
        description: description || null,
      });

      if (error) throw error;

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      queryClient.invalidateQueries({ queryKey: ["feed-posts"] });
      router.back();
    } catch (err: any) {
      Alert.alert("Lỗi", err.message ?? "Không thể lưu bài.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.base }}>
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 8 }}
        className="flex-row items-center justify-between px-4 pb-3"
      >
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: colors.text.secondary, fontSize: 15 }}>
            ← Huỷ
          </Text>
        </Pressable>
        <Text
          style={{ color: colors.text.primary, fontSize: 17, fontWeight: "600" }}
        >
          Kết quả
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Image preview */}
        {uri && (
          <View className="self-center mb-4">
            <Image
              source={{ uri }}
              style={{ width: 200, height: 200, borderRadius: 20 }}
              contentFit="cover"
            />
          </View>
        )}

        {/* AI Loading */}
        {analyzing && (
          <View className="items-center py-6">
            <ActivityIndicator size="large" color={brand.orange} />
            <Text
              style={{ color: colors.text.secondary, fontSize: 15 }}
              className="mt-3"
            >
              AI đang phân tích...
            </Text>
          </View>
        )}

        {/* AI Confidence badge */}
        {aiResult && !analyzing && (
          <View className="items-center mb-4">
            <View
              style={{ backgroundColor: brand.greenMuted }}
              className="rounded-full px-4 py-1.5"
            >
              <Text
                style={{ color: brand.green, fontSize: 13, fontWeight: "600" }}
              >
                Độ tin cậy: {aiResult.confidence}%
              </Text>
            </View>
          </View>
        )}

        {/* AI Failed fallback */}
        {aiFailed && !analyzing && (
          <View className="items-center mb-4 px-8">
            <Text
              style={{ color: brand.red, fontSize: 14, fontWeight: "600" }}
              className="mb-1"
            >
              AI không nhận dạng được
            </Text>
            <Text
              style={{ color: colors.text.secondary, fontSize: 13 }}
              className="text-center"
            >
              Hãy nhập thông tin thủ công bên dưới
            </Text>
          </View>
        )}

        {/* Editable fields */}
        {(!analyzing || aiFailed) && (
          <View className="px-6">
            {/* Food name */}
            <Text
              style={{ color: colors.text.secondary, fontSize: 13 }}
              className="mb-1.5"
            >
              Tên món
            </Text>
            <TextInput
              style={{
                backgroundColor: colors.bg.input,
                borderColor: colors.border.default,
                color: colors.text.primary,
                fontSize: 15,
              }}
              className="h-[48px] rounded-xl border px-4 mb-4"
              placeholder="Ví dụ: Phở bò"
              placeholderTextColor={colors.text.placeholder}
              value={foodName}
              onChangeText={setFoodName}
            />

            {/* Kcal — prominent */}
            <Text
              style={{ color: colors.text.secondary, fontSize: 13 }}
              className="mb-1.5"
            >
              Calo (kcal)
            </Text>
            <TextInput
              style={{
                backgroundColor: colors.bg.input,
                borderColor: brand.orange,
                color: brand.orange,
                fontSize: 24,
                fontWeight: "700",
                textAlign: "center",
              }}
              className="h-[56px] rounded-xl border mb-4"
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={colors.text.placeholder}
              value={kcal}
              onChangeText={setKcal}
            />

            {/* Macros row */}
            <View className="flex-row gap-3 mb-4">
              {[
                { label: "Protein (g)", val: protein, set: setProtein, color: brand.purple },
                { label: "Carb (g)", val: carb, set: setCarb, color: brand.yellow },
                { label: "Fat (g)", val: fat, set: setFat, color: brand.orange },
              ].map((m) => (
                <View key={m.label} className="flex-1">
                  <Text
                    style={{ color: colors.text.secondary, fontSize: 11 }}
                    className="mb-1"
                  >
                    {m.label}
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: colors.bg.input,
                      borderColor: colors.border.default,
                      color: m.color,
                      fontSize: 17,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                    className="h-[44px] rounded-xl border"
                    keyboardType="numeric"
                    value={m.val}
                    onChangeText={m.set}
                    placeholder="0"
                    placeholderTextColor={colors.text.placeholder}
                  />
                </View>
              ))}
            </View>

            {/* AI note */}
            {note ? (
              <View
                style={{
                  backgroundColor: colors.bg.card,
                  borderColor: colors.border.subtle,
                }}
                className="rounded-xl border p-3 mb-4"
              >
                <Text style={{ color: colors.text.secondary, fontSize: 13 }}>
                  {note}
                </Text>
              </View>
            ) : null}

            {/* Optional description */}
            <Text
              style={{ color: colors.text.secondary, fontSize: 13 }}
              className="mb-1.5"
            >
              Mô tả thêm (tuỳ chọn)
            </Text>
            <TextInput
              style={{
                backgroundColor: colors.bg.input,
                borderColor: colors.border.default,
                color: colors.text.primary,
                fontSize: 15,
              }}
              className="h-[48px] rounded-xl border px-4 mb-6"
              placeholder="Ví dụ: Phở tái nạm, tô lớn"
              placeholderTextColor={colors.text.placeholder}
              value={description}
              onChangeText={setDescription}
            />

            {/* Save button */}
            <Pressable
              onPress={handleSave}
              disabled={saving || analyzing}
              style={{
                backgroundColor:
                  saving || analyzing ? colors.bg.elevated : brand.orange,
                opacity: saving || analyzing ? 0.6 : 1,
              }}
              className="h-[52px] rounded-2xl items-center justify-center"
            >
              <Text
                style={{ color: "#FFF", fontSize: 17, fontWeight: "600" }}
              >
                {saving ? "Đang lưu..." : "Lưu bài"}
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
