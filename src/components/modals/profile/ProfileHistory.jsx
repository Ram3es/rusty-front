import { createEffect, createSignal, For } from "solid-js";
import History from "./History";
import Transactions from "./Transactions";
import OldSeeds from "./OldSeeds";

import Config from "../../../injector/config";
import Bulk from "./Feed/Bulk";
import Coin from "../../../utilities/Coin";

import GrayButtonBg from "../../../assets/img/animatedGrayButtonBg.jpg";

import CoinflipStructure from "./structure/Coinflip";
import MinesStructure from "./structure/Mines";
import PlinkoStructure from "./structure/Plinko";
import WheelStructure from "./structure/Wheel"
import PvpminesStructure from "./structure/Pvpmines";
import UpgraderStructure from "./structure/Upgrader";
import SkinsStructure from "./structure/Skins";
import FiatStructure from "./structure/Fiat";
import CryptoStructure from "./structure/Crypto";

const ProfileHistory = (props) => {
  const size = 9;

  const [page, setCurrentPage] = createSignal(0);
  const [pages, setPages] = createSignal([1]);
  const [currentHistoryMod, setCurrentHistoryMod] = createSignal("coinflip");
  
  const [currentTransaction, setCurrentTransaction] = createSignal("skins");

  const [descending, setDescending] = createSignal(true);

  const [loaded, setLoaded] = createSignal([]);

  const { _modes } = Config;

  createEffect(() => {
    setLoaded(
      (
        (props.type == "transaction"
          ? [...(props.account?.transactionHistory?.[currentTransaction()] || [])].sort(
              (a, b) =>
                (new Date(b.timestamp) - new Date(a.timestamp)) *
                (descending() ? 1 : -1)
            )
          : props.type == "oldSeeds"
          ? props.account?.oldSeeds
          : props.account?.history?.filter(
              (item) => item.mode === currentHistoryMod()
            ).sort(
              (a, b) =>
                (new Date(b.timestamp) - new Date(a.timestamp)) *
                (descending() ? 1 : -1)
            )) || []
      ).filter(
        (row, key) => page() * size - size <= key && key <= page() * size - 1
      )
    );
  });

  createEffect(() => {
    let indices = [];
    for (
      let i = 0;
      i <
      Math.ceil(
        (
          (props.type == "transaction"
            ? props.account?.transactions?.transactions
            : props.type == "oldSeeds"
            ? props.account?.oldSeeds
            : props.account?.history?.filter(
                (item) => item.mode === currentHistoryMod()
              )) || []
        ).length / size
      );
      i++
    ) {
      indices.push(i + 1);
    }
    setCurrentPage(1);
    setPages(indices);
  });


  const data = {
    coinflip: {
      headings: ["pf id", "total", "wager", "winnings", "chance", "result", "trade status"],
      structure: CoinflipStructure,
      grid: "grid-cols-[5rem_1fr_1fr_1fr_4.5rem_4rem_5.5rem_1.5fr]"
    },
    mines: {
      headings: ["pf id", "wager", "winnings", "multiplier", "mines", "result"],
      structure: MinesStructure,
      grid: "grid-cols-[5rem_1fr_1fr_4.5rem_5rem_1.25fr_2fr]"
    },
    plinko: {
      headings: ["pf id", "wager", "winnings", "difficulty", "rows", "result"],
      structure: PlinkoStructure,
      grid: "grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr_2fr]"
    },
    wheel: {
      headings: ["pf id", "wager", "winnings", "multiplier", "result"],
      structure: WheelStructure,
      grid: "grid-cols-[5rem_1fr_1fr_1fr_1fr_1.5fr]"
    },
    "pvp-mines": {
      headings: ["pf id", "total", "wager", "winnings", "players", "mode", "result"],
      structure: PvpminesStructure,
      grid: "grid-cols-[5rem_1fr_1fr_1fr_4rem_1fr_4rem_1.5fr]"
    },
    upgrader: {
      headings: ["pf id", "wager", "winnings", "multiplier", "chance", "result", "trade status"],
      structure: UpgraderStructure,
      grid: "grid-cols-[5rem_1fr_1fr_4rem_4rem_4rem_6rem_1.5fr]"
    },
  }

  const transactionData = {
    skins: {
      headings: ["type", "id", "amount", "status"],
      structure: SkinsStructure,
      grid: "grid-cols-[2fr_1fr_1fr_1fr_1.5fr]"
    },
    fiat: {
      headings: ["type", "order id", "amount", "status"],
      structure: FiatStructure,
      grid: "grid-cols-[2fr_1fr_1fr_1fr_1.5fr]"
    },
    crypto: {
      headings: ["type", "amount", "txid"],
      structure: CryptoStructure,
      grid: "grid-cols-[2fr_1fr_2fr_1.25fr]"
    },
  }
  
  return (
    <>
      <div class="w-full flex flex-col gap-4">
        <div class="w-full flex flex-col">
          {props.type === "history" ? (
            <div class="border-b border-gray-47 mb-4">
              <div class="-mb-px flex overflow-x-scroll sm:overflow-x-visible">
                <For each={_modes.slice(1)}>
                  {(mode) => (
                    <div
                      class={`${
                        currentHistoryMod() == mode.name.en
                          ? "text-yellow-ff border-yellow-ff"
                          : "text-gray-66 border-transparent"
                      } group gap-2 w-1/4 py-4 px-1 text-center border-b-2 font-Oswald text-sm flex justify-center items-center cursor-pointer`}
                      onClick={() => setCurrentHistoryMod(mode.name.en)}
                    >
                      {
                        currentHistoryMod() == mode.name.en ? (
                          mode.svgActive || mode.svg
                        ) : mode.svg
                      }
                      <p class="uppercase">{mode.name.en}</p>
                    </div>
                  )}
                </For>
              </div>
            </div>
          ) : props.type == "transaction" ? (
            <div class="border-b border-gray-47 mb-4">
              <div class="-mb-px flex overflow-x-scroll sm:overflow-x-visible">
                <For each={["skins", "fiat", "crypto"]}>
                  {(val) => (
                    <div
                      class={`${
                        currentTransaction() == val
                          ? "text-yellow-ff border-yellow-ff"
                          : "text-gray-66 border-transparent"
                      } group gap-2 w-24 py-4 px-1 text-center border-b-2 font-Oswald text-sm flex justify-center items-center cursor-pointer`}
                      onClick={() => setCurrentTransaction(val)}
                    >
                      <p class="uppercase">{val}</p>
                    </div>
                  )}
                </For>
              </div>
            </div>
          ) : (
            ""
          )}
          {
            props.type == "oldSeeds" ? (
              <div class="w-full flex-1 flex flex-col overflow-hidden">
                <For each={loaded()}>
                  {(val) => (
                    <div class="w-full h-11 grid grid-cols-[10rem_1fr_5rem]">
                      <OldSeeds val={val} />
                    </div>
                  )}
                </For>
              </div>
            ) : (
              <Bulk descending={descending} setDescending={setDescending} loaded={loaded} data={
                props?.type == "history" ? data[currentHistoryMod()] : transactionData[currentTransaction()]
              } resendTrades={props.account?.resendTrades}  /> 
            )
          }
          
        </div>
        <div class="flex gap-2 items-center">
          {
            <For
              each={pages().slice(
                pages().length - 5 < 0 || page() <= 2
                  ? 0
                  : pages().length - 3 < page()
                  ? pages().length - 5
                  : page() - 2,
                page() <= 2 ? 5 : page() + 3
              )}
            >
              {(nr) => (
                <div
                  class={`${
                    page() == nr
                      ? "text-dark-16"
                      : "bg-dark-20 text-gray-47"
                  } w-[1.875rem] h-9 rounded-2 center cursor-pointer relative  bg-cover scrolling-btn-wrapper-gray overflow-hidden group hover`}
                  onClick={() => setCurrentPage(nr)}
                  style={{
                    filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))",
                    "background-image": `url(${
                      page() == nr ? GrayButtonBg : ""
                    })`,
                  }}
                >
                  <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                  <p class="text-current text-14 font-medium font-Oswald relative">
                    {nr}
                  </p>
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
            class="text-gray-8c text-14 font-medium font-Oswald uppercase ml-3 cursor-pointer"
            onClick={() => setCurrentPage(pages().length)}
          >
            last
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileHistory;
