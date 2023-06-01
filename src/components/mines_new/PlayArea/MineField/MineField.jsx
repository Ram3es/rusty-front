import Square from "./Square";

import { isPlaying, hasLost, isRumbling } from "../../TilesContainer";

const MineField = () => {
  return (
    <div
      class={`flex flex-col gap-3 transition-opacity duration-200 ${
        !isPlaying() && !hasLost() ? "opacity-30 pointer-events-none" : ""
      }
      ${isRumbling() && "animate-shake"}`}
    >
      <div class="flex gap-3">
        <Square x="0" y="0" />
        <Square x="1" y="0" />
        <Square x="2" y="0" />
        <Square x="3" y="0" />
        <Square x="4" y="0" />
      </div>
      <div class="flex gap-3">
        <Square x="0" y="1" />
        <Square x="1" y="1" />
        <Square x="2" y="1" />
        <Square x="3" y="1" />
        <Square x="4" y="1" />
      </div>
      <div class="flex gap-3">
        <Square x="0" y="2" />
        <Square x="1" y="2" />
        <Square x="2" y="2" />
        <Square x="3" y="2" />
        <Square x="4" y="2" />
      </div>
      <div class="flex gap-3">
        <Square x="0" y="3" />
        <Square x="1" y="3" />
        <Square x="2" y="3" />
        <Square x="3" y="3" />
        <Square x="4" y="3" />
      </div>
      <div class="flex gap-3">
        <Square x="0" y="4" />
        <Square x="1" y="4" />
        <Square x="2" y="4" />
        <Square x="3" y="4" />
        <Square x="4" y="4" />
      </div>
    </div>
  );
};

export default MineField;
