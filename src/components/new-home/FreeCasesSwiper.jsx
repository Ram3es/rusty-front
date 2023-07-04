import { createSignal } from "solid-js";
import injector from "../../injector/injector";
import { NavLink } from "solid-app-router";
import CaseGradientButton from "../elements/CaseGradientButton";
import { RoundedBtn } from "./BannerSection";
import ArrowSliderStyle from "../icons/ArrowSliderStyle";
import { URL } from "../../libraries/url";

const FreeCasesSwiper = () => {
  const { rewardCases } = injector;
  const [activeCase, setActiveCase] = createSignal(0);

  return (
    <>
      <div class="h-full flex flex-col items-center justify-between p-3">
        <span class="gold-text-originals font-SpaceGrotesk font-bold text-base z-10">
          {rewardCases.cases[activeCase()]?.name}
        </span>
        {rewardCases.cases[activeCase()]?.id ? (
          <NavLink
            class="relative z-10"
            href={`${URL.CASE_UNBOXING}?id=${
              rewardCases.cases[activeCase()]?.id
            }&daily=true`}
          >
            <CaseGradientButton classList='h-7 lg:h-10' callbackFn={() => {}}>
              <span class="text-yellow-ffb font-SpaceGrotesk font-bold text-14">
                Open Daily Case
              </span>
            </CaseGradientButton>
          </NavLink>
        ) : (
          ""
        )}
      </div>
      <img
        src={rewardCases.cases[activeCase()]?.image.replace(
          "{url}",
          window.origin
        )}
        alt={rewardCases.cases[activeCase()]?.name}
        class="absolute top-1/2 left-1/2 max-w-[170px] lg:max-w-[200px] transform -translate-x-1/2 -translate-y-2/3"
      />
      <RoundedBtn
        handleClick={() => {
          if (activeCase() === 0) {
            setActiveCase(rewardCases.cases.length - 1);
          } else {
            setActiveCase((prev) => prev - 1);
          }
        }}
        additionalClasses="absolute top-[40%] left-2 text-gray-9a w-[22.6px] h-[22.6px] lg:h-8 lg:w-8"
      >
        <ArrowSliderStyle additionalClasses="rotate-180" />
      </RoundedBtn>
      <RoundedBtn
        handleClick={() => {
          if (activeCase() === rewardCases.cases.length - 1) {
            setActiveCase(0);
          } else {
            setActiveCase((prev) => prev + 1);
          }
        }}
        additionalClasses="absolute top-[40%] right-2 text-gray-9a w-[22.6px] h-[22.6px] lg:h-8 lg:w-8"
      >
        <ArrowSliderStyle />
      </RoundedBtn>
    </>
  );
};

export default FreeCasesSwiper;
