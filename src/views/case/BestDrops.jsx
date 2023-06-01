import { For } from "solid-js";
import Item from "./Item";

const BestDrops = (props) => {
    return (
        <>
        <div class="flex flex-col gap-2"> 
            <p class="text-yellow-ffb font-medium text-base capitalize font-SpaceGrotesk"> best drops </p>
            <div class="min-h-[4.5rem] max-h-[4.5rem]">
                <div class="w-full h-full flex gap-2">
                    <For each={props.data()?.bestValue ? [props.data()?.bestValue] : []}>
                        {(drop) => (
                            <Item drop={drop} _case={props._case} />
                        )}
                    </For>
                </div>
            </div>
        </div>
        </>
    );
  };
  
  export default BestDrops;
  