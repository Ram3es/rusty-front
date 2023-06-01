import { For } from "solid-js";
import { useI18n } from "../i18n/context";

import Coin from "../utilities/Coin";

const History = (props) => {
  const i18n = useI18n();

  return (
    <>
      <div class="w-full flex flex-col items-center gap-2">
        <div class="w-11/12 hidden md:grid grid-cols-gamemode-history">
          <p class="text-14 text-gray-8c font-normal capitalize">
            {i18n.t("plinko.User")}
          </p>
          <div class="flex items-center gap-1">
            <p class="text-14 text-gray-8c font-normal capitalize">
              {i18n.t("plinko.Bet amount")}
            </p>
          </div>
          <p class="text-14 text-gray-8c font-normal capitalize">
            {i18n.t("plinko.Multiplier")}
          </p>
          <div class="flex items-center gap-1">
            <p class="text-14 text-gray-8c font-normal capitalize">
              {i18n.t("plinko.Payout")}
            </p>
          </div>
          <p class="text-14 text-gray-8c font-normal capitalize">
            {i18n.t("plinko.Date")}
          </p>
        </div>
        <div class="w-full overflow-hidden relative">
          <For each={props.history().slice(0, 10)}>
            {(val, i) => (
              <div
                class={`w-full h-20 sm:h-28 md:h-11 center pb-6 sm:pb-0 relative ${
                  i() % 2 == 0 ? "bg-dark-26 bg-opacity-30" : ""
                }`}
              >
                <div class="w-11/12 h-full grid grid-cols-gamemode-history-small md:grid-cols-gamemode-history">
                  <div class="w-full overflow-hidden flex items-center gap-2 pr-4">
                    <img
                      alt="avatar" 
                      class="w-7 h-7 rounded-full bg-white"
                      src={val?.avatar}
                    />
                    <p class="text-gray-8c text-14 font-normal truncate">
                      {val?.username}
                    </p>
                  </div>
                  <div class="w-full flex items-center gap-2">
                    <Coin />
                    <p class="text-white text-14 font-medium font-Oswald">
                      {Number(val?.bet).toLocaleString()}
                    </p>
                  </div>
                  <p class="text-gray-8c text-14 font-medium font-Oswald my-auto">
                    {val?.multiplier}x
                  </p>
                  <div class="w-full flex items-center gap-2">
                    <Coin />
                    <p class="text-green text-14 font-medium font-Oswald">
                      {Number(val?.winnings).toLocaleString()}
                    </p>
                  </div>
                  <p class="text-gray-8c text-14 font-medium font-Oswald my-auto truncate max-w-full absolute right-10 sm:right-0 bottom-2 sm:bottom-0 sm:relative">
                    {new Date(val?.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </>
  );
};

export default History;
