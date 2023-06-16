const DarkButton = (props) => {
  return (
    <div
      class={`shadow-button border border-[#FFFFFF08] center h-10 text-gray-9a font-bold font-SpaceGrotesk text-14 rounded-4 w-${
        props.width || 'auto'
      } px-${props.paddingRight || '6'}`}
      style={{
        background: 'radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)'
      }}
    >
      {props.children}
    </div>
  )
}

export default DarkButton
