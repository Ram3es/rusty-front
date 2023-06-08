import { createEffect, createSignal, For, onMount } from "solid-js";
import Coin from "../../../utilities/Coin";
import { useI18n } from "../../../i18n/context";
import Ranks from "../../../utilities/Ranks";
import RankLabel from "../../chat/RankLabel";
import TransparentButton from "../../elements/TransparentButton";
import RoundedButton from "../../elements/RoundedButton";

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
        <div class="w-full center">
          <div class="w-11/12 h-full grid grid-cols-4">
            <p class="text-13 text-gray-a2 font-bold font-SpaceGrotesk capitalize">user</p>
            <p class="text-13 text-gray-a2 font-bold font-SpaceGrotesk capitalize">Earned</p>
            <p class="text-13 text-gray-a2 font-bold font-SpaceGrotesk capitalize">Wagered</p>
            <p class="text-13 text-gray-a2 font-bold font-SpaceGrotesk capitalize">last deposit</p>
          </div>
        </div>
        <div class="w-full flex flex-col">
          <For each={loaded()}>
            {(val, i) => (
              <div
                class={`w-full h-12 ${
                  i() % 2 == 0 ? "bg-dark-26" : ""
                } bg-opacity-25 overflow-hidden center`}
              >
                {/* {type == "transaction" ? <users val={val} /> : type == "oldSeeds" ? <OldSeeds val={val} /> : <History val={val} />} */}
                <div class="w-11/12 h-full grid">
                  <div class="w-full overflow-hidden grid grid-cols-4">
                    <div class="w-full overflow-hidden flex items-center gap-2 pr-4">
                      <img
                        alt="avatar" 
                        class="w-7 h-7 rounded-full bg-white"
                        src={val?.avatar}
                      />
                      <div
                        class='flex items-center gap-2 text-sm font-bold h-[26px] max-w-[214px] whitespace-nowrap pl-2 py-1 pr-3 rounded'
                        style={{
                          background:
                            'linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)',
                          'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)'
                        }}
                      >
                        {/* <Ranks
                          width={5}
                          staff={message?.user?.rank}
                          rank={message?.user?.level?.league}
                        />
                        <RankLabel
                          staff={message?.user?.rank}
                          rank={message?.user?.level?.league}
                        /> */}
                        <span
                          class='text-gray-9aa truncate max-w-[100px]'
                        >
                          {val?.username}
                        </span>
                      </div>
                    </div>
                    <div class="w-full flex items-center gap-2">
                      <Coin />
                      <p class="text-gradient-green-secondary text-16 font-bold font-SpaceGrotesk">
                        {Number(val?.earning).toLocaleString()}
                      </p>
                    </div>
                    <div class="w-full flex items-center gap-2">
                      <Coin />
                      <p class="text-gradient text-16 font-bold font-SpaceGrotesk">
                        {Number(val?.wager).toLocaleString()}
                      </p>
                    </div>
                    <div class="w-full flex items-center">
                      <p class="text-white text-14 font-bold font-SpaceGrotesk">
                        {new Date(val?.timestamp).toLocaleDateString('en-GB')}
                      </p>
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
