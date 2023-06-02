import { For } from "solid-js";
import Card from "./Card";

import { multiplierHistory } from "../../PlinkoContainer";

const History = () => {
  return (
    <div class="absolute top-2 right-3 flex flex-col gap-2">
      {multiplierHistory()
        .slice(-10)
        .reverse()
        .map((multiplier, index) => (
          <Card multiplier={multiplier} index={index} />
        ))}
    </div>
  );
};

export default History;
