import { createEffect, createSignal, For, onMount } from "solid-js";
import Coin from "../../../utilities/Coin";
import { useI18n } from "../../../i18n/context";
import Ranks from "../../../utilities/Ranks";
import RankLabel from "../../chat/RankLabel";
import TransparentButton from "../../elements/TransparentButton";
import RoundedButton from "../../elements/RoundedButton";

import stripped from "../../../assets/img/home/leaderboard/stripped-mask.png"

const AffiliatesUsers = ({ affiliate }) => {
  const i18n = useI18n();
  const size = 9;

  const [page, setCurrentPage] = createSignal(0);
  const [pages, setPages] = createSignal([1]);
  const [loaded, setLoaded] = createSignal([]);

  const [loadedUsers, setLoadedUsers] = createSignal([])

  createEffect(() => {
    setLoadedUsers([...affiliate?.users])
  })

  createEffect(() => {
    setLoaded((affiliate?.users || []).filter((row, key) => page() * size - size <= key && key <= page() * size - 1) );
    console.log(loaded());
  });

  createEffect(() => {
    let indices = [];
    for (let i = 0;i < Math.ceil((affiliate?.users || []).length / size); i++) {
      indices.push(i + 1);
    }
    setCurrentPage(1);
    setPages(indices);
  });

  return (
    <>
      <div class="w-full flex flex-col gap-2 relative z-20">
        <div class="w-full hidden sm:flex justify-center items-center">
          <div class="w-full px-2 h-full grid grid-cols-8">
            <p class="text-13 text-gray-a2 font-bold font-SpaceGrotesk capitalize col-span-3">user</p>
            <p class="text-13 text-gray-a2 font-bold font-SpaceGrotesk capitalize col-span-2">Earned</p>
            <p class="text-13 text-gray-a2 font-bold font-SpaceGrotesk capitalize col-span-2">Wagered</p>
            <p class="text-right text-13 text-gray-a2 font-bold font-SpaceGrotesk capitalize col-span-1">last deposit</p>
          </div>
        </div>
        <div class="w-full flex flex-col">
          <For each={loaded()}>
            {(val, i) => (
              <div
                class={`w-full sm:h-12 overflow-hidden center relative rounded-6`}
                style={{
                  background: "linear-gradient(87.89deg, rgba(26, 27, 48, 0) 1.79%, #1A1C33 50.01%, rgba(25, 28, 51, 0.85417) 57.05%, rgba(25, 28, 53, 0.35) 98.24%), rgba(0, 0, 0, 0.24)"
                }}
              >
                <img 
                  src={stripped} 
                  alt="stripped" 
                  class='absolute top-0 left-0 w-auto min-w-[300%] sm:min-w-full h-full' 
                />
                {/* {type == "transaction" ? <users val={val} /> : type == "oldSeeds" ? <OldSeeds val={val} /> : <History val={val} />} */}
                <div class="w-full p-3 sm:px-2 sm:py-0 h-full grid">
                  <div class="w-full overflow-hidden grid gap-4 sm:gap-0 grid-cols-4 sm:grid-cols-8">
                    <div class="w-full overflow-hidden flex items-center gap-2 sm:pr-4 col-span-2 sm:row-start-1 sm:col-start-1 sm:col-end-4">
                      <img
                        alt="avatar" 
                        class="w-7 h-7 rounded-full bg-white"
                        src={val?.avatar}
                      />
                      <div
                        class='flex sm:items-center gap-2 text-sm font-bold w-full sm:w-max sm:h-[26px] max-w-[214px] whitespace-nowrap pl-2 py-1 pr-3 rounded'
                        style={{
                          background:
                            'linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)',
                          'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)'
                        }}
                      >
                        <div class="pt-1 ms:pt-0">
                          <Ranks
                            width={5}
                            staff={val?.rank}
                            rank={val?.level?.league}
                          />
                        </div>
                        <div class="flex gap-2 flex-col sm:flex-row">
                          <RankLabel
                            staff={val?.rank}
                            rank={val?.level?.league}
                          />
                          <span
                            class='text-gray-9aa truncate max-w-[100px]'
                          >
                            {val?.username}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="w-full flex-col sm:flex-row flex items-center gap-2 col-span-2 row-start-2 sm:row-start-1 sm:col-start-4 sm:col-end-6">
                      <div class="w-full flex items-center justify-center sm:justify-start gap-2 ">
                        <Coin />
                        <p class="text-gradient-green-secondary text-16 font-bold font-SpaceGrotesk">
                          {Number(val?.earning).toLocaleString()}
                        </p>
                      </div>
                      <div class="flex sm:hidden text-13 text-gray-a2 font-bold font-SpaceGrotesk">
                        Earned
                      </div>
                    </div>
                    <div class="w-full flex-col sm:flex-row flex items-center gap-2 row-start-2 sm:row-start-1 col-span-2 sm:col-start-6 sm:col-end-8">
                      <div class="w-full flex items-center justify-center sm:justify-start gap-2 ">
                        <Coin />
                        <p class="text-gradient text-16 font-bold font-SpaceGrotesk">
                          {Number(val?.wager).toLocaleString()}
                        </p>
                      </div>
                      <div class="flex sm:hidden text-13 text-gray-a2 font-bold font-SpaceGrotesk">
                        Wagered
                      </div>
                    </div>
                    <div class="w-full flex-col sm:flex-row flex items-center justify-center sm:justify-end col-start-3 col-span-2 sm:col-span-1 sm:col-start-8">
                      <p class="text-gray-9a text-14 font-bold font-SpaceGrotesk">
                        {new Date(val?.timestamp).toLocaleDateString('en-GB')}
                      </p>
                      <div class="flex sm:hidden text-13 text-gray-a2 font-bold font-SpaceGrotesk">
                        Last Deposit
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
        <div class="flex gap-2 items-center justify-center w-full">

            {/* <For each={pages().slice(
                pages().length - 5 < 0 || page() <= 2
                  ? 0
                  : pages().length - 3 < page()
                  ? pages().length - 5
                  : page() - 2,
                page() <= 2 ? 5 : page() + 3
              )}
            > */}
            <RoundedButton
              onClick={() => {
                if (page() - 1 >= 1) setCurrentPage(page() - 1)
              }}
            >
              <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.41421 5.65683L0 7.07104L1.41421 8.48526L7.07107 14.1421L8.48528 12.7279L2.82843 7.07104L8.48528 1.41419L7.07107 -2.2769e-05L1.41421 5.65683Z" fill="#9A9EC8"/>
              </svg>
            </RoundedButton>
            <For each={pages()}>
              {(nr) => (
                <TransparentButton
                  callbackFn={() => setCurrentPage(nr)}
                  isActive={page() == nr}
                  style={{
                    padding: '0px',
                    width: '40px',
                    height: '40px'
                  }}
                >
                  {nr}
                </TransparentButton>
              )}
            </For>
            <RoundedButton
              onClick={() => {
                if (pages().length >= page() + 1) {
                  setCurrentPage(page() + 1)
                }
              }}
            >
              <svg class="rotate-180 translate-x-0.5" width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.41421 5.65683L0 7.07104L1.41421 8.48526L7.07107 14.1421L8.48528 12.7279L2.82843 7.07104L8.48528 1.41419L7.07107 -2.2769e-05L1.41421 5.65683Z" fill="#9A9EC8"/>
              </svg>
            </RoundedButton>
          <div
            class={`bg-dark-20 text-gray-47 w-7 h-7 ${
              pages().length > 5 && page() < pages().length - 3
                ? "center"
                : "hidden"
            } cursor-pointer`}
          >
            <p class="text-current text-14 font-bold font-SpaceGrotesk">...</p>
          </div>
          {/* <p
            class="text-yellow-ff text-14 font-medium font-Oswald uppercase ml-3 cursor-pointer"
            onClick={() => setCurrentPage(pages().length)}
          >
            {i18n.t("coinflip.affiliates_true.Last")}
          </p> */}
        </div>
      </div>
    </>
  );
};

export default AffiliatesUsers;
