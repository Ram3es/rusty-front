import { NavLink } from "solid-app-router";
import { onMount, createEffect, createSignal, For, Show } from "solid-js";
import { useI18n } from "../../i18n/context";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import GrayButtonBg from "../../assets/img/animatedGrayButtonBg.jpg";
import BronzeButtonBg from "../../assets/img/animatedBronzeButtonBg.jpg";
import Bg from "../../assets/img/home/homepage_bg.png";
import Coinflip from "../../assets/img/home/gamemode/coinflip.png";
import Jackpot from "../../assets/img/home/gamemode/jackpot.png";
import Mines from "../../assets/img/home/gamemode/mines.png";
import Plinko from "../../assets/img/home/gamemode/plinko.png";
import Pvpmines from "../../assets/img/home/gamemode/pvpmines.png";
import Upgrader from "../../assets/img/home/gamemode/upgrader.png";
import Wheel from "../../assets/img/home/gamemode/wheel.png";
import Stripes from "../../assets/img/home/stripes.png";
import Banner1 from "../../assets/img/home/banner/banner1.jpg";
import Banner2 from "../../assets/img/home/banner/banner2.jpg";
import Banner3 from "../../assets/img/home/banner/banner3.jpg";
import Banner4 from "../../assets/img/home/banner/banner4.jpg";
import Banner5 from "../../assets/img/home/banner/banner5.jpg";
import Logo from "../../assets/smallLogo.svg";
import SilverTrophy from "../../assets/img/home/silverTrophy.png";
import GoldTrophy from "../../assets/img/home/goldTrophy.png";
import BronzeTrophy from "../../assets/img/home/bronzeTrophy.png";
import GoldBg from "../../assets/img/home/leaderboard/gold.png";
import SilverBg from "../../assets/img/home/leaderboard/silver.png";
import BronzeBg from "../../assets/img/home/leaderboard/bronze.png";

import { SOCIAL, URL } from "../../libraries/url";
import Coin from "../../utilities/Coin";
import injector from "../../injector/injector";
import BunnerSnow from "../../components/elements/BunnerSnow";
import Ranks from "../../utilities/Ranks";
import Fallback from "../Fallback";
import PageLoadState from "../../libraries/PageLoadState";
import BannerSection from "./new_home/BannerSection"

