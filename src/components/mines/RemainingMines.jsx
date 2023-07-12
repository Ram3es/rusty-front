import BlueMineImg from "../../assets/img/mines/BlueMine.svg";
import RedMineImg from "../../assets/img/mines/RedMine.svg";
import RedText from "../shared/RedText";

const RemainingMines = (props) => {
  return (
    <div
      class={`relative flex flex-col px-14 items-center h-14 transition-opacity duration-200 overflow-visible ${
        props.mines.status !== "playing" &&
        props.mines.status !== "lost" &&
        "opacity-0"
      }`}
      style={{
        background: `${
          props.mines.status === "lost"
            ? "radial-gradient(50% 100% at 50% 0%, rgba(214, 51, 51, 0.24) 0%, rgba(214, 51, 51, 0) 100%)"
            : "radial-gradient(50% 100% at 50% 0%, rgba(74, 147, 255, 0.24) 0%, rgba(74, 147, 255, 0) 100%)"
        }`,
      }}
    >
      <div class="w-full flex items-center justify-center gap-2">
        {props.mines.status === "lost" ? (
          <img src={RedMineImg} alt="red mine image" class="h-[60%] " />
        ) : (
          <img src={BlueMineImg} alt="blue mine image" class="h-[70%]" />
        )}

        {props.mines.status === "lost" ? (
          <div class="">
            <RedText text={"BUST"} />
          </div>
        ) : (
          <div class="text-[20px] font-semibold text-[#9A9EC8] flex gap-2">
            <span class="text-white">
              {`0${
                25 -
                (props.mines.mines
                  ? props.mines.mines + props.mines.cleared.length
                  : 0)
              }`.slice(-2)}
            </span>
            Left
          </div>
        )}
      </div>
      <div
        class="w-[200%] h-[3px]"
        style={{
          background: `${
            props.mines.status === "lost"
              ? "radial-gradient(36.46% 36.46% at 50% 100%, rgba(214, 51, 51, 0.36) 0%, rgba(214, 51, 51, 0) 100%)"
              : "radial-gradient(36.46% 36.46% at 50% 100%, rgba(62, 139, 255, 0.36) 0%, rgba(62, 139, 255, 0) 100%)"
          }`,
        }}
      />
    </div>
  );
};

export default RemainingMines;
