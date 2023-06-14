import {For} from "solid-js";
import DarkWrapperdWithBorders from "./DarkWrapperdWithBorders";

const StackedCasesBar = (props) => {
  return (
    <For
      each={
        props.cases.reduce((prev, cur) => {
          const ind = prev.findIndex((item) => item.name === cur.name);
          if (ind >= 0) {
            prev[ind].count++;
          } else {
            prev.push({
              name: cur.name,
              image: cur.image,
              id: cur.id,
              count: 1,
            });
          }
          return prev;
        }, []) || []
      }
    >
      {(caseItem) => (
        <div class={`relative cursor-pointer pointer-events-auto`}>
          <img
            alt={caseItem.name}
            class={`h-[48px] min-w-[64px] opacity-50`}
            src={
              caseItem?.image
                ?.replace("{url}", window.origin)
                .replace(".png", "_thumbnail.png") || ""
            }
          />
          <div class="absolute right-1 top-1">
            <DarkWrapperdWithBorders isActive={true} classes="rounded-3">
              <span class="min-w-[16px] py-0.5 center leading-[12px] text-12 font-SpaceGrotesk font-bold text-yellow-ffb">
                {caseItem?.count}
              </span>
            </DarkWrapperdWithBorders>
          </div>
        </div>
      )}
    </For>
  );
};

export default StackedCasesBar;
