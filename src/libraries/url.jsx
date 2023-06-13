export const TESTMODE = true;
const PATH = TESTMODE ? "https://b246-176-126-140-165.ngrok-free.app" : "https://rustyloot.gg";
// const PATH = TESTMODE ? "http://localhost:1337" : "https://rustyloot.gg";
// const PATH = TESTMODE ? "http://161.35.166.37" : "https://rustyloot.gg";

export const API = `${PATH}`;

export const URL = {
    HOME: "/",
   
    FAIRNESS: "/fairness",
    FAQ: "/faq",
    TOS: "/tos",
    SUPPORT: "/support",
    AFFILIATES: "/affiliates",
    CASE: "/case",
    UNBOXING: "/unbox",
    CASE_UNBOXING: "/case-unboxing",
    CASES: "/cases",
    LEADERBOARD: "/leaderboard",

    SIGNIN: `${API}/steam/auth`,
    SIGNOUT: `${API}/steam/logout`,

    DEPOSIT: {
      MAIN: "/deposit",
      ITEMS: "/deposit/items",
      CRYPTO: "/deposit/crypto"
    },
    WITHDRAW: {
      MAIN: "/withdraw",
      ITEMS: "/withdraw/items",
      CRYPTO: "/withdraw/crypto"
    },

    PROFILE: {
      SETTINGS: "/profile/settings"
    },

    REWARDS: "/rewards",

    GAMEMODES: {
        JACKPOT: "/jackpot",
        JACKPOT_DEPOSIT: "/jackpot/deposit",
        COINFLIP: "/coinflip",
        COINFLIP_GAME: "/coinflip/game",
        COINFLIP_CREATE: "/coinflip/create",
        COINFLIP_JOIN: "/coinflip/join",
        MINES: "/mines",
        PLINKO: "/plinko",
        WHEEL: "/wheel",
        UPGRADER: "/upgrader",
        PVP_MINES: "/pvpmines",
        UNBOX: "/unbox",
        CASE_BATTLES: "/case-battles/games",
        CASE_BATTLES_CREATE: "/case-battles/create",
        CASE_BATTLES_GAME: "/case-battles/play",
    },
};

export const SOCIAL = {
  DISCORD: "https://discord.gg/rustyloot",
  INSTAGRAM: "",
  STEAM: "https://steamcommunity.com/groups/rustmoment",
  TWITTER: "https://twitter.com/RustyLootgg",
};

export const STEAM = {
  TRADEURL: "https://steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url",
  IMAGE_ENDPOINT: "https://community.cloudflare.steamstatic.com/economy/image/"
  // IMAGE_ENDPOINT: "https://steamcommunity-a.akamaihd.net/economy/image/"
};
