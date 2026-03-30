import { Platform } from "react-native";

const fontFamily = Platform.select({
  ios: "System",
  default: "System",
});

const monoFamily = Platform.select({
  ios: "SF Mono",
  default: "monospace",
});

export const typography = {
  display: {
    fontFamily: monoFamily,
    fontSize: 32,
    fontWeight: "700" as const,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  title1: {
    fontFamily,
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  title2: {
    fontFamily,
    fontSize: 24,
    fontWeight: "700" as const,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  title3: {
    fontFamily,
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 25,
    letterSpacing: -0.2,
  },
  headline: {
    fontFamily,
    fontSize: 17,
    fontWeight: "600" as const,
    lineHeight: 22,
  },
  body: {
    fontFamily,
    fontSize: 15,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  callout: {
    fontFamily,
    fontSize: 13,
    fontWeight: "400" as const,
    lineHeight: 18,
  },
  caption1: {
    fontFamily,
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
  caption2: {
    fontFamily,
    fontSize: 10,
    fontWeight: "600" as const,
    lineHeight: 14,
    letterSpacing: 0.6,
  },
} as const;
