import ToggleButton from "../ToggleButton";
import { For, createSignal } from "solid-js";
import stripped from "../../assets/img/home/leaderboard/stripped-mask.png";
import BattleIcon from "../icons/BattleIcon";
import Ranks from "../../utilities/Ranks";
import RankLabel from "../chat/RankLabel";
import Coin from "../../utilities/Coin";
import GoldText from "../mines_new/MISC/GoldText";
import GreenText from "../mines_new/MISC/GreenText";
import { formatNumber } from "../../utilities/Numbers";

const filterOption = [
  { name: "All Wins" },
  { name: "High Rollers" },
  { name: "Lucky Wins" },
];

export const GameModeLabel = (props) => (
  <div class="h-9 px-3 rewards-gamemode-label w-fit center shadow-button">
    {props.children}
  </div>
);
export const ResultTiles = (props) => {
  return (
    <div class="flex items-center">
      <div
        class={`${
          props.rate <= 1 && "mix-blend-luminosity"
        } px-3 py-0.5 rounded `}
        style={{
          background:
            "linear-gradient(78.67deg, rgba(92, 222, 144, 0.12) 0%, rgba(92, 222, 144, 0) 98.84%)",
        }}
      >
        <span class=" text-green-secondary">{props.rate || 1.75}x</span>
      </div>
    </div>
  );
};

export const RewardsTable = () => {
  const [filterBy, setFilter] = createSignal(filterOption[0].name);

  return (
    <div class="max-w-[1152px] w-full mx-auto flex flex-col gap-6">
      <div class="flex mx-auto lg:mx-0 gap-2 lg:gap-3 font-bold font-SpaceGrotesk text-sm h-10 max-w-full">
        <For each={filterOption}>
          {(option) => (
            <ToggleButton
              handleFunction={() => setFilter(option.name)}
              isActive={filterBy() === option.name}
              activeClass="border-yellow-ffb text-white"
              additionalClass="shadow-button truncate"
            >
              {option.name}
            </ToggleButton>
          )}
        </For>
      </div>
      <div class="hidden lg:grid grid-cols-rewards-table mx-3 text-13 font-SpaceGrotesk font-bold text-gray-a2">
        <p>Gamemode</p>
        <p>Player</p>
        <p>Bet Amount</p>
        <p>Result</p>
        <p class="w-max ml-auto">Profit</p>
      </div>
      <div class="w-full flex flex-col gap-4 lg:gap-1">
        <For each={Array.from({ length: 10 }, (_, idx) => idx)}>
          {(row) => (
            <div class="h-fit lg:h-14 py-3 lg:py-0 lg:shadow-button relative rewards-row-table flex items-center px-3">
              <img
                src={stripped}
                alt="stripped"
                class="absolute top-0 left-0 object-fill lg:object-contain z-10"
              />
              <div class="grid grid-cols-6 lg:grid-cols-rewards-table gap-x-2 lg:gap-x-0 gap-y-3 w-full">
                <div class="flex items-center justify-start">
                  <GameModeLabel>
                    <div class="flex items-center gap-2 leading-4 lg:leading-tight lg:text-sm text-gray-9a font-SpaceGrotesk font-bold">
                      <BattleIcon additionClasses="w-5 h-5 text-gray-55" />
                      <span class="text-14 lg:text-current truncate">
                        Case Battles
                      </span>
                    </div>
                  </GameModeLabel>
                </div>
                <div class="col-span-6 lg:row-auto lg:col-span-1 flex items-center gap-2">
                  <img
                    src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1102.jpg"
                    alt="avatar"
                    class="rounded-full w-8 h-8"
                  />
                  <div
                    class="flex flex-wrap center gap-x-2 text-sm font-bold h-fit max-w-[214px] whitespace-nowrap px-2.5 py-1 rounded lg:flex-nowrap"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)",
                      "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    <Ranks width={5} staff={0} rank={"bronze"} />
                    <RankLabel staff={0} rank={"gold1"} />
                    <span class="text-gray-9aa truncate max-w-[100px]">
                      {"Terry"}
                    </span>
                  </div>
                </div>
                <div class="col-span-2 lg:col-auto flex flex-col lg:flex-row items-center gap-0.5 lg:gap-0">
                  <div class="flex items-center gap-2">
                    <Coin width="5" />
                    <GoldText
                      gradient="gold-text-originals"
                      size={14}
                      text={formatNumber(112034)}
                    />
                  </div>
                  <span class="ml-[25px] text-gray-a2 text-13 lg:hidden font-bold text-shadow-base capitalize truncate">
                    Bet amount
                  </span>
                </div>
                <div class="absolute top-3 right-3 lg:relative lg:top-0 lg:right-0 flex items-center font-SpaceGrotesk font-bold text-sm">
                  <ResultTiles rate={0.43} />
                </div>
                <div
                  class={`${
                    row.rate < 1 && "mix-blend-luminosity"
                  } col-span-3 lg:col-auto flex flex-col lg:flex-row items-center gap-0.5 lg:gap-0 font-SpaceGrotesk`}
                >
                  <div class="flex items-center gap-2">
                    <Coin width="5" />
                    <GreenText size="14" text={formatNumber(11200.34)} />
                  </div>
                  <span class="ml-[5px] text-gray-a2 text-13 lg:hidden font-bold text-shadow-base capitalize">
                    Profit
                  </span>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default RewardsTable;
