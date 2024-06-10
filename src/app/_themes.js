const boxShadow = {
  shadow_light: "0px 1px 1px 0px rgba(100, 116, 139, 0.05)",
  shadow_dark:
    "0px 1px 3px 0px rgba(16, 24, 40, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)",
  shadow_gray: "0px 1px 2px 0px rgba(100, 116, 139, 0.1)",
  shadow_combined:
    "0px 1px 2px 0px rgba(100, 116, 139, 0.1), 0px 1px 1px 0px rgba(100, 116, 139, 0.05)",
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
  light_black: "rgba(15,23,42,1)",
  smokey_black: "rgba(51,65,85,1)",
  dark_black: "rgba(55, 65, 81, 1)",
  pitch_black: "rgba(24, 24, 27, 1)",
  light_border: "rgba(226, 232, 240, 1)",
  dark_border: "rgba(235, 238, 240, 1)",
  gray_border: "rgba(229, 231, 235, 1)",
};

const fontFamily = {
  geist_sans: ["var(--font-geist-sans)"],
  geist_mono: ["var(--font-geist-mono)"],
  helvetica: ["Helvetica Neue"],
  inter: ["var(--inter-font)"],
  poppins: ["var(--font-poppins)"],
};

const themes = { boxShadow, colors, fontFamily };

export default themes;