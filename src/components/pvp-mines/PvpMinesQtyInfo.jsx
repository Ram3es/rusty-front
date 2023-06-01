import MinesLogo from "../mines_new/MISC/MinesLogo";

const PvpMinesQtyInfo = (props) => {

    return (
        <div class="flex items-center gap-1.5 py-2 px-3 text-gray-9a font-bold font-SpaceGrotesk pvp-mines-quantity ">
          <MinesLogo active />
          x{props.quantity}
        </div>
    )
}

export default PvpMinesQtyInfo