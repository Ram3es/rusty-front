import { createEffect, createSignal, For } from "solid-js";
import injector from "../../injector/injector";
import Modal from "./Modal";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";

const TradeModal = () => {
  const { toggles, setToggles, userObject } = injector;

  const [activeTrade, setActiveTrade] = createSignal(0);

  createEffect(() => {
    if (toggles.tradeModal) {
      setActiveTrade(0);
    }
  });

  return (
    <Modal
      open={() => {
        return toggles.tradeModal && userObject.trades?.length > 0;
      }}
      handler={() => {}}
      noContainer={true}
    >
      <div
        class="w-full h-full absolute left-0 cursor-default top-0"
        onClick={() => setToggles("tradeModal", false)}
      />
      <div
        class="flex flex-col w-11/12"
        style={{
          "max-width": "30rem",
        }}
      >
        <div class="bg-dark-16 w-full px-8 py-8 relative flex flex-col gap-8">
          <div class="flex flex-col gap-3 relative">
            <p class="text-24 text-white font-medium font-Oswald uppercase">
              steam tradeoffers
            </p>
            <div
              onClick={() => setToggles("tradeModal", false)}
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
            <div class="flex gap-2 overflow-x-scroll">
              <For each={userObject.trades}>
                {(val, i) => (
                  <div
                    class={`center relative duration-200 ${
                      activeTrade() == i() ? "text-dark-43" : "text-dark-27"
                    } cursor-pointer`}
                    onClick={() => {
                      setActiveTrade(i());
                    }}
                  >
                    <svg
                      width="70"
                      height="32"
                      viewBox="0 0 70 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="70" height="32" class="fill-current" />
                      <path d="M34.619 2L27 0H43L34.619 2Z" fill="#161B2A" />
                      <path
                        d="M35.4211 30L27 32H43L35.4211 30Z"
                        fill="#161B2A"
                      />
                      <path
                        d="M3 15.6842L0 22L0 10L3 15.6842Z"
                        fill="#161B2A"
                      />
                    </svg>
                    <p
                      class={`text-12 duration-200 ${
                        activeTrade() == i() ? "text-white" : "text-gray-8c"
                      } font-medium font-Oswald uppercase absolute`}
                    >
                      {val.type}
                    </p>
                  </div>
                )}
              </For>
            </div>
          </div>
          <div class="w-full flex flex-col">
            <p class="text-14 sm:text-16 text-white font-bold sentence">
              your offer{" "}
              {
                String(userObject?.trades?.[activeTrade()]?.link)?.split(
                  "tradeoffer/"
                )?.[1]
              }{" "}
              was created!
            </p>
            <p class="text-14 sm:text-16 text-gray-8c font-normal sentence">
              click below to accept your offer
            </p>
          </div>
          <div
            class="relative center cursor-pointer w-full h-10  rounded-2 bg-cover group scrolling-btn-wrapper overflow-hidden"
            style={{ "background-image": `url(${YellowButtonBg})` }}
            onClick={() => {
              window.open(userObject?.trades?.[activeTrade()]?.link);
            }}
          >
            <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
            <p class="text-14 text-dark-16 font-medium font-Oswald uppercase absolute">
              accept
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TradeModal;
