import {createSignal, onMount} from "solid-js";
const WinningsDisplay = (props) => {
  const [value, setValue] = createSignal(0);
  let interval = 1000;
  onMount(() => {
    let endValue = props.value;
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(() => {
      setValue((prev) => prev += endValue * 0.005);
      if(value() >= endValue){
        setValue(endValue);
        clearInterval(counter);
      }
    }, duration)
  })
  return (
    <span>{value()}</span>
  )
}

export default WinningsDisplay