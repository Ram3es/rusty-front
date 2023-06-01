const RoundedButton = (props) => {
  return (
    <div
      class="w-7 h-7 rounded-full center border backdrop-blur-sm border-white border-opacity-5 m-1 cursor-pointer"
      style={{
        background: "radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",
        'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)'
      }}
      onClick={() => props.onClick()}
    >
      {props.children}
    </div>
  )
}

export default RoundedButton