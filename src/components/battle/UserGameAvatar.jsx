import Logo from "../../assets/smallLogo.svg";
import Spiner from "./Spiner";
import Skull from '../../assets/img/pvpmines/Skull.png'

const UserGameAvatar = (props) => {
  return (
    <div
      class={`relative p-[1px] rounded-full ${props.widthClasses ?? "w-9 h-9"} ${props.opacityClasses ?? "opacity-100"}`}
      style={{
        background:
          !props.color ? props.mode === "cursed"
            ? "#DAFD09"
            : props.mode === "group"
            ? "#5AC3FF"
            : props.mode === "winner"
            ? "#2BF67C"
            : "#FFB436"
          : props.color,
        color: 
          !props.color ?props.mode === "cursed"
            ? "#DAFD09"
            : props.mode === "group"
            ? "#5AC3FF"
            : props.mode === "winner"
            ? "#2BF67C"
            : "#FFB436"
          : props.color,
      }}
    >
      <div class="bg-[#191c39] rounded-full w-full h-full p-0.5">
        {props.isBot ? (
          <img class={`w-full h-full rounded-full ${props.isTransparentImage ? "opacity-20" : ''}`} src={Logo} alt="bot" />
        ) : props.avatar ? (
          <img
            class={`w-full h-full rounded-full ${props.isTransparentImage ? "opacity-20" : ''}`}
            src={props.avatar ?? ""}
            alt={props.name ?? ""}
          />
        ) : (
          <div class="w-full h-full center">
            <Spiner classes="w-4" />
          </div>
        )}
      </div>
      {props?.eliminated && 
        <img 
        src={Skull}
        alt="skull"
        class='absolute inset-0 m-auto w-6 h-6' /> }
    </div>
  );
};

export default UserGameAvatar;

// games[id]?.cursed === 1 ? "cursed" : games[id]?.mode === 'group' && games[id]?.cursed !== 1 ? 'group' : 'royal'
