import { NavLink } from "solid-app-router";
import { onMount, createEffect, createSignal, onCleanup, For, lazy } from "solid-js";
import { createStore } from "solid-js/store";
import Coin from "../../utilities/Coin";
import Multiplier from "./Multiplier";

import WheelImage from "../../assets/img/wheel/wheel.png";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import GrayButtonBg from "../../assets/img/animatedGrayButtonBg.jpg";
import Bg from "../../assets/img/wheel/wheel_bg.png";

import WheelPlayers from "./WheelPlayers";
import injector from "../../injector/injector";
import Countup from "../../utilities/Countup";
import { useI18n } from "../../i18n/context";
import WheelSpin from "../../assets/sounds/wheel-spin.wav";
import {
  playOptionClickSound,
  playPlaceBetSound,
} from "../../utilities/Sounds/SoundButtonClick";
import Fallback from "../Fallback";
import PageLoadState from "../../libraries/PageLoadState";

const ImageLoad = lazy(() => import("../../utilities/ImageLoad"));


const Wheel = (props) => {
  let spinner;

  const i18n = useI18n();

  const { socket, toastr, userObject, SNOWMODE } = injector;

  const wheelSpinSound = new Audio(WheelSpin);
  const [betValue, setBetValue] = createSignal("");
  const [multiplier, setMultiplier] = createSignal("blue");
  const [betPeack, setBetPeack] = createSignal();
  const { wheelPageLoaded, onWheelPageLoad } = PageLoadState;

  const [isPageLoaded, setIsPageLoaded] = createSignal(false)

  const [wheel, setWheel] = createStore({
    counter: 0,
    bonusPot: 0,
    status: "open",
    players: { blue: {}, orange: {}, red: {}, yellow: {} },
    totals: { blue: 0, orange: 0, red: 0, yellow: 0 },
  });

  const spin = (ticket, time) => {
    setTimeout(() => {
      if (spinner && spinner.style) {
        const stopPoint = Math.random() * 0.8 + 0.1;
        setTimeout(() => {
          if (userObject?.user?.sounds) {
            wheelSpinSound.volume = userObject.user.sounds;
            wheelSpinSound.play();
          }

          spinner.style.transform = `rotate(${
            -360 * 4 - 360 * ((ticket + stopPoint) / 20)
          }deg)`;
          spinner.style.transitionTimingFunction = `cubic-bezier(0.12, 0.8, 0.38, 1)`;
          spinner.style.transitionDuration = `${time / 1000}s`;

          setTimeout(() => {
            setWheel("status", "finished");
            spinner.style.transform = `rotate(${
              -360 * ((ticket + stopPoint) / 20)
            }deg)`;
            spinner.style.transitionTimingFunction = `cubic-bezier(0.12, 0.8, 0.38, 1)`;
            spinner.style.transitionDuration = `${0}s`;

            wheelSpinSound.pause();
            wheelSpinSound.currentTime = 0;
          }, time);
        }, 500);
      }
    }, 10);
  };

  createEffect(() => {
    if(props?.loaded) {
      socket.emit("wheel:connect", {}, (data) => {

        setWheel("history", data.history);
        setWheel("players", data.players);
        setWheel("status", data.status);
        setWheel("totals", data.totals);
        setWheel("counter", data.timeout);
        setWheel("bonusPot", data.bonusPot);
        setWheel("hash", data.hash);
  
        onWheelPageLoad(true);
  
        if (data.status == "spinning") {
          spin(data.ticket, data.timeout * 1000);
          setWheel("color", data.color);
        }
      });
    }
  })

  onMount(() => {
    socket.on("wheel:counter", (data) => {
      setWheel("counter", data.counter);
      setWheel("hash", data.hash);
      setWheel("status", "open");
    });

    socket.on("wheel:reset", () => {
      setWheel("players", { blue: {}, orange: {}, red: {}, yellow: {} });
      setWheel("totals", { blue: 0, orange: 0, red: 0, yellow: 0 });
    });

    socket.on("wheel:update", (data) => {
      setWheel("bonusPot", data.bonusPot);
      setWheel("history", data.history);
    });

    socket.on("wheel:players", (data) => {
      setWheel("players", data.players);
      setWheel("totals", data.totals);
    });

    socket.on("wheel:spin", (data) => {
      setWheel("status", "spinning");
      setWheel("color", data.color);

      spin(data.ticket, 6000);
    });
  });

  onCleanup(() => {
    socket.off("wheel:spin");
    socket.off("wheel:counter");
    socket.off("wheel:players");

    wheelSpinSound.pause();
    wheelSpinSound.currentTime = 0;
  });

  const checkBet = (bet) => {
    if (userObject?.user?.balance) {
      const checkedBet =
        bet < Number(userObject?.user?.balance)
          ? bet
          : userObject?.user?.balance;
      switch (multiplier()) {
        case "yellow":
          return checkedBet <= 200000 ? checkedBet : 200000;
        case "red":
          return checkedBet <= 500000 ? checkedBet : 500000;
        case "orange":
          return checkedBet <= 1000000 ? checkedBet : 1000000;
        default:
          return checkedBet <= 1500000 ? checkedBet : 1500000;
      }
    } else {
      return 0;
    }
  };

  const updateBet = (val) => {
    setBetPeack(val);
    val == "max"
      ? setBetValue(() => checkBet(userObject?.user?.balance))
      : val == "1/2"
      ? setBetValue((prev) => checkBet(Math.round(prev / 2)))
      : val == "x2"
      ? setBetValue((prev) => checkBet(Math.round(prev * 2)))
      : setBetValue((prev) => checkBet(Number(prev) + Number(val)));
  };

  createEffect(() => {
    setBetValue((prev) => checkBet(prev));
  });

  const bet = () => {
    socket.emit(
      "wheel:bet",
      {
        tile: multiplier(),
        bet: betValue(),
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }

        if (!data.error) {
          playPlaceBetSound();
        }
      }
    );
  };

  return (
    <Fallback loaded={wheelPageLoaded}>
      <img alt="background" src={Bg} class="absolute left-0 top-0 min-w-full md:min-h-full" />
      <div class="w-full h-full flex flex-col gap-10 overflow-y-scroll relative min-h-screen">
        <div class="w-full flex flex-col md:flex-row mb-8 xl:-mb-12">
          <div class="flex-1 flex flex-col-reverse xl:flex-row justify-evenly sm:items-center xl:items-start">
            <div class="flex flex-col gap-8 -mt-14 xl:mt-20 w-115 p-7 bet-info-bg max-w-full relative">
              {SNOWMODE && (
                <>
                  <svg
                    class="absolute left-0 -top-4 z-30"
                    width="99"
                    height="45"
                    viewBox="0 0 99 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.14977 21.9152C2.54807 27.653 4.34241 23.7179 5.38172 28.418C5.58956 29.1148 5.7313 30.0045 5.82584 31.2059C5.92978 31.8584 5.95817 32.6445 6.00546 33.5493C6.0433 34.3948 6.16614 35.1659 6.18508 35.8928C7.35698 45.6809 10.9556 44.5602 13.9873 41.097C17.1701 37.3664 14.7046 33.4408 14.3266 31.0681C13.9581 28.7548 19.1244 25.3164 27.049 25.2096C34.9736 25.1028 29.6462 21.4507 37.8351 18.7472C46.024 16.0438 46.7705 20.7298 55.158 21.7049C63.5455 22.6799 68.4284 19.2867 74.0484 18.6955C79.6683 18.1044 76.986 21.3295 77.0336 26.4917C77.0812 31.654 84.5054 34.4855 87.5653 29.3756C90.5213 24.2214 93.7043 22.9237 95.5081 18.4396C95.848 17.534 96.018 16.777 95.914 16.1245C95.7534 14.508 94.6199 13.4721 93.1746 12.3034C92.1828 11.5491 91.0871 10.7505 90.152 9.74386C86.0052 5.59954 82.0384 8.66434 72.7818 6.48965C63.5348 4.37427 54.1841 7.08031 54.1841 7.08031C43.7001 10.5751 34.5474 7.83649 21.192 12.1536C7.93112 16.4558 -0.531972 15.0062 1.14977 21.9152Z"
                      fill="white"
                    />
                    <path
                      d="M54.7049 10.9916C54.5368 11.6918 57.1901 12.2949 60.578 12.2823C63.966 12.2698 66.8467 11.6635 67.0148 10.9633C67.183 10.2631 64.5297 9.66001 61.1418 9.67257C57.7538 9.68514 54.8731 10.2914 54.7049 10.9916Z"
                      fill="#D9F1FF"
                    />
                    <path
                      d="M13.9786 41.0389C17.1614 37.3083 14.6959 33.3827 14.318 31.0101C13.9494 28.6967 19.1158 25.2584 27.0404 25.1515C34.965 25.0447 29.6376 21.3926 37.8265 18.6892C46.0153 15.9857 46.7619 20.6717 55.1493 21.6468C63.5368 22.6219 68.4198 19.2286 74.0397 18.6375C79.6596 18.0463 76.9774 21.2714 77.025 26.4337C77.0726 31.5959 84.4968 34.4275 87.5567 29.3175C90.5222 24.2227 93.7051 22.9249 95.5089 18.4409C96.7649 15.3822 95.2724 13.9169 93.1755 12.3047C93.2888 12.4083 95.8771 16.4967 92.2409 19.2048C88.5102 21.9279 87.3959 25.8763 84.0616 24.4004C80.7273 22.9244 85.0718 17.9748 80.179 15.8348C75.3806 13.6798 68.4479 15.7573 64.0749 17.4879C59.7018 19.2186 51.9943 17.0404 49.869 15.8584C47.8193 14.5427 43.1248 12.432 35.8521 14.807C28.5794 17.182 29.2598 21.4528 24.4993 21.3596C19.7389 21.2665 12.9384 23.5663 12.0886 26.7428C11.2387 29.9192 11.286 30.824 11.8719 34.5017C12.3916 37.7641 7.49892 37.4487 5.81721 31.1478C5.92116 31.8003 5.94954 32.5865 5.99683 33.4913C6.97999 45.7423 10.7958 44.7695 13.9786 41.0389Z"
                      fill="#D9F1FF"
                    />
                  </svg>
                  <svg
                    class="absolute right-8 -top-4 z-30"
                    width="171"
                    height="36"
                    viewBox="0 0 171 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.43125 21.8332C-0.130951 20.3096 -1.49161 15.7386 1.87001 12.9351L1.95005 12.8742C4.11109 11.1067 6.91245 10.0097 9.7138 8.9127C16.277 6.35297 23.4004 3.67135 30.7639 4.52459C35.9665 5.13405 40.7688 7.45 45.9713 7.69378C52.4544 8.05945 58.5373 5.25594 65.0205 4.89027C72.0639 4.46365 79.0272 6.90148 86.1507 6.47486C96.5557 5.8654 105.6 -0.777696 115.925 0.0755462C122.968 0.685005 128.971 4.70743 136.015 5.07311C141.217 5.31689 146.98 3.61041 151.382 5.74351C154.744 7.38905 156.344 10.9239 160.266 11.5334C163.148 11.96 166.509 10.5582 168.911 12.0819C170.191 12.9351 170.591 14.215 170.191 15.4948C169.551 17.6889 167.23 19.0907 165.069 20.4315C160.667 23.0521 155.144 25.8556 149.941 24.3929C146.82 23.5397 144.099 21.2238 140.897 21.8942C139.536 22.1989 138.416 22.9302 137.135 23.4178C134.654 24.332 131.773 23.9663 129.051 23.9663C126.33 23.9663 123.128 24.6977 122.248 26.6479C121.528 28.1716 122.488 29.8781 123.048 31.4627C123.609 33.1082 123.209 35.3632 120.967 35.7898C119.607 36.0336 118.246 35.4851 117.526 34.5709C115.685 32.3159 117.126 29.6343 116.085 27.3183C115.205 25.429 112.723 24.1492 110.162 23.9054C108.641 23.7835 107.121 23.9663 105.6 24.4539C103.199 25.2462 100.558 25.1852 98.0764 24.5758C97.0359 24.332 96.0754 24.2101 94.9549 24.1492C92.3136 24.0882 89.5123 25.1852 88.7919 27.0746C88.2317 28.4763 88.6318 30.4266 86.871 31.036C85.9906 31.3408 85.0301 31.1579 84.3098 30.7313C83.1892 30 82.709 28.9639 82.1487 27.9278C80.3879 24.6367 75.9857 21.6504 71.5036 22.5646C67.3416 23.4178 64.3801 27.2574 60.2181 26.587C56.8565 26.0385 55.2558 22.8084 51.8941 22.2598C47.5721 21.5894 44.2104 25.8556 39.8083 25.6119C38.2075 25.49 36.8469 24.8196 35.3261 24.3929C33.8854 23.9054 32.0446 23.7225 30.7639 24.5148C29.4833 25.3071 29.4833 26.7089 29.8035 27.9278C30.0436 28.5982 30.2837 29.2686 30.5238 29.939C30.924 31.3408 30.3638 32.8644 29.0031 33.9005C25.9616 36.2164 21.4795 34.2662 21.0793 31.7064C20.8392 30.4875 21.4795 29.2077 21.8797 27.9888C22.2799 26.7698 22.2799 25.3071 21.1593 24.3929C20.0388 23.4788 18.2779 23.4178 16.5971 23.3569C12.6752 23.235 8.59326 23.174 4.43125 21.8332Z"
                      fill="#D9F1FF"
                    />
                    <path
                      d="M158.265 17.7501C161.547 16.7749 164.588 15.3732 167.87 14.2762C168.67 14.0324 169.471 13.7886 170.271 13.6058C170.031 13.0572 169.631 12.5087 169.07 12.1431C166.669 10.5585 163.308 12.0212 160.426 11.5945C156.504 10.9851 154.904 7.45022 151.542 5.80469C147.14 3.67158 141.377 5.37806 136.175 5.13428C129.131 4.76861 123.128 0.746179 116.085 0.13672C105.76 -0.716522 96.7155 5.86563 86.3105 6.53604C79.187 6.84076 72.2237 4.40293 65.1003 4.82955C58.6171 5.19523 52.5342 7.99874 46.0511 7.63306C40.7685 7.32833 36.0462 5.01239 30.8437 4.46388C23.5602 3.67158 16.3568 6.29225 9.79359 8.85198C6.99224 9.949 4.11085 11.046 2.02985 12.8135L1.94981 12.8744C1.38954 13.301 0.989344 13.8495 0.669189 14.3371C2.43004 16.4702 5.63158 17.811 8.91316 17.9329C13.0752 18.0548 17.1571 16.2264 21.2391 16.7749C25.3211 17.3235 28.4426 20.1879 32.5245 20.4317C37.0867 20.7364 41.4088 17.811 45.811 18.7252C47.8119 19.1518 49.6528 20.3707 51.7338 20.066C53.2545 19.8222 54.5352 18.7862 56.0559 18.969C57.8167 19.2128 58.4571 20.9802 60.0578 21.5287C61.8987 22.1382 63.8196 20.9802 65.5005 20.1879C70.5429 17.811 77.6663 18.4814 81.6682 21.7725C82.3085 22.2601 83.0289 22.6867 83.9093 22.9305C86.3905 23.6618 87.2709 22.321 88.5516 21.4068C90.9527 19.7003 94.6345 19.7003 97.9961 19.8222C102.238 20.0051 106.48 20.1879 110.722 20.7364C113.764 21.163 116.725 21.7725 119.847 21.7116C122.888 21.6506 126.17 20.7364 127.77 19.2128C128.811 18.1767 130.812 18.1767 132.493 18.4205C134.174 18.7252 135.854 19.2128 137.455 18.908C139.296 18.5424 140.657 17.2625 142.498 17.0187C144.418 16.7749 146.259 17.6891 148.1 18.2376C151.222 19.1518 154.984 18.6643 158.265 17.7501Z"
                      fill="white"
                    />
                    <path
                      opacity="0.5"
                      d="M0.350098 18.3572C0.990406 19.8199 2.35106 21.1607 4.43207 21.8311C8.51403 23.1719 12.676 23.2329 16.838 23.3547C18.4388 23.3547 20.2797 23.4766 21.4002 24.3908C22.5208 25.305 22.4407 26.7677 22.1206 27.9866C21.7204 29.2055 21.1601 30.4245 21.3202 31.7043C21.8004 34.2641 26.2026 36.1534 29.244 33.8984C30.6047 32.8623 31.165 31.3996 30.7648 29.9369C30.5246 29.2665 30.2845 28.5961 30.0444 27.9257C29.7243 26.7068 29.7243 25.305 31.0049 24.5127C32.2055 23.7204 34.0463 23.9642 35.5671 24.3908C37.0078 24.8784 38.4485 25.5488 40.0492 25.6097C44.4514 25.8535 47.813 21.5873 52.1351 22.2577C55.4967 22.8062 57.0975 26.0364 60.4591 26.5849C64.6211 27.2553 67.6625 23.4157 71.7445 22.5624C76.2267 21.6483 80.6288 24.6956 82.3896 27.9257C82.9499 28.9008 83.3501 29.9978 84.5507 30.7292C85.271 31.1558 86.3115 31.3387 87.1119 31.0339C88.8728 30.4245 88.4726 28.4742 89.0328 27.0724C89.7532 25.1831 92.6346 24.147 95.1958 24.147C96.2363 24.147 97.2768 24.3299 98.3173 24.5737C100.799 25.1222 103.44 25.1831 105.841 24.4518C107.362 23.9642 108.882 23.7814 110.403 23.9033C112.964 24.147 115.526 25.4269 116.326 27.3162C117.367 29.6322 115.926 32.3138 117.767 34.5688C118.487 35.483 119.848 35.9705 121.208 35.7877C123.529 35.3611 123.85 33.167 123.289 31.4605C122.729 29.876 121.769 28.2304 122.489 26.6458C123.369 24.6956 126.571 24.0252 129.292 23.9642C132.014 23.9642 134.895 24.3299 137.376 23.4157C138.657 22.9281 139.697 22.1358 141.138 21.892C144.34 21.2826 147.061 23.5376 150.182 24.3908C155.465 25.8535 160.908 23.05 165.31 20.4293C167.151 19.3323 169.071 18.1134 170.032 16.4679C168.111 17.1383 166.43 18.2962 164.349 18.6619C162.348 19.0276 160.107 18.6619 158.186 19.2104C155.065 20.0637 152.824 23.2329 149.062 21.2826C148.582 21.0388 148.181 20.7341 147.781 20.4293C147.781 20.4293 147.781 20.4293 147.781 20.3684C146.1 19.0276 143.459 18.6619 141.378 19.5761C136.896 21.5264 130.973 21.5264 125.61 22.5015C124.17 22.7453 122.649 23.111 121.529 23.9033C120.408 24.6956 119.768 25.9754 120.328 27.0115C120.568 27.4381 120.968 27.8647 121.048 28.2914C121.048 28.7789 120.328 29.2665 119.848 28.9008C119.688 28.7789 119.608 28.5961 119.608 28.3523C118.887 25.1831 114.885 22.9281 110.803 22.1968C107.842 21.7092 102.719 22.0749 99.9981 22.3187C98.8776 22.4406 97.8371 22.5015 96.7166 22.5015C93.9152 22.5625 88.1524 22.9891 86.5517 25.1831C86.2315 25.6097 85.9113 26.0973 85.271 26.1583C84.4706 26.2801 83.9104 25.6707 83.4301 25.1222C80.2286 21.4654 73.9056 20.795 68.2228 21.5264C66.462 21.892 65.2614 22.4406 64.0608 23.1719C62.9403 23.9033 61.4195 24.5127 60.0589 24.208C59.2585 24.0252 58.6182 23.4766 57.9779 23.05C54.8564 21.0388 50.3742 20.6731 46.2922 20.9779C41.65 21.2826 37.0878 22.3187 32.4456 21.953C31.7252 21.892 31.0849 21.892 30.3646 22.0139C26.4427 22.8062 27.083 24.9393 27.163 26.8287C27.2431 28.0476 26.4427 30.7292 25.2421 29.9369C23.7214 28.9618 25.9624 26.8896 25.7223 25.366C25.5623 23.8423 24.6818 22.2577 23.0811 21.3435C21.0001 20.1246 18.1187 20.1856 15.4774 20.2465C11.8757 20.3075 8.19388 20.3684 4.67218 19.698C3.23149 19.3323 1.79079 18.9057 0.350098 18.3572Z"
                      fill="#B4DCFF"
                    />
                  </svg>
                </>
              )}
              <div class="flex flex-col gap-2">
                <p class="text-14 text-gray-8c font-normal">
                  {i18n.t("wheel.Bet Amount")}
                </p>
                <div class="relative center bg-dark-27 w-full h-10 rounded-2">
                  <div class="absolute left-4">
                    <Coin />
                  </div>
                  <div
                    class="absolute right-2 cursor-pointer z-10"
                    onClick={() => {
                      playOptionClickSound();
                      setBetValue(0);
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="11" cy="11" r="11" fill="#666E97" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6 7.2H16H6ZM14.8889 7.2V14.9C14.8889 15.1917 14.7718 15.4715 14.5635 15.6778C14.3551 15.8841 14.0725 16 13.7778 16H8.22222C7.92754 16 7.64492 15.8841 7.43655 15.6778C7.22817 15.4715 7.11111 15.1917 7.11111 14.9V7.2M8.77778 7.2V6.1C8.77778 5.80826 8.89484 5.52847 9.10321 5.32218C9.31159 5.11589 9.5942 5 9.88889 5H12.1111C12.4058 5 12.6884 5.11589 12.8968 5.32218C13.1052 5.52847 13.2222 5.80826 13.2222 6.1V7.2"
                        fill="#666E97"
                      />
                      <path
                        d="M6 7.2H16M14.8889 7.2V14.9C14.8889 15.1917 14.7718 15.4715 14.5635 15.6778C14.3551 15.8841 14.0725 16 13.7778 16H8.22222C7.92754 16 7.64492 15.8841 7.43655 15.6778C7.22817 15.4715 7.11111 15.1917 7.11111 14.9V7.2M8.77778 7.2V6.1C8.77778 5.80826 8.89484 5.52847 9.10321 5.32218C9.31159 5.11589 9.5942 5 9.88889 5H12.1111C12.4058 5 12.6884 5.11589 12.8968 5.32218C13.1052 5.52847 13.2222 5.80826 13.2222 6.1V7.2"
                        stroke="white"
                        stroke-width="1.1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    class="absolute w-full h-full text-14 text-white font-medium pl-14 placeholder-white"
                    type="number"
                    onInput={(e) => setBetValue(e.currentTarget.value)}
                    value={betValue()}
                    placeholder="0"
                  />
                </div>
                <div class="grid grid-cols-5 sm:grid-cols-7 gap-2 flex-wrap sm:flex-nowrap">
                  <For each={[100, 500, 1000, 5000, "1/2", "x2", "max"]}>
                    {(val) => (
                      <div
                        class={`${
                          val === 100 || val === 500
                            ? "hidden sm:center"
                            : "center"
                        } relative cursor-pointer duration-200 h-8 bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden group no-select`}
                        style={{
                          "background-image": `url(${
                            betPeack() === val ? GrayButtonBg : ""
                          })`,
                        }}
                        onClick={() => {
                          playOptionClickSound();
                          updateBet(val);
                        }}
                      >
                        <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                        <p
                          class={`absolute ${
                            betPeack() === val ? "text-dark-1b" : "text-gray-8c"
                          } group-hover:text-dark-1b duration-200 text-14 font-medium font-Oswald uppercase`}
                        >
                          {val == "max"
                            ? "max"
                            : `${val == "1/2" || val == "x2" ? "" : "+"}${val}`}
                        </p>
                      </div>
                    )}
                  </For>
                </div>
              </div>
              <div class="flex flex-col items-center gap-2">
                <p class="text-14 text-gray-8c font-normal">
                  {i18n.t("wheel.Multiplier amount")}
                </p>
                <Multiplier
                  multiplier={multiplier}
                  setMultiplier={setMultiplier}
                />
              </div>
              <div
                class="relative center cursor-pointer hover h-10 w-full overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper"
                style={{ "background-image": `url(${YellowButtonBg})` }}
                onClick={bet}
              >
                <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                <p class="absolute text-dark-16 text-14 font-medium font-Oswald uppercase">
                  {i18n.t("wheel.Place bet")}
                </p>
              </div>
            </div>
            <div class="flex justify-center items-center flex-col transform -translate-y-1/3 relative">
              <div class="center relative overflow-hidden rounded-full w-80 sm:w-112 xll:w-144 fourk:w-200 h-96 md:h-160 fourk:h-200">
                <div
                  class="left-0 w-full h-20 sm:h-40 absolute top-1/3 z-10"
                  style={{
                    background:
                      "linear-gradient(180deg, #1C2231 0%, rgba(28, 34, 49, 0) 100%)",
                  }}
                />
                <div class="w-full absolute transform rotate-180">
                  <img
                    alt="wheel-image" 
                    class="w-full will-change-transform"
                    ref={spinner}
                    src={WheelImage}
                  />
                </div>
                <div class="absolute h-5 sm:h-8 bottom-16 sm:bottom-36 xxl:bottom-24 fourk:bottom-24 hidden">
                  <svg
                    class="h-full"
                    viewBox="0 0 29 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_0_1)">
                      <path d="M25 0H4L13.718 28L25 0Z" fill="white" />
                    </g>
                    <path d="M13.5 8.5L11 0H16.5L13.5 8.5Z" fill="#263043" />
                    <defs>
                      <filter
                        id="filter0_d_0_1"
                        x="0"
                        y="0"
                        width="29"
                        height="36"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.156863 0 0 0 0 0.109804 0 0 0 0 0.270588 0 0 0 0.3 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_0_1"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_0_1"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div class="center relative">
                  <div class="absolute center transform scale-40 sm:scale-60 xll:scale-75 fourk:scale-100">
                    <div
                      class="absolute"
                      style={{
                        bottom: "25%",
                      }}
                    >
                      <p class="text-48 text-white font-semibold font-Terry tracking-widest uppercase">
                        {wheel.status == "open"
                          ? `${`0${wheel.counter ? wheel.counter : 0}`.slice(
                              -2
                            )}`
                          : wheel.status == "finished"
                          ? "20"
                          : "00"}
                      </p>
                    </div>

                    {/* <ImageLoad source={"./src/assets/img/wheel/skullReal.png"} style={() => `skull-animation ${
                        wheel.status == "open" ? "" : "animate"
                      } relative`} /> */}

                    <div class={`skull-animation ${
                        wheel.status == "open" ? "" : "animate"
                      } relative`} />

                    <p
                      class="text-20 text-white font-semibold font-Terry tracking-widest uppercase absolute transform translate-x-1/2"
                      style={{
                        top: "37%",
                        right: "39%",
                      }}
                    >
                      <Countup props={wheel?.bonusPot || 0} />
                    </p>
                  </div>
                </div>
              </div>
              <div class="center gap-2 absolute -bottom-8">
                {wheel?.hash ? (
                  <div
                    class="flex items-center gap-2"
                    onClick={() => {
                      navigator.clipboard.writeText(wheel?.hash);
                      toastr({ msg: "Copied" });
                    }}
                  >
                    <p class="text-gray-8c text-14 font-medium font-Oswald w-56 truncate sm:w-auto">
                      {wheel?.hash}
                    </p>
                    <svg
                      class="w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Layer_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 460 460"
                      style={{ "enable-background": "new 0 0 460 460" }}
                      fill="#8C98A9"
                    >
                      <g>
                        <g>
                          <g>
                            <path d="M425.934,0H171.662c-18.122,0-32.864,14.743-32.864,32.864v77.134h30V32.864c0-1.579,1.285-2.864,2.864-2.864h254.272     c1.579,0,2.864,1.285,2.864,2.864v254.272c0,1.58-1.285,2.865-2.864,2.865h-74.729v30h74.729     c18.121,0,32.864-14.743,32.864-32.865V32.864C458.797,14.743,444.055,0,425.934,0z" />
                            <path d="M288.339,139.998H34.068c-18.122,0-32.865,14.743-32.865,32.865v254.272C1.204,445.257,15.946,460,34.068,460h254.272     c18.122,0,32.865-14.743,32.865-32.864V172.863C321.206,154.741,306.461,139.998,288.339,139.998z M288.341,430H34.068     c-1.58,0-2.865-1.285-2.865-2.864V172.863c0-1.58,1.285-2.865,2.865-2.865h254.272c1.58,0,2.865,1.285,2.865,2.865v254.273h0.001     C291.206,428.715,289.92,430,288.341,430z" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                ) : (
                  <p class="text-gray-8c text-14 font-medium font-Oswald">
                    No hash
                  </p>
                )}
                <NavLink href={`${props.pathname()}?bonusPot=true`}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 0C5.61553 0 4.26215 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32122C0.00303304 5.6003 -0.13559 7.00776 0.134506 8.36563C0.404603 9.7235 1.07129 10.9708 2.05026 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99224 14.1356 8.3997 13.997 9.67878 13.4672C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5895 9.73785 14 8.38447 14 7C13.9978 5.14416 13.2596 3.36495 11.9473 2.05267C10.635 0.74039 8.85584 0.00218939 7 0Z"
                      fill="#33EBB4"
                    />
                    <path
                      d="M9.69137 5.54553C9.69209 5.94223 9.60324 6.33398 9.43144 6.69155C9.25964 7.04912 9.00933 7.36328 8.69918 7.61062L8.69809 7.61149L8.69808 7.61149C8.2357 7.9698 7.92303 8.48721 7.82084 9.06318L7.80619 9.14571H7.72237H6.42928H6.31716L6.32994 9.03432C6.38772 8.53044 6.54582 8.04323 6.7949 7.60143C7.04384 7.15986 7.37862 6.77259 7.77953 6.4624C7.92368 6.34687 8.0385 6.19891 8.11463 6.03058C8.19087 5.862 8.22615 5.67777 8.21757 5.49295C8.20899 5.30813 8.15681 5.12796 8.06528 4.96717C7.97377 4.80642 7.84554 4.66959 7.69105 4.56786C7.51844 4.45508 7.31985 4.38831 7.11416 4.37391C6.90854 4.35952 6.70265 4.39794 6.51605 4.48552C6.31808 4.58049 6.15194 4.73091 6.03781 4.9185C5.92361 5.1062 5.86641 5.32304 5.87315 5.54265L5.87324 5.54571H5.87319C5.87319 5.74101 5.79561 5.92831 5.65752 6.0664C5.51942 6.2045 5.33213 6.28208 5.13683 6.28208C4.94153 6.28208 4.75424 6.2045 4.61614 6.0664C4.47828 5.92854 4.40072 5.74163 4.40047 5.54668C4.39082 5.03827 4.53118 4.53827 4.80404 4.10916C5.07706 3.67979 5.47062 3.34044 5.93548 3.13356C6.34696 2.94969 6.79811 2.87238 7.24733 2.90876C7.69658 2.94515 8.12944 3.09408 8.50597 3.34181L8.50621 3.34197C8.87026 3.58296 9.169 3.91031 9.37579 4.29482C9.58257 4.6793 9.69099 5.10898 9.69137 5.54553ZM9.69137 5.54553C9.69137 5.54557 9.69137 5.5456 9.69137 5.54563L9.59137 5.54571L9.69137 5.54553ZM7.78228 10.0003V9.90026H7.68228H6.40956H6.30956V10.0003V11.273V11.373H6.40956H7.68228H7.78228V11.273V10.0003ZM8.63683 7.53244C8.15483 7.90595 7.8289 8.44531 7.72237 9.04571L8.63683 7.53244Z"
                      fill="#222537"
                      stroke="#222538"
                      stroke-width="0.2"
                    />
                  </svg>
                </NavLink>
              </div>
            </div>
          </div>
          <div class="flex md:flex-col gap-2 w-full md:w-12 fourk:w-16 mt-6 xll:mt-12">
            <For each={wheel?.history?.slice(0, 10)}>
              {(val) => (
                <div class="relative center">
                  {val.color == "blue" ? (
                    <svg
                      class="w-full"
                      viewBox="0 0 45 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31 0L22.6 2L15 0H0V10L3 15.7L0 22V32H15L23.4 30L31 32H45V0H31Z"
                        fill="url(#paint0_radial_172_79035)"
                      />
                      <g filter="url(#filter0_d_172_79035)">
                        <path
                          d="M14.656 23V21.112L17.76 16.344C17.9947 15.992 18.2133 15.6507 18.416 15.32C18.6293 14.9893 18.8 14.6533 18.928 14.312C19.0667 13.9707 19.136 13.6133 19.136 13.24C19.136 12.8667 19.0613 12.5893 18.912 12.408C18.7627 12.2267 18.56 12.136 18.304 12.136C18.016 12.136 17.792 12.216 17.632 12.376C17.472 12.536 17.36 12.7493 17.296 13.016C17.2427 13.2827 17.216 13.5813 17.216 13.912V14.552H14.624V13.864C14.624 13.096 14.7467 12.4133 14.992 11.816C15.2373 11.208 15.6267 10.7333 16.16 10.392C16.6933 10.04 17.392 9.864 18.256 9.864C19.4187 9.864 20.2933 10.168 20.88 10.776C21.4773 11.3733 21.776 12.2107 21.776 13.288C21.776 13.8107 21.6907 14.296 21.52 14.744C21.36 15.192 21.1413 15.6293 20.864 16.056C20.5973 16.472 20.3093 16.9093 20 17.368L17.632 20.904H21.424V23H14.656ZM22.8308 23L25.3428 16.024L22.9428 10.04H25.6468L27.0708 13.544L28.2228 10.04H30.6068L28.3348 16.776L30.8628 23H28.1748L26.5908 19.128L25.1988 23H22.8308Z"
                          fill="#1B2685"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_172_79035"
                          x="14.625"
                          y="9.86377"
                          width="16.2383"
                          height="14.1362"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.65098 0 0 0 0 0.596078 0 0 0 0 0.992157 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_172_79035"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_172_79035"
                            result="shape"
                          />
                        </filter>
                        <radialGradient
                          id="paint0_radial_172_79035"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(22.4992 16) rotate(90) scale(16 22.5)"
                        >
                          <stop stop-color="#7B7DFF" />
                          <stop offset="1" stop-color="#2C40EE" />
                        </radialGradient>
                      </defs>
                    </svg>
                  ) : val.color == "orange" ? (
                    <svg
                      class="w-full"
                      viewBox="0 0 45 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31 0L22.6 2L15 0H0V10L3 15.7L0 22V32H15L23.4 30L31 32H45V0H31Z"
                        fill="url(#paint0_radial_172_79032)"
                      />
                      <g filter="url(#filter0_d_172_79032)">
                        <path
                          d="M18.176 23.24C17.2693 23.24 16.5547 23.0693 16.032 22.728C15.52 22.3867 15.152 21.912 14.928 21.304C14.7147 20.6853 14.608 19.976 14.608 19.176V18.712H17.28C17.28 18.7227 17.28 18.7813 17.28 18.888C17.28 18.9947 17.28 19.0907 17.28 19.176C17.28 19.6027 17.3067 19.9493 17.36 20.216C17.4133 20.4827 17.5093 20.68 17.648 20.808C17.7867 20.9253 17.9787 20.984 18.224 20.984C18.4693 20.984 18.6507 20.92 18.768 20.792C18.896 20.664 18.9813 20.472 19.024 20.216C19.0667 19.96 19.088 19.64 19.088 19.256C19.088 18.616 18.9973 18.1307 18.816 17.8C18.6453 17.4587 18.2827 17.2827 17.728 17.272C17.7173 17.272 17.6587 17.272 17.552 17.272C17.4453 17.272 17.3387 17.272 17.232 17.272V15.432C17.3067 15.432 17.3813 15.432 17.456 15.432C17.5307 15.432 17.6 15.432 17.664 15.432C18.2293 15.432 18.608 15.2773 18.8 14.968C18.992 14.6587 19.088 14.1787 19.088 13.528C19.088 13.0267 19.0187 12.6427 18.88 12.376C18.752 12.1093 18.5067 11.976 18.144 11.976C17.792 11.976 17.5573 12.1253 17.44 12.424C17.3333 12.7227 17.28 13.1067 17.28 13.576C17.28 13.6827 17.28 13.7947 17.28 13.912C17.28 14.0187 17.28 14.1307 17.28 14.248H14.608V13.464C14.608 12.6853 14.7467 12.0293 15.024 11.496C15.312 10.952 15.7173 10.5413 16.24 10.264C16.7733 9.98667 17.408 9.848 18.144 9.848C18.8907 9.848 19.5307 9.98133 20.064 10.248C20.5973 10.5147 21.008 10.9093 21.296 11.432C21.584 11.944 21.728 12.584 21.728 13.352C21.728 14.1093 21.5733 14.744 21.264 15.256C20.9547 15.768 20.5813 16.0827 20.144 16.2C20.4427 16.3067 20.7093 16.4773 20.944 16.712C21.1893 16.9467 21.3813 17.2667 21.52 17.672C21.6587 18.0667 21.728 18.5733 21.728 19.192C21.728 19.9813 21.6107 20.68 21.376 21.288C21.152 21.896 20.7787 22.376 20.256 22.728C19.7333 23.0693 19.04 23.24 18.176 23.24ZM22.8308 23L25.3428 16.024L22.9428 10.04H25.6468L27.0708 13.544L28.2228 10.04H30.6068L28.3348 16.776L30.8628 23H28.1748L26.5908 19.128L25.1988 23H22.8308Z"
                          fill="#B53114"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_172_79032"
                          x="14.6094"
                          y="9.84814"
                          width="16.2539"
                          height="14.8921"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.996078 0 0 0 0 0.772549 0 0 0 0 0.517647 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_172_79032"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_172_79032"
                            result="shape"
                          />
                        </filter>
                        <radialGradient
                          id="paint0_radial_172_79032"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(22.4992 16) rotate(90) scale(16 22.5)"
                        >
                          <stop stop-color="#F79143" />
                          <stop offset="1" stop-color="#EA520D" />
                        </radialGradient>
                      </defs>
                    </svg>
                  ) : val.color == "red" ? (
                    <svg
                      class="w-full"
                      viewBox="0 0 45 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31 0L22.6 2L15 0H0V10L3 15.7L0 22V32H15L23.4 30L31 32H45V0H31Z"
                        fill="url(#paint0_radial_172_79026)"
                      />
                      <g filter="url(#filter0_d_172_79026)">
                        <path
                          d="M18.416 23.192C17.5733 23.192 16.8853 23.0107 16.352 22.648C15.8293 22.2747 15.4453 21.768 15.2 21.128C14.9547 20.488 14.832 19.7573 14.832 18.936V14.248C14.832 13.4053 14.928 12.6533 15.12 11.992C15.3227 11.3307 15.68 10.8133 16.192 10.44C16.704 10.056 17.44 9.864 18.4 9.864C19.232 9.864 19.888 9.992 20.368 10.248C20.848 10.504 21.1893 10.8773 21.392 11.368C21.5947 11.8587 21.696 12.4667 21.696 13.192C21.696 13.2347 21.696 13.2773 21.696 13.32C21.7067 13.352 21.712 13.384 21.712 13.416H19.2C19.2 12.8933 19.1573 12.5093 19.072 12.264C18.9973 12.008 18.7787 11.88 18.416 11.88C18.1707 11.88 17.984 11.9547 17.856 12.104C17.7387 12.2533 17.6587 12.5147 17.616 12.888C17.5733 13.2613 17.552 13.784 17.552 14.456V15.608C17.68 15.384 17.888 15.2133 18.176 15.096C18.464 14.968 18.7893 14.8987 19.152 14.888C19.8347 14.8667 20.3787 15.0213 20.784 15.352C21.2 15.6827 21.4987 16.136 21.68 16.712C21.8613 17.2773 21.952 17.912 21.952 18.616C21.952 19.5227 21.8453 20.3227 21.632 21.016C21.4187 21.6987 21.056 22.232 20.544 22.616C20.032 23 19.3227 23.192 18.416 23.192ZM18.448 21.224C18.6933 21.224 18.8693 21.144 18.976 20.984C19.0933 20.8133 19.168 20.568 19.2 20.248C19.2427 19.9173 19.264 19.512 19.264 19.032C19.264 18.6053 19.248 18.2373 19.216 17.928C19.1947 17.6187 19.1253 17.3787 19.008 17.208C18.8907 17.0267 18.6933 16.936 18.416 16.936C18.288 16.936 18.1653 16.9627 18.048 17.016C17.9307 17.0693 17.8293 17.1387 17.744 17.224C17.6587 17.2987 17.5947 17.3733 17.552 17.448V19.56C17.552 19.848 17.5733 20.12 17.616 20.376C17.6693 20.632 17.76 20.84 17.888 21C18.0267 21.1493 18.2133 21.224 18.448 21.224ZM23.2214 23L25.7334 16.024L23.3334 10.04H26.0374L27.4614 13.544L28.6134 10.04H30.9974L28.7254 16.776L31.2534 23H28.5654L26.9814 19.128L25.5894 23H23.2214Z"
                          fill="#9F0F34"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_172_79026"
                          x="14.832"
                          y="9.86377"
                          width="16.4219"
                          height="14.3281"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.996078 0 0 0 0 0.505882 0 0 0 0 0.486275 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_172_79026"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_172_79026"
                            result="shape"
                          />
                        </filter>
                        <radialGradient
                          id="paint0_radial_172_79026"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(22.4992 16) rotate(90) scale(16 22.5)"
                        >
                          <stop stop-color="#FB6B64" />
                          <stop offset="1" stop-color="#D6293A" />
                        </radialGradient>
                      </defs>
                    </svg>
                  ) : val.color == "yellow" ? (
                    <svg
                      class="w-full"
                      viewBox="0 0 45 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31 0L22.6 2L15 0H0V10L3 15.7L0 22V32H15L23.4 30L31 32H45V0H31Z"
                        fill="url(#paint0_radial_172_79029)"
                      />
                      <g filter="url(#filter0_d_172_79029)">
                        <path
                          d="M13.128 23V12.68C13.0107 12.744 12.8773 12.808 12.728 12.872C12.5787 12.936 12.4187 13.0053 12.248 13.08C12.088 13.144 11.928 13.208 11.768 13.272C11.6187 13.336 11.48 13.4 11.352 13.464V11.48C11.4693 11.416 11.6347 11.3307 11.848 11.224C12.0613 11.1067 12.2907 10.9787 12.536 10.84C12.7813 10.7013 13.0107 10.5627 13.224 10.424C13.4373 10.2747 13.5973 10.1467 13.704 10.04H15.8V23H13.128ZM18.7588 23L21.5748 12.072H18.0388V10.04H24.1828V11.88L21.3668 23H18.7588ZM25.362 23L27.874 16.024L25.474 10.04H28.178L29.602 13.544L30.754 10.04H33.138L30.866 16.776L33.394 23H30.706L29.122 19.128L27.73 23H25.362Z"
                          fill="#C35A0E"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_172_79029"
                          x="11.3516"
                          y="10.04"
                          width="22.043"
                          height="13.96"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 0.866667 0 0 0 0 0.423529 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_172_79029"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_172_79029"
                            result="shape"
                          />
                        </filter>
                        <radialGradient
                          id="paint0_radial_172_79029"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(22.4992 16) rotate(90) scale(16 22.5)"
                        >
                          <stop stop-color="#FFC818" />
                          <stop offset="1" stop-color="#FF9C22" />
                        </radialGradient>
                      </defs>
                    </svg>
                  ) : (
                    <svg
                      class="w-full"
                      viewBox="0 0 45 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31 0L22.6 2L15 0H0V10L3 15.7L0 22V32H15L23.4 30L31 32H45V0H31Z"
                        fill="url(#paint0_radial_529_97169)"
                      />
                      <g filter="url(#filter0_d_529_97169)">
                        <path
                          d="M21.3703 24.98V23.198C20.1343 23.138 19.2043 22.742 18.5803 22.01C17.9683 21.266 17.6383 20.126 17.5903 18.59L20.3443 18.176C20.3563 18.8 20.4103 19.304 20.5063 19.688C20.6023 20.072 20.7403 20.348 20.9203 20.516C21.1123 20.684 21.3403 20.768 21.6043 20.768C21.9403 20.768 22.1563 20.654 22.2523 20.426C22.3603 20.198 22.4143 19.958 22.4143 19.706C22.4143 19.106 22.2703 18.602 21.9823 18.194C21.7063 17.774 21.3223 17.354 20.8303 16.934L19.5523 15.836C19.1923 15.512 18.8623 15.182 18.5623 14.846C18.2743 14.498 18.0403 14.102 17.8603 13.658C17.6803 13.202 17.5903 12.662 17.5903 12.038C17.5903 10.898 17.9143 10.004 18.5623 9.356C19.2223 8.708 20.1043 8.342 21.2083 8.258V6.548H22.1263V8.24C22.8223 8.276 23.3803 8.438 23.8003 8.726C24.2203 9.002 24.5323 9.35 24.7363 9.77C24.9523 10.178 25.0963 10.616 25.1683 11.084C25.2523 11.54 25.3003 11.966 25.3123 12.362L22.5223 12.704C22.5103 12.272 22.4803 11.894 22.4323 11.57C22.3963 11.246 22.3123 11 22.1803 10.832C22.0603 10.652 21.8623 10.568 21.5863 10.58C21.2863 10.58 21.0643 10.706 20.9203 10.958C20.7763 11.21 20.7043 11.462 20.7043 11.714C20.7043 12.29 20.8483 12.758 21.1363 13.118C21.4363 13.466 21.7603 13.796 22.1083 14.108L23.3323 15.17C23.7403 15.542 24.1123 15.938 24.4483 16.358C24.7963 16.778 25.0723 17.246 25.2763 17.762C25.4803 18.278 25.5823 18.872 25.5823 19.544C25.5823 20.18 25.4503 20.762 25.1863 21.29C24.9223 21.818 24.5443 22.25 24.0523 22.586C23.5603 22.91 22.9723 23.108 22.2883 23.18V24.98H21.3703Z"
                          fill="#00732F"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_529_97169"
                          x="17.5898"
                          y="6.54785"
                          width="7.99219"
                          height="19.9326"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.246493 0 0 0 0 0.954167 0 0 0 0 0.510751 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_529_97169"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_529_97169"
                            result="shape"
                          />
                        </filter>
                        <radialGradient
                          id="paint0_radial_529_97169"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(22.4992 16) rotate(90) scale(16 22.5)"
                        >
                          <stop stop-color="#35B565" />
                          <stop offset="1" stop-color="#208042" />
                        </radialGradient>
                      </defs>
                    </svg>
                  )}
                </div>
              )}
            </For>
          </div>
        </div>
        <WheelPlayers props={wheel} />
      </div>
    </Fallback>
  );
};

export default Wheel;
