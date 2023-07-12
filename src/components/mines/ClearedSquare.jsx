import BlueMine from "./BlueMine";
import RedMine from "./RedMine";

import BlueMineImg from "../../assets/img/mines/BlueMine.svg";
import RedMineImg from "../../assets/img/mines/RedMine.svg";

const ClearedSquare = (props) => {
  const rgb = {
    blue: "62, 139, 255",
    red: "214, 51, 51",
  };
  return (
    <div
      class={`w-full h-full absolute rounded-lg flex items-center justify-center p-[1px]
      transition-all duration-200
      ${
        props.mines.status === "playing"
          ? "opacity-100"
          : props.mines.status === "lost" && props.color === "red"
          ? "opacity-100"
          : props.mines.cleared.includes(props.i) &&
            props.color !== "red" &&
            props.mines.status !== "ended"
          ? "opacity-30"
          : "opacity-100"
      }`}
      style={{
        "-webkit-backface-visibility": "hidden",
        "backface-visibility": "hidden",

        background: `radial-gradient(36.46% 36.46% at 50% 100%, rgba(${
          rgb[props.color]
        }, 0.36) 0%, rgba(${rgb[props.color]}, 0) 100%),
        linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 100%)`,
        "box-shadow": `inset 0px 2px 3px rgba(0, 0, 0, 0.24), inset 0px 2px 12px rgba(0, 0, 0, 0.12)`,
      }}
    >
      <div class="w-full h-full flex items-center justify-center rounded-lg  bg-[#181d36]">
        <div
          class="w-full h-full flex items-center justify-center rounded-lg "
          style={{
            background: `linear-gradient(270deg, rgba(${
              rgb[props.color]
            }, 0) 0%, rgba(${rgb[props.color]}, 0.12) 50%, rgba(${
              rgb[props.color]
            }, 0) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.24) 100%)`,
            "box-shadow": `inset 0px 2px 3px rgba(0, 0, 0, 0.24), inset 0px 2px 12px rgba(0, 0, 0, 0.12)`,
            // filter: `drop-shadow(0px 0px 8px rgba(80, 150, 255, 0.07))`,
          }}
        >
          {props.color === "blue" ? (
            <img src={BlueMineImg} alt="blue mine image" class="rotate-180" />
          ) : (
            <img
              src={RedMineImg}
              alt="red mine image"
              class="w-[75%] rotate-180"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClearedSquare;
