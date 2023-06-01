import { createSignal, For } from "solid-js";
import injector from "../../injector/injector";
import { STEAM } from "../../libraries/url";
import Coin from "../../utilities/Coin";
import Modal from "./Modal";
import Loading from "../Loading";

import RedCoin from "../../assets/img/coinflip/redcoin.svg";
import BlackCoin from "../../assets/img/coinflip/blackcoin.svg";

import Splash from "../../assets/img/modals/winningSplash.svg";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";

const WinningsModal = () => {
  const { socket, toggles, setToggles, toastr } = injector;

  const [side, setSide] = createSignal(1);

  const decision = (choice) => {
    if (choice != "double" && choice != "cashout" && choice != "sell") return;

    if (toggles.winningsModal?.type == "upgrader") {
      socket.emit(
        "upgrader:decision",
        {
          type: choice == "sell" ? "coins" : "skins",
        },
        (data) => {
          if (!data.error) {
            setToggles("winningsModal", false);
          }

          if (data.msg) {
            toastr(data);
          }
        }
      );
    } else {
      socket.emit(
        "coinflip:decision",
        {
          id: toggles.winningsModal?.id,
          type: choice,
          side: side(),
        },
        (data) => {
          if (!data.error) {
            setToggles("winningsModal", false);
          }

          if (data.msg) {
            toastr(data);
          }
        }
      );
    }
  };

  return (
    <Modal
      open={() => {
        return true;
      }}
      handler={() => {}}
      noContainer={true}
    >
      <div class="w-full h-full absolute left-0 cursor-default top-0" />
      <div
        class="flex flex-col w-11/12"
        style={{
          "max-width": "60rem",
        }}
      >
        <div
          class="bg-dark-16 w-full px-8 pt-8 pb-16 relative flex flex-col gap-6 rounded-6 overflow-hidden"
          style={{
            border: "2px solid rgba(102, 110, 151, 0.2)",
          }}
        >
          <div
            class="w-full h-1/2 left-0 top-0 absolute"
            style={{
              background:
                "linear-gradient(180deg, rgba(114, 81, 31, 0.5) -4.92%, rgba(61, 39, 32, 0.5) 30.6%, rgba(22, 27, 42, 0) 54.64%, rgba(25, 31, 49, 0) 100%)",
            }}
          >
            <img alt="splash" class="w-full" src={Splash} />
          </div>
          <div class="w-full flex flex-col gap-6 z-10 relative">
            <div
              onClick={() => setToggles("winningsModal", false)}
              class="center absolute right-0 cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
                  fill="#8C98A9"
                />
              </svg>
            </div>
            <div class="center flex-col">
              <p class="text-28 text-white font-medium font-Oswald uppercase">
                you won
              </p>
              <p class="text-16 text-white font-semibold sentence center gap-2">
                <Coin width="7" /> {toggles.winningsModal?.value}
              </p>
            </div>

            <div class="w-full h-100 grid grid-cols-skins gap-3 overflow-y-scroll relative">
              <For each={toggles.winningsModal?.items} fallback={<Loading />}>
                {(item) => (
                  <div
                    class={`w-full h-52 center flex-col gap-8 px-2 relative cursor-pointer overflow-hidden`}
                  >
                    <img
                      class="h-20 no-select"
                      src={`${
                        item?.image?.includes("steam")
                          ? ""
                          : STEAM.IMAGE_ENDPOINT
                      }${item?.image}/80fx80f`}
                    />
                    <div class="center flex-col gap-1 relative max-w-full">
                      <p class="text-16 text-gray-8c font-bold truncate max-w-full">
                        {item?.name}
                      </p>
                      <div class="center gap-2">
                        <Coin />
                        <p class="text-14 text-white font-bold">
                          {Number(item?.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>

            <div class="center flex-col gap-4">
              <p class="text-16 text-gray-8c font-normal text-center">
                Congratulations on winning!
                <br />
                {toggles.winningsModal?.type == "jackpot"
                  ? "Your items will be sent shortly"
                  : toggles.winningsModal?.type == "upgrader"
                  ? "Cash out the skin or sell for an extra 5%"
                  : "Cash out the skins or double down"}
              </p>

              <div
                class={`${
                  toggles.winningsModal?.type != "coinflip"
                    ? "hidden"
                    : "center"
                } flex-col gap-2`}
              >
                <p class="text-14 text-gray-8c font-normal sentence">
                  choose a coin:
                </p>
                <div class="center gap-4">
                  <img
                    alt="red-coin" 
                    src={RedCoin}
                    class={`h-9 cursor-pointer ${
                      side() == 1 ? "" : "opacity-40"
                    }`}
                    onClick={() => {
                      setSide(1);
                    }}
                  />
                  <img
                    alt="red-coin" 
                    src={BlackCoin}
                    class={`h-9 cursor-pointer ${
                      side() == 2 ? "" : "opacity-40"
                    }`}
                    onClick={() => {
                      setSide(2);
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              class={`${
                toggles.winningsModal?.type != "coinflip" ? "hidden" : "center"
              } gap-4`}
            >
              <div
                class="relative w-52 h-10 center hover group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden"
                style={{ "background-image": `url(${YellowButtonBg})` }}
                onClick={() => {
                  decision("cashout");
                }}
              >
                <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
                <p class="text-dark-16 text-14 font-semibold font-Oswald uppercase min-w-36 text-center z-10 px-4 py-2.5">
                  cashout
                </p>
              </div>
              <div
                class="relative cursor-pointer center hover h-10 w-52 rounded-2 bg-cover group scrolling-btn-wrapper overflow-hidden"
                style={{ "background-image": `url(${YellowButtonBg})` }}
                onClick={() => {
                  decision("double");
                }}
              >
                <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                <div class="absolute left-0.5 top-0.5 h-9 w-[calc(100%-4px)] bg-dark-13" />
                <div class="absolute center">
                  <p class="text-yellow-ff text-14 font-semibold font-Oswald uppercase">
                    double down
                  </p>
                </div>
              </div>
            </div>

            <div
              class={`${
                toggles.winningsModal?.type != "upgrader" ? "hidden" : "center"
              } gap-4`}
            >
              <div
                class="relative w-52 h-10 center hover group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden"
                style={{ "background-image": `url(${YellowButtonBg})` }}
                onClick={() => {
                  decision("sell");
                }}
              >
                <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
                <p class="text-dark-16 text-14 font-semibold font-Oswald uppercase min-w-36 text-center z-10 px-4 py-2.5">
                  sell 5%
                </p>
              </div>
              <div
                class="relative cursor-pointer center hover h-10 w-52 rounded-2 bg-cover group scrolling-btn-wrapper overflow-hidden"
                style={{ "background-image": `url(${YellowButtonBg})` }}
                onClick={() => {
                  decision("cashout");
                }}
              >
                <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
                <div class="absolute left-0.5 top-0.5 h-9 w-[calc(100%-4px)] bg-dark-13" />
                <div class="absolute center">
                  <p class="text-yellow-ff text-14 font-semibold font-Oswald uppercase">
                    withdraw
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WinningsModal;
