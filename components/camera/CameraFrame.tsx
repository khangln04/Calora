import { useRef, useState, useCallback } from "react";
import { View, Dimensions, Pressable, Text } from "react-native";
import {
  CameraView,
  CameraType,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/hooks/useTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CAMERA_SIZE = SCREEN_WIDTH - 32;

interface CameraFrameProps {
  onCapture: (uri: string) => void;
}

export default function CameraFrame({ onCapture }: CameraFrameProps) {
  const { colors, brand } = useTheme();
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [permission, requestPermission] = useCameraPermissions();

  const flashLabels: Record<FlashMode, string> = {
    off: "Flash tắt",
    on: "Flash bật",
    auto: "Flash auto",
  };

  const cycleFlash = () => {
    const order: FlashMode[] = ["off", "on", "auto"];
    const next = order[(order.indexOf(flash) + 1) % order.length];
    setFlash(next);
  };

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });
    if (photo?.uri) {
      onCapture(photo.uri);
    }
  }, [onCapture]);

  const handlePickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled && result.assets[0]) {
      onCapture(result.assets[0].uri);
    }
  }, [onCapture]);

  // Permission not granted
  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View
        style={{
          width: CAMERA_SIZE,
          height: CAMERA_SIZE,
          backgroundColor: colors.bg.elevated,
          borderRadius: 24,
        }}
        className="items-center justify-center self-center"
      >
        <Text
          style={{ color: colors.text.secondary, fontSize: 15 }}
          className="mb-4 text-center px-6"
        >
          CalSnap cần quyền Camera để chụp ảnh đồ ăn
        </Text>
        <Pressable
          onPress={requestPermission}
          style={{ backgroundColor: brand.orange }}
          className="h-[44px] rounded-xl px-6 items-center justify-center"
        >
          <Text style={{ color: "#FFF", fontSize: 15, fontWeight: "600" }}>
            Cho phép Camera
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="self-center">
      {/* Camera viewport */}
      <View
        style={{
          width: CAMERA_SIZE,
          height: CAMERA_SIZE,
          borderRadius: 24,
          overflow: "hidden",
        }}
      >
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={facing}
          flash={flash}
        />
      </View>

      {/* Controls below camera */}
      <View className="flex-row items-center justify-between mt-3 px-2">
        {/* Gallery */}
        <Pressable
          onPress={handlePickImage}
          style={{
            backgroundColor: "rgba(0,0,0,0.45)",
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
          className="items-center justify-center"
        >
          <Text style={{ color: "#FFF", fontSize: 18 }}>🖼</Text>
        </Pressable>

        {/* Shutter */}
        <Pressable
          onPress={handleCapture}
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: brand.orange,
            shadowColor: brand.orange,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.35,
            shadowRadius: 12,
            elevation: 6,
          }}
          className="items-center justify-center"
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: "rgba(255,255,255,0.25)",
            }}
          />
        </Pressable>

        {/* Flip */}
        <Pressable
          onPress={() => setFacing(facing === "back" ? "front" : "back")}
          style={{
            backgroundColor: "rgba(0,0,0,0.45)",
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
          className="items-center justify-center"
        >
          <Text style={{ color: "#FFF", fontSize: 16 }}>🔄</Text>
        </Pressable>
      </View>

      {/* Flash toggle */}
      <Pressable
        onPress={cycleFlash}
        className="self-center mt-2"
      >
        <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
          {flashLabels[flash]}
        </Text>
      </Pressable>
    </View>
  );
}
