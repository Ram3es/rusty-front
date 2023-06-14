const TransparentButton = (props) => {
  return (
    <div
      class={`px-5 py-2 rounded-4 cursor-pointer border center text-14 font-SpaceGrotesk font-bold ${
        props.isFullWidth ? 'w-full' : 'w-max'
      } ${
        props.isActive
          ? 'border-yellow-ffb text-white'
          : 'border-white border-opacity-5 text-gray-9a drop-shadow-dark'
      }`}
      style={props.style ?? {}}
      onClick={() => {
        props.callbackFn()
      }}
    >
      {props.children}
    </div>
  )
}

export default TransparentButton
