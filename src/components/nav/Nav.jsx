import { NavLink } from "solid-app-router";
import { onMount, onCleanup, createSignal, For } from "solid-js";
import { URL } from "../../libraries/url";

import Logo from "../../assets/smallLogo.svg";

import Injector from "../../injector/injector";
// import Config from "../../injector/config";
// import coinfliptotal from "../../views/coinflip/CoinflipTotal";
import { useI18n } from "../../i18n/context";
import isMenuActive from "../header/IsMenuActive.jsx";
import BattleActiveIcon from "../icons/BattleActiveIcon";
import BattleIcon from "../icons/BattleIcon";

const Nav = (props) => {
  const i18n = useI18n();

  const { userObject, socket } = Injector;
  
  // const { _modes } = Config;
  // const [countCoinfliptotal] = coinfliptotal;
  const [setActive] = isMenuActive;

  // const [modes, setModes] = createSignal(_modes);
  const [modes, setModes] = createSignal([
    {
      name: { en: "main", es: "principal", ru: "главный" },
      svg: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.75"
            y="0.75"
            width="8.93478"
            height="8.93478"
            rx="1.25"
            stroke="#3B436B"
            stroke-width="1.5"
          />
          <rect
            x="0.75"
            y="14.3152"
            width="8.93478"
            height="8.93478"
            rx="1.25"
            stroke="#2D3660"
            stroke-width="1.5"
          />
          <rect
            x="14.3154"
            y="0.75"
            width="8.93478"
            height="8.93478"
            rx="1.25"
            stroke="#4D5B97"
            stroke-width="1.5"
          />
          <rect
            x="14.3154"
            y="14.3152"
            width="8.93478"
            height="8.93478"
            rx="1.25"
            stroke="#3B436B"
            stroke-width="1.5"
          />
        </svg>
      ),
      svgActive: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.75"
            y="0.75"
            width="8.93478"
            height="8.93478"
            rx="1.25"
            stroke="#EC981A"
            stroke-width="1.5"
          />
          <rect
            x="0.75"
            y="14.3152"
            width="8.93478"
            height="8.93478"
            rx="1.25"
            stroke="#A96500"
            stroke-width="1.5"
          />
          <rect
            x="14.3154"
            y="0.75"
            width="8.93478"
            height="8.93478"
            rx="1.25"
            stroke="#FFC701"
            stroke-width="1.5"
          />
          <rect
            x="14.3154"
            y="14.3152"
            width="8.93478"
            height="8.93478"
            rx="1.25"
            stroke="#EC981A"
            stroke-width="1.5"
          />
        </svg>
      ),
      url: URL.HOME,
    },
    {
      name: { en: "coinflip", es: "coinflip", ru: "Коинфлип" },
      svg: (
        <svg
          width="26"
          height="29"
          viewBox="0 0 29 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="14.5801"
            cy="15.5"
            r="4.75"
            stroke="#3B436B"
            stroke-width="1.5"
          />
          <circle
            cx="14.5"
            cy="15.5"
            r="1.75"
            stroke="#3B436B"
            stroke-width="1.5"
          />
          <path
            d="M18.7928 27.907C11.5492 29.8993 4.24733 26.0375 2.4837 19.2813C1.48055 15.4384 2.48527 11.4869 4.87129 8.42692"
            stroke="#2D3660"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0793 3.60735C17.3229 1.61506 24.6247 5.47693 26.3884 12.2331C27.3915 16.076 26.3868 20.0275 24.0008 23.0875"
            stroke="#2D3660"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M0.960938 9.36218L4.81772 8.30141L5.82803 12.1717"
            stroke="#2D3660"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M27.9111 22.1522L24.0544 23.213L23.044 19.3427"
            stroke="#2D3660"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      svgActive: (
        <svg
          width="26"
          height="29"
          viewBox="0 0 29 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="14.5801"
            cy="15.5"
            r="4.75"
            stroke="#EC981A"
            stroke-width="1.5"
          />
          <circle
            cx="14.5"
            cy="15.5"
            r="1.75"
            stroke="#EC981A"
            stroke-width="1.5"
          />
          <path
            d="M18.7928 27.907C11.5492 29.8993 4.24733 26.0375 2.4837 19.2813C1.48055 15.4384 2.48527 11.4869 4.87129 8.42692"
            stroke="#A96500"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0793 3.60735C17.3229 1.61506 24.6247 5.47693 26.3884 12.2331C27.3915 16.076 26.3868 20.0275 24.0008 23.0875"
            stroke="#A96500"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M0.960938 9.36218L4.81772 8.30141L5.82803 12.1717"
            stroke="#A96500"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M27.9111 22.1522L24.0544 23.213L23.044 19.3427"
            stroke="#A96500"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      url: URL.GAMEMODES.COINFLIP,
    },
    {
      name: { en: "mines", es: "Minas", ru: "Бомбы" },
      svg: (
        <svg
          width="30"
          height="33"
          viewBox="0 0 34 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="17.0522"
            cy="18.269"
            r="7.82953"
            stroke="#3B436B"
            stroke-width="1.5"
          />
          <ellipse
            cx="17.0514"
            cy="18.1685"
            rx="3.01136"
            ry="2.91098"
            stroke="#4D5B97"
            stroke-width="1.5"
          />
          <path
            d="M15.6369 7.50047L16.9999 2.73004L18.3628 7.50047H15.6369Z"
            stroke="#4D5B97"
            stroke-width="1.5"
          />
          <path
            d="M18.3631 29.0374L17.0001 33.8078L15.6372 29.0374L18.3631 29.0374Z"
            stroke="#4D5B97"
            stroke-width="1.5"
          />
          <path
            d="M6.99275 14.065L3.54294 10.4994L8.35573 11.7043L6.99275 14.065Z"
            stroke="#4D5B97"
            stroke-width="1.5"
          />
          <path
            d="M27.0072 22.4729L30.4571 26.0385L25.6443 24.8337L27.0072 22.4729Z"
            stroke="#4D5B97"
            stroke-width="1.5"
          />
          <path
            d="M25.6441 11.7043L30.4569 10.4995L27.0071 14.0651L25.6441 11.7043Z"
            stroke="#4D5B97"
            stroke-width="1.5"
          />
          <path
            d="M8.35587 24.8335L3.54305 26.0383L6.99289 22.4727L8.35587 24.8335Z"
            stroke="#4D5B97"
            stroke-width="1.5"
          />
        </svg>
      ),
      svgActive: (
        <svg
          width="30"
          height="33"
          viewBox="0 0 34 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="17.0522"
            cy="18.269"
            r="7.82953"
            stroke="#EC981A"
            stroke-width="1.5"
          />
          <ellipse
            cx="17.0514"
            cy="18.1685"
            rx="3.01136"
            ry="2.91098"
            stroke="#FFC701"
            stroke-width="1.5"
          />
          <path
            d="M15.6369 7.50047L16.9999 2.73004L18.3628 7.50047H15.6369Z"
            stroke="#FFC701"
            stroke-width="1.5"
          />
          <path
            d="M18.3631 29.0374L17.0001 33.8078L15.6372 29.0374L18.3631 29.0374Z"
            stroke="#FFC701"
            stroke-width="1.5"
          />
          <path
            d="M6.99275 14.065L3.54294 10.4994L8.35573 11.7043L6.99275 14.065Z"
            stroke="#FFC701"
            stroke-width="1.5"
          />
          <path
            d="M27.0072 22.4729L30.4571 26.0385L25.6443 24.8337L27.0072 22.4729Z"
            stroke="#FFC701"
            stroke-width="1.5"
          />
          <path
            d="M25.6441 11.7043L30.4569 10.4995L27.0071 14.0651L25.6441 11.7043Z"
            stroke="#FFC701"
            stroke-width="1.5"
          />
          <path
            d="M8.35587 24.8335L3.54305 26.0383L6.99289 22.4727L8.35587 24.8335Z"
            stroke="#FFC701"
            stroke-width="1.5"
          />
        </svg>
      ),
      url: URL.GAMEMODES.MINES,
    },
    {
      name: { en: "plinko", es: "Plinko", ru: "Плинко" },
      svg: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="11.9998"
            cy="4.94118"
            r="4.19118"
            stroke="#2D3660"
            stroke-width="1.5"
          />
          <circle
            cx="4.94118"
            cy="19.0589"
            r="4.19118"
            stroke="#4D5B97"
            stroke-width="1.5"
          />
          <circle
            cx="19.0584"
            cy="19.0589"
            r="4.19118"
            stroke="#3B436B"
            stroke-width="1.5"
          />
        </svg>
      ),
      svgActive: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="11.9998"
            cy="4.94118"
            r="4.19118"
            stroke="#A96500"
            stroke-width="1.5"
          />
          <circle
            cx="4.94118"
            cy="19.0589"
            r="4.19118"
            stroke="#FFC701"
            stroke-width="1.5"
          />
          <circle
            cx="19.0584"
            cy="19.0589"
            r="4.19118"
            stroke="#EC981A"
            stroke-width="1.5"
          />
        </svg>
      ),
      url: URL.GAMEMODES.PLINKO,
    },
    {
      name: { en: "wheel", es: "rueda", ru: "колесо" },
      svg: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.0439 20.9554L14.7577 19.2417"
            stroke="#3B436B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.4639 14.536L20.9553 13.0446"
            stroke="#3B436B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.0439 13.0446L14.5354 14.536"
            stroke="#3B436B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.4639 19.464L20.9553 20.9554"
            stroke="#3B436B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M25.4851 25.4853C30.1714 20.799 30.1714 13.201 25.4851 8.51472C20.7988 3.82843 13.2009 3.82843 8.51458 8.51472C3.82829 13.201 3.82829 20.799 8.51458 25.4853C13.2009 30.1716 20.7988 30.1716 25.4851 25.4853Z"
            stroke="#4D5B97"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M25.4851 25.4853C30.1714 20.799 30.1714 13.201 25.4851 8.51472C20.7988 3.82843 13.2009 3.82843 8.51458 8.51472C3.82829 13.201 3.82829 20.799 8.51458 25.4853C13.2009 30.1716 20.7988 30.1716 25.4851 25.4853Z"
            stroke="#3B436B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-dasharray="5 5"
          />
          <path
            d="M19.2418 19.2417C20.4799 18.0037 20.4799 15.9963 19.2418 14.7583C18.0038 13.5202 15.9964 13.5202 14.7583 14.7583C13.5203 15.9963 13.5203 18.0037 14.7583 19.2417C15.9964 20.4798 18.0038 20.4798 19.2418 19.2417Z"
            stroke="#2D3660"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.8407 12.8407C13.4546 12.2268 13.4546 11.2314 12.8407 10.6175C12.2268 10.0036 11.2314 10.0036 10.6175 10.6175C10.0035 11.2314 10.0035 12.2268 10.6175 12.8407C11.2314 13.4547 12.2268 13.4547 12.8407 12.8407Z"
            stroke="#3B436B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M23.3827 23.3825C23.9966 22.7686 23.9966 21.7732 23.3827 21.1593C22.7688 20.5453 21.7734 20.5453 21.1595 21.1593C20.5455 21.7732 20.5455 22.7686 21.1595 23.3825C21.7734 23.9964 22.7688 23.9964 23.3827 23.3825Z"
            stroke="#3B436B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M23.3827 12.8406C23.9966 12.2267 23.9966 11.2313 23.3827 10.6174C22.7688 10.0035 21.7734 10.0035 21.1595 10.6174C20.5455 11.2313 20.5455 12.2267 21.1595 12.8406C21.7734 13.4545 22.7688 13.4545 23.3827 12.8406Z"
            stroke="#3B436B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.8407 23.3825C13.4546 22.7686 13.4546 21.7732 12.8407 21.1593C12.2268 20.5453 11.2314 20.5453 10.6175 21.1593C10.0035 21.7732 10.0035 22.7686 10.6175 23.3825C11.2314 23.9964 12.2268 23.9964 12.8407 23.3825Z"
            stroke="#3B436B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      svgActive: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.0439 20.9554L14.7577 19.2417"
            stroke="#EC981A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.4639 14.536L20.9553 13.0446"
            stroke="#EC981A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.0439 13.0446L14.5354 14.536"
            stroke="#EC981A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.4639 19.464L20.9553 20.9554"
            stroke="#EC981A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M25.4851 25.4853C30.1714 20.799 30.1714 13.201 25.4851 8.51472C20.7988 3.82843 13.2009 3.82843 8.51458 8.51472C3.82829 13.201 3.82829 20.799 8.51458 25.4853C13.2009 30.1716 20.7988 30.1716 25.4851 25.4853Z"
            stroke="#FFC701"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M25.4851 25.4853C30.1714 20.799 30.1714 13.201 25.4851 8.51472C20.7988 3.82843 13.2009 3.82843 8.51458 8.51472C3.82829 13.201 3.82829 20.799 8.51458 25.4853C13.2009 30.1716 20.7988 30.1716 25.4851 25.4853Z"
            stroke="#EC981A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-dasharray="5 5"
          />
          <path
            d="M19.2418 19.2417C20.4799 18.0037 20.4799 15.9963 19.2418 14.7583C18.0038 13.5202 15.9964 13.5202 14.7583 14.7583C13.5203 15.9963 13.5203 18.0037 14.7583 19.2417C15.9964 20.4798 18.0038 20.4798 19.2418 19.2417Z"
            stroke="#A96500"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.8407 12.8407C13.4546 12.2268 13.4546 11.2314 12.8407 10.6175C12.2268 10.0036 11.2314 10.0036 10.6175 10.6175C10.0035 11.2314 10.0035 12.2268 10.6175 12.8407C11.2314 13.4547 12.2268 13.4547 12.8407 12.8407Z"
            stroke="#EC981A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M23.3827 23.3825C23.9966 22.7686 23.9966 21.7732 23.3827 21.1593C22.7688 20.5453 21.7734 20.5453 21.1595 21.1593C20.5455 21.7732 20.5455 22.7686 21.1595 23.3825C21.7734 23.9964 22.7688 23.9964 23.3827 23.3825Z"
            stroke="#EC981A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M23.3827 12.8406C23.9966 12.2267 23.9966 11.2313 23.3827 10.6174C22.7688 10.0035 21.7734 10.0035 21.1595 10.6174C20.5455 11.2313 20.5455 12.2267 21.1595 12.8406C21.7734 13.4545 22.7688 13.4545 23.3827 12.8406Z"
            stroke="#EC981A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.8407 23.3825C13.4546 22.7686 13.4546 21.7732 12.8407 21.1593C12.2268 20.5453 11.2314 20.5453 10.6175 21.1593C10.0035 21.7732 10.0035 22.7686 10.6175 23.3825C11.2314 23.9964 12.2268 23.9964 12.8407 23.3825Z"
            stroke="#EC981A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      url: URL.GAMEMODES.WHEEL,
    },
    {
      name: { en: "upgrader", es: "upgrader", ru: "Апгрейдер" },
      svg: (
        <svg
          width="24"
          height="26"
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_44_6234)">
            <path
              d="M0.706055 7.3882V16.4235L12.0002 9.74114L23.2943 16.4235V7.3882L12.0002 0.705811L0.706055 7.3882Z"
              stroke="#4D5B97"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M23.2943 20.7812L12.0002 14.0989L0.706055 20.7812"
              stroke="#3B436B"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M0.706055 24.6212L12.0002 17.9388L23.2943 24.6212"
              stroke="#2D3660"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_44_6234">
              <rect width="24" height="25.3271" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      svgActive: (
        <svg
          width="24"
          height="26"
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_44_6238)">
            <path
              d="M0.706055 7.3882V16.4235L12.0002 9.74114L23.2943 16.4235V7.3882L12.0002 0.705811L0.706055 7.3882Z"
              stroke="#FFC701"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M23.2943 20.7812L12.0002 14.0989L0.706055 20.7812"
              stroke="#EC981A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M0.706055 24.6212L12.0002 17.9388L23.2943 24.6212"
              stroke="#A96500"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_44_6238">
              <rect width="24" height="25.3271" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      url: URL.GAMEMODES.UPGRADER,
      isNew: true,
    },
    {
      name: { en: "pvp mines", es: "Minas PVP", ru: "PVP Бомбы" },
      svg: (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.02 18.0701L3.14001 6.36013C1.79407 5.04168 1.02469 3.24408 1 1.36013C2.88453 1.33283 4.7034 2.05175 6.06 3.36012L17.95 15.0701L15.02 18.0701Z"
            stroke="#4D5B97"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.0494 17.6797L23.3994 20.9697C23.5669 21.1361 23.6998 21.3339 23.7905 21.5519C23.8812 21.7698 23.9279 22.0036 23.9279 22.2397C23.9279 22.4758 23.8812 22.7095 23.7905 22.9275C23.6998 23.1455 23.5669 23.3433 23.3994 23.5097C23.0646 23.8389 22.6139 24.0234 22.1444 24.0234C21.6749 24.0234 21.2242 23.8389 20.8894 23.5097L17.4893 20.1997"
            stroke="#4D5B97"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.2695 23.1402L22.9995 14.4102"
            stroke="#3B436B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.1397 17.9105L7.13965 14.9805"
            stroke="#2D3660"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.7002 7.31L18.8103 3.13C20.131 1.78865 21.928 1.02313 23.8103 1C23.8365 2.88433 23.1177 4.70281 21.8103 6.06L17.7402 10.32"
            stroke="#2D3660"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.50012 20.0109L4.20013 23.3609C4.03531 23.5293 3.8385 23.6631 3.62127 23.7545C3.40405 23.8459 3.17077 23.8929 2.93512 23.8929C2.69946 23.8929 2.46618 23.8459 2.24896 23.7545C2.03173 23.6631 1.83499 23.5293 1.67016 23.3609C1.33919 23.0291 1.15332 22.5795 1.15332 22.1109C1.15332 21.6422 1.33919 21.1927 1.67016 20.8609L4.97015 17.4609"
            stroke="#3B436B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.04004 14.2305L10.76 22.9505"
            stroke="#2D3660"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      svgActive: (
        <BattleActiveIcon />
      ),
      url: URL.GAMEMODES.PVP_MINES,
      isNew: true,
    },
    {
      name: { en: "unbox", es: "unbox", ru: "unbox" },
      url: URL.GAMEMODES.UNBOX,
      isNew: true,
    }
  ]);

  // const pvpMinesTotalupdate = () => {
  //   socket.emit("pvpmines:totalpot", {}, (data) => {
  //     setModes((prev) => {
  //       const newData = [...prev];
  //       newData.splice(7, 1, { ...prev[7], pot: data?.data?.pot });
  //       return newData;
  //     });
  //   });
  // };

  onMount(() => {
    // socket.emit("jackpot:totalpot", {}, (data) => {
    //   setModes((prev) => {
    //     const newData = [...prev];
    //     newData.splice(1, 1, { ...prev[1], pot: data?.data?.pot });
    //     return newData;
    //   });
    // });
    socket.on("jackpot:players", (data) => {
      setModes((prev) => {
        const newData = [...prev];
        const pot = data.pot / 1000;
        newData.splice(1, 1, { ...prev[1], pot });
        return newData;
      });
    });
    socket.on("jackpot:reset", () => {
      setModes((prev) => {
        const newData = [...prev];
        const pot = 0;
        newData.splice(1, 1, { ...prev[1], pot });
        return newData;
      });
    });
    // socket.emit("coinflip:totalpot", {}, (data) => {
    //   setModes((prev) => {
    //     const newData = [...prev];
    //     newData.splice(2, 1, { ...prev[2], pot: data?.data?.pot });
    //     return newData;
    //   });
    // });
    // socket.on("coinflip:update", (data) => {
    //   setModes((prev) => {
    //     const newData = [...prev];
    //     const games = data.data.games;
    //     const total = {
    //       value: 0 || countCoinfliptotal(),
    //     };
    //     for (const id in games) {
    //       total.value += games[id].creator.value || 0;
    //       total.value += games[id].opponent.value || 0;
    //     }
    //     const pot = total.value / 1000;
    //     newData.splice(2, 1, { ...prev[2], pot: pot });
    //     return newData;
    //   });
    // });

    // pvpMinesTotalupdate();
  });

  onCleanup(() => {
    socket.off("jackpot:players");
    socket.off("coinflip:update");
    socket.off("pvpmines:update");
  });

  return (
    <>
      <div class="order-2 lg:order-1 z-30 relative w-full lg:w-22 h-max lg:h-full bg-dark-13 flex flex-col justify-between items-center border-r border-gray-56 border-opacity-20 pb-10">
        here
        <div class="w-full h-22 bg-yellow-ff bg-opacity-10 hidden lg:flex justify-center items-center">
          <div
            onClick={() => {
              if(userObject?.user?.avatar) {
                props?.setSearch({ profile: true })
              }
            }}
            class="w-12 h-12 rounded-full border border-yellow-ff p-0.5 cursor-pointer"
          >
            <img
              alt="logo"
              class="w-full h-full rounded-full"
              src={userObject?.user?.avatar || Logo}
            />
          </div>
        </div>
        <div class="items-center justify-start lg:flex-col gap-5 sm:gap-10 lg:gap-4 flex-1 overflow-y-scroll w-full">
          <div class="flex lg:flex-col items-end sm:items-center gap-5 sm:gap-10 lg:gap-3 max-w-full py-4 overflow-x-scroll md:overflow-x-hidden">
            <For each={modes()}>
              {(mode) =>
                mode.url ? (
                  <NavLink
                    href={`${mode.url}`}
                    class={`w-full h-auto relative px-2 md:px-4 transition-all duration-200 ${
                      props.pathname() == mode.url
                        ? "text-yellow-ff"
                        : "text-gray-66"
                    } pb-0 flex justify-around lg:justify-center items-center flex-col gap-2 cursor-pointer group`}
                    onClick={() => {
                      document.getElementById("scrollWrapper").scrollTop = 0;
                      setActive(false);
                    }}
                  >
                    <div
                      class={`${
                        props.pathname() == mode.url
                          ? "text-yellow-ff"
                          : "text-gray-4d"
                      } group-hover:text-yellow-ff`}
                    >
                      {/* <img src={props.pathname() == mode.url ? (
                        mode.svgActive || mode.svg
                      ) : mode.svg} /> */}
                      {props.pathname() == mode.url ? (
                         mode.svgActive || mode.svg
                         ) : !mode.svgActive ? (
                          mode.svg
                        ) : (
                          <>
                            <div class="hidden group-hover:block">
                              {mode.svgActive}
                            </div>
                            <div class="block group-hover:hidden">{mode.svg}</div>
                          </>
                        )}
                    </div>
                    <p class="text-14 text-current font-medium uppercase font-Oswald truncate group-hover:text-yellow-ff">
                      {mode.name[i18n.language]}
                    </p>
                    {mode.pot >= 0 ? (
                      <p
                        class={`${
                          props.pathname() == mode.url
                            ? "bg-yellow-ff text-black"
                            : "bg-gray-1c text-gray-8c"
                        } group-hover:text-black group-hover:bg-yellow-ff hidden sm:block text-10 py-1 text-center w-full`}
                      >
                        $ {Math.round(mode.pot)}
                      </p>
                    ) : (
                      ""
                    )}
                    {mode.isNew ? (
                      <span class="absolute right-2 bottom-90per text-8 text-white font-Oswald px-1 py-sm bg-red-ff rounded-1">
                        {i18n.t("home.new")}
                      </span>
                    ) : (
                      ""
                    )}
                  </NavLink>
                ) : (
                  <div class="w-full h-20 px-2 md:px-4 transition-all duration-200 text-gray-66 pb-2 lg:pb-0 flex justify-end lg:justify-center items-center flex-col gap-3 cursor-pointer">
                    <div class="text-gray-4d">{mode.svg}</div>
                    <p class="text-14 text-current font-medium uppercase font-Oswald truncate">
                      {mode?.name?.[i18n?.language || "en"]}
                    </p>
                  </div>
                )
              }
            </For>
          </div>
        </div>
        <div class="hidden lg:flex justify-center items-center flex-col gap-8 mb-10">
          <NavLink href={URL.TOS} class="hover">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_705_109924)">
                <path
                  d="M11.9975 6.37207C12.7 6.37207 13.2638 6.93207 13.2644 7.63145C13.265 8.32707 12.6956 8.89957 12.0013 8.90082C11.3088 8.90207 10.735 8.32895 10.7344 7.63582C10.7338 6.93645 11.2969 6.37332 11.9975 6.3727V6.37207Z"
                  fill="#3B436B"
                />
                <path
                  d="M11.0638 14.0087C11.0638 13.0018 11.0607 11.9943 11.0657 10.9875C11.0676 10.5712 11.3251 10.2225 11.7026 10.0962C12.0776 9.97121 12.5051 10.0806 12.727 10.4081C12.8388 10.5731 12.9282 10.7925 12.9295 10.9881C12.9439 12.9943 12.9407 15.0006 12.937 17.0068C12.9357 17.5556 12.5214 17.9606 11.9888 17.9556C11.4707 17.9506 11.0682 17.5443 11.0651 17.0056C11.0601 16.0062 11.0638 15.0068 11.0638 14.0081V14.0087Z"
                  fill="#3B436B"
                />
                <path
                  d="M12.75 24H11.25C11.19 23.9869 11.1306 23.9656 11.07 23.9613C9.79125 23.8663 8.55188 23.5925 7.38062 23.0713C3.43 21.315 1.01813 18.3175 0.18375 14.0675C0.09875 13.6331 0.06 13.1894 0 12.75V11.25C0.01375 11.1819 0.029375 11.1144 0.04 11.0463C0.135 10.4381 0.191875 9.82125 0.33 9.22313C1.40375 4.57625 5.24 0.978125 9.95562 0.179375C10.385 0.106875 10.8188 0.059375 11.25 0C11.75 0 12.25 0 12.75 0C12.81 0.013125 12.87 0.02875 12.9306 0.03875C13.6825 0.168125 14.4594 0.21625 15.1831 0.43875C19.9231 1.8975 22.81 5.0675 23.8156 9.93188C23.905 10.3656 23.94 10.81 24.0006 11.25V12.75C23.9875 12.8106 23.9669 12.87 23.9619 12.9312C23.7513 15.5606 22.7875 17.8806 21.0569 19.8662C19.1963 22.0012 16.86 23.3212 14.0675 23.8181C13.6313 23.8956 13.1894 23.94 12.7506 24H12.75ZM12.0031 1.875C6.41625 1.8725 1.88812 6.39187 1.875 11.9844C1.86188 17.575 6.4 22.1213 11.9963 22.1244C17.5825 22.1275 22.1112 17.6075 22.1244 12.0144C22.1381 6.42187 17.6012 1.8775 12.0025 1.87437L12.0031 1.875Z"
                  fill="#3B436B"
                />
              </g>
              <defs>
                <clipPath id="clip0_705_109924">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Nav;