const Home = (props) => {
  const { leaderboards, userObject, SNOWMODE } = injector;
  const [timeLimit, setTimeLimit] = createSignal(0);
  const { homePageLoaded, onHomePageLoad } = PageLoadState;

  const [isPageLoaded, setIsPageLoaded] = createSignal(false)


  let clocksTimeLeft = 0;
  let timerInterval = null;

  const i18n = useI18n();

  const modes = [
    { image: Plinko, url: URL.GAMEMODES.PLINKO },
    { image: Wheel, url: URL.GAMEMODES.WHEEL },
    { image: Mines, url: URL.GAMEMODES.MINES },
    // { image: Jackpot, url: URL.GAMEMODES.JACKPOT },
    { image: Pvpmines, url: URL.GAMEMODES.PVP_MINES },
    { image: Coinflip, url: URL.GAMEMODES.COINFLIP },
    { image: Upgrader, url: URL.GAMEMODES.UPGRADER },
  ];

  const ranksBorderColor = {
    default: "from-bronze-a1 to-bronze-5e",
    bronze: "from-bronze-e1 to-bronze-a1",
    silver: "from-silver-d9 to-silver-8a",
    gold1: "from-gold-ff to-gold-e3",
    gold2: "from-gold-ff to-gold-e3",
    gold3: "from-gold-ff to-gold-e3",
    platinum1: "from-platinum-c8 to-platinum-34",
    platinum2: "from-platinum-c8 to-platinum-34",
    platinum3: "from-platinum-c8 to-platinum-34",
    diamond: "from-diamond-ca to-diamond-64",
  };

  const [type, setType] = createSignal("daily");

  const [timeLeft, setTimeLeft] = createSignal("00:00:00:00");

  function calculateTimeFraction() {
    const passed = clocksTimeLeft / timeLimit();
    return passed >= 0 ? passed : 1;
  }

  // Update the dasharray value as time passes, starting with 283
  function setCircleDasharray() {
    // const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
    const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
    const timer = document.getElementById("main-timer-path-remaining");
    if (timer) {
      timer.setAttribute("stroke-dasharray", circleDasharray);
    }
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      // The amount of time passed increments by one
      // timePassed += 1;
      clocksTimeLeft = (leaderboards?.[type()]?.ending - Date.now()) / 1000;
      if (clocksTimeLeft <= 0 || !leaderboards?.[type()]?.ending) {
        clearInterval(timerInterval);
      }
      setCircleDasharray();
    }, 50);
  }

  const countdown = () => {
    const left = Math.floor(
      (leaderboards?.[type()]?.ending - Date.now() || 0) / 1000
    );

    const days = Math.floor(left / (24 * 3600));
    const hours = Math.floor((left % (24 * 3600)) / 3600);
    const minutes = Math.floor(((left % (24 * 3600)) % 3600) / 60);
    const seconds = (left % (24 * 3600)) % 60;

    setTimeLeft(
      `${`0${days}`.slice(-2)}:${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(
        -2
      )}:${`0${seconds}`.slice(-2)}`
    );
  };

  createEffect(() => {
    countdown();
    clocksTimeLeft = (leaderboards?.[type()]?.ending - Date.now() || 0) / 1000;
    setTimeLimit(() => (type() === "daily" ? 86400 : 86400 * 7));
    startTimer();
  });

  onMount(() => {
    const params = location.hash.replace("#", "");
    if (params === "leaderboard") {
      document.getElementById("scrollWrapper").scrollTop =
        document.getElementById("leaderboardWrapper").offsetTop;
    }
  });

  setInterval(countdown, 1000);

  const [activeBanner, setActiveBanner] = createSignal(0);
  const banners = [
    { image: Banner4, url: SOCIAL.DISCORD, isNewTab: true },
    ...[
      userObject?.user?.id
        ? { image: Banner2, url: "profile" }
        : { image: Banner3, url: URL.SIGNIN },
    ],
    { image: Banner1, url: "cryptoDeposit" },
    { image: Banner5, url: "https://rustyloot.gg/pvpmines" },
  ];

  return (
    <Fallback loaded={() => true}>
      <img alt="background" src={Bg} class="absolute left-0 top-0 min-w-full md:min-h-full" />
      <div class="w-full h-full pt-8 flex flex-col gap-4 relative min-h-screen">
        <BannerSection />
        <div
          class={`w-full rounded-12 flex justify-between items-center relative`}
        >
          {SNOWMODE && <BunnerSnow />}
          <div class="absolute left-0 transform -translate-x-2 md:-translate-x-3 llg:-translate-x-6">
            <div
              class="center relative w-7 sm:w-10 h-7 sm:h-10 group cursor-pointer scrolling-btn-wrapper overflow-hidden"
              style={{ "background-image": `url(${YellowButtonBg})` }}
              onClick={() =>
                setActiveBanner(
                  (prev) => (prev <= 0 ? banners.length : prev) - 1
                )
              }
            >
              <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
              <svg
                class="relative z-10"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                height="14px"
                width="14px"
                version="1.1"
                id="_x32_"
                viewBox="0 0 512 512"
              >
                <polygon
                  class="st0"
                  fill="black"
                  points="419.916,71.821 348.084,0 92.084,256.005 348.084,512 419.916,440.178 235.742,256.005  "
                />
              </svg>
            </div>
          </div>
          <div
            class="w-full h-full overflow-hidden bg-gradient-to-b from-gray-2e to-yellow-8a p-0.5 rounded-12"
            onClick={() => {
              if (banners[activeBanner()]?.isNewTab) {
                window.open(banners[activeBanner()]?.url, "_blank").focus();
              } else if (banners[activeBanner()]?.url?.includes("//")) {
                location.replace(banners[activeBanner()]?.url);
              } else {
                props.setSearch({ [banners[activeBanner()]?.url]: true });
              }
            }}
          >
            <img
              alt="banner" 
              class="min-h-full min-w-full cursor-pointer rounded-12"
              src={banners[activeBanner()]?.image}
            />
          </div>
          <div class="absolute right-0 transform translate-x-2 md:translate-x-3 llg:translate-x-6">
            <div
              class="center relative hover w-7 sm:w-10 h-7 sm:h-10 group cursor-pointer scrolling-btn-wrapper overflow-hidden"
              style={{ "background-image": `url(${YellowButtonBg})` }}
              onClick={() =>
                setActiveBanner((prev) => (prev + 1) % banners.length)
              }
            >
              <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
              <svg
                class="relative z-10 transform rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                height="14px"
                width="14px"
                version="1.1"
                id="_x32_"
                viewBox="0 0 512 512"
              >
                <polygon
                  class="st0"
                  fill="black"
                  points="419.916,71.821 348.084,0 92.084,256.005 348.084,512 419.916,440.178 235.742,256.005  "
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-12 gap-x-3 sm:gap-x-2 gap-y-4 sm:gap-y-2 relative">
          <For each={modes}>
            {(mode, index) => (
              <>
                <Show when={mode.disabled}>
                  <div class="flex w-full items-end">
                    <div class="secondary-wrapper flex justify-center items-center w-full h-4/5 cursor-pointer">
                      <span class="text-20 text-gray-56 opacity-50">
                        {i18n.t("home.coming soon")}
                      </span>
                    </div>
                  </div>
                </Show>
                <Show when={!mode.disabled}>
                  <div
                    class={`${
                      index() < 4 ? "xl:col-span-4" : "xl:col-span-4"
                    } flex w-full`}
                  >
                    <NavLink href={`${mode.url}`} class="w-full">
                      <div class="w-fill p-0.5 hover-bg-gradient">
                        <div class="relative transition-transform transform hover:-translate-y-0.5 duration-200">
                          {SNOWMODE &&
                            (index() === 0 ? (
                              <svg
                                class="absolute right-9 top-4 z-30"
                                width="118"
                                height="52"
                                viewBox="0 0 118 52"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M114.879 36.2907C114.459 36.8794 114.206 37.5522 113.954 38.3932C113.87 38.7296 113.786 39.066 113.702 39.4024C112.356 45.5417 113.533 54.8768 107.983 50.9241C101.423 46.1304 108.319 29.1422 102.6 24.3485C96.9657 19.5548 93.013 26.1146 90.0695 32.6744C87.0419 39.2342 79.8934 37.4681 79.3047 31.497C78.716 25.5259 71.2311 23.4234 61.9801 25.1895C52.8132 27.0397 56.3454 16.8636 50.963 16.8636C45.5806 16.8636 44.9919 31.8334 35.0681 34.1041C23.1259 36.8794 26.6581 25.2736 20.3506 22.3301C14.0431 19.3866 13.8749 29.7309 6.38998 32.4221C1.00757 34.3564 -3.28153 21.3209 3.44647 15.0975C3.86698 14.677 4.37158 14.3406 4.96028 14.0042C6.72638 12.9109 8.07198 12.3222 9.24938 11.8176C12.1088 10.7243 13.959 10.3038 18.4163 4.58501C24.7238 -3.4886 38.0957 1.55741 38.0957 1.55741C56.9341 9.71511 62.3165 3.07121 74.0064 4.92141C85.6122 6.68751 92.2561 1.38921 100.918 2.56661C109.581 3.65991 110.169 8.20131 114.963 14.8452C115.72 15.9385 116.309 17.0318 116.813 18.2933C119.168 24.4326 117.654 32.0016 114.879 36.2907Z"
                                  fill="white"
                                />
                                <path
                                  d="M89.3077 10.8301C89.2361 12.189 85.8746 13.1187 81.7979 12.9757C77.7212 12.8327 74.4312 11.6168 74.4312 10.3294C74.5027 8.97049 77.8642 8.04071 81.9409 8.18375C86.0892 8.32679 89.3792 9.54266 89.3077 10.8301Z"
                                  fill="#D9F1FF"
                                />
                                <path
                                  d="M114.879 36.2904C111.599 41.3364 114.543 55.7176 107.983 50.9238C101.423 46.1301 108.319 29.1419 102.6 24.3482C96.9656 19.5545 93.0129 26.1143 90.0694 32.6741C87.0418 39.2339 79.8933 37.4678 79.3046 31.4967C78.7159 25.5256 71.231 23.4231 61.98 25.1892C52.8131 27.0394 56.3453 16.8633 50.9629 16.8633C45.5805 16.8633 44.9918 31.8331 35.068 34.1038C23.1258 36.8791 26.658 25.2733 20.3505 22.3298C14.0429 19.3863 13.8747 29.7306 6.38984 32.4218C0.671039 34.5243 -3.87036 19.4704 4.96014 14.0039C6.72624 12.9106 8.07184 12.3219 9.24924 11.8173C9.08104 11.9855 2.10074 17.7043 5.04424 22.6662C7.98774 27.7963 11.3517 18.293 15.8931 16.2746C20.4346 14.2562 28.2559 15.1813 29.5174 19.5545C30.7789 23.9277 39.6935 27.1235 41.8801 19.4704C44.0667 11.8173 48.6922 9.46251 52.3926 10.0512C56.093 10.5558 61.7277 16.7792 62.4846 19.134C63.2415 21.4888 72.4925 17.6202 77.6226 20.3955C82.7527 23.1708 80.8184 27.544 86.0326 26.7871C91.2468 26.0302 91.8355 15.8541 101.928 17.0315C112.02 18.1248 108.151 31.4126 110.338 33.0105C112.524 34.6084 120.093 30.067 116.897 18.1248C119.168 24.4323 117.654 32.0013 114.879 36.2904Z"
                                  fill="#D9F1FF"
                                />
                                <path
                                  d="M113.702 39.4018C112.356 45.5411 113.533 54.8762 107.983 50.9235C101.423 46.1298 108.319 29.1416 102.6 24.3479C96.9657 19.5542 93.013 26.114 90.0695 32.6738C87.0419 39.2336 79.8934 37.4675 79.3047 31.4964C78.716 25.5253 71.2311 23.4228 61.9801 25.1889C52.8132 27.0391 56.3454 16.863 50.963 16.863C45.5806 16.863 44.9919 31.8328 35.0681 34.1035C23.1259 36.8788 26.6581 25.273 20.3506 22.3295C14.0431 19.386 13.8749 29.7303 6.38998 32.4215C1.00757 34.3558 -3.28153 21.3203 3.44647 15.0969C3.36237 15.2651 -0.338028 20.8157 2.77367 25.9458C5.88538 31.16 10.7632 26.3663 12.1929 23.0023C13.6226 19.6383 18.0799 16.6107 22.369 18.545C26.7422 20.4793 26.574 29.478 32.2087 29.8985C37.8434 30.319 43.1417 25.273 45.7488 18.6291C48.3559 11.9852 52.1404 12.658 54.327 14.5082C56.5136 16.3584 56.5136 23.1705 61.896 22.1613C67.2784 21.1521 75.7725 20.5634 78.8001 25.4412C81.8277 30.319 81.7436 34.9445 85.8645 33.0102C89.9854 31.0759 92.172 19.1337 100.582 20.1429C108.992 21.1521 107.226 30.9077 107.058 36.206C106.974 41.5043 106.721 45.8775 109.244 46.9708C111.179 47.7277 113.029 41.8407 113.702 39.4018Z"
                                  fill="#B4DCFF"
                                />
                              </svg>
                            ) : index() === 2 ? (
                              <svg
                                class="absolute right-6 top-4 z-30"
                                width="58"
                                height="35"
                                viewBox="0 0 58 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1.57495 20.2877C0.240623 14.1998 -1.92765 7.52819 3.49304 2.69127C7.99638 -1.3951 14.668 -0.0607737 19.8385 1.69053C24.2584 3.19164 28.7618 4.02559 33.4319 4.19238C39.353 4.35917 46.2748 -1.72868 51.8622 1.10676C56.2822 3.35843 57.6165 8.86251 57.2829 13.4492C56.449 24.8744 53.1966 38.0508 50.6113 33.7143C48.0261 29.3777 52.1124 19.1201 48.2763 17.619C44.4401 16.2013 40.7707 20.788 34.5994 21.0382C28.3448 21.2884 27.0939 14.9504 19.8385 17.2854C13.6672 19.2869 15.2518 28.1268 13.2503 32.6301C12.6665 34.0479 11.1654 35.132 9.66428 34.9652C5.74471 34.3814 4.41038 30.0449 3.40964 26.7091C2.82587 25.208 2.15871 22.8729 1.57495 20.2877Z"
                                  fill="white"
                                />
                                <path
                                  d="M48.2761 11.0315C44.4399 9.61381 40.7705 14.2005 34.5993 14.4507C28.3447 14.7009 27.0937 8.36288 19.8384 10.6979C13.6671 12.6994 15.2516 21.5393 13.2501 26.0427C12.6664 27.4604 11.1653 28.5445 9.66414 28.3777C5.74457 27.794 4.41024 23.4574 3.4095 20.1216C2.90913 18.4537 2.24197 16.202 1.6582 13.6168C1.24122 11.6987 0.740854 9.6972 0.407273 7.77911C-0.510074 11.6987 0.740854 16.1186 1.6582 20.205C2.24197 22.7902 2.90913 25.1253 3.4095 26.7098C4.41024 29.9622 5.74457 34.2988 9.66414 34.9659C11.1653 35.2161 12.583 34.0486 13.2501 32.6309C15.2516 28.1275 13.7505 19.2877 19.8384 17.2862C27.0937 14.9511 28.4281 21.2891 34.5993 21.0389C40.7705 20.7888 44.4399 16.1186 48.2761 17.6197C49.1101 17.9533 49.6104 18.7039 49.8606 19.7046C50.0274 15.7851 50.5278 11.9489 48.2761 11.0315Z"
                                  fill="#D9F1FF"
                                />
                                <path
                                  d="M50.6111 27.1265C50.2775 26.5427 50.0273 25.7922 49.8605 25.0416C49.6103 28.2106 49.3602 31.7132 50.6111 33.7147C53.1963 38.0512 56.3653 24.8748 57.2827 13.4497C57.3661 12.0319 57.3661 10.5308 57.1159 9.11311C55.9484 19.9545 53.0295 31.2128 50.6111 27.1265Z"
                                  fill="#D9F1FF"
                                />
                                <path
                                  d="M48.2757 15.2007C44.4395 13.783 40.7701 18.3697 34.5989 18.6199C28.4276 18.8701 27.0933 12.5321 19.8379 14.8671C13.6667 16.8686 15.2512 25.7085 13.2497 30.2119C12.6659 31.6296 11.1648 32.7137 9.66371 32.5469C5.74413 31.9632 4.40981 27.6266 3.40907 24.2908C2.9087 22.6229 2.24154 20.3712 1.65777 17.786C1.074 15.1173 0.323447 12.3653 0.0732615 9.61325C-0.176924 13.0325 0.823818 16.7852 1.65777 20.2044C2.24154 22.7897 2.9087 25.1248 3.40907 26.7093C4.40981 29.9617 5.74413 34.2982 9.66371 34.9654C11.1648 35.2156 12.5825 34.048 13.2497 32.6303C15.2512 28.127 13.7501 19.2871 19.8379 17.2856C27.0933 14.9505 28.4276 21.2886 34.5989 21.0384C40.7701 20.7882 44.4395 16.1181 48.2757 17.6192C49.4432 18.0362 49.8602 19.2871 50.027 20.955C50.1104 18.203 49.9436 15.8679 48.2757 15.2007Z"
                                  fill="#B4DCFF"
                                />
                                <path
                                  d="M57.2821 10.9479C56.4482 22.373 53.1958 35.5495 50.6105 31.2129C50.0267 30.2956 49.7765 29.0446 49.6932 27.6269C49.6098 29.962 49.6932 32.1303 50.6105 33.6314C53.1958 37.9679 56.3648 24.7915 57.2821 13.3663C57.3655 12.5324 57.3655 11.615 57.2821 10.7811C57.2821 10.8645 57.2821 10.9479 57.2821 10.9479Z"
                                  fill="#B4DCFF"
                                />
                                <path
                                  d="M15.4183 3.02511C15.4183 3.85906 13.3334 4.69301 10.6648 4.69301C7.99616 4.69301 5.82788 4.10924 5.82788 3.27529C5.82788 2.44134 7.91276 1.60739 10.5814 1.60739C13.2501 1.52399 15.4183 2.10776 15.4183 3.02511Z"
                                  fill="#D9F1FF"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M27.0934 31.1286C27.0934 32.2961 26.0926 33.2968 24.9251 33.2968C23.7576 33.2968 22.7568 32.2961 22.7568 31.1286C22.7568 29.961 23.7576 28.9603 24.9251 28.9603C26.176 28.9603 27.0934 29.961 27.0934 31.1286Z"
                                  fill="white"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M10.4981 17.0351C10.4981 17.6189 9.99774 18.1192 9.41397 18.1192C8.83021 18.1192 8.32983 17.6189 8.32983 17.0351C8.32983 16.4513 8.83021 15.951 9.41397 15.951C9.99774 15.951 10.4981 16.4513 10.4981 17.0351Z"
                                  fill="white"
                                />
                              </svg>
                            ) : index() === 5 ? (
                              <svg
                                class="absolute right-0 top-6 z-30"
                                width="54"
                                height="24"
                                viewBox="0 0 54 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M30.1856 0C33.1698 0.637277 33.5843 2.97396 36.4028 3.73869C38.8068 4.41845 41.874 3.69621 44.5266 3.90863C46.7648 4.07857 48.6715 4.92828 49.832 5.90543C50.9926 6.88259 51.6557 8.02969 52.236 9.17679C52.8163 10.2389 53.3137 11.3435 53.1479 12.4481C52.9821 13.5528 51.9873 14.6574 50.0807 15.2097C47.6767 15.8894 44.6095 15.4646 41.9569 15.0822C39.2213 14.7423 35.9883 14.5724 34.0817 15.6345C31.0974 17.3339 34.662 20.3929 31.9264 22.2197C30.7658 22.9845 28.6105 23.3243 26.7868 22.942C25.046 22.5596 23.8854 21.5825 24.0512 20.6053C24.217 19.968 24.7973 19.4157 25.1289 18.8209C25.4605 18.2261 25.4605 17.4614 24.5486 17.079C23.5538 16.6542 21.9788 16.8241 20.8182 17.164C19.6577 17.5039 18.7458 18.0137 17.4195 18.2261C16.176 18.4386 14.4352 18.1836 14.1865 17.5039C13.6063 17.0365 13.4405 16.2718 12.3628 16.1444C9.79302 15.762 9.95881 18.4386 10.2075 19.7981C10.5391 21.1576 10.4562 22.857 8.05219 23.4518C6.47716 23.8342 4.48764 23.4093 3.49288 22.6871C2.49813 21.9648 0.177024 20.6053 2.74681 18.3536C3.74157 17.5039 3.32709 16.4417 2.66392 15.5071C1.91785 14.6149 0.840196 13.7652 0.342817 12.8305C-0.569044 11.1736 0.50861 9.38922 1.58626 7.7323C2.24944 6.62768 2.9955 5.52307 4.23895 4.54591C5.4824 3.61124 7.47191 2.80402 9.71012 2.67656C12.4457 2.50662 15.1813 3.31384 17.834 3.01644C20.1551 2.76153 21.8959 1.78438 23.6367 0.977158"
                                  fill="#E3F2FD"
                                />
                                <path
                                  d="M23.7202 0.724246C21.9793 1.53146 20.2376 2.8465 17.9165 3.10142C15.2638 3.39881 12.5282 2.59159 9.79265 2.76153C7.55444 2.88899 5.64782 3.69621 4.32148 4.63088C3.24382 5.4381 2.58065 6.41526 1.91748 7.34993C2.82934 8.11466 3.57541 8.96436 4.32148 9.81407C4.98465 10.5788 5.64782 11.386 6.31099 12.1508C6.89127 12.788 7.38865 13.4678 7.13996 14.1051C6.97417 14.6149 6.39389 15.0397 6.31099 15.5071C6.2281 16.0169 7.05706 16.8666 7.80313 16.5267C9.54396 15.8045 9.29527 14.3175 10.8703 13.4678C12.4453 12.6606 15.098 12.2357 17.0046 12.8305C18.8284 13.3828 19.9889 14.7423 22.0613 14.5724C23.885 14.4025 25.3772 13.0854 26.8693 13.5952C28.2786 14.0626 27.2838 15.6345 28.9417 15.8045C29.7707 15.8894 30.5168 15.4221 30.5997 14.9973C30.7655 14.5724 30.5168 14.1051 30.7655 13.6802C31.097 12.958 32.4234 12.4481 33.9155 12.2357C35.3248 12.0233 36.8169 12.1083 38.309 12.1083C43.2828 12.1507 48.3395 11.6409 52.8988 10.6213C52.733 10.1115 52.4843 9.60164 52.2356 9.09182C51.6554 7.94472 51.0751 6.84011 49.8316 5.82046C48.6711 4.84331 46.7645 3.9936 44.5263 3.82366C41.7907 3.61124 38.8064 4.33348 36.4024 3.65372C33.5839 2.97396 33.0223 0.362123 30.1852 0"
                                  fill="white"
                                />
                                <path
                                  opacity="0.5"
                                  d="M2.83026 15.5496C3.57633 16.4418 3.90791 17.5464 2.91315 18.3961C0.343363 20.6478 2.66446 22.0073 3.65922 22.7296C4.65398 23.4518 6.6435 23.8767 8.21853 23.4943C10.6225 22.942 10.7054 21.2001 10.3738 19.8406C10.0423 18.4811 9.95936 15.8045 12.5291 16.1869C13.5239 16.3143 13.6897 17.0791 14.3529 17.5464C14.6016 18.2262 16.3424 18.4811 17.5858 18.2686C18.8293 18.0562 19.824 17.5464 20.9846 17.2065C22.1451 16.8666 23.7202 16.6542 24.7149 17.1215C25.6268 17.5039 25.7097 18.2686 25.2952 18.8634C24.9636 19.4582 24.3004 20.0105 24.2176 20.6478C23.9689 21.625 25.1294 22.6446 26.9531 22.9845C28.694 23.3669 30.9322 23.027 32.0927 22.2622C34.7454 20.4354 31.2638 17.3765 34.248 15.6771C36.0717 14.6149 39.3876 14.7849 42.1232 15.1247C44.8588 15.4646 47.843 15.932 50.247 15.2522C52.1537 14.6999 53.1484 13.5953 53.3142 12.4907C53.3142 12.3207 53.3142 12.1508 53.3142 11.9808C52.2366 12.1508 51.2418 12.3632 50.247 12.5756C45.7706 13.4253 40.714 14.3175 36.1546 13.6378C35.2428 13.5103 34.248 13.6803 33.502 14.1051C32.7559 14.53 32.3414 15.0398 32.0098 15.5496C31.2638 16.4843 30.6006 17.4614 29.8545 18.3961C29.6887 18.651 29.2742 18.9484 28.7769 18.8634C28.2795 18.821 28.2795 18.4811 28.1966 18.2686C28.0308 17.3765 27.036 16.5268 25.5439 16.0594C24.0518 15.5921 22.1451 15.4646 20.5701 15.762C19.9069 15.8895 19.2438 16.1019 18.4977 16.2294C17.8345 16.3568 17.0056 16.3993 16.3424 16.2294C15.6792 16.0594 15.7621 15.6346 15.7621 15.2522C15.6792 14.53 13.5239 14.6574 12.5291 14.8698C11.5344 15.1247 10.7883 15.5496 10.208 16.0169C8.63301 16.9941 7.55536 18.0987 6.80929 19.2458C6.6435 19.4582 6.39481 19.7556 5.89743 19.7556C5.15136 19.7556 5.15136 19.1608 5.31715 18.7785C6.22901 16.9941 4.81977 15.1672 3.49343 13.4678C2.74736 12.5332 1.9184 11.556 0.260467 11.0462C0.260467 11.0462 0.260467 11.0462 0.177571 11.0462C0.0946741 11.6835 0.177571 12.2782 0.42626 12.873C1.00654 13.8077 2.08419 14.6574 2.83026 15.5496Z"
                                  fill="#BBDEFB"
                                />
                                <path
                                  d="M6.47698 9.09175C6.70589 9.09175 6.89147 8.99665 6.89147 8.87933C6.89147 8.76201 6.70589 8.6669 6.47698 8.6669C6.24807 8.6669 6.0625 8.76201 6.0625 8.87933C6.0625 8.99665 6.24807 9.09175 6.47698 9.09175Z"
                                  fill="#E3F2FD"
                                />
                                <path
                                  d="M46.8474 10.239C47.763 10.239 48.5053 9.85859 48.5053 9.38931C48.5053 8.92004 47.763 8.53961 46.8474 8.53961C45.9317 8.53961 45.1895 8.92004 45.1895 9.38931C45.1895 9.85859 45.9317 10.239 46.8474 10.239Z"
                                  fill="#E3F2FD"
                                />
                              </svg>
                            ) : (
                              ""
                            ))}
                          <img
                            alt="mode-image" 
                            src={mode.image}
                            class="w-full cursor-pointer hover"
                          />
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </Show>
              </>
            )}
          </For>
        </div>

        <div
          id="leaderboardWrapper"
          class="center flex-col w-full gap-2 mt-20 relative"
        >
          <div class="w-full center gap-5 sm:gap-10">
            <div
              class="flex-1 h-0.5"
              style={{
                background:
                  "linear-gradient(270deg, #434B71 0%, rgba(39, 47, 72, 0) 98.2%)",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            />
            <p class="text-yellow-ff text-24 sm:text-40 font-semibold font-Oswald uppercase tracking-wide">
              {i18n.t("home.leaderboard")}
            </p>
            <div
              class="flex-1 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #434B71 0%, rgba(39, 47, 72, 0) 98.2%)",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            />
          </div>
          {/* <p class="text-16 text-white font-normal text-center">Complete with top players and earn free money. Top players will be displayed on this board below.</p> */}

          <div class="center gap-3 mb-2 mt-5">
            <div
              class={`relative min-w-20 center bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden group hover`}
              style={{
                "background-image": `url(${
                  type() == "daily" ? YellowButtonBg : ""
                })`,
              }}
              onClick={() => setType("daily")}
            >
              <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
              <p
                class={`text-14 ${
                  type() == "daily" ? "text-dark-1b" : "text-gray-8c"
                } group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-4 py-1.5`}
              >
                {i18n.t("home.daily")}
              </p>
            </div>
            <div
              class={`relative min-w-20 center bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden group hover`}
              style={{
                "background-image": `url(${
                  type() == "weekly" ? YellowButtonBg : ""
                })`,
              }}
              onClick={() => setType("weekly")}
            >
              <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
              <p
                class={`text-14 ${
                  type() == "weekly" ? "text-dark-1b" : "text-gray-8c"
                } group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-4 py-1.5`}
              >
                {i18n.t("home.weekly")}
              </p>
            </div>
          </div>
          <div class="flex justify-center items-center sm:items-end flex-col gap-1 sm:absolute right-0 bottom-2 relative">
            <p class="text-14 text-gray-8c font-normal sentence whitespace-nowrap">
              {i18n.t("home.ends in")}
            </p>
            <p class="text-16 text-gray-8c w-20 font-bold font-Oswald sentence flex gap-2 items-center justify-end">
              <span class="absolute right-full bottom-1 transform -translate-x-1/2">
                <svg
                  class="base-timer__svg w-4 h-4 rounded-full"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g class="base-timer__circle">
                    <circle cx="50" cy="50" r="45" />
                    <path
                      id="main-timer-path-remaining"
                      stroke-dasharray="283"
                      class="base-timer__path-remaining-circle"
                      d="
                          M 50, 50
                          m -45, 0
                          a 45,45 0 1,0 90,0
                          a 45,45 0 1,0 -90,0
                      "
                    />
                  </g>
                </svg>
                <svg
                  class="absolute -left-[15%] -top-[32%] w-[130%]"
                  viewBox="0 0 16 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.3766 6.99383C14.9742 6.04169 14.395 5.18279 13.6637 4.45151C12.9275 3.71532 12.0736 3.14109 11.1214 2.73864C10.3999 2.43434 9.64412 2.23803 8.86376 2.15459V1.62453H9.45271C9.68829 1.62453 9.88461 1.43312 9.88461 1.19263V0.4319C9.88461 0.196318 9.6932 0 9.45271 0H6.55211C6.31653 0 6.12021 0.19141 6.12021 0.4319V1.19754C6.12021 1.43312 6.31162 1.62944 6.55211 1.62944H7.14107V2.15459C6.36561 2.23803 5.60979 2.43434 4.88341 2.73864C3.93127 3.14109 3.07238 3.72023 2.34109 4.45151C1.60981 5.18279 1.03067 6.04169 0.628218 6.99383C0.211042 7.98033 0 9.02572 0 10.1055C0 11.1852 0.211042 12.2355 0.628218 13.222C1.03067 14.1742 1.60981 15.0331 2.34109 15.7643C3.07728 16.5005 3.93127 17.0748 4.88341 17.4772C5.87482 17.8993 6.92021 18.1103 7.99996 18.1103C9.07971 18.1103 10.13 17.8993 11.1165 17.4821C12.0686 17.0797 12.9275 16.5005 13.6588 15.7692C14.395 15.033 14.9692 14.1791 15.3717 13.2269C15.7889 12.2404 15.9999 11.1901 15.9999 10.1104C16.0048 9.02572 15.7938 7.98033 15.3766 6.99383ZM7.99996 16.6821C4.37298 16.6821 1.42331 13.7324 1.42331 10.1055C1.42331 6.47849 4.37298 3.52882 7.99996 3.52882C11.6269 3.52882 14.5766 6.47849 14.5766 10.1055C14.5815 13.7324 11.6269 16.6821 7.99996 16.6821Z"
                    fill="#8C98A8"
                  />
                </svg>
              </span>
              {timeLeft()}
            </p>
          </div>
        </div>

        <div class="w-full flex flex-col gap-8 mt-20">
          <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-4">
            <For
              each={
                leaderboards?.[type()]
                  ? [
                      ...([...(leaderboards?.[type()]?.players || []), 1, 2]
                        ?.slice(0, 2)
                        ?.reverse() || []),
                      ...(leaderboards?.[type()]?.players?.slice(2) || []),
                      1,
                      2,
                      3,
                    ]?.slice(0, 3)
                  : []
              }
            >
              {(val, i) => (
                <div
                  class={`w-full group relative flex flex-col items-center gap-4 mt-12 sm:mt-0 rounded-8 border ${
                    i() == 0 ? "order-2 lg:order-none border-silver-8c" : ""
                  } ${
                    i() == 1
                      ? "order-1 lg:order-none -top-6 border-yellow-ff"
                      : ""
                  } ${
                    i() == 2 ? "order-3 lg:order-none border-bronze-ff" : ""
                  }`}
                >
                  <div class="w-full h-full absolute left-0 top-0 overflow-hidden">
                    <img
                      alt="coin" 
                      src={i() == 0 ? SilverBg : i() == 1 ? GoldBg : BronzeBg}
                      class={`w-full h-auto min-h-full absolute left-0 top-0 rounded-8`}
                    />
                  </div>
                  <div
                    class="absolute right-0 top-0 z-10 w-10 h-10 rounded-8 round flex justify-center items-center overflow-hidden"
                    style={{
                      "background-image": `url(${
                        i() == 0
                          ? GrayButtonBg
                          : i() == 1
                          ? YellowButtonBg
                          : BronzeButtonBg
                      })`,
                    }}
                  >
                    <div
                      class={`${
                        i() == 0
                          ? "scrolling-btn-image-gray"
                          : i() == 1
                          ? "scrolling-btn-image"
                          : "scrolling-btn-image-bronze"
                      } hidden group-hover:block absolute left-0 top-0`}
                    />
                    <span class="z-10">{i() == 0 ? 2 : i() == 1 ? 1 : 3}</span>
                  </div>
                  <div class="w-full h-full flex flex-col items-center relative z-10">
                    <div class="center relative -top-6">
                      <img
                        alt="trophy" 
                        class={`${i() == 1 ? "w-24" : "w-20"} ${
                          i() == 0
                            ? "silver-shadow"
                            : i() == 1
                            ? "gold-shadow"
                            : "bronze-shadow"
                        } `}
                        src={
                          i() == 0
                            ? SilverTrophy
                            : i() == 1
                            ? GoldTrophy
                            : BronzeTrophy
                        }
                      />
                    </div>
                    <div class="center gap-2 mb-4">
                      <div
                        class={`w-11 h-11 rounded-full relative overflow-hidden p-sm bg-gradient-to-b ${
                          ranksBorderColor[val.level?.league] ?? ""
                        }`}
                      >
                        <img
                          class="w-full h-full rounded-full"
                          alt="leaderboard image"
                          src={val.avatar || Logo}
                        />
                      </div>
                      <Ranks staff={val?.rank} rank={val?.level?.league} />
                      <p class="text-18 text-white font-semibold">
                        {val.username || "?"}
                      </p>
                    </div>
                    <div class="flex gap-4 mb-4">
                      <div
                        class={`flex gap-1 sm:gap-3 py-2 px-3 rounded-6 ${
                          i() == 0
                            ? "silver-price-box-wrapper"
                            : i() == 1
                            ? "gold-price-box-wrapper"
                            : "bronze-price-box-wrapper"
                        }`}
                      >
                        <div class="mt-2">
                          <Coin />
                        </div>
                        <div class="flex flex-col gap-1 subwrapper py-2 px-3">
                          <p class="text-16 price font-bold font-Oswald leading-none">
                            {Number(val.reward || 0).toLocaleString()}
                          </p>
                          <p class="text-12 text-gray-8c font-normal capitalize">
                            {i18n.t("home.reward")}
                          </p>
                        </div>
                      </div>
                      <div
                        class={`flex gap-1 sm:gap-3 py-2 px-3 rounded-6 ${
                          i() == 0
                            ? "silver-price-box-wrapper"
                            : i() == 1
                            ? "gold-price-box-wrapper"
                            : "bronze-price-box-wrapper"
                        }`}
                      >
                        <div class="mt-2">
                          <Coin />
                        </div>
                        <div class="flex flex-col gap-1 subwrapper py-2 px-3">
                          <p class="text-16 price font-bold font-Oswald leading-none">
                            {Number(val.wager || 0).toLocaleString()}
                          </p>
                          <p class="text-12 text-gray-8c font-normal capitalize">
                            {i18n.t("home.wagered")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="block sm:hidden w-full h-11"
                    style={{
                      "background-image": `url(${
                        i() == 0
                          ? GrayButtonBg
                          : i() == 1
                          ? YellowButtonBg
                          : BronzeButtonBg
                      })`,
                    }}
                  />
                </div>
              )}
            </For>
          </div>
          <div class="w-full flex flex-col items-center bet-info-bg p-5">
              <div class="w-11/12 h-12 hidden sm:grid gap-2 sm:gap-0 sm:grid-cols-leaderboard">
                <div class="flex items-center gap-2">
                  <p class="text-14 text-gray-8c font-normal capitalize">
                    {i18n.t("home.place")}
                  </p>
                </div>
                <p class="text-14 text-gray-8c font-normal capitalize my-auto">
                  {i18n.t("home.user")}
                </p>
                <p class="text-14 text-gray-8c font-normal capitalize my-auto">
                  {i18n.t("home.reward")}
                </p>
                <div class="flex items-center gap-2">
                  <p class="text-14 text-gray-8c font-normal capitalize">
                    {i18n.t("home.wagered")}
                  </p>
                </div>
              </div>
              <div class="w-full">
                <For each={leaderboards?.[type()]?.players?.slice(3)}>
                  {(val, i) => (
                    <div class="w-full sm:h-12 relative cursor-pointer center group mb-2">
                      <div class="w-full h-full flex items-center justify-center bg-dark-26/30 group-hover:bg-none transition transform hover:scale-x-sm duration-200">
                        <svg
                          class="absolute left-0 top-0"
                          width="11"
                          height="10"
                          viewBox="0 0 11 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 9.5V0H11L0 9.5Z" fill="#181A27" />
                        </svg>
                        <svg
                          class="absolute block group-hover:hidden right-0 bottom-0"
                          width="11"
                          height="10"
                          viewBox="0 0 11 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M11 9.5V0L0 9.5H11Z" fill="#181A27" />
                        </svg>
                        <img
                          class="absolute hidden group-hover:block left-0 top-0 w-full h-full"
                          src={Stripes}
                          alt="stripes"
                        />
                        <div class="w-11/12 flex flex-wrap px-2 py-3 sm:p-0 sm:grid sm:gap-3 md:gap-0 md:grid-cols-leaderboard relative z-10">
                          <p class="text-14 order-2 text-center sm:text-left sm:order-1 w-1/6 sm:w-auto text-gray-8c font-medium font-Oswald">
                            # {i() + 4}
                          </p>
                          <div class="flex order-1 mb-3 sm:mb-0 sm:order-2 w-5/6 sm:w-auto items-center gap-2">
                            <div
                              class={`w-7 h-7 rounded-full relative overflow-hidden p-sm bg-gradient-to-b ${
                                ranksBorderColor[val.level?.league] ?? ""
                              }`}
                            >
                              <img
                                class="w-full h-full rounded-full"
                                alt="leaderboard image"
                                src={val.avatar || Logo}
                              />
                            </div>
                            <Ranks
                              staff={val?.rank}
                              rank={val?.level?.league}
                            />
                            <p class="text-14 text-gray-8c font-normal truncate w-40 sm:w-24 lg:w-56">
                              {val?.username || "not found"}
                            </p>
                          </div>
                          <div class="flex order-3 w-1/2 sm:w-auto items-center gap-2">
                            <div class="w-5 sm:w-8">
                              <Coin width="full" />
                            </div>
                            <p class="text-14 text-white font-medium font-Oswald">
                              {Number(val.reward).toLocaleString()}
                            </p>
                          </div>
                          <div class="flex order-4 w-1/2 sm:w-auto items-center gap-2">
                            <div class="w-5 sm:w-8">
                              <Coin width="full" />
                            </div>
                            <p class="text-14 text-white font-medium font-Oswald">
                              {Number(val.wager || 0).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
        </div>
      </div>
    </Fallback>
  );
};

export default Home;
