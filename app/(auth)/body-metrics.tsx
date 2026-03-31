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
import { useSessionStore } from "@/store/sessionStore";

type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "moderate" | "active" | "very_active";
type Goal = "lose" | "gain" | "maintain";

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string }[] = [
  { value: "sedentary", label: "Ít vận động" },
  { value: "moderate", label: "Vừa phải" },
  { value: "active", label: "Năng động" },
  { value: "very_active", label: "Rất năng động" },
];

const GOAL_OPTIONS: { value: Goal; label: string; desc: string }[] = [
  { value: "lose", label: "Giảm cân", desc: "-400 kcal/ngày" },
  { value: "gain", label: "Tăng cơ", desc: "+250 kcal/ngày" },
  { value: "maintain", label: "Duy trì", desc: "= TDEE" },
];

function calculateTDEE(
  gender: Gender,
  weightKg: number,
  heightCm: number,
  age: number,
  activity: ActivityLevel
): number {
  // Harris-Benedict formula
  let bmr: number;
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  }

  const multipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  return Math.round(bmr * multipliers[activity]);
}

function getTargetKcal(tdee: number, goal: Goal): number {
  if (goal === "lose") return tdee - 400;
  if (goal === "gain") return tdee + 250;
  return tdee;
}

export default function BodyMetricsScreen() {
  const { colors, brand } = useTheme();
  const router = useRouter();
  const user = useSessionStore((s) => s.user);

  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [loading, setLoading] = useState(false);

  // Live TDEE calculation
  const canCalc =
    Number(age) > 0 && Number(weight) > 0 && Number(height) > 0;
  const tdee = canCalc
    ? calculateTDEE(gender, Number(weight), Number(height), Number(age), activity)
    : 0;
  const targetKcal = canCalc ? getTargetKcal(tdee, goal) : 0;

  async function handleSave() {
    if (!canCalc) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (!user) {
      Alert.alert("Lỗi", "Không tìm thấy session. Vui lòng đăng nhập lại.");
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("users")
      .update({
        gender,
        age: Number(age),
        weight_kg: Number(weight),
        height_cm: Number(height),
        activity_level: activity,
        goal,
        tdee_kcal: tdee,
        target_kcal: targetKcal,
      })
      .eq("id", user.id);
    setLoading(false);

    if (error) {
      Alert.alert("Lỗi", error.message);
      return;
    }

    // Small delay to let AuthGate re-check hasProfile
    setTimeout(() => {
      router.replace("/(main)");
    }, 300);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg.base }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ paddingVertical: 60 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-8">
          {/* Header */}
          <Text
            style={{ color: colors.text.primary, fontSize: 28, fontWeight: "700" }}
            className="mb-2"
          >
            Chỉ số cơ thể
          </Text>
          <Text
            style={{ color: colors.text.secondary, fontSize: 15 }}
            className="mb-8"
          >
            Giúp AI tính toán mục tiêu calo phù hợp cho bạn
          </Text>

          {/* Gender */}
          <Text
            style={{ color: colors.text.secondary, fontSize: 13 }}
            className="mb-2"
          >
            Giới tính
          </Text>
          <View className="flex-row gap-3 mb-5">
            {(["male", "female"] as Gender[]).map((g) => (
              <Pressable
                key={g}
                onPress={() => setGender(g)}
                style={{
                  backgroundColor:
                    gender === g ? brand.orange : colors.bg.input,
                  borderColor:
                    gender === g ? brand.orange : colors.border.default,
                }}
                className="flex-1 h-[48px] rounded-xl border items-center justify-center"
              >
                <Text
                  style={{
                    color: gender === g ? "#FFFFFF" : colors.text.primary,
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  {g === "male" ? "Nam" : "Nữ"}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Age, Weight, Height — 3 columns */}
          <View className="flex-row gap-3 mb-5">
            {[
              { label: "Tuổi", value: age, set: setAge, unit: "" },
              { label: "Cân nặng", value: weight, set: setWeight, unit: "kg" },
              { label: "Chiều cao", value: height, set: setHeight, unit: "cm" },
            ].map((field) => (
              <View key={field.label} className="flex-1">
                <Text
                  style={{ color: colors.text.secondary, fontSize: 13 }}
                  className="mb-2"
                >
                  {field.label}
                  {field.unit ? ` (${field.unit})` : ""}
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.bg.input,
                    borderColor: colors.border.default,
                    color: colors.text.primary,
                    fontSize: 15,
                  }}
                  className="h-[48px] rounded-xl border px-3 text-center"
                  keyboardType="numeric"
                  value={field.value}
                  onChangeText={field.set}
                  placeholder="—"
                  placeholderTextColor={colors.text.placeholder}
                />
              </View>
            ))}
          </View>

          {/* Activity Level */}
          <Text
            style={{ color: colors.text.secondary, fontSize: 13 }}
            className="mb-2"
          >
            Mức độ vận động
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-5">
            {ACTIVITY_OPTIONS.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => setActivity(opt.value)}
                style={{
                  backgroundColor:
                    activity === opt.value ? brand.orange : colors.bg.input,
                  borderColor:
                    activity === opt.value
                      ? brand.orange
                      : colors.border.default,
                }}
                className="h-[40px] rounded-full border px-4 items-center justify-center"
              >
                <Text
                  style={{
                    color:
                      activity === opt.value ? "#FFFFFF" : colors.text.primary,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Goal */}
          <Text
            style={{ color: colors.text.secondary, fontSize: 13 }}
            className="mb-2"
          >
            Mục tiêu
          </Text>
          <View className="gap-2 mb-6">
            {GOAL_OPTIONS.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => setGoal(opt.value)}
                style={{
                  backgroundColor:
                    goal === opt.value ? brand.orangeMuted : colors.bg.input,
                  borderColor:
                    goal === opt.value ? brand.orange : colors.border.default,
                }}
                className="h-[52px] rounded-xl border px-4 flex-row items-center justify-between"
              >
                <Text
                  style={{
                    color:
                      goal === opt.value ? brand.orange : colors.text.primary,
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  {opt.label}
                </Text>
                <Text
                  style={{
                    color:
                      goal === opt.value
                        ? brand.orange
                        : colors.text.secondary,
                    fontSize: 13,
                  }}
                >
                  {opt.desc}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* TDEE Result */}
          {canCalc && (
            <View
              style={{
                backgroundColor: colors.bg.card,
                borderColor: colors.border.subtle,
              }}
              className="rounded-2xl border p-5 mb-8 items-center"
            >
              <Text
                style={{ color: colors.text.secondary, fontSize: 13 }}
                className="mb-1"
              >
                TDEE của bạn
              </Text>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 20,
                  fontWeight: "600",
                }}
                className="mb-3"
              >
                {tdee.toLocaleString()} kcal/ngày
              </Text>
              <View
                style={{ backgroundColor: brand.orangeMuted }}
                className="rounded-full px-4 py-2"
              >
                <Text
                  style={{
                    color: brand.orange,
                    fontSize: 17,
                    fontWeight: "700",
                  }}
                >
                  Mục tiêu: {targetKcal.toLocaleString()} kcal/ngày
                </Text>
              </View>
            </View>
          )}

          {/* Save */}
          <Pressable
            onPress={handleSave}
            disabled={loading || !canCalc}
            style={{
              backgroundColor:
                loading || !canCalc ? colors.bg.elevated : brand.orange,
              opacity: loading || !canCalc ? 0.5 : 1,
            }}
            className="h-[52px] rounded-2xl items-center justify-center"
          >
            <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "600" }}>
              {loading ? "Đang lưu..." : "Bắt đầu dùng CalSnap"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
