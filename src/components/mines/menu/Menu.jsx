import BetAmount from "./BetAmount/BetAmount";
import MinesAmount from "./MinesAmount/MinesAmount";
import StartButton from "./StartButton";

const Menu = (props) => {
  return (
    <div
      class="relative llg:min-w-[320px] xll:min-w-[384px] h-full border-r-[#FFFFFF0A] border-r flex flex-col p-7 lg:pt-14 items-center gap-4"
      style={{
        background: "linear-gradient(89.84deg, #1A1B30 0.14%, #191C35 99.86%)",
      }}
    >
      <BetAmount
        betValue={props.betValue}
        setBetValue={props.setBetValue}
        mines={props.mines}
      />
      <div class="h-[1px] w-[115%] bg-[#14162d]" />
      <MinesAmount
        minesAmount={props.minesAmount}
        setMinesAmount={props.setMinesAmount}
        mines={props.mines}
      />
      <div class="flex w-full flex-col gap-3 mt-2">
        <StartButton
          betValue={props.betValue}
          onClick={props.handleStartButtonClick}
          mines={props.mines}
        />
      </div>
    </div>
  );
};

export default Menu;
