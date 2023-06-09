import {createSignal, onMount} from "solid-js";
import { getCurrencyString } from "../mines_new/utils/tools";

const LosingDisplay = (props) => {
    const calculateCasesCost = () => {
    let cost = props.game().cases.reduce((total, item) => total + item.price, 0);
    setValue(cost);
    }
  const [value, setValue] = createSignal();
  let interval = 1000;
  onMount(() => {
    calculateCasesCost();
    let startValue = value()
    let endValue = 0;
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(() => {
      setValue((prev) => prev -= startValue * 0.005);
      if(value() <= endValue){
        setValue(endValue);
        clearInterval(counter);
      }
    }, duration)
  })
  return (
    <span>{getCurrencyString(value())}</span>
  )
}

export default LosingDisplay