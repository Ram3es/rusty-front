import {createSignal, onMount} from "solid-js";
import {getCurrencyString} from "../mines_new/utils/tools";
// import { playCashCountSound } from "../../utilities/Sounds/SoundButtonClick";

const WinningsDisplay = (props) => {
  const [value, setValue] = createSignal(0);

  onMount(() => {
    let endValue = props.value;
    const durationInSeconds = props.countdownDuration;

    let startTimestamp;

    const step = (currentTimestamp) => {
      if (!startTimestamp) startTimestamp = currentTimestamp;
      const elapsed = currentTimestamp - startTimestamp;

      const progress = Math.min(elapsed / (durationInSeconds * 1000), 1);

      setValue(endValue * progress);

      if (progress < 1) {
        // playCashCountSound()
        window.requestAnimationFrame(step);
      } else {
        setValue(endValue);
      }
    };

    window.requestAnimationFrame(step);
  });

  return <span>{getCurrencyString(value())}</span>;
};

export default WinningsDisplay;
