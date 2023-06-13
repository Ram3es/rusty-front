const StartButton = (props) => {
  return (
    <div
      class="w-full p-[1px] rounded-md cursor-pointer mt-3 text-[#FFB436] font-semibold text-14"
      style={{
        background: `linear-gradient(180deg, rgba(255, 180, 54, 0) -197.12%, 
        rgba(255, 180, 54, 0.36) 100%)`,
        "box-shadow":
          "0px 2px 2px 0px #0000001F, 0px 2px 2px 0px #0000001F, 0px 0px 6px 0px #FFB4363D",
      }}
      onClick={() => props.onClick()}
    >
      <div class="bg-[#1A1C31] rounded-md">
        <div
          class="w-full flex items-center justify-center p-3 rounded-md gap-2 "
          style={{
            background: `radial-gradient(72.88% 182.5% at 47.87% -51.25%, rgba(255, 180, 54, 0.24)0%, rgba(255, 180, 54, 0) 100%)`,
            filter: `drop-shadow(0px 0px 6px rgba(255, 180, 54, 0.24)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12));`,
          }}
        >
          Upgrade
        </div>
      </div>
    </div>
  );
};

export default StartButton;
