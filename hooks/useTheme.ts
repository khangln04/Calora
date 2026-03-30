import { useColorScheme } from "react-native";
import { useThemeStore } from "@/store/themeStore";
import { darkTheme, lightTheme, brand } from "@/theme/colors";

export function useTheme() {
  const systemScheme = useColorScheme();
  const preference = useThemeStore((s) => s.preference);

  const resolvedScheme =
    preference === "system" ? (systemScheme ?? "dark") : preference;

  const colors = resolvedScheme === "dark" ? darkTheme : lightTheme;
  const isDark = resolvedScheme === "dark";

  return { colors, brand, isDark, scheme: resolvedScheme };
}
