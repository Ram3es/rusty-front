import { createRoot, onMount, onCleanup, createSignal } from "solid-js";
import { URL } from "../libraries/url";

import Coinflip from "../assets/img/config/inactive/coinflip.svg"
import CoinflipActive from "../assets/img/config/active/coinflip.svg"

import Home from "../assets/img/config/inactive/home.svg"
import HomeActive from "../assets/img/config/active/home.svg"

import Mines from "../assets/img/config/inactive/mines.svg"
import MinesActive from "../assets/img/config/active/mines.svg"

import Upgrader from "../assets/img/config/inactive/upgrader.svg"
import UpgraderActive from "../assets/img/config/active/upgrader.svg"

import Pvpmines from "../assets/img/config/inactive/pvpmines.svg"
import PvpminesActive from "../assets/img/config/active/pvpmines.svg"

import Wheel from "../assets/img/config/inactive/wheel.svg"
import WheelActive from "../assets/img/config/active/wheel.svg"

import Plinko from "../assets/img/config/inactive/plinko.svg"
import PlinkoActive from "../assets/img/config/active/plinko.svg"


const createConfig = () => {
  const modes = [
    {
      name: { en: "main", es: "principal", ru: "главный" },
      svg: Home,
      svgActive: HomeActive,
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
      svg: (<svg
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
      </svg>),
      svgActive: (<svg
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
      </svg>),
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
      name: { en: "pvp-mines", es: "Minas PVP", ru: "PVP Бомбы" },
      svg: (<svg
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
      </svg>),
      svgActive: (<svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.9907 18.0701L3.11071 6.36013C1.76477 5.04168 0.995389 3.24408 0.970703 1.36013C2.85523 1.33283 4.6741 2.05175 6.0307 3.36012L17.9207 15.0701L14.9907 18.0701Z"
          stroke="#FFC701"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.0201 17.6797L23.3701 20.9697C23.5376 21.1361 23.6705 21.3339 23.7612 21.5519C23.8519 21.7698 23.8986 22.0036 23.8986 22.2397C23.8986 22.4758 23.8519 22.7095 23.7612 22.9275C23.6705 23.1455 23.5376 23.3433 23.3701 23.5097C23.0353 23.8389 22.5846 24.0234 22.1151 24.0234C21.6456 24.0234 21.1949 23.8389 20.8601 23.5097L17.46 20.1997"
          stroke="#FFC701"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.2402 23.1402L22.9702 14.4102"
          stroke="#EC981A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.1104 17.9105L7.11035 14.9805"
          stroke="#A96500"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.6709 7.31L18.781 3.13C20.1017 1.78865 21.8987 1.02313 23.781 1C23.8072 2.88433 23.0884 4.70281 21.781 6.06L17.7109 10.32"
          stroke="#A96500"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.47082 20.0109L4.17083 23.3609C4.00601 23.5293 3.8092 23.6631 3.59197 23.7545C3.37475 23.8459 3.14147 23.8929 2.90582 23.8929C2.67016 23.8929 2.43688 23.8459 2.21966 23.7545C2.00243 23.6631 1.80569 23.5293 1.64086 23.3609C1.30989 23.0291 1.12402 22.5795 1.12402 22.1109C1.12402 21.6422 1.30989 21.1927 1.64086 20.8609L4.94085 17.4609"
          stroke="#EC981A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.01074 14.2305L10.7307 22.9505"
          stroke="#A96500"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>),
      url: URL.GAMEMODES.PVP_MINES,
      isNew: true,
    },
  ]


  return {
    _modes: modes,
  }

};


export default createRoot(createConfig);