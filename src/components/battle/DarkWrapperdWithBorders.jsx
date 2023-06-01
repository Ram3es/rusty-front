const DarkWrapperdWithBorders = (props) => {
  return (
    <div
      class={`${props.isActive && 'p-0.5'} ${props.classes}`}
      style={{
        background: props.isActive && "linear-gradient(180deg, rgba(255, 180, 54, 0) -37.12%, rgba(255, 180, 54, 0.36) 100%)"
      }}
    >
      <div
        class={`${props.classes} h-full center`}
        style={{
          background: "radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(100% 275.07% at 100% 0%, #1D2352 0%, #1D1F30 100%)"
        }}
      >
        {props.children}
      </div>
    </div>
    
    
  )
}

export default DarkWrapperdWithBorders;