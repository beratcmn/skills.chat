export const theme = {
  colors: {
    primary: "#a78bfa",
    secondary: "#67e8f9",
    accent: "#fbbf24",
    success: "#86efac",
    error: "#fca5a5",
    warning: "#fde047",

    rose: "#fda4af",
    pink: "#f9a8d4",
    fuchsia: "#e879f9",
    purple: "#c4b5fd",
    violet: "#a78bfa",
    indigo: "#a5b4fc",
    blue: "#93c5fd",
    sky: "#7dd3fc",
    cyan: "#67e8f9",
    teal: "#5eead4",
    emerald: "#6ee7b7",
    green: "#86efac",
    lime: "#bef264",
    yellow: "#fde047",
    amber: "#fcd34d",
    orange: "#fdba74",

    text: "#f8fafc",
    textMuted: "#94a3b8",
    textDim: "#64748b",
    border: "#475569",
    borderLight: "#64748b",
  },

  gradient: {
    primary: ["#a78bfa", "#67e8f9"],
    warm: ["#fda4af", "#fcd34d"],
    cool: ["#93c5fd", "#c4b5fd"],
    nature: ["#6ee7b7", "#67e8f9"],
    sunset: ["#fda4af", "#fcd34d", "#fdba74"],
  },

  christmas: {
    treeGreen: "#22c55e",
    star: "#fcd34d",
    ornamentRed: "#ef4444",
    ornamentBlue: "#3b82f6",
    ornamentGold: "#f59e0b",
    trunk: "#92400e",
    snow: "#ffffff",
  },

  icons: {
    selected: "✓",
    cursor: "▸",
    star: "★",
    starEmpty: "☆",
    bullet: "•",
    arrow: "→",
    check: "✓",
    cross: "✗",
    spinner: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
    box: {
      topLeft: "╭",
      topRight: "╮",
      bottomLeft: "╰",
      bottomRight: "╯",
      horizontal: "─",
      vertical: "│",
    },
  },
} as const;

export type Theme = typeof theme;
export type ThemeColor = keyof typeof theme.colors;
