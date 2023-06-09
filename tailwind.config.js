module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  safelist: ['grid-cols-2', 'grid-cols-3', 'grid-cols-4'],
  theme: {
    extend: {
      screens: {
        ssm: "350px",
        sm: "550px",
        md: "700px",
        lg: "900px", 
        llg: "1100px",
        xl: "1300px", 
        xll: "1600px",
        xxl: "1750px",
        fourk: "2500px",
      },
      animation: {
        stripes: "stripes 2s linear infinite",
        'spin-slow': 'spin 40s linear infinite',
        "spin-fade": "spin 1s linear infinite, fadeIn 1.5s", 
        'fade-in': "fadeIn .5s",
        "fade-in-translation": "fadeInFromTop .4s ease-in-out forwards",
        'ping-small': 'pingSmall 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ltr-linear-infinite': 'move-bg 5s linear infinite',
        'net': "net 5s infinite alternate",
        'reverse-spin': 'reverse-spin 1s linear infinite',
        shake: "shake 0.6s",
      },
      keyframes: {
        stripes: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(41px)" },
        },
        "fadeInFromTop": {
          "0%": {
            opacity: 0,
            transform: 'translateX(-200px)',
          },
          "100%": {
            opacity: 1,
            transform: 'translateX(0)',
          }
        },
        "fadeIn": {
          "0%": {opacity: 0},
          "100%": {opacity: 1}
        },
        pingSmall: {
          "75%, 100%": {
            transform: "scale(1.3)",
            opacity: 0
          },
        },
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
        },
        shake: {
          "0%, 100%": { transform: "translate(0, 0) " },
          "10%": {
            transform: "translate(-2px, 1px)  ",
          },
          "20%": {
            transform: "translate(2px, -1px)  ",
          },
          "30%": {
            transform: "translate(-1px, 2px)  ",
          },
          "40%": {
            transform: "translate(1px, -2px)  ",
          },
          "50%": {
            transform: "translate(-1px, 1px)  ",
          },
          "60%": {
            transform: "translate(1px, -1px)  ",
          },
          "70%": {
            transform: "translate(-2px, 2px) ",
          },
          "80%": {
            transform: "translate(2px, -2px) ",
          },
          "90%": {
            transform: "translate(-1px, 1px) ",
          },
        },
      },
      boxShadow: {
        "button": "0px 2px 2px rgba(0, 0, 0, 0.12)"
      },
      dropShadow: {
        'yellow': '0px 0px 10px rgba(255, 199, 1, 0.6)',
        'gold': '0px 0px 8px rgba(255, 180, 54, 0.48)',
        "box": "0px 4px 8px rgba(0, 0, 0, 0.25)"
      },
      textShadow: {
        'gold': '0px 0px 8px rgba(255, 180, 54, 0.48)',
        'gold-secondary': '0px 2px 2px rgba(0, 0, 0, 0.12)',
        'base': '0px 2px 2px rgba(0, 0, 0, 0.12)'
      },
      colors : {
        "transparent": "transparent",
        
        "dark-1c": "#1C1F33",
        "dark-1c1": "#1c1f2e",
        "dark-2d": "#2D3551",
        "dark-18": "#181A27",
        "dark-16": "#161B2A",
        "dark-161": "#161B28",
        "dark-13": "#131620",
        "dark-28": "#282E49",
        "dark-26": "#262D4F",
        "dark-22": "#22273E",
        "dark-1e": "#1E2437",
        "dark-25": "#252D46",
        "dark-20": "#20273D",
        "dark-17": "#171C2D",
        "dark-171": "#171A26",
        "dark-27": "#272F48",
        "dark-43": "#434B71",
        "dark-0f": "#0F121B",
        "dark-0f1": "#0F1118",
        "dark-1d": "#1D2132",
        "dark-1d2": "#1D2038",
        "dark-212": "#212439",
        "dark-1b": "#1B2235",
        "dark-1b1": "#1B1E2D",
        "dark-4f": "#4F5677",
        "dark-1617": "#161727",
        "dark-1619": "#161924",
        "dark-21": "#21253A",
        "dark-202": "#20253A",
        "dark-0c": "#0C0E16",

        "light-37" :"#373D54",

        "gray-66": "#666E97",
        "gray-4d": "#4D5B97",
        "gray-8c": "#8C98A9",
        "gray-b9": "#B9B9C0",
        "gray-7a": "#7A8EAA",
        "gray-47": "#475A76",
        "gray-72": "#727999",
        "gray-6e": "#6E749C",
        "gray-6a": "#6A6FA3",
        "gray-9a": "#9A9EC8",
        "gray-1c": "#1C2033",
        "gray-3b": "#3B436B",
        "gray-56": "#565F73",
        "gray-55": "#595C87",
        "gray-1b": "#1B2235",
        "gray-1d": "#1D1E2E",
        "gray-3b3": "#3B3C43",
        "gray-2e": '#2E374D',
        "gray-8b": '#8B93B5',
        "gray-30": '#30344A',
        "gray-33": '#334154',
        "gray-e0": "#E0E0E0",
        "gray-c6": "#C6CFFE",
        "gray-c6c": "#C6C6C6",
        "gray-a2": "#A2A5C6",
        "gray-ad": "#ADB3D7",
        "gray-transtapent": "rgba(155, 164, 214, 0.75)",
        "gray-c2": "#C2D1E0",
        "gray-9b": "#9BA4D6",
        "gray-92": "#9295BA",
        "gray-2d": "#2D3660",
        "gray-26": "#262D4D",
        "gray-32": "#323543",

        "gray-17": "#171B27",

        "gray-9aa": "#9AA1DF",

        "white-f3": "#F3EBFB",

        "yellow-ff": "#FFC701",
        "yellow-8a": "#8A6E1F",
        "yellow-f3": "#F3A529",
        "yellow-8f": "#8F5D10",
        "yellow-f6": "#F6C000",
        "yellow-ffa": "#FFA14B",
        "yellow-ff-e": "FFEAC6",
        "yellow-ffb": "#FFB436",
        "yellow-eb": "#EBAC32",

        "blue": "#5BCAEE",
        "blue-2e": "#2EA4EB",
        "blue-72": "#7289DA",
        "blue-07": "#07B5FF",
        "blue-28": "#2898FF",
        "blue-282": "#282A49",
        "blue-60": "#606384",

        "sky-4e": "#4ebcff7",
        "green": "#33EBB4",
        "green-1b": "#1BDC80",
        "green-2b": "#2BF67C",
        "green-60": "#60870C",
        "green-27": "#27F278",
        "red": "#E22842",
        "red-fe": "#FE4A4A",
        "red-ff": "#FF4A59",
        "red-ff1": "#FF1B1B",
        "red-ff5": "#FF5858",
        "red-ff6": "#FF6969",
        "red-d3": "#D32437",
      
        "orange-ff": "#ff922e",
        "orange-bd": "#bd6c22",
        "orange-ff6": "#FF6107",

        "purple-d6": "#D630FF",
        
        "silver": "#B9B4AD",
        "silver-d9": "#D9DEE2",
        "silver-8a": "#8A9093",
        "silver-8c": "#8C94B6",
        "gold": "#EF9408",
        "gold-ff": "#FFE4BA",
        "gold-ffc": "#FFC467",
        "gold-e3": "#E3983E",
        "bronze": "#EF3F08",
        "bronze-a1": "#A1745C",
        "bronze-5e": "#5E3A2D",
        "bronze-e1": "#e19c7d",
        "bronze-ff": "#FF6A01",
        "platinum-c8": "#C8E6F0",
        "platinum-34": "#3450A6",
        "diamond-ca": "#ca83f5",
        "diamond-64": "#643bf7",
        "purple-9f": "#9F97F9",
      },

      rotate: {
        '360': '360deg',
        '20': '20deg'
      },

      backgroundImage: {
        "green-gradient": "linear-gradient(96.98deg, #2CDEDF 12.79%, #5CDF76 95.81%)",
        "yellow-gradient" : "linear-gradient(264.21deg, rgba(255, 209, 67, 0.74) 0%, rgba(255, 244, 67, 0.74) 100%)",
        "yellow-to-transparent": "linear-gradient(to right, rgba(255, 194, 57, 0.2), transparent)",
        "dark-gradient": "radial-gradient(72.88% 182.5% at 47.87% -51.25%, rgba(255, 180, 54, 0.12) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), radial-gradient(100% 275.07% at 100% 0%, #1D2352 0%, #1D1F30 100%)",
        "dark-radial-gradient": "radial-gradient(50% 100% at 50% 0%, rgba(255, 180, 54, 0.16) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), radial-gradient(100% 317.48% at 100% 50%, #1D2352 0%, #1D1F30 100%)",
        "dark-to-yellow": "radial-gradient(72.88% 182.5% at 47.87% -51.25%, rgba(255, 180, 54, 0.32) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), radial-gradient(100% 275.07% at 100% 0%, #1D2352 0%, #1D1F30 100%)",
        "control-panel": "linear-gradient(87.89deg, rgba(26, 27, 48, 0) 1.79%, #1A1C33 50.01%, rgba(25, 28, 53, 0) 98.24%)",
        "dark-primary-gradient": "linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), radial-gradient(80.66% 584.01% at 39.62% 51.7%, rgba(31, 35, 68, 0.56) 0%, rgba(35, 37, 61, 0.56) 100%)",
        "dark-secondary": "linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
        'gray-button-gradient': 'radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)'
        
      },
      scale: {
        '40': '.4',
        '60': '.6',
        'sm': '1.007',
      },
      margin: {
        "5.5": "1.3rem"
      },
      spacing: {
        "34": "8.75rem",
        22: "5.5rem"
      },
      height: {
        22: "5.5rem",
        68: "17rem",
        128: "32rem",
        100: "25rem",
        120: "30rem",
        144: "36rem",
        160: "40rem",
        200: "50rem",
        "140per": "140%",
        "150per": "150%",
      },
      minHeight: {
        20: "5rem",
        24: "6rem",
        28: "7rem",
      },
      padding: {
        "sm": "2px",
        "22": "5.5rem",
        "1.5": "0.375rem",
        "2.5": "0.625rem",
      },
      inset: {
        "90per": "90%" 
      },
      width: {
        13: "3.25rem",
        30: "7.5rem",
        22: "5.5rem",
        23: "5.75rem",
        29: "7.25rem",
        38: "9.5rem",
        42: "10.5rem",
        62: "15.5rem",
        74: "18.5rem",
        76: "19rem",
        88: "22rem",
        92: "23rem",
        96: "24rem",
        100: "25rem",
        112: "28rem",
        115: "28.75rem",
        120: "30rem",
        144: "36rem",
        160: "40rem",
        200: "50rem",
        166: "41.5rem",
        136: "34rem",
        "150per": "150%",
      },
      minWidth: {
        20: "5rem",
        24: "102px",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        46: "188px",
        48: "12rem",
      },
      gridTemplateColumns: {
        rps: "auto 1fr",
        'main': "18.5rem 1fr",
        'leaderboard': "12rem 3fr 3fr 2fr",
        'leaderboard-sm': "3rem 4fr 2fr 2fr",
        'gamemode-history': "1fr 1fr 1fr 1fr 8rem",
        'gamemode-history-small': "1fr 1fr 3rem 1fr",
        'feed': 'repeat(auto-fill,minmax(105px, 1fr))',
        'battle-open': 'repeat(auto-fill,minmax(120px, 1fr))',
        'payment-items': 'repeat(auto-fill,minmax(110px, 1fr))',
        'upgrader-item': 'repeat(auto-fill,minmax(9rem, 1fr))',
        'potential-drop--item': 'repeat(auto-fill,minmax(10rem, 1fr))',
        'box-open': 'repeat(auto-fill,minmax(188px, 1fr))',
        'battle-create': 'repeat(auto-fill,minmax(216px, 1fr))',
        'skins': 'repeat(auto-fill,minmax(9rem, 1fr))',
        'jackpot': "1fr 10rem 1fr 7.5rem",
        'coinflip': "8.5rem 20rem 7rem 8rem 4rem 12.75rem",
        'coinflip-md': "8.5rem 1fr 1fr 4rem 12.75rem",
        'pvpmines': "repeat(auto-fill,minmax(20rem, 1fr))",
        'pvp-mines': "repeat(auto-fill,minmax(360px, 1fr))",
        'jackpot-history': "repeat(auto-fill,minmax(20rem, 1fr))",
        'home-original' : "repeat(15, 1fr)",
        'rewards-table' : "12rem 3fr 2fr 1fr 1fr",
        'rewards-table-sm' : "repeat(3, 1fr)"
      },
      backgroundSize: {
        "full": "100% 100%",
      },
      borderRadius: {
        none: "0px",
        1: "0.0625rem",
        2: "0.125rem",
        3: "0.1875rem",
        4: "0.25rem",
        6: "0.375rem",
        8: "0.5rem",
        12: "0.75rem",
        20: "1.25rem",
        30: "1.875rem",
        40: "2.5rem",
        full: "9999rem",
      },
      gap: {
        0.25: "0.015625rem",
      },
      fontSize: {
        8: "0.5rem",
        9: "0.5625rem",
        10: "0.625rem",
        11: "0.6875rem",
        12: "0.75rem",
        13: "0.813rem",
        14: "0.875rem",
        14.4: "0.9rem",
        15: "0.9375rem",
        16: "1rem",
        17.1: "1.069",
        18: "1.125rem",
        19: "1.1875rem",
        20: "1.25rem",
        22: "1.375rem",
        24: "1.5rem",
        28: "1.75rem",
        30: "1.875rem",
        32: "2rem",
        36: "2.25rem",
        40: "2.5rem",
        48: "3rem",
        56: "3.5rem",
        60: "3.75rem",
        64: "4rem",
        72: "4.5rem",
        80: "5rem",
        180: "11.25rem",
      },
      fontFamily: {
        Oswald: ['Oswald', 'Helvetica'],
        Terry: ['Terry', 'Helvetica'],
        Lato: ['Lato', 'Helvetica'],
        SpaceGrotesk: ['SpaceGrotesk', 'Helvetica'],
        Quicksand: ['Quicksand', 'Helvetica'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-textshadow')],
}