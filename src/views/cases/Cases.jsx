import { onMount, createEffect, createSignal, For, Show } from "solid-js";
import Bg from "../../assets/img/home/homepage_bg.png";

import { SOCIAL, URL } from "../../libraries/url";
import injector from "../../injector/injector";
import Fallback from "../Fallback";

const Cases = (props) => {
  const { leaderboards, userObject, SNOWMODE } = injector;

  const [categories, setCategories] = createSignal(["all", "popular", "VIP", "high risk", "50/50", "10%", "1%"])

  return (
    <Fallback loaded={() => true}>
    <img alt="background" src={Bg} class="absolute left-0 top-0 min-w-full md:min-h-full" />
    <div class="w-full h-full pt-8 flex flex-col gap-6 relative min-h-screen">
        <div class="w-full flex flex-col gap-4">
            <div class="w-full flex justify-between items-center">
                <p class="text-28 text-white font-medium font-Oswald uppercase">unbox cases</p>
                <div class="w-64 h-10 rounded-4 bg-dark-20 flex items-center relative">
                    <svg class="absolute left-3" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.66446 0C2.08859 0 0 2.08835 0 4.66395C0 7.23955 2.08859 9.3279 4.66448 9.3279C5.65501 9.3279 6.57362 9.01898 7.32872 8.49278L7.32927 8.49223L10.7887 11.9512C10.8529 12.0154 10.9549 12.0171 11.0208 11.9512L11.9531 11.019C12.0173 10.9548 12.014 10.8484 11.9526 10.7869L8.49372 7.32844C9.01999 6.57287 9.32894 5.65435 9.32894 4.66395C9.32894 2.08835 7.24035 0 4.66446 0ZM4.66446 8.2305C2.6944 8.2305 1.09751 6.63379 1.09751 4.66395C1.09751 2.69411 2.69442 1.0974 4.66446 1.0974C6.6345 1.0974 8.23141 2.69411 8.23141 4.66395C8.23141 6.63379 6.63452 8.2305 4.66446 8.2305Z" fill="#475A76"/>
                        <path d="M4.66446 0C2.08859 0 0 2.08835 0 4.66395C0 7.23955 2.08859 9.3279 4.66448 9.3279C5.65501 9.3279 6.57362 9.01898 7.32872 8.49278L7.32927 8.49223L10.7887 11.9512C10.8529 12.0154 10.9549 12.0171 11.0208 11.9512L11.9531 11.019C12.0173 10.9548 12.014 10.8484 11.9526 10.7869L8.49372 7.32844C9.01999 6.57287 9.32894 5.65435 9.32894 4.66395C9.32894 2.08835 7.24035 0 4.66446 0ZM4.66446 8.2305C2.6944 8.2305 1.09751 6.63379 1.09751 4.66395C1.09751 2.69411 2.69442 1.0974 4.66446 1.0974C6.6345 1.0974 8.23141 2.69411 8.23141 4.66395C8.23141 6.63379 6.63452 8.2305 4.66446 8.2305Z" stroke="#475A76"/>
                    </svg>

                    <input class="w-full h-full pl-9 text-14 text-white placeholder-gray-47 font-normal capitalize" placeholder="Search cases..." />
                </div>
            </div>
            <div class="w-full h-10 flex justify-between items-center">
                <div class="flex gap-2 h-full">
                    <For each={categories()}>
                        {(val) => (
                            <div class="bg-dark-20 drop-shadow-box px-4 h-full rounded-2 center">
                                <p class="text-white text-12 capitalize">{val}</p>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </div>
    </div>
    </Fallback>
  );
};

export default Cases;
