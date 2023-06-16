import { For } from "solid-js";

import Modal from "./Modal";

import PotentialDropItem from "../../views/case/PotentialDropItem";
import Coin from "../../utilities/Coin";

const CaseViewModal = (props) => {
  return (
    <Modal
      noContainer={true}
      open={() => {
        return true;
      }}
      handler={() => {}}
    >
      <div
        class="w-full h-full absolute left-0 cursor-default top-0"
        onClick={props.handleClose}
      />
      <div
        class="rounded-xl flex flex-col absolute top-32 w-[768px] max-h-[600px] overflow-x-scroll"
        style={{
          background:
            "radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)",
          "backdrop-filter": "blur(8px)",
        }}
      >
        <div class=" w-full pl-[22px] pr-8 py-5 relative transition-all duration-100 ease-out flex justify-between items-center h-[88px]">
          <div class="flex items-center gap-1">
            <div
              class="w-[68px] h-[49px]"
              style={{
                filter: "drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.12))",
              }}
            >
              <img
                class="w-full h-full object-contain"
                src={
                  props.item.image
                    ?.replace("{url}", window.origin)
                    .replace(".png", "_thumbnail.png") || ""
                }
                alt={props.item.name}
              />
            </div>
            <div class="space-y-1.5">
              <p class="font-bold text-gray-a2 text-13 capitalize">
                {props.item.name}
              </p>
              <div class="flex gap-1.5">
                <Coin width="5" />
                <span class="font-bold text-sm potential-drop--price">
                  {Number(props.item.price).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div
            class="text-gray-9a w-10 h-10 flex items-center justify-center border rounded border-[#FFFFFF0A] cursor-pointer"
            onClick={props.handleClose}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.499614 0.500386C0.188954 0.811046 0.188953 1.31473 0.499614 1.62539L3.87489 5.00066L0.500271 8.37527C0.189611 8.68593 0.189611 9.18961 0.500271 9.50027C0.810931 9.81093 1.31461 9.81093 1.62527 9.50027L4.99988 6.12566L8.37461 9.50039C8.68527 9.81105 9.18895 9.81105 9.49961 9.50039C9.81027 9.18973 9.81028 8.68605 9.49962 8.37539L6.12488 5.00066L9.50027 1.62527C9.81093 1.31461 9.81093 0.81093 9.50027 0.50027C9.18961 0.18961 8.68593 0.18961 8.37527 0.50027L4.99989 3.87566L1.62461 0.500386C1.31395 0.189726 0.810274 0.189726 0.499614 0.500386Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div class="flex flex-col gap-2 overflow-hidden py-6 px-[22px] bg-dark-secondary overflow-y-auto">
          <p class="text-yellow-ffb font-medium text-base font-SpaceGrotesk">
            You can unbox:
          </p>
          <div class="w-full grid grid-cols-potential-drop--item gap-2">
            <For
              each={
                props.item.items
                  .sort((a, b) => b.item_price - a.item_price)
                  .map((item) => {
                    return {
                      ...item,
                      image:
                        item.image
                          ?.replace("{url}", window.origin) || "",
                      price: item.item_price,
                    };
                  }) || []
              }
            >
              {(potentialDropItem) => (
                <PotentialDropItem skin={potentialDropItem} />
              )}
            </For>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CaseViewModal;
