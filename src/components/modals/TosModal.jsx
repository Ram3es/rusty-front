import injector from "../../injector/injector";
import { URL } from "../../libraries/url";
import Modal from "./Modal";
import YellowGradientButton from '../../components/elements/CaseGradientButton'

import LoginModelBg from "../../assets/img/modals/LoginModelBg.png";
import LoginModalSmallBg from "../../assets/img/modals/LoginModalSmallBg.png";
import smallLogo from '../../assets/smallLogo.svg'

import { NavLink } from "solid-app-router";
import CloseButton from "../elements/CloseButton";

const TosModal = () => {
  const { setToggles } = injector;

  return (
    <Modal
      noContainer={true}
      open={() => {
        return true;
      }}
      handler={() => {}}
    >
      <div
        class="w-full h-full absolute left-0 cursor-default top-0"
        onClick={() => setToggles("tosModal", false)}
      />
      <div
        class="flex w-11/12 flex-col rounded-12 overflow-hidden"
        style={{
          "max-width": "698px",
        }}
      >
        <div style={{
              background:
                "radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(135deg, rgb(46 49 72) 0%, rgb(40 44 77) 100%)",
            }}>
         <div
            class={`flex relative z-20 w-full md:hidden items-center justify-between px-8 py-6 bg-cover border border-black border-opacity-10 rounded-t-12`}
            style={{
              background: 'linear-gradient(87.89deg, rgba(26, 27, 48, 0) 1.79%, rgba(0, 0, 0, 0.08) 50.01%, rgba(0, 0, 0, 0) 98.24%)'
            }}
          >
            <div class="flex flex-col items-start sm:flex-row sm:items-center gap-6">
              <div class="flex flex-col">
                <h2 class="text-20 leading-[26px] text-white font-bold font-SpaceGrotesk uppercase truncate">
                  LOGIN
                </h2>
                <div class="font-SpaceGrotesk font-bold text-xs leading-[15px] text-gray-64">
                Entering RustyLoot...
                </div>
              </div>
            </div>
            <div
              onClick={() => setToggles("tosModal", false)}
              class="cursor-pointer flex md:hidden justify-center items-center z-10"
            >
              <CloseButton />
            </div>
            </div>
            </div>
        <div class="bg-dark-16 w-full min-h-[458px] px-4 pt-2 relative center flex-col gap-6">
          <div
            onClick={() => setToggles("tosModal", false)}
            class="cursor-pointer absolute hidden md:flex justify-center items-center right-2 top-2 z-10"
          >
            <CloseButton />
          </div>
          <div
            class="w-full h-full left-0 top-0 absolute min-h-[458px]"
            style={{
              background:
                "radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
            }}
          >
            <img alt="LoginModalSmallBg" class="w-full md:hidden" src={LoginModalSmallBg} />
            <img alt="LoginModelBg" class="w-full hidden md:block" src={LoginModelBg} />
          </div>
          <div class="w-full flex flex-col gap-9 z-10 relative">
            
            <div class="center flex gap-6">
              <svg class="rotate-180" width="135" height="5" viewBox="0 0 135 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0.157898L134.842 2.56579L0 4.97369V0.157898Z" fill="url(#paint0_linear_2656_221028)"/>
              <defs>
              <linearGradient id="paint0_linear_2656_221028" x1="8.16279e-07" y1="2.56579" x2="134.842" y2="2.56584" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFC467"/>
              <stop offset="1" stop-color="#FFC467" stop-opacity="0"/>
              </linearGradient>
              </defs>
              </svg>
              <img
                alt='logo'
                class={`max-w-[76px] fourk:w-auto block`}
                src={smallLogo}
                style={{ filter: 'drop-shadow(0px 0px 24px rgba(255, 194, 57, 0.16))' }}
              />
              <svg width="135" height="5" viewBox="0 0 135 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0.157898L134.842 2.56579L0 4.97369V0.157898Z" fill="url(#paint0_linear_2656_221028)"/>
              <defs>
              <linearGradient id="paint0_linear_2656_221028" x1="8.16279e-07" y1="2.56579" x2="134.842" y2="2.56584" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFC467"/>
              <stop offset="1" stop-color="#FFC467" stop-opacity="0"/>
              </linearGradient>
              </defs>
              </svg>
            </div>

            <div class="center flex-col">
              <p
                class="text-24 text-white font-bold font-SpaceGrotesk uppercase"
                style={{
                  "text-shadow": "0px 0px 14px rgba(255, 255, 255, 0.56)"
                }}
              >
                ENTERING RUSTYLOOT
              </p>
              <p class="text-14 text-[#646683] font-SpaceGrotesk text-center">
              By logging in and using this website you acknowledge that you are at least
                <br />
                18 years old and agree to our{" "}
                <NavLink
                  class="text-yellow-ffb underline"
                  href={URL.TOS}
                  onClick={() => setToggles("tosModal", false)}
                >
                  Terms of Service
                </NavLink>
              </p>
            </div>

            <div class="center gap-4">
              <YellowGradientButton callbackFn={() => location.replace(URL.SIGNIN)}>
                <div class='center text-14 font-SpaceGrotesk gap-2 text-yellow-ffb font-bold'>
                  I agree, proceed to Sign In
                </div>
              </YellowGradientButton>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TosModal;
