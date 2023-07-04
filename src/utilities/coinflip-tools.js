export const skinStylesConfig = [
  {
    condition: 1000 * 100,
    shadowLogoColor: "rgba(235, 172, 50, 0.5)",
    shadowLogoColorMobile: "rgba(235, 172, 50, 1)",
  },
  {
    condition: 1000 * 30,
    shadowLogoColor: "rgba(255, 27, 27, 0.5)",
    shadowLogoColorMobile: "rgba(255, 27, 27, 1)",
  },
  {
    condition: 1000 * 10,
    shadowLogoColor: "rgba(214, 48, 255, 0.5)",
    shadowLogoColorMobile: "rgba(214, 48, 255, 1)",
  },
  {
    condition: 1000 * 2,
    shadowLogoColor: "rgba(40, 152, 255, 0.5)",
    shadowLogoColorMobile: "rgba(40, 152, 255, 1)",
  },
  {
    condition: 0,
    shadowLogoColor: "rgba(198, 198, 198, 0.5)",
    shadowLogoColorMobile: "rgba(198, 198, 198, 1)",
  },
];

export const getCurrentStylesByPrice = (skinPrice) => {
  for (const config of skinStylesConfig) {
    if (skinPrice > config.condition) {
      return {
        shadowLogoColor: config.shadowLogoColor,
        shadowLogoColorMobile: config.shadowLogoColorMobile,
      };
    }
  }
};
