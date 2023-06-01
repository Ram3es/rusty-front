const GradientButton = (props) => {
  return (
    <div
      class={`px-6 py-2 rounded-4 cursor-pointer center text-14 font-SpaceGrotesk font-bold text-yellow-ffb ${props.isFullWidth ? 'w-full' : 'w-max'}`}
      style={{
        background: 'radial-gradient(72.88% 182.5% at 47.87% -51.25%, rgba(255, 180, 54, 0.16) 0%, rgba(255, 180, 54, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(100% 275.07% at 100% 0%, #1D2352 0%, #1D1F30 100%)'
      }}
      onClick={() => {
        if (props.callbackFn) props.callbackFn();
      } }
    >
      {props.children}
    </div> 
  )
}

export default GradientButton
