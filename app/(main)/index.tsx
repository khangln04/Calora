import { useState, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/hooks/useTheme";
import { useSessionStore } from "@/store/sessionStore";
import { supabase } from "@/lib/supabase";
import CameraFrame from "@/components/camera/CameraFrame";
import PhotoGrid, { type GridPost } from "@/components/feed/PhotoGrid";

type LogType = "food" | "workout";

export default function CameraScreen() {
  const { colors, brand } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useSessionStore((s) => s.user);

  const [logType, setLogType] = useState<LogType>("food");

  // Fetch posts for grid
  const {
    data: posts = [],
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["feed-posts", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("posts")
        .select("id, image_url, kcal, type")
        .order("created_at", { ascending: false })
        .limit(30);
      if (error) throw error;
      return (data ?? []) as GridPost[];
    },
    enabled: !!user,
  });

  const handleCapture = useCallback(
    (uri: string) => {
      router.push({
        pathname: "/(main)/preview",
        params: { uri, logType },
      });
    },
    [logType, router]
  );

  const handlePostPress = useCallback(
    (postId: string) => {
      router.push({ pathname: "/(main)/post/[id]", params: { id: postId } });
    },
    [router]
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.base }}>
      {/* Top Bar */}
      <View
        style={{ paddingTop: insets.top + 8 }}
        className="flex-row items-center justify-between px-4 pb-3"
      >
        <Pressable
          onPress={() => router.push("/(main)/friends")}
          style={{
            backgroundColor: "rgba(0,0,0,0.45)",
            width: 36,
            height: 36,
            borderRadius: 18,
          }}
          className="items-center justify-center"
        >
          <Text style={{ color: "#FFF", fontSize: 16 }}>+</Text>
        </Pressable>

        <Text
          style={{ color: brand.orange, fontSize: 20, fontWeight: "700" }}
        >
          CalSnap
        </Text>

        <Pressable
          onPress={() => router.push("/(main)/profile")}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: brand.orange,
          }}
          className="items-center justify-center"
        >
          <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "700" }}>
            {user?.email?.charAt(0).toUpperCase() ?? "?"}
          </Text>
        </Pressable>
      </View>

      {/* Camera */}
      <CameraFrame onCapture={handleCapture} />

      {/* Type Toggle */}
      <View className="flex-row self-center mt-3 gap-2">
        {(["food", "workout"] as LogType[]).map((t) => (
          <Pressable
            key={t}
            onPress={() => setLogType(t)}
            style={{
              backgroundColor:
                logType === t ? brand.orangeMuted : colors.bg.input,
              borderColor:
                logType === t ? brand.orange : colors.border.default,
            }}
            className="h-[36px] rounded-full border px-4 items-center justify-center"
          >
            <Text
              style={{
                color: logType === t ? brand.orange : colors.text.secondary,
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              {t === "food" ? "🍜 Đồ ăn" : "💪 Tập luyện"}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Photo Grid */}
      <View className="flex-1 mt-3">
        <PhotoGrid
          posts={posts}
          onPostPress={handlePostPress}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      </View>
    </View>
  );
}
