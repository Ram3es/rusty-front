import { NavLink } from "solid-app-router";
import { createSignal, For } from "solid-js";

import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import injector from "../../injector/injector";
import { SOCIAL, URL } from "../../libraries/url.jsx";
import Coin from "../../utilities/Coin";
import Countup from "../../utilities/Countup";

import { useI18n } from "../../i18n/context";
import { playButtonClickSound } from "../../utilities/Sounds/SoundButtonClick";

const HeaderToggle = (props) => {
  const { userObject, setToggles, setUserObject, socket } = injector;

  const [isSoundModalOpen, setSoundModalOpen] = createSignal(false);

  const i18n = useI18n();

  let soundWrapper;
  let soundButton;

  const toggles = [
    {
      name: {
        en: "provably fair",
        es: "Juego seguro",
        ru: "Честная игра",
      },
      svg: (
        <svg
          width="27"
          height="26"
          viewBox="0 0 27 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.5 7.79521C23.5408 12.2189 21.5817 16.5795 19.3776 21.0032C18.9263 22.182 18.1419 23.1934 17.1266 23.9061C16.1112 24.6188 14.9118 25 13.6839 25C12.4559 25 11.2561 24.6188 10.2408 23.9061C9.22539 23.1934 8.44104 22.182 7.98971 21.0032L1.5 7.79521L13.5 1L25.5 7.79521Z"
            class="stroke-current"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.2825 9.74377C19.1752 12.5932 18.0678 15.402 16.822 18.2513C16.5669 19.0106 16.1236 19.6621 15.5497 20.1212C14.9758 20.5802 14.2978 20.8258 13.6038 20.8258C12.9098 20.8258 12.2316 20.5802 11.6577 20.1212C11.0838 19.6621 10.6405 19.0106 10.3854 18.2513L6.71729 9.74377L13.6038 5.17358L20.2825 9.74377Z"
            class="stroke-current"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      url: URL.FAIRNESS,
    },
    {
      name: {
        en: "support",
        es: "soporte",
        ru: "поддержка",
      },
      svg: (
        <svg
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.3998 15.1816C22.3998 17.2069 21.7044 19.1493 20.4667 20.5814C19.229 22.0135 17.5502 22.818 15.7998 22.818"
            class="stroke-current"
            stroke-width="1.5"
            stroke-miterlimit="10"
          />
          <path
            d="M2.59985 9.72727C2.59985 8.58044 2.85615 7.44486 3.35404 6.38544C3.85194 5.32602 4.58169 4.36356 5.50159 3.55304C6.42148 2.74252 7.51348 2.09986 8.71515 1.66179C9.91682 1.22373 11.2046 0.998841 12.5048 1C15.1292 1 17.646 1.91949 19.5017 3.55618C21.3573 5.19286 22.3999 7.41265 22.3999 9.72727"
            class="stroke-current"
            stroke-width="1.5"
            stroke-miterlimit="10"
          />
          <path
            d="M6.4131 7.54541C6.86049 7.54541 7.28956 7.70155 7.60592 7.97948C7.92227 8.2574 8.1 8.63435 8.1 9.0274V15.8816C8.1 16.2747 7.92227 16.6516 7.60592 16.9295C7.28956 17.2075 6.86049 17.3636 6.4131 17.3636V17.3636C5.7679 17.3636 5.12902 17.2519 4.53294 17.035C3.93685 16.8181 3.39524 16.5002 2.93901 16.0994C2.48279 15.6986 2.12089 15.2227 1.87399 14.6991C1.62708 14.1754 1.5 13.6141 1.5 13.0473V11.8617C1.5 10.717 2.01763 9.61909 2.93901 8.80962C3.8604 8.00016 5.11006 7.54541 6.4131 7.54541V7.54541Z"
            class="stroke-current"
            stroke-width="1.5"
            stroke-miterlimit="10"
          />
          <path
            d="M18.5872 17.3638C18.1398 17.3638 17.7107 17.2076 17.3943 16.9297C17.078 16.6518 16.9002 16.2748 16.9002 15.8818V9.02761C16.9002 8.63456 17.078 8.25758 17.3943 7.97965C17.7107 7.70172 18.1398 7.54559 18.5872 7.54559V7.54559C19.8902 7.54559 21.1399 8.00038 22.0612 8.80984C22.9826 9.6193 23.5002 10.7172 23.5002 11.8619V13.066C23.4947 14.2075 22.9746 15.3007 22.0538 16.1061C21.133 16.9116 19.8866 17.3638 18.5872 17.3638Z"
            class="stroke-current"
            stroke-width="1.5"
            stroke-miterlimit="10"
          />
          <path
            d="M14.1383 21.7271H13.0619C12.1442 21.7271 11.4001 22.4597 11.4001 23.3634C11.4001 24.2672 12.1442 24.9998 13.0619 24.9998H14.1383C15.0561 24.9998 15.8001 24.2672 15.8001 23.3634C15.8001 22.4597 15.0561 21.7271 14.1383 21.7271Z"
            class="stroke-current"
            stroke-width="1.5"
            stroke-miterlimit="10"
          />
        </svg>
      ),
      url: URL.SUPPORT,
    },
    {
      name: {
        en: "affiliates",
        es: "afiliados",
        ru: "партнерство",
      },
      svg: (
        <svg
          width="27"
          height="24"
          viewBox="0 0 27 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.0713 23.0001H21.98C23.924 23.0001 25.5 21.4241 25.5 19.4801V19.4801C25.5 16.564 23.136 14.2001 20.22 14.2001H19.0713"
            class="stroke-current"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.9287 9.79998C19.2957 9.79998 21.2145 7.83003 21.2145 5.39999C21.2145 2.96994 19.2957 1 16.9287 1"
            class="stroke-current"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.5 19.4801C1.5 16.564 3.86393 14.2001 6.77999 14.2001H11.2203C14.1363 14.2001 16.5002 16.564 16.5002 19.4801V19.4801C16.5002 21.4241 14.9243 23.0001 12.9802 23.0001H5.01999C3.07595 23.0001 1.5 21.4241 1.5 19.4801V19.4801Z"
            class="stroke-current"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <ellipse
            cx="9.00062"
            cy="5.39999"
            rx="4.28578"
            ry="4.39999"
            class="stroke-current"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      name: {
        en: "rewards",
        es: "Recompensas",
        ru: "Награды",
      },
      svg: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.0229 8.75054L16.1933 9.11186L16.5882 9.17206L23.9351 10.2921C23.9939 10.3022 24.0412 10.3136 24.0786 10.3247C24.0517 10.364 24.012 10.4141 23.9544 10.4747L18.6404 15.9083L18.375 16.1796L18.4365 16.5541L19.6941 24.2201C19.6968 24.2441 19.7004 24.2968 19.701 24.3883C19.6854 24.3802 19.6684 24.3708 19.6501 24.3598L19.6387 24.353L19.6269 24.3465L13.0494 20.7214L12.6874 20.5218L12.3254 20.7214L5.74836 24.3465L5.74831 24.3464L5.73778 24.3525C5.70918 24.3688 5.68366 24.3821 5.66111 24.3927C5.66165 24.3858 5.66237 24.3774 5.66331 24.3675C5.66675 24.3314 5.67228 24.2837 5.68043 24.2232L6.93849 16.5541L7.00003 16.179L6.73386 15.9076L1.41652 10.4855C1.36021 10.4206 1.32114 10.3672 1.29458 10.3252C1.33217 10.3139 1.37996 10.3024 1.43966 10.2921L8.78685 9.17206L9.18176 9.11186L9.35217 8.75056L12.6482 1.76206L12.6521 1.75376L12.6558 1.74536C12.6668 1.72053 12.6774 1.69817 12.6876 1.67807C12.6978 1.69811 12.7084 1.72041 12.7193 1.74515L12.7231 1.75365L12.727 1.76205L16.0229 8.75054ZM19.8506 24.4375C19.8507 24.4375 19.8508 24.4375 19.8508 24.4375L19.8506 24.4375ZM5.68036 24.5387C5.68025 24.5385 5.68003 24.5382 5.67973 24.5378C5.67997 24.5381 5.6802 24.5384 5.68043 24.5388L5.68036 24.5387Z"
            class="stroke-current"
            stroke-width="1.5"
          />
        </svg>
      ),
      url: URL.REWARDS,
    },
  ];

  const handleClick = (event) => {
    if (
      soundWrapper &&
      soundButton &&
      !soundWrapper.contains(event.target) &&
      !soundButton.contains(event.target)
    ) {
      setSoundModalOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClick);

  const toggleSounds = (volume) => {
    if (volume === 0) {
      setSoundModalOpen(false);
    }
    socket.emit("system:sounds:toggle", { volume: volume * 100 }, (data) => {
      if (!data.error) {
        setUserObject("user", (prev) => ({
          ...prev,
          sounds: data.data.sounds / 100,
        }));
      }
    });
  };

  return (
    <>
      <div
        class={`w-full lg:w-72 h-screen lg:h-auto ${
          props.active() ? "flex" : "hidden"
        } xll:hidden flex-col gap-10 absolute top-full right-0 bg-dark-16 py-4 px-4 z-40`}
      >
        <div class="flex lg:hidden flex-col gap-6">
          <For each={toggles}>
            {(toggle) => (
              <NavLink
                onClick={() => {
                  if (toggle.name.en == "support") {
                    window.open(SOCIAL.DISCORD);
                  } else if (toggle.name.en == "provably fair") {
                    setToggles("provablyFairModal", true);
                  }
                  props.setActive(false);
                }}
                href={`${
                  toggle.name.en == "affiliates"
                    ? `${props.pathname()}?affiliates=true`
                    : toggle.url
                }`}
                class={`${
                  props.pathname() == toggle.url
                    ? "text-yellow-ff"
                    : "text-gray-66"
                } flex items-center gap-3 cursor-pointer`}
              >
                <div
                  class={`${
                    props.pathname() == toggle.url
                      ? "text-yellow-ff"
                      : "text-gray-4d"
                  }`}
                >
                  {toggle.svg}
                </div>
                <p class="text-16 text-current font-medium uppercase font-Oswald">
                  {toggle.name[i18n.language]}
                </p>
              </NavLink>
            )}
          </For>
        </div>

        <div class={`w-full ${userObject?.user?.avatar ? "hidden" : "flex"}`}>
          <div
            class="flex justify-center items-center gap-2.5"
            onClick={() => {
              setToggles("tosModal", true);
            }}
          >
            <div
              class="relative cursor-pointer center hover h-10 w-22 overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper"
              style={{ "background-image": `url(${YellowButtonBg})` }}
            >
              <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
              <div class="absolute center">
                <p class="text-dark-16 text-14 font-semibold font-Oswald uppercase">
                  {i18n.t("header.login")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class={`w-full ${
            userObject?.user?.avatar ? "flex" : "hidden"
          } flex-col gap-4`}
        >
          <div class="w-full flex gap-4">
            <NavLink
              href={`${props.pathname()}?free=true`}
              class="flex justify-center items-center relative hover flex-1 w-full h-10 overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper"
              style={{ "background-image": `url(${YellowButtonBg})` }}
              onClick={() => playButtonClickSound()}
            >
              <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
              <div class="center gap-2 absolute text-dark-16">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_558_116359)">
                    <path
                      d="M3.69141 0C3.73047 0 3.76953 0 3.80859 0C3.82656 0.00664063 3.84453 0.0175781 3.86289 0.01875C4.36328 0.0503906 4.77578 0.268359 5.13516 0.607813C5.37617 0.835547 5.625 1.05469 5.87109 1.27734C6.05078 1.43984 6.23125 1.60195 6.41641 1.76875C6.72148 1.45469 7.08164 1.29102 7.50703 1.29219C7.93164 1.29297 8.28828 1.46523 8.58633 1.76641C9.03477 1.36016 9.47305 0.965234 9.90859 0.567188C10.1648 0.332813 10.452 0.155078 10.7914 0.0730469C10.923 0.0410156 11.0582 0.0238281 11.1918 0C11.2309 0 11.2699 0 11.309 0C11.3613 0.00898438 11.4137 0.021875 11.4664 0.0265625C12.5082 0.117969 13.3195 1.09609 13.1922 2.13437C13.1598 2.39883 13.0578 2.65469 12.9852 2.92461C13.007 2.92461 13.0539 2.92461 13.1004 2.92461C13.4176 2.92461 13.7348 2.9207 14.0516 2.92695C14.4699 2.93516 14.8195 3.20078 14.9508 3.59922C14.9672 3.64961 14.9836 3.7 15 3.75039V5.47891C14.8902 5.76133 14.6828 5.86133 14.3824 5.86094C9.79414 5.85586 5.20586 5.85586 0.617578 5.86094C0.317969 5.86094 0.108984 5.7625 0 5.47852V3.7207C0.009375 3.70469 0.0222656 3.68945 0.0273437 3.67227C0.170703 3.18945 0.514844 2.92773 1.01602 2.92461C1.31328 2.92266 1.61055 2.92461 1.90742 2.92383C1.95234 2.92383 1.99766 2.91914 2.0543 2.91562C2.03555 2.87578 2.02617 2.85391 2.01523 2.83281C1.50664 1.85625 1.89297 0.678516 2.89492 0.216016C3.14102 0.102344 3.425 0.0699219 3.69141 0ZM6.01875 2.91602C6.05781 2.80313 6.02187 2.73008 5.93867 2.65586C5.40781 2.18164 4.88906 1.69336 4.35117 1.22695C3.8082 0.755859 2.96641 1.03398 2.79609 1.72695C2.64375 2.34727 3.10469 2.91758 3.7707 2.92305C4.48281 2.92852 5.19453 2.92461 5.90664 2.92383C5.94453 2.92383 5.98281 2.91836 6.01836 2.91602H6.01875ZM8.93711 2.91289C9.00977 2.91914 9.03828 2.92383 9.0668 2.92383C9.77891 2.92383 10.491 2.92461 11.2031 2.92305C11.2758 2.92305 11.3492 2.9125 11.4211 2.9C11.8113 2.83125 12.1359 2.52109 12.2105 2.14883C12.2887 1.76055 12.1262 1.36953 11.7984 1.15625C11.4074 0.901172 10.9574 0.94375 10.5766 1.28398C10.0602 1.74531 9.54727 2.21094 9.03906 2.68125C8.98633 2.73008 8.975 2.82305 8.93711 2.91328V2.91289Z"
                      class="fill-current"
                    />
                    <path
                      d="M1.93438 14.9999C1.78594 14.9554 1.62578 14.9339 1.4918 14.8624C1.13086 14.6694 0.976173 14.3476 0.976563 13.944C0.977344 13.119 0.976563 12.294 0.976563 11.4694C0.976563 9.98545 0.976563 8.50186 0.976563 7.01787V6.83936H6.51602C6.51875 6.89053 6.52422 6.94209 6.52422 6.99326C6.52461 9.60967 6.52461 12.2257 6.52383 14.8421C6.52383 14.8948 6.51133 14.9472 6.50469 14.9999H1.93438V14.9999Z"
                      class="fill-current"
                    />
                    <path
                      d="M8.49648 14.9998C8.48984 14.9424 8.47734 14.885 8.47734 14.8271C8.47656 12.2205 8.47656 9.61426 8.47656 7.00762V6.84082H14.0242C14.0242 6.90332 14.0242 6.96035 14.0242 7.01738C14.0242 9.30644 14.0242 11.5959 14.0242 13.885C14.0242 14.5279 13.7367 14.8713 13.1074 14.9838C13.0934 14.9861 13.0805 14.9943 13.0668 14.9998H8.49648V14.9998Z"
                      class="fill-current"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_558_116359">
                      <rect width="15" height="15" class="fill-current" />
                    </clipPath>
                  </defs>
                </svg>
                <p class="text-14 text-dark-16 font-medium font-Oswald uppercase">
                  {i18n.t("header.free coins")}
                </p>
              </div>
            </NavLink>
            <div
              ref={soundButton}
              class={`relative cursor-pointer flex justify-center items-center z-10 w-10 h-10 bg-dark-20 rounded-2 ${
                userObject?.user?.sounds > 0 ? "" : "opacity-75"
              }`}
              onClick={() => {
                setSoundModalOpen((prev) => !prev);
              }}
            >
              <div class="absolute center">
                {userObject?.user?.sounds > 0 ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 5.77V11.77H4L9 16.77V0.77L4 5.77H0ZM13.5 8.77C13.5 7 12.48 5.48 11 4.74V12.79C12.48 12.06 13.5 10.54 13.5 8.77ZM11 0V2.06C13.89 2.92 16 5.6 16 8.77C16 11.94 13.89 14.62 11 15.48V17.54C15.01 16.63 18 13.05 18 8.77C18 4.49 15.01 0.91 11 0Z"
                      fill="#4D5B97"
                    />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_733_115759)">
                      <path
                        d="M16.735 17.54H16.6998C16.6594 17.4932 16.6225 17.4424 16.5779 17.3995C16.023 16.86 15.4664 16.3227 14.9127 15.782C14.8389 15.7101 14.7803 15.6227 14.7135 15.5416C13.592 16.4181 12.3814 17.0096 11.0256 17.311C11.0145 17.2882 11.0051 17.2785 11.0051 17.2682C11.0033 16.6482 10.9998 16.0275 11.0068 15.4075C11.0068 15.3623 11.0748 15.2984 11.1258 15.2767C11.4521 15.1374 11.7943 15.03 12.1084 14.8685C12.5016 14.6663 12.8725 14.4225 13.2369 14.2067C11.8078 12.8181 10.4062 11.4564 8.99414 10.0849V16.5294L8.9502 16.5482C8.90977 16.4997 8.87344 16.4466 8.82773 16.4026C7.25859 14.877 5.68828 13.3526 4.12031 11.8252C4.03535 11.7424 3.95156 11.7059 3.82969 11.7065C2.6584 11.7105 1.48652 11.7093 0.315234 11.7087C0.210352 11.7087 0.104883 11.703 0 11.7002C0 9.76462 0 7.82962 0 5.89406C0.0697266 5.8912 0.140039 5.88549 0.209766 5.88549C1.63887 5.88549 3.06738 5.88549 4.49648 5.88549H4.71445C4.65 5.81698 4.6166 5.77872 4.58027 5.74332C3.09434 4.29821 1.60781 2.85425 0.120703 1.41085C0.084375 1.37602 0.0410156 1.34804 0.000585937 1.31721V1.28296C0.413086 0.86501 0.826172 0.447064 1.26738 0C1.34766 0.0993477 1.38574 0.158157 1.43496 0.205547C6.9 5.51608 12.365 10.8255 17.8313 16.1343C17.884 16.1857 17.9443 16.2291 18.0006 16.2765V16.3107L16.735 17.54Z"
                        fill="#4D5B97"
                      />
                      <path
                        d="M17.9981 9.34342C17.9512 9.66887 17.9043 9.99432 17.8574 10.3198C17.7561 11.0215 17.3096 12.277 16.9545 12.8366C16.8684 12.7458 16.7904 12.6584 16.7061 12.5762C16.334 12.2131 15.9654 11.8465 15.5852 11.492C15.4774 11.3915 15.4721 11.3104 15.5225 11.1836C15.9145 10.1907 16.0885 9.16471 15.9561 8.10443C15.6643 5.76291 14.4567 4.00262 12.3449 2.84129C11.9664 2.63288 11.544 2.49871 11.1402 2.33313C11.0641 2.30172 10.9949 2.28859 10.9961 2.17668C11.0031 1.56747 10.9996 0.958818 11.0008 0.3496C11.0008 0.333042 11.0078 0.316484 11.016 0.282227C11.2651 0.349029 11.5152 0.404413 11.7572 0.482635C13.7008 1.10898 15.2647 2.23721 16.426 3.87416C17.2604 5.05034 17.7637 6.35557 17.9277 7.77955C17.9524 7.99309 17.974 8.2072 17.9969 8.42074V9.34285L17.9981 9.34342Z"
                        fill="#4D5B97"
                      />
                      <path
                        d="M11.001 4.9043C12.6738 5.66653 13.7472 7.55243 13.4449 9.39435C13.4004 9.35667 13.3605 9.32755 13.3254 9.29329C12.5842 8.57388 11.843 7.85504 11.1047 7.13277C11.056 7.08538 11.0056 7.01172 11.0051 6.95006C10.998 6.27404 11.0004 5.59745 11.0004 4.9043H11.001Z"
                        fill="#4D5B97"
                      />
                      <path
                        d="M6.95703 3.04135C7.62031 2.39845 8.30176 1.73727 8.98672 1.07324V5.02031C8.31641 4.36656 7.6373 3.70481 6.95703 3.04135Z"
                        fill="#4D5B97"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_733_115759">
                        <rect width="18" height="17.54" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div
            class={`w-full ${
              isSoundModalOpen() ? "flex" : "hidden"
            } justify-end`}
          >
            <div
              ref={soundWrapper}
              class="w-36 h-10 flex justify-center items-center px-2 bg-dark-20 rounded-2"
            >
              <div class="relative w-full h-2 bg-gray-2e rounded-lg">
                <input
                  type="range"
                  value={userObject?.user?.sounds * 100 || 0}
                  class="absolute left-0 top-0 w-full h-full bg-transparent appearance-none cursor-pointer"
                  onChange={(e) =>
                    toggleSounds(e.target.value ? e.target.value / 100 : 0)
                  }
                />
              </div>
            </div>
          </div>
          <div class="relative cursor-pointer flex items-center w-full h-10 bg-dark-20 rounded-2">
            <div class="absolute flex items-center gap-2 pl-4">
              <Coin width="7" />
              <p class="text-white text-14 font-medium font-Oswald">
                <Countup props={userObject?.user?.balance} />
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <NavLink
            href={`${props.pathname()}?deposit=true`}
            class="relative cursor-pointer h-11 w-full center hover flex-1 overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper"
            style={{ "background-image": `url(${YellowButtonBg})` }}
            onClick={() => playButtonClickSound()}
          >
            <div class="center relative z-10">
              <p class="text-dark-16 text-14 font-semibold font-Oswald uppercase">
                {i18n.t("header.deposit")}
              </p>
            </div>
            <div class="scrolling-btn-image hidden group-hover:block" />
          </NavLink>
          <NavLink
            href={`${props.pathname()}?withdraw=true`}
            class="relative cursor-pointer center hover h-11 w-24 rounded-2 bg-cover group scrolling-btn-wrapper overflow-hidden"
            style={{ "background-image": `url(${YellowButtonBg})` }}
            onClick={() => playButtonClickSound()}
          >
            <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
            <div class="absolute left-0.5 top-0.5 h-[calc(100%-4px)] w-23 bg-dark-13" />
            <div class="absolute center">
              <p class="text-yellow-ff text-14 font-semibold font-Oswald uppercase">
                {i18n.t("header.withdraw")}
              </p>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default HeaderToggle;
