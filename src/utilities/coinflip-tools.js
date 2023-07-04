export const skinStylesConfig = [
  {
    condition: 1000 * 100,
    shadowLogoColor: "rgba(235, 172, 50, 0.24)",
  },
  {
    condition: 1000 * 30,
    shadowLogoColor: "rgba(255, 27, 27, 0.24)",
  },
  {
    condition: 1000 * 10,
    shadowLogoColor: "rgba(214, 48, 255, 0.24)",
  },
  {
    condition: 1000 * 2,
    shadowLogoColor: "rgba(40, 152, 255, 0.24)",
  },
  {
    condition: 0,
    shadowLogoColor: "rgba(198, 198, 198, 0.24)",
  },
];

export const getCurrentStylesByPrice = (skinPrice) => {
  for (const config of skinStylesConfig) {
    if (skinPrice > config.condition) {
      return {
        shadowLogoColor: config.shadowLogoColor,
      };
    }
  }
};
