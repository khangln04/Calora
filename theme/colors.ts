export const brand = {
  orange: "#FF6B35",
  orangeDark: "#E55A28",
  orangeLight: "#FF8C5A",
  orangeMuted: "rgba(255,107,53,0.15)",
  green: "#27C476",
  greenDark: "#1DA560",
  greenMuted: "rgba(39,196,118,0.15)",
  yellow: "#FFD60A",
  yellowMuted: "rgba(255,214,10,0.15)",
  red: "#FF3B30",
  redMuted: "rgba(255,59,48,0.15)",
  purple: "#7B61FF",
  purpleMuted: "rgba(123,97,255,0.15)",
};

export const darkTheme = {
  bg: {
    base: "#000000",
    surface: "#111111",
    elevated: "#1A1A1A",
    card: "#1A1A1A",
    input: "#1A1A1A",
    tabBar: "rgba(0,0,0,0.92)",
    modal: "#1A1A1A",
    overlay: "rgba(0,0,0,0.6)",
    scrim: "rgba(0,0,0,0.85)",
    skeleton: "#2A2A2A",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#8E8E93",
    tertiary: "#48484A",
    placeholder: "#3A3A3C",
    inverse: "#000000",
    link: "#FF6B35",
    danger: "#FF453A",
  },
  border: {
    subtle: "rgba(255,255,255,0.06)",
    default: "rgba(255,255,255,0.10)",
    strong: "rgba(255,255,255,0.18)",
    focus: "#FF6B35",
  },
  icon: {
    primary: "#FFFFFF",
    secondary: "#8E8E93",
    inactive: "#3A3A3C",
    accent: "#FF6B35",
  },
};

export const lightTheme = {
  bg: {
    base: "#F2F2F7",
    surface: "#FFFFFF",
    elevated: "#FFFFFF",
    card: "#FFFFFF",
    input: "#F2F2F7",
    tabBar: "rgba(255,255,255,0.92)",
    modal: "#FFFFFF",
    overlay: "rgba(0,0,0,0.4)",
    scrim: "rgba(0,0,0,0.5)",
    skeleton: "#E5E5EA",
  },
  text: {
    primary: "#000000",
    secondary: "#6C6C70",
    tertiary: "#AEAEB2",
    placeholder: "#C7C7CC",
    inverse: "#FFFFFF",
    link: "#FF6B35",
    danger: "#FF3B30",
  },
  border: {
    subtle: "rgba(0,0,0,0.06)",
    default: "rgba(0,0,0,0.10)",
    strong: "rgba(0,0,0,0.18)",
    focus: "#FF6B35",
  },
  icon: {
    primary: "#000000",
    secondary: "#6C6C70",
    inactive: "#C7C7CC",
    accent: "#FF6B35",
  },
};

export type ThemeColors = typeof darkTheme;
