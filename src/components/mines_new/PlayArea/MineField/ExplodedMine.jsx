import ExplodedMineImg from "./ExplodedMineImg";

const ExplodedMine = () => {
  return (
    <div
      class="w-full h-full absolute rounded-lg flex items-center justify-center p-[1px]"
      style={{
        "-webkit-backface-visibility": "hidden",
        "backface-visibility": "hidden",
        transform: "rotateY(180deg)",
        background: `radial-gradient(36.46% 36.46% at 50% 100%, rgba(214, 51, 51, 0.36) 0%, rgba(214, 51, 51, 0) 100%),
      linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 100%)`,
        "box-shadow": `inset 0px 2px 3px rgba(0, 0, 0, 0.24), inset 0px 2px 12px rgba(0, 0, 0, 0.12)`,
        // filter: `drop-shadow(0px 0px 8px rgba(214, 51, 51, 0.22))`,
      }}
    >
      <div class="w-full h-full  rounded-lg  bg-[#181d36]">
        <div
          class="w-full h-full "
          style={{
            background: `linear-gradient(270deg, rgba(214, 51, 51, 0) 0%, rgba(214, 51, 51, 0.12) 50%, rgba(214, 51, 51, 0) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.24) 100%)`,
            "box-shadow": `inset 0px 2px 3px rgba(0, 0, 0, 0.24), inset 0px 2px 12px rgba(0, 0, 0, 0.12)`,
            // filter: `drop-shadow(0px 0px 8px rgba(214, 51, 51, 0.22))`,
          }}
        >
          <ExplodedMineImg />
        </div>
      </div>
    </div>
  );
};

export default ExplodedMine;
