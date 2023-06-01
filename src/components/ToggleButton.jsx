

const ToggleButton = (props) => {
    return(
        <div
            onClick={() => props.handleFunction()}
            class={`w-max center px-5 py-3  border rounded-4 flex gap-1 items-center cursor-pointer
            ${props.isActive ? props.activeClass ??  'border-yellow-ffb text-yellow-ffb' : 'border-white border-opacity-5 text-gray-9a'}`}
        >{props.children}</div>
    )
}

export default ToggleButton