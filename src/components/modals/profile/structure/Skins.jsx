import { createEffect, createSignal } from "solid-js";
import injector from "../../../../injector/injector";
import Coin from "../../../../utilities/Coin";


const SkinsStructure = (props) => {
    const { socket, toastr } = injector;
    const [isResending, setIsResending] = createSignal(false);
    const [resentTrade, setResentTrade] = createSignal({});

    const splitted = props?.val?.timestamp?.split("T")?.[0].split("-");

    const date = `${splitted[1]}/${splitted[2]}/${splitted[0]} ${props?.val?.timestamp?.split("T")?.[1]?.split(".")?.[0]}`

    createEffect(() => {
      const vals = (props?.resendTrades || []).find((x) => x.process_id === props.val.process_id);
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
        }
        setTimeout(() => {
          setIsResending(false);
        }, RESEND_TIMEOUT);
      };

    return (
        <>
            <div class="flex items-center gap-2">
                {
                    props?.val?.type == "give" ? (
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1483 0.00066672C20.3286 0.0815469 26.08 5.96783 25.9992 13.1482C25.9183 20.3286 20.032 26.08 12.8517 25.9992C5.6714 25.9183 -0.080037 20.032 0.000842672 12.8516C0.0817223 5.68025 5.96796 -0.0712268 13.1483 0.00066672Z" fill="#253143"/>
                            <path d="M13 7V10L10.5 13L13 16V19L8 13L13 7Z" fill="#EB335F"/>
                            <path d="M17.9956 7.20947V10.2095L15.4956 13.2095L17.9956 16.2095V19.2095L12.9956 13.2095L17.9956 7.20947Z" fill="#EB335F"/>
                        </svg>
                    ) : (
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1483 0.00066672C20.3286 0.0815469 26.08 5.96783 25.9992 13.1482C25.9183 20.3286 20.032 26.08 12.8517 25.9992C5.6714 25.9183 -0.080037 20.032 0.000842672 12.8516C0.0817223 5.68025 5.96796 -0.0712268 13.1483 0.00066672Z" fill="#253143"/>
                            <path d="M14 19.0264V16.0264L16.5 13.0264L14 10.0264V7.02637L19 13.0264L14 19.0264Z" fill="#33EBB4"/>
                            <path d="M9 19V16L11.5 13L9 10V7L14 13L9 19Z" fill="#33EBB4"/>
                        </svg>
                    )
                }
                <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto" >{props?.val?.extra ? (props?.val?.extra?.split(":")[0]) : props?.val?.withdraw_type ? props?.val?.withdraw_type : "shop"} {props?.val?.type == "give" ? "withdraw" : "deposit"} </p>
            </div>
            <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto"> {((props?.val?.offer_id) || "-")} </p>
            <div class={`flex items-center gap-2`}>
                <Coin />
                <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto">
                    {Number(props?.val?.value).toLocaleString()}
                </p>
            </div>
            <div class={`flex items-center gap-2 ${props?.val?.status != "ACCEPTED" ? "text-gray-8c" : "text-green"} ${resentTrade()?.process_id ? "cursor-pointer underline text-white" : ""}`}>
                <p class="text-current text-14 font-medium font-Oswald uppercase" onClick={sendTrade}>{resentTrade()?.process_id ? "resend" : props?.val?.status}</p>
            </div>
            <div class="w-full flex items-center">
                <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto truncate"> {date} </p>
            </div>
        </>
    );
  };
  
  export default SkinsStructure;
  