import Arrow from "./Arrow";

const UnderOverBtn = (props) => {
  return (
    <div
      class={`w-full flex gap-2 items-center justify-center text-16 font-semibold border rounded-md p-2 cursor-pointer 
      ${
        props.selected
          ? "text-white border-[#FFB436]"
          : "text-gray-9a border-[#FFFFFF0A]"
      }
    `}
      onClick={() => props.onClick()}
    >
      <span class={`${props.type === "Over" && "rotate-180"}`}>
        <Arrow color={`${props.selected ? "#FFB436" : "#D9D9D9"}`} />
      </span>
      Roll {props.type}
    </div>
  );
};

export default UnderOverBtn;
