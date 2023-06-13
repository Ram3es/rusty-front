import { createSignal, onMount } from "solid-js";
import injector from "../../injector/injector";
import { NavLink } from "solid-app-router";
import CaseGradientButton from "../elements/CaseGradientButton";
import { RoundedBtn } from "./BannerSection";
import ArrowSliderStyle from "../icons/ArrowSliderStyle";
import { URL } from "../../libraries/url";

const FreeCasesSwiper = () => {
  const {freeCases} = injector;
  const [activeCase, setActiveCase] = createSignal(0);

  return (
    <>
    <div class='h-full flex flex-col items-center justify-between p-3 '>
                        <span class="gold-text-originals font-SpaceGrotesk font-bold text-base ">
                            {freeCases()[activeCase()]?.name}
                        </span>
                        {freeCases()[activeCase()]?.id ? <NavLink class="relative z-10" href={`${URL.CASE}?id=${freeCases()[activeCase()]?.id}`}>
                            <CaseGradientButton callbackFn={() => {}}>
                                <span class='text-yellow-ffb  font-SpaceGrotesk font-bold text-sm '>
                                Open Daily Case
                                </span>
                            </CaseGradientButton>
                        </NavLink> : ''}
                        </div>
                       <img src={freeCases()[activeCase()]?.image} alt={freeCases()[activeCase()]?.name} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                       <RoundedBtn
                            handleClick={() => {
                                if (activeCase() === 0) {
                                    setActiveCase(freeCases().length - 1)
                                } else {
                                    setActiveCase(prev => prev - 1)
                                }
                            }}
                            additionalClasses='absolute top-[40%] left-2 text-gray-9a' >
                                <ArrowSliderStyle additionalClasses='rotate-180' /> 
                        </RoundedBtn>
                        <RoundedBtn
                            handleClick={() => {
                                if (activeCase() === freeCases().length - 1) {
                                    setActiveCase(0)
                                } else {
                                    setActiveCase(prev => prev + 1)
                                }
                            }}
                            additionalClasses='absolute top-[40%] right-2 text-gray-9a' >
                                <ArrowSliderStyle />   
                        </RoundedBtn>
    </>
  )
}

export default FreeCasesSwiper