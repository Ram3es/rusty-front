import {For, createSignal, createEffect} from "solid-js";

import BetDisplay from "./BetDisplay";
import UserPlaceholderIcon from "../icons/UserPlaceholderIcon";
import ToggleButton from "../ToggleButton";
import Dropdown from "../elements/Dropdown";
import PVPMinesIcon from "../icons/PVPMinesIcon";
import YellowGradientButton from "../elements/CaseGradientButton";
import injector from "../../injector/injector";

const playerOptions = [2, 3, 4];
// const gameModes = [
//   { royale: 'normal'},
//   { cursed: 'cursed'}
// ]
const gameModes = {
  normal: "royale",
  cursed: "cursed",
};
export const [betAmount, setBetAmount] = createSignal(100);

const PVPMineMode = (props) => {
  const {userObject} = injector;

  createEffect(() => {
    props.setModeToCreate((prev) => ({...prev, bet: betAmount()}));
  });

  createEffect(() => {
    if (betAmount() > userObject.user?.balance) {
      setBetAmount(userObject.user?.balance);
    }
    if (betAmount() < 0) {
      setBetAmount(0);
    }
  });

  const inputValueUpdate = (e) => {
    if (e.currentTarget.value < 0) {
      e.currentTarget.value = 0;
      setBetAmount(0);
    } else if (e.currentTarget.value > userObject.user.balance) {
      e.currentTarget.value = userObject.user.balance;
      setBetAmount(userObject.user.balance);
    } else {
      setBetAmount(e.currentTarget.value);
    }
  };
  return (
    <div class="flex flex-wrap justify-start w-full items-center gap-8 bg-control-panel py-4">
      <div class="relative w-full md:w-auto min-w-[320px] text-gray-9a h-10">
        <span class="absolute -top-[60%] left-0 text-xs font-SpaceGrotesk ">
          Bet Amount
        </span>
        <BetDisplay
          variant="input"
          betAmount={() => betAmount()}
          callbackFn={(e) => inputValueUpdate(e)}
          small
        />
      </div>
      <div class="relative flex gap-2 h-10  text-gray-9a">
        <span class="absolute -top-[60%] left-0 text-xs font-SpaceGrotesk">
          Players
        </span>
        <For each={playerOptions}>
          {(option) => (
            <ToggleButton
              activeClass="border-yellow-ffb text-white"
              isActive={option === props.modeToCreate.players}
              handleFunction={() =>
                props.setModeToCreate((prev) => ({...prev, players: option}))
              }
            >
              <For each={Array.from(Array(option))}>
                {() => <UserPlaceholderIcon additionClasses="h-4 w-4" />}
              </For>
            </ToggleButton>
          )}
        </For>
      </div>
      <div class="relative flex gap-6 w-full text-yellow-ffb">
        <span class="absolute -top-6 left-0 text-xs text-gray-9a font-SpaceGrotesk">
          Gamemode
        </span>
        <div class="flex flex-col md:flex-row gap-3 w-full md:w-max">
          <Dropdown
            label={
              <PVPMinesIcon additionClasses="w-5 h-5 mr-0.5 text-yellow-ffb" />
            }
            activeName={
              Object.entries(gameModes).find(
                (mode) => mode[1] === props.modeToCreate.mode
              )[0]
            }
            itemsList={Object.keys(gameModes)}
            submitItem={(mode) =>
              props.setModeToCreate((prev) => ({...prev, mode: gameModes[mode]}))
            }
          />
          <YellowGradientButton callbackFn={props.submitFunction}>
            <div class="flex items-center font-bold text-sm font-SpaceGrotesk gap-2">
              <PVPMinesIcon additionClasses="w-5 h-5 mr-0.5" />
              <span>Create PVP Mine</span>
            </div>
          </YellowGradientButton>
        </div>
      </div>
    </div>
  );
};
export default PVPMineMode;
