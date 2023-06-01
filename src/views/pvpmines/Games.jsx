import { NavLink } from "solid-app-router";
import { createSignal, onMount, For } from "solid-js";
import injector from "../../injector/injector";
import Coin from "../../utilities/Coin";

import { useI18n } from "../../i18n/context";

import Logo from "../../assets/smallLogo.svg";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";
import PageLoadState from "../../libraries/PageLoadState";
import Fallback from "../Fallback";

const Games = (props) => {
  const { userObject, socket, toastr } = injector;

  const [counter, setCounter] = createSignal(0);
  const i18n = useI18n();

  const { pvpminesPageLoaded, onPvpminesPageLoad } = PageLoadState;

  onMount(() => {
    setInterval(() => {
      if (props.val?.status != "pending") {
        setCounter(Math.floor((props.val?.timestamp - Date.now()) / 1000) || 0);
      }
    }, 1000);
  });

  const join = () => {
    socket.emit("pvpmines:join", { gameId: props.id }, (data) => {
      if (data.msg) {
        toastr(data);
      }
    });
  };

  return (
    <>
    <Fallback loaded={pvpminesPageLoaded}>
      <div
        class="w-full h-32 flex relative bg-dark-20 rounded-4 overflow-hidden border border-gray-3b3"
        style={{
          "box-shadow": "0px 4px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* <img src={Bg} class="absolute left-0 top-0 w-full h-full" /> */}
        <div class="w-full h-full flex justify-between items-center px-4 pt-4 pb-5 relative">
          <div class="h-full flex flex-col justify-between">
            <div class="flex items-center">
              <For each={Object.values(props.val.players || {})}>
                {(player, i) => (
                  <img
                    src={player.avatar || Logo}
                    class={`w-8 h-8 rounded-full ${i() == 0 ? "" : "-ml-3"}`}
                  />
                )}
              </For>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
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
                <p class="text-14 text-gray-8c font-normal capitalize">
                  {props.val.mode == "royale" ? "battle royale" : "cursed"}
                </p>
              </div>
              <div
                class={`flex items-center gap-2 ${
                  props.val.status == "ended" ? "text-gray-8c" : "text-white"
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="text-14 text-current font-semibold sentence pt-0.5">
                  {props.val.status == "pending"
                    ? "awaiting players"
                    : props.val.status == "started"
                    ? "in progress"
                    : props.val.status == "ended"
                    ? "finished game"
                    : props.val.status}
                </p>
                {props.val.status != "counting" ? (
                  ""
                ) : (
                  <>
                    <p class="text-14 text-white font-semibold font-Oswald">
                      {counter()}s
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div class="h-full flex flex-col justify-between items-end">
            <div class="flex items-center gap-3">
              <div class="center gap-1">
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
                <p class="text-16 text-gray-8c font-medium">
                  {props.val.mines
                    ? props.val.mines
                    : props.val.minePositions.length} 
                </p>
              </div>
              <span class="h-5 border-r border-dark-4f" />
              <div class="center gap-1">
                <Coin />
                <p class="text-16 text-white font-semibold font-Oswald">
                  {props.val.value}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              {props.val?.owner !== userObject?.user?.id ? (
                <NavLink
                  href={`${props.pathname()}?pvpid=${props.id}`}
                  onClick={join}
                  class={`${
                    props.val.status == "ended" ? "hidden" : "center"
                  } relative w-14 h-10 hover group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden"`}
                  style={{
                    "background-image": `url(${YellowButtonBg})`,
                    overflow: "hidden",
                  }}
                >
                  <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
                  <p class="text-dark-16 text-14 font-semibold font-Oswald uppercase text-center z-10 px-4 py-2.5">
                    {i18n.t("join")}
                  </p>
                </NavLink>
              ) : (
                ""
              )}
              <NavLink
                href={`${props.pathname()}?pvpid=${props.id}`}
                class="relative cursor-pointer center hover h-10 w-14 rounded-2 bg-cover group scrolling-btn-wrapper overflow-hidden"
                style={{ "background-image": `url(${YellowButtonBg})` }}
              >
                <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                <div class="absolute left-0.5 top-0.5 h-9 w-[calc(100%-4px)] bg-dark-20" />
                <div class="absolute center">
                  <p class="text-yellow-ff text-14 font-semibold font-Oswald uppercase">
                    view
                  </p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      </Fallback>
    </>
  );
};

export default Games;
