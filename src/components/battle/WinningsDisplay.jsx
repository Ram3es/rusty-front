import {createSignal, onMount} from "solid-js";
import { getCurrencyString } from "../mines_new/utils/tools";
import { playCashCountSound } from "../../utilities/Sounds/SoundButtonClick";


const WinningsDisplay = (props) => {
  const [value, setValue] = createSignal(0);
  let interval = 1000;
  onMount(() => {
    let endValue = props.value;
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(() => {
      // playCashCountSound()
      setValue((prev) => prev += endValue * 0.005);
      if(value() >= endValue){
        setValue(endValue);
        clearInterval(counter);
      }
    }, duration)
  })
  return (
    <span>{getCurrencyString(value())}</span>
  )
}

export default WinningsDisplay