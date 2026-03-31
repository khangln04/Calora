import { View, Text, Pressable, FlatList, Dimensions, RefreshControl } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/hooks/useTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const GRID_GAP = 2;
const NUM_COLUMNS = 3;
const ITEM_SIZE = (SCREEN_WIDTH - GRID_GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

export interface GridPost {
  id: string;
  image_url: string;
  kcal: number | null;
  type: "food" | "workout";
}

interface PhotoGridProps {
  posts: GridPost[];
  onPostPress: (postId: string) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

function CalorieBadge({ kcal, type }: { kcal: number; type: "food" | "workout" }) {
  const isFood = type === "food";
  return (
    <View
      style={{
        position: "absolute",
        bottom: 4,
        right: 4,
        height: 22,
        borderRadius: 999,
        paddingHorizontal: 8,
        backgroundColor: isFood
          ? "rgba(39,196,118,0.15)"
          : "rgba(255,107,53,0.15)",
        borderWidth: 1,
        borderColor: isFood
          ? "rgba(39,196,118,0.35)"
          : "rgba(255,107,53,0.35)",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      <View
        style={{
          width: 5,
          height: 5,
          borderRadius: 3,
          backgroundColor: isFood ? "#27C476" : "#FF6B35",
        }}
      />
      <Text
        style={{
          color: isFood ? "#27C476" : "#FF6B35",
          fontSize: 10,
          fontWeight: "600",
          letterSpacing: 0.06,
        }}
      >
        {isFood ? "+" : "-"}
        {kcal}
      </Text>
    </View>
  );
}

export default function PhotoGrid({
  posts,
  onPostPress,
  onRefresh,
  refreshing = false,
}: PhotoGridProps) {
  const { colors } = useTheme();

  if (posts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-12">
        <Text style={{ color: colors.text.tertiary, fontSize: 15 }}>
          Chưa có ảnh nào — chụp bữa đầu tiên
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      numColumns={NUM_COLUMNS}
      keyExtractor={(item) => item.id}
      columnWrapperStyle={{ gap: GRID_GAP }}
      contentContainerStyle={{ gap: GRID_GAP }}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text.secondary}
          />
        ) : undefined
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPostPress(item.id)}
          style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
        >
          <Image
            source={{ uri: item.image_url }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={200}
          />
          {item.kcal != null && (
            <CalorieBadge kcal={item.kcal} type={item.type} />
          )}
        </Pressable>
      )}
    />
  );
}
