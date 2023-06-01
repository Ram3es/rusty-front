const Toggle = (props) => {

  return (
    <label class={`relative inline-block w-10 h-6 rounded-4 cursor-pointer ${
      !props.checked ? "bg-[#131628]" : props.color === 'purple' ? "bg-purple-9f" : props.color === "yellow" ? "bg-yellow-ffb" : "bg-green-27"
    }`}>
      <input
        type="checkbox"
        class="absolute w-0 h-0 opacity-0"
        checked={props.checked}
        onChange={() => props.onChange(!props.checked)}
      />
      <div
        class={`absolute left-1 top-1 w-3 h-4 px-[2px] py-[2px] flex box-border flex-col justify-between gap-0.5 rounded-2 transition-transform bg-white border border-black border-opacity-5 transform ${
          props.checked ? 'translate-x-5' : ''
        }`}
        style={{
          background: props.checked ? "white" : 'radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.07) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16)), radial-gradient(100% 275.07% at 100% 0%, #1D2352 0%, #1D1F30 100%)'
        }}
      >
        <span
          class="w-full h-0.5 bg-[#595E86]"
          style={{
            'box-shadow': '0px 1px 0px rgba(0, 0, 0, 0.12)'
          }}
        />
        <span
          class="w-full h-0.5 bg-[#595E86]"
          style={{
            'box-shadow': '0px 1px 0px rgba(0, 0, 0, 0.12)'
          }}
        />
        <span
          class="w-full h-0.5 bg-[#595E86]"
          style={{
            'box-shadow': '0px 1px 0px rgba(0, 0, 0, 0.12)'
          }}
        />
      </div>
    </label>
  );
}

export default Toggle;