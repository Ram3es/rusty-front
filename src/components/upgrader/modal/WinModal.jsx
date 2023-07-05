import {onMount, createSignal} from "solid-js";
import Modal from "../../modals/Modal";
import injector from "../../../injector/injector";
import {STEAM} from "../../../libraries/url";
import CloseIcon from "../../../assets/img/new-upgrader/CloseIcon.svg";
import ItemCardSmall from "../../battle/ItemCardSmall";
import ModalBgFade from "../../../assets/img/new-upgrader/ModalBgFade.png";
import {betValue} from "../../../views/upgrader/Upgrader";
import {getCurrencyString} from "../../../utilities/tools";
import {toWords} from "number-to-words";
import GoldSellBtn from "./GoldSellBtn";
import GrayGradientButton from "../../elements/GrayGradientButton";
import SteamLogo from "../../../assets/img/new-upgrader/SteamLogo.svg";
import GoldText from "../../shared/GoldText";

const WinModal = () => {
  const {socket, toggles, setToggles, toastr} = injector;
  const [upgradePercentage, setUpgradePercentage] = createSignal(0);

  const decision = (choice) => {
    if (choice != "cashout" && choice != "sell") return;

    if (toggles.winningsModal?.type == "upgrader") {
      socket.emit(
        "upgrader:decision",
        {
          type: choice == "sell" ? "coins" : "skins",
        },
        (data) => {
          if (!data.error) {
            setToggles("winningsModal", false);
          }

          if (data.msg) {
            toastr(data);
          }
        }
      );
    }
  };

  const determineArticle = (number) => {
    // Convert the number to an absolute value and remove decimal places
    const absoluteNumber = toWords(Math.abs(Math.floor(number)));

    // Check if the number starts with a vowel sound
    const startsWithVowelSound =
      /^[aeiou]/i.test(absoluteNumber.toString()) ||
      /^8/i.test(absoluteNumber.toString()); // Handle cases where "h" is silent, e.g., "an 8"

    // Return "an" if the number starts with a vowel sound, otherwise return "a"
    return startsWithVowelSound ? "an" : "a";
  };

  onMount(() => {
    setUpgradePercentage(
      ((betValue()) / toggles.winningsModal.items[0].price) * 90
    );
  });

  return (
    <Modal
      open={() => {
        return true;
      }}
      handler={() => {}}
      noContainer={true}
    >
      <div
        class="absolute max-w-[calc(100vw-32px)] w-[472px] h-[366px] rounded-xl flex top-1/2 -translate-y-2/3 items-center justify-center p-[1px]"
        style={{
          background: `radial-gradient(26.38% 25.85% at 50% 0%, #FFB436 0%, rgba(255, 180, 54, 0) 100%)`,
        }}
      >
        <div
          class=" rounded-xl lex flex-col w-full h-full font-SpaceGrotesk"
          style={{
            background:
              "radial-gradient(32.68% 20.51% at 49.26% -0.68%, rgba(255, 180, 54, 0.24) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(75.96deg, rgba(255, 255, 255, 0) 19.61%, rgba(255, 255, 255, 0.04) 40.84%, rgba(0, 0, 0, 0.04) 68.47%, rgba(255, 255, 255, 0.04) 99.54%), radial-gradient(121.17% 118.38% at 45.3% 63.29%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 -0.74%, #191C35 99.26%)",
          }}
        >
          <img
            class="absolute h-full w-full"
            src={ModalBgFade}
            alt="modal background"
          />
          <div
            class="absolute top-3 right-3 p-2 border border-[#FFFFFF0A] rounded-md
            hover:bg-[#FFFFFF0A] transition-all cursor-pointer"
            onClick={() => setToggles("winningsModal", false)}
          >
            <img src={CloseIcon} alt="close icon" />
          </div>
          <div class="flex flex-col h-full items-center">
            <div class="flex-1 flex-col w-full flex items-center justify-end ">
              <GoldText
                text={`CONGRATULATIONS`}
                size={24}
                noSmallDecimal
              />
              <div class="p-3 text-[#9A9EC8] text-18 font-semibold">
                You won {determineArticle(upgradePercentage())}{" "}
                <span class="text-white">
                  {getCurrencyString(upgradePercentage())}%
                </span>{" "}
                Upgrade
              </div>
            </div>
            <div
              class="w-full flex items-center justify-center p-4"
              style={{
                background: `linear-gradient(270deg, rgba(0, 0, 0, 0) 9%, rgba(0, 0, 0, 0.24) 59%, rgba(0, 0, 0, 0) 109%)`,
              }}
            >
              <div class="w-max">
                <ItemCardSmall
                  drop={toggles.winningsModal.items[0]}
                  upgraderModal
                />
              </div>
            </div>
            <div class="flex-1  flex flex-col items-center w-full justify-center gap-3">
              <div class="text-[#9A9EC8] font-semibold text-13">
                Cash out the skin or sell for an extra 5%
              </div>
              <div class="flex items-center justify-center w-[80%] gap-5">
                <GoldSellBtn
                  onClick={() => {
                    decision("sell");
                  }}
                />
                <GrayGradientButton
                  callbackFn={() => {
                    decision("cashout");
                  }}
                  additionalClass="w-full h-[40px] p-0"
                >
                  <div class="flex h-full items-center gap-1">
                    <img
                      src={SteamLogo}
                      alt="Steam logo"
                      class="relative translate-y-1"
                    />
                    <div class="text-[#A2A5C6] font-semibold">Withdraw</div>
                  </div>
                </GrayGradientButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WinModal;
