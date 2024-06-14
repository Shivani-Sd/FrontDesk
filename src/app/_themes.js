const boxShadow = {
  shadow_minimal: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  shadow_soft: "0px 1px 2px 0px rgba(100, 116, 139, 0.1)",
  shadow_light: "0px 1px 1px 0px rgba(100, 116, 139, 0.05)",
  shadow_dark:
    "0px 1px 3px 0px rgba(16, 24, 40, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)",
  shadow_intense: "0px 25px 25px 0px rgba(100, 116, 139, 0.15)",
};

const colors = {
  light_blue: "rgba(241,245,249,1)",
  mist_blue: "rgba(239, 246, 255, 1)",
  sky_blue: "rgba(248, 250, 252, 1)",
  dark_blue: "rgba(59, 130, 246, 1)",
  mist_green: "rgba(240, 253, 249, 1)",
  dark_green: "rgba(21, 128, 61, 1)",
  gray_100: "rgba(100, 116, 139, 1)",
  gray_200: "rgba(148, 163, 184, 1)",
  gray_300: "rgba(241, 245, 249, 1)",
  gray_400: "rgba(244, 244, 245, 1)",
  gray_500: "rgba(71, 85, 105, 1)",
  light_black: "rgba(15,23,42,1)",
  smokey_black: "rgba(51,65,85,1)",
  charcoal_black: "rgba(63, 63, 70, 1)",
  dark_black: "rgba(55, 65, 81, 1)",
  jet_black: "rgba(9, 9, 11, 1)",
  pitch_black: "rgba(24, 24, 27, 1)",
  light_border: "rgba(226, 232, 240, 1)",
  dark_border: "rgba(235, 238, 240, 1)",
  gray_border: "rgba(229, 231, 235, 1)",
  dark_grey_border: "rgba(228, 228, 231, 1)",
};

const fontFamily = {
  geist_sans: ["var(--font-geist-sans)"],
  geist_mono: ["var(--font-geist-mono)"],
  helvetica: ["Helvetica Neue"],
  inter: ["var(--inter-font)"],
  poppins: ["var(--font-poppins)"],
};

const keyframes = {
  dropdown: {
    "0%": {
      height: "0%",
    },
    "100%": {
      height: "100%",
    },
  },
  spin: {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
};

const animation = {
  dropdown: "dropdown 100ms linear",
  spin: "spin linear 1s infinite",
};

const themes = { boxShadow, colors, fontFamily, keyframes, animation };

export default themes;
