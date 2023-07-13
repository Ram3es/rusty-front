const AdjustBtn = (props) => {
  return (
    <div
      class={`border  border-[#FFFFFF14] text-gray-9a  p-[2px] h-full hover ${
        props.small
          ? "min-w-[40px] text-xs pt-0"
          : "min-w-[20px] xll:min-w-[52px] text-[14px]"
      }  px-0.5 md:px-1 xll:px-2 rounded-[4px] font-semibold cursor-pointer shadow-button flex items-center justify-center`}
      style={{
        background: `radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)`,
      }}
      onClick={(e) => props.onClick(e)}
    >
      {props.text}
    </div>
  );
};

export default AdjustBtn;
