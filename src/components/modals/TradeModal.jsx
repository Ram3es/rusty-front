import { createEffect, createSignal, For } from "solid-js";
import injector from "../../injector/injector";
import Modal from "./Modal";
import rewardsRobbed from '../../assets/img/rewards/rewardsRobbed.png'
import CloseButton from "../elements/CloseButton";
import TransparentButton from "../elements/TransparentButton";
import YellowGradientButton from "../../components/elements/CaseGradientButton";

const TradeModal = () => {
  const { toggles, setToggles, userObject } = injector;
  const [tradeType, setTradeType] = createSignal();
  const [types, setTypes] = createSignal([]);


  createEffect(() => {
    if (toggles.tradeModal && userObject.trades?.length > 0) {
      console.log(userObject.trades);
      setTradeType(userObject.trades[0].type);
      setTypes(() => {
        const types = [];
        userObject.trades.forEach((trade) => {
          if (!types.includes(trade.type)) {
            types.push(trade.type);
          }
        });
        return types;
      })
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
        <div
          class="w-full relative flex flex-col gap-8"
          style={{
            background:
              "radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
            "backdrop-filter": "blur(8px)",
          }}
        >
          <div class="flex flex-col gap-3 relative">
          <div
            class="flex justify-between items-center relative px-8 py-4"
            style={{
              background:
                "linear-gradient(87.89deg, rgba(26, 27, 48, 0) 1.79%, rgba(0, 0, 0, 0.08) 50.01%, rgba(0, 0, 0, 0) 98.24%)",
            }}
          >
            <div class="flex flex-col">
              <h2 class="text-20 text-white font-bold font-SpaceGrotesk uppercase truncate">
                steam tradeoffers
              </h2>
              <div class="font-SpaceGrotesk text-12 text-[#646683]">
                Earn free RustyLoot Balance.
              </div>
            </div>
            <div
              class="relative"
              onClick={() => setToggles("tradeModal", false)}
            >
              <CloseButton isRelative={true} />
            </div>
          </div>
            <div class="flex gap-2 overflow-x-scroll px-8 py-2">
              <For each={types()}>
                {(val) => (
                  <TransparentButton
                    callbackFn={() => setTradeType(val)}
                    isActive={tradeType() == val}
                  >
                    <div class="flex gap-2">
                      <span class='truncate capitalize'>
                        {val}
                      </span>
                      <span class="text-yellow-ffb">
                        {userObject?.trades?.filter((trade) => trade.type == val).length}
                      </span>
                    </div>
                  </TransparentButton>
                )}
              </For>
            </div>
          </div>
          <div class="flex flex-col gap-4 px-8 pb-4">
          <For each={userObject?.trades?.filter((trade) => trade.type == tradeType())}>
            {(trade) => (
              <div
                class="flex flex-col gap-4 px-6 pt-4 relative"
                style={{
                  'border-radius': '6px',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  background: 'linear-gradient(90deg, rgba(26, 27, 48, 0.00) 0%, #1A1C33 50.00%, rgba(25, 28, 51, 0.85) 57.29%, rgba(25, 28, 53, 0.00) 100%), rgba(0, 0, 0, 0.24)',
                }}
              >
              <img src={rewardsRobbed} class=' absolute inset-0 min-h-full min-w-full' />
              <div class="w-full flex flex-col">
                <p class="text-14 sm:text-16 text-white font-bold sentence">
                  your offer{" "}
                  {
                    String(trade?.link)?.split(
                      "tradeoffer/"
                    )?.[1]
                  }{" "}
                  was created!
                </p>
                <p class="text-14 sm:text-16 text-gray-8c font-normal sentence">
                  click below to accept your offer
                </p>
              </div>
              <YellowGradientButton callbackFn={() => window.open(trade?.link)}>
                <div class="center text-14 font-SpaceGrotesk gap-2 text-yellow-ffb font-bold">
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_3_142105)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.52834 3.84203C9.54494 1.72062 11.2885 0 13.4259 0C15.5728 0 17.3164 1.73721 17.3164 3.87267L17.3171 3.87331C17.3171 6.01897 15.5735 7.74916 13.4297 7.74916L9.693 10.4673C9.55579 11.9326 8.30872 13.0833 6.80382 13.0833C5.41954 13.0833 4.2497 12.1024 3.96569 10.8011L2 10.0142V6.35914L5.32381 7.69747C5.84012 7.38411 6.42408 7.24434 7.10122 7.30561L9.52834 3.84203ZM5.53387 11.4258C5.32754 11.343 5.1211 11.2602 4.91599 11.1821C5.95563 13.1248 8.94055 11.3659 8.94119 10.1839C8.94055 8.80477 7.66604 7.81298 6.34239 8.10656L7.23142 8.46396C8.10258 8.81179 8.53018 9.79208 8.17789 10.6607C7.82942 11.5293 6.83828 11.955 5.96585 11.5976C5.82223 11.5414 5.67808 11.4836 5.53387 11.4258ZM10.8143 3.87331C10.8143 5.31056 11.9867 6.46891 13.4297 6.46891C14.8619 6.47274 16.0349 5.31439 16.0349 3.87331C16.0349 2.44244 14.8625 1.2777 13.4297 1.2777C11.9835 1.2777 10.8143 2.44244 10.8143 3.87331ZM11.9565 3.82929C11.9565 2.9832 12.642 2.29758 13.4882 2.29758C14.3293 2.29758 15.0199 2.98085 15.0199 3.82929C15.0199 4.67773 14.3293 5.361 13.4882 5.361C12.6396 5.361 11.9565 4.67537 11.9565 3.82929Z" fill="#FFB436"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_3_142105" x="0" y="0" width="19.3164" height="17.0833" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="1"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_142105"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_142105" result="shape"/>
                    </filter>
                    </defs>
                  </svg>
                  <span>Accept Offer</span>
                </div>
              </YellowGradientButton>
              <div/>
              </div>)}
          </For>
          </div>
          
        </div>
      </div>
    </Modal>
  );
};

export default TradeModal;
