import injector from "../../injector/injector";
import { URL } from "../../libraries/url";
import Modal from "./Modal";

import Splash from "../../assets/img/modals/winningSplash.svg";
import Symbol from "../../assets/img/modals/tosSymbol.svg";

import { NavLink } from "solid-app-router";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";

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
        class="flex w-11/12 flex-col"
        style={{
          "max-width": "32rem",
        }}
      >
        <div class="bg-dark-16 w-full px-6 pt-16 pb-16 relative flex flex-col gap-6">
          <div
            class="w-full h-3/5 left-0 top-0 absolute"
            style={{
              background:
                "linear-gradient(180deg, rgba(114, 81, 31, 0.5) -4.92%, rgba(61, 39, 32, 0.5) 30.6%, rgba(22, 27, 42, 0) 54.64%, rgba(25, 31, 49, 0) 100%)",
            }}
          >
            <img alt="splash" class="w-full" src={Splash} />
          </div>
          <div class="w-full flex flex-col gap-12 z-10 relative">
            <div
              onClick={() => setToggles("tosModal", false)}
              class="center absolute -top-6 right-2 cursor-pointer"
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
            <div class="center flex-col gap-6">
              <img alt="symbol" src={Symbol} />
              <p class="text-28 text-white font-medium font-Oswald uppercase">
                terms of service
              </p>
            </div>

            <div class="center">
              <p class="text-16 text-gray-8c font-normal text-center">
                By logging in and using this website you acknowledge
                <br />
                that are at least 18 years old and agree to our{" "}
                <NavLink
                  class="text-yellow-ff underline"
                  href={URL.TOS}
                  onClick={() => setToggles("tosModal", false)}
                >
                  Terms of Service.
                </NavLink>
              </p>
            </div>

            <div class="center gap-4">
              <div
                class="relative w-52 h-10 center hover group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden"
                style={{ "background-image": `url(${YellowButtonBg})` }}
                onClick={() => {
                  location.replace(URL.SIGNIN);
                }}
              >
                <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
                <p class="text-dark-16 text-14 font-semibold font-Oswald uppercase min-w-36 text-center z-10 px-4 py-2.5">
                  i agree, proceed to sign in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TosModal;
