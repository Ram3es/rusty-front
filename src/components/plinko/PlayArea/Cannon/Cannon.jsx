import { createEffect, createSignal } from "solid-js";
import RailPiece from "./RailPiece";
import CannonImg from "../../../../assets/img/plinko/new/Cannon.png";

import { ballDroppedXPos } from "../../PlinkoContainer";

const Cannon = () => {
  const [translateAmount, setTranslateAmount] = createSignal(0);

  createEffect(() => {
    const ballX = ballDroppedXPos();
    const rangeMin = 361.42857142857144;
    const rangeMax = 438.57142857142856;
    const translationMin = -37;
    const translationMax = 37;

    // Calculate the relative position within the range
    const relativePosition = (ballX - rangeMin) / (rangeMax - rangeMin);

    // Map the relative position to the translation range
    const translation =
      translationMin + relativePosition * (translationMax - translationMin);

    setTranslateAmount(translation);
  });

  return (
    <div class="absolute -top-[2px] z-30">
      <div class=" bg-[#24284A] border-s border-s-[#2B3054] flex gap-[1px]">
        {[...Array(15)].map((_, index) => (
          <RailPiece key={index} />
        ))}
      </div>
      <div
        class={`absolute -top-8 left-[6px] transition-all duration-100`}
        style={`transform: translateX(${translateAmount()}px);`}
      >
        <img src={CannonImg} alt="cannon" />
      </div>
    </div>
  );
};

export default Cannon;
