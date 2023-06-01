import { createSignal } from "solid-js";
import Header from "./Header";

const Bulk = (props) => {

    return (
        <>
            <div class="w-full h-full flex flex-col">
                <Header descending={props?.descending} setDescending={props?.setDescending} headings={props?.data?.headings} grid={props?.data?.grid} />
                <div class="w-full flex-1 overflow-hidden flex flex-col">
                    <For each={props?.loaded()}>
                        {(val, i) => (
                            <div class={`w-full h-12 px-6 grid ${props?.data?.grid} ${ i() % 2 == 0 ? "bg-dark-26" : "" } bg-opacity-25 overflow-hidden relative`} >
                                <props.data.structure val={val} resendTrades={props?.resendTrades} />
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </>
    );
  };
  
  export default Bulk;
  