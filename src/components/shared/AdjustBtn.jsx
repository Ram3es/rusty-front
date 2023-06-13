const AdjustBtn = (props) => {
  return (
    <div
      class={`border  border-[#FFFFFF14] text-[#9A9EC8] text-[14px] p-[2px] h-full 
       px-2 rounded-[4px] font-semibold cursor-pointer flex items-center justify-center
       ${props.small ? "w-max" : "w-full"}`}
      style="background: radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;"
      onClick={props.onClick}
    >
      {props.text}
    </div>
  );
};

export default AdjustBtn;
