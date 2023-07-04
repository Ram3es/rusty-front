import { createSignal, For } from "solid-js";

import Ranks from "../../../utilities/Ranks";
import ribbedBg from "../../../assets/img/affilates/afffilatesRibbedBg.png"

const AffiliatesTiers = () => {
  const [tiers] = createSignal([
    {
      name: "bronze",
      image: "bronze",
      deposit: 1,
      tax: 5,
      referrals: 5,
    },
    {
      name: "silver",
      image: "silver",
      deposit: 1.5,
      tax: 6,
      referrals: 10,
    },
    {
      name: "gold",
      image: "gold3",
      deposit: 1.75,
      tax: 7,
      referrals: 20,
    },
    {
      name: "platinum",
      image: "platinum3",
      deposit: 1.85,
      tax: 8,
      referrals: 35,
    },
    {
      name: "diamond",
      image: "diamond",
      deposit: 2,
      tax: 15,
      referrals: 75,
    },
  ]);

  return (
    <>
      <div class="w-full flex flex-col gap-4">
        <div class="w-full h-full overflow-y-scroll grid grid-cols-1 gap-x-2.5 gap-y-5">
          <For each={tiers()}>
            {(tier, i) => (
              <div
                class={`w-full center rounded-6 overflow-hidden relative ${i() <= 0 && "tear-current-border-gradient"}`}
                style={{
                  background: "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.03) 41.3%, rgba(0, 0, 0, 0.03) 68.93%, rgba(255, 255, 255, 0.03) 100%), radial-gradient(136.7% 122.5% at 50.04% 121.87%, rgba(255, 180, 54, 0.07) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
                }}
              >
                <div class={`w-full flex flex-col sm:flex-row justify-center items-center h-full ${i() > 0 ? 'opacity-60' : '' }`}>
                  <div 
                    class="w-full sm:w-32 h-full flex justify-start sm:justify-center items-center bg-tiers-title-gradient sm:bg-none"
                    
                  >
                    <div 
                      class="flex py-2 px-4 sm:p-0 w-full h-full justify-start sm:justify-center items-center sm:flex-col gap-2"
                      style={{ background:`url(${ribbedBg})` }}
                    >
                      <div class="w-8 sm:w-13">
                        <Ranks rank={tier.image} width="full" />
                      </div>
                      <p class="text-14 text-white font-bold font-SpaceGrotesk uppercase">
                        {tier.name} tier
                      </p>
                    </div>
                  </div>
                  <div class="w-full flex-1 px-6 py-3 flex flex-col justify-end gap-2 sm:mr-16 [&_div_p>span]:text-white">
                    <div class="flex gap-3">
                      <p class="text-13 text-gray-a2 font-bold font-SpaceGrotesk">
                        <span>{tier.deposit}%</span> of your referral’s deposits into shop
                      </p>
                    </div>
                    <div class="flex gap-3">
                      <p class="text-13 text-gray-a2 font-bold font-SpaceGrotesk flex-1">
                      <span>{tier.tax}%</span> of Rustyloot’s tax per referral’s deposits
                        into Coinflip (vs bot) and Jackpot
                      </p>
                    </div>
                    <div class="flex gap-3">
                      <p class="text-13 text-gray-a2 font-bold font-SpaceGrotesk">
                        At least <span>{tier.referrals} referrals </span> to be able to claim
                      </p>
                    </div>
                  </div>
                </div>
                <div class={`sm:w-16 absolute right-0 top-[1.5rem] sm:top-1/2 -translate-y-1/2 z-[10] ${i() > 0 && 'mix-blend-luminosity ' }`}>
                    {
                      i() > 0 ? (
                        <div
                          class="w-9 h-9 rounded-4 -mt-1 sm:mt-0 center"
                          style={{
                            background: "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(11, 189, 82, 0) 0%, rgba(11, 189, 82, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.40698 7.51985C4.08708 7.36784 4.90439 7.21417 5.82271 7.09668V5.59294C5.82271 3.841 7.24801 2.41569 8.99995 2.41569C10.7519 2.41569 12.1772 3.841 12.1772 5.59294V7.09668C13.0955 7.21417 13.9128 7.36784 14.5929 7.51985V5.59294C14.5929 2.509 12.0839 0 8.99995 0C5.91598 0 3.40698 2.509 3.40698 5.59297V7.51985Z" fill="#3EFF8B"/>
                            <path d="M9.00017 11.2264C8.63701 11.2264 8.34155 11.5219 8.34155 11.8851C8.34155 12.2483 8.63701 12.5437 9.00017 12.5437C9.36333 12.5437 9.65879 12.2483 9.65879 11.8851C9.65882 11.5219 9.36333 11.2264 9.00017 11.2264Z" fill="#3EFF8B"/>
                            <path d="M9.00006 7.94476C5.68546 7.94476 2.92429 8.69605 1.97827 8.98743V16.957C2.92573 17.2482 5.69288 18 9.00006 18C12.3147 18 15.0758 17.2487 16.0218 16.9573V8.98771C15.0744 8.69654 12.3073 7.94476 9.00006 7.94476ZM9.52741 13.515V15.2457H8.47272V13.515C7.78531 13.292 7.28676 12.6458 7.28676 11.885C7.28676 10.9403 8.05535 10.1717 9.00006 10.1717C9.94478 10.1717 10.7134 10.9403 10.7134 11.885C10.7134 12.6458 10.2149 13.292 9.52741 13.515Z" fill="#3EFF8B"/>
                          </svg>
                        </div>                     
                      ) : <div
                      class={`text-[#3EFF8B] text-12 font-bold font-Quicksand px-1 py-0.5 rounded-l-2 center`}
                      style={{
                        background: "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(11, 189, 82, 0) 0%, rgba(11, 189, 82, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)"
                      }}
                      >CURRENT</div>
                    }
                  </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </>
  );
};

export default AffiliatesTiers;
