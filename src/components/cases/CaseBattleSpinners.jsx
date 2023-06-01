import { createSignal } from "solid-js";
import SpinnersContainerVertical from "./vertical/SpinnersContainerVertical";
import { setSpinReelsTrigger } from "./store";
import SpinnersContainerHorizontal from "./horizontal/SpinnersContainerHorizontal";
import SpinnersContainerBlank from "./SpinnersContainerBlank";

// list of items that will be used to generate case items
const items = [
  {
    img: "assets/360fx360f.png",
    price: "100",
    name: "Tempered AK47",
    rarity: "purple",
  },
  {
    img: "assets/360fx360f (1).png",
    price: "90",
    name: "Tempered Mask",
    rarity: "gold",
  },
  {
    img: "assets/360fx360f (2).png",
    price: "500",
    name: "Victoria AK47",
    rarity: "red",
  },
  {
    img: "assets/360fx360f (3).png",
    price: "10",
    name: "Cloth",
    rarity: "gray",
  },
];

export const [isSpinning, setIsSpinning] = createSignal(false);
export const [isFastSpin, setIsFastSpin] = createSignal(false);

const CaseBattleSpinners = () => {
  const [numSpinners, setNumSpinners] = createSignal(2);
  const [pendingNum, setPendingNum] = createSignal(2);
  const [caseItemList, setCaseItemList] = createSignal(items);
  // for each spinner there is an options object
  // containing the winning item and if its a big win and/or confetti win
  const options = [
    {
      winningItem: {
        img: "assets/360fx360f.png",
        price: "100",
        name: "Tempered AK47",
        rarity: "purple",
      },
      isConfettiWin: true,
      isBigWin: true,
    },
    {
      winningItem: {
        img: "assets/360fx360f (2).png",
        price: "500",
        name: "Victoria AK47",
        rarity: "red",
      },
      isConfettiWin: true,
      isBigWin: true,
    },
    {
      winningItem: {
        img: "assets/360fx360f (1).png",
        price: "90",
        name: "Tempered Mask",
        rarity: "gold",
      },
      isConfettiWin: false,
      isBigWin: false,
    },
    {
      winningItem: {
        img: "assets/360fx360f (3).png",
        price: "10",
        name: "Cloth",
        rarity: "gray",
      },
      isConfettiWin: false,
      isBigWin: false,
    },
  ];
  const [spinnerOptions, setSpinnerOptions] = createSignal(options);

  const handleSpinClick = () => {
    setNumSpinners(pendingNum());
    setSpinReelsTrigger({ triggered: true });
    setIsSpinning(true);
  };

  const handleNumSpinnersClick = (num) => {
    setNumSpinners(0);
    setPendingNum(num);
    setSpinReelsTrigger({ triggered: false });
    setIsSpinning(false);
  };

  return (
    <div class="h-full w-full p-4 bg-[#171A26]">
      <div class="bg-[#171A26] border-[#303448] border-2 rounded w-full h-[354] p-2">
        {numSpinners() === 1 ? (
          <SpinnersContainerHorizontal
            numSpinners={numSpinners}
            caseItemList={caseItemList}
            spinnerOptions={spinnerOptions}
          />
        ) : numSpinners() > 0 && numSpinners() < 5 ? (
          <SpinnersContainerVertical
            numSpinners={numSpinners}
            caseItemList={caseItemList}
            spinnerOptions={spinnerOptions}
          />
        ) : (
          <SpinnersContainerBlank pendingNum={pendingNum} />
        )}
      </div>
      <div class="flex items-center justify-center gap-1 mt-2">
        <button
          class={`bg-yellow-400 p-1 ${isSpinning() && "opacity-50"}`}
          onClick={handleSpinClick}
          disabled={isSpinning()}
        >
          Spin
        </button>
        <button
          class={`bg-yellow-400 p-1 ${pendingNum() === 1 && "opacity-50"}`}
          onClick={() => handleNumSpinnersClick(1)}
          disabled={isSpinning()}
        >
          1
        </button>
        <button
          class={`bg-yellow-400 p-1 ${pendingNum() === 2 && "opacity-50"}`}
          onClick={() => handleNumSpinnersClick(2)}
          disabled={isSpinning()}
        >
          2
        </button>
        <button
          class={`bg-yellow-400 p-1 ${pendingNum() === 3 && "opacity-50"}`}
          onClick={() => handleNumSpinnersClick(3)}
          disabled={isSpinning()}
        >
          3
        </button>
        <button
          class={`bg-yellow-400 p-1 ${pendingNum() === 4 && "opacity-50"}`}
          onClick={() => handleNumSpinnersClick(4)}
          disabled={isSpinning()}
        >
          4
        </button>
        <button
          class={`bg-yellow-400 p-1 ${isFastSpin() && "opacity-50"}`}
          onClick={() => setIsFastSpin(!isFastSpin())}
          disabled={isSpinning()}
        >
          Fast
        </button>
      </div>
    </div>
  );
};

export default CaseBattleSpinners;
