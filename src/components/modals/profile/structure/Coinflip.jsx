import { createEffect, createSignal } from "solid-js";
import injector from "../../../../injector/injector";
import Coin from "../../../../utilities/Coin";


const CoinflipStructure = (props) => {

    const { socket, toastr } = injector;

    const [isResending, setIsResending] = createSignal(false);
    const [resentTrade, setResentTrade] = createSignal({});

    const splitted = props?.val?.timestamp?.split("T")?.[0].split("-");
    const date = `${splitted[1]}/${splitted[2]}/${splitted[0]} ${props?.val?.timestamp?.split("T")?.[1]?.split(".")?.[0]}`

    createEffect(() => {
      const vals = (props?.resendTrades || []).find((x) => x.pf_id === props.val.pf_id);
      if(vals?.process_id) {
        setResentTrade(vals);
      }
    })

    const sendTrade = () => {
        const RESEND_TIMEOUT = 20000;
        if (isResending()) return;
        setIsResending(true);

        if (resentTrade()?.process_id) {
          socket.emit("steam:resend", { processId: resentTrade()?.process_id }, (data) => {

            if (data.msg) toastr(data)

            if (data.error) {
              console.error(data);
            }
          });
        } else {
          
        }
        setTimeout(() => {
          setIsResending(false);
        }, RESEND_TIMEOUT);
      };

    
    return (
        <>
            <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto"> #{props?.val?.pf_id} </p>
            <div class="flex items-center gap-2">
                <Coin />
                <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto"> {Math.round(props?.val?.bet_value / (props?.val?.extra_data / 10000)).toLocaleString()} </p>
            </div>
            <div class="flex items-center gap-2">
                <Coin />
                <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto"> {Number(props?.val?.bet_value).toLocaleString()} </p>
            </div>
            <div class="flex items-center gap-2">
                <Coin />
                <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto"> {Number(props?.val?.winnings).toLocaleString()} </p>
            </div>
            <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto"> {((props?.val?.extra_data || 0) / 100).toFixed(2)}% </p>
            <div class={`flex items-center gap-2 ${props?.val?.winnings <= 0 ? "text-gray-8c" : "text-green"}`}>
                <p class="text-current text-14 font-medium font-Oswald uppercase">{props?.val?.winnings > 0 ? "win" : "loss"}</p>
            </div>
            <p class={`text-14 font-medium font-Oswald uppercase my-auto ${
              resentTrade()?.process_id ? "cursor-pointer underline text-white" : "text-gray-8c"
            }`} onClick={sendTrade}>{resentTrade()?.process_id ? "resend" : props?.val?.info == "double" ? "double down" : props?.val?.status ? props?.val?.status : "-"} </p>
            <div class="w-full flex items-center justify-end overflow-hidden relative cursor-pointer">
                <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto truncate max-w-full"> {date} </p>
            </div>
        </>
    );
  };

  // classList={{
  //   "cursor-pointer": !isResending(),
  //   "text-gray-8c": isResending(),
  //   underline: !isResending(),
  //   "text-white": !isResending(),
  // }}
  
  export default CoinflipStructure;
  