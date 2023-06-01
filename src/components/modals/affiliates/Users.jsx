import { createEffect, createSignal, For, onMount } from "solid-js";
import Coin from "../../../utilities/Coin";
import { useI18n } from "../../../i18n/context";

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
      <div class="w-full flex flex-col gap-4">
        <div class="w-full h-10 center">
          <div class="w-11/12 h-full grid grid-cols-4">
            <p class="text-14 text-gray-8c font-normal capitalize">user</p>
            <p class="text-14 text-gray-8c font-normal capitalize">total earnings</p>
            <p class="text-14 text-gray-8c font-normal capitalize">total wager</p>
            <p class="text-14 text-gray-8c font-normal capitalize">last deposit</p>
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
                      <p class="text-gray-8c text-14 font-normal truncate flex-1">
                        {val?.username}
                      </p>
                    </div>
                    <div class="w-full flex items-center gap-2">
                      <Coin />
                      <p class="text-green text-14 font-medium font-Oswald">
                        {Number(val?.earning).toLocaleString()}
                      </p>
                    </div>
                    <div class="w-full flex items-center">
                      <p class="text-white text-14 font-medium font-Oswald">
                        {Number(val?.wager).toLocaleString()}
                      </p>
                    </div>
                    <div class="w-full flex items-center">
                      <p class="text-white text-14 font-medium font-Oswald">
                        {val?.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
        <div class="flex gap-2 items-center">
          {
            <For each={pages().slice(
                pages().length - 5 < 0 || page() <= 2
                  ? 0
                  : pages().length - 3 < page()
                  ? pages().length - 5
                  : page() - 2,
                page() <= 2 ? 5 : page() + 3
              )}
            >
              {(nr) => (
                <div class={`${
                    page() == nr ? "bg-yellow-ff text-dark-16" : "bg-dark-20 text-gray-47"
                  } w-7 h-7 center cursor-pointer`}
                  onClick={() => setCurrentPage(nr)} >
                    <p class="text-current text-14 font-medium font-Oswald">{nr}</p>
                </div>
              )}
            </For>
          }
          <div
            class={`bg-dark-20 text-gray-47 w-7 h-7 ${
              pages().length > 5 && page() < pages().length - 3
                ? "center"
                : "hidden"
            } cursor-pointer`}
          >
            <p class="text-current text-14 font-medium font-Oswald">...</p>
          </div>
          <p
            class="text-yellow-ff text-14 font-medium font-Oswald uppercase ml-3 cursor-pointer"
            onClick={() => setCurrentPage(pages().length)}
          >
            {i18n.t("coinflip.affiliates_true.Last")}
          </p>
        </div>
      </div>
    </>
  );
};

export default AffiliatesUsers;
