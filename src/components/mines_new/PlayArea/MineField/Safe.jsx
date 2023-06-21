import Mine from "./Mine";

const Safe = (props) => {
  return (
    <div
      class={`w-full h-full absolute rounded-lg flex items-center justify-center p-[1px]
      transition-all duration-[0.8s]
      ${props.hasLost() && !props.isMine() ? "opacity-30" : ""}`}
      style={{
        "-webkit-backface-visibility": "hidden",
        "backface-visibility": "hidden",
        transform: "rotateY(180deg)",
        background: `radial-gradient(36.46% 36.46% at 50% 100%, rgba(62, 139, 255, 0.36) 0%, rgba(62, 139, 255, 0) 100%),
        linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 100%)`,
        "box-shadow": `inset 0px 2px 3px rgba(0, 0, 0, 0.24), inset 0px 2px 12px rgba(0, 0, 0, 0.12)`,
      }}
    >
      <div class="w-full h-full  rounded-lg  bg-[#181d36]">
        <div
          class="w-full h-full rounded-lg "
          style={{
            background: `linear-gradient(270deg, rgba(62, 139, 255, 0) 0%, rgba(62, 139, 255, 0.12) 50%, rgba(62, 139, 255, 0) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.24) 100%)`,
            "box-shadow": `inset 0px 2px 3px rgba(0, 0, 0, 0.24), inset 0px 2px 12px rgba(0, 0, 0, 0.12)`,
            // filter: `drop-shadow(0px 0px 8px rgba(80, 150, 255, 0.07))`,
          }}
        >
          <Mine />
        </div>
      </div>
    </div>
  );
};

export default Safe;
