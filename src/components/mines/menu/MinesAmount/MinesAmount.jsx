import MinesDisplay from "./MinesDisplay";
import MinesButtons from "./MinesButtons";

const MinesAmount = (props) => {
  return (
    <div
      class={`flex flex-col gap-1 w-full transition-opacity duration-200 ${
        props.mines.status === "playing" && "opacity-30 pointer-events-none"
      }`}
    >
      <div class="text-[#9A9EC8] text-[12px] font-medium">Mines</div>
      <MinesDisplay
        minesAmount={props.minesAmount}
        setMinesAmount={props.setMinesAmount}
        callbackFn={(e) => {
          if (e.currentTarget.value < 0) {
            e.currentTarget.value = 0;
            props.setMinesAmount(0);
          } else if (e.currentTarget.value > 24) {
            e.currentTarget.value = 24;
            props.setMinesAmount(24);
          } else {
            props.setMinesAmount(
              e.currentTarget.value && parseInt(e.currentTarget.value)
            );
          }
        }}
      />
      <MinesButtons
        minesAmount={props.minesAmount}
        setMinesAmount={props.setMinesAmount}
      />
    </div>
  );
};

export default MinesAmount;
