import Modal from "../modals/Modal";
import injector from "../../injector/injector";
import {STEAM} from "../../libraries/url";

const WinModal = () => {
  const {socket, toggles, setToggles, toastr} = injector;

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

  return (
    <Modal
      open={() => {
        return true;
      }}
      handler={() => {}}
      noContainer={true}
    >
      <div class="bg-black w-52 h-52">
        <div class="bg-red">NEW MODAL</div>
        <div class="w-full h-full absolute left-0 cursor-default top-0" />
        <div
          class="relative w-52 h-10 center hover group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden"
          onClick={() => {
            decision("sell");
          }}
        >
          <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
          <p class="text-dark-16 text-14 font-semibold font-Oswald uppercase min-w-36 text-center z-10 px-4 py-2.5">
            sell 5%
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default WinModal;
