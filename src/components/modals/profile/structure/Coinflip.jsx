import { createEffect, createSignal } from "solid-js";
import injector from "../../../../injector/injector";
import Coin from "../../../../utilities/Coin";
import { copyToClipboard } from "../../../../utilities/tools";

const CoinflipStructure = (props) => {
  const { socket, toastr } = injector;

  const [isResending, setIsResending] = createSignal(false);
  const [resentTrade, setResentTrade] = createSignal({});

  const splitted = props?.val?.timestamp?.split("T")?.[0].split("-");
  const date = `${splitted[1]}/${splitted[2]}/${splitted[0]} ${
    props?.val?.timestamp?.split("T")?.[1]?.split(".")?.[0]
  }`;

  createEffect(() => {
    const vals = (props?.resendTrades || []).find(
      (x) => x.pf_id === props.val.pf_id
    );
    if (vals?.process_id) {
      setResentTrade(vals);
    }
  });

  const sendTrade = () => {
    const RESEND_TIMEOUT = 20000;
    if (isResending()) return;
    setIsResending(true);

    if (resentTrade()?.process_id) {
      socket.emit(
        "steam:resend",
        { processId: resentTrade()?.process_id },
        (data) => {
          if (data.msg) toastr(data);

          if (data.error) {
            console.error(data);
          }
        }
      );
    }

    setTimeout(() => {
      setIsResending(false);
    }, RESEND_TIMEOUT);
  };

  return (
    <>
      <p
        class="text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10"
        onClick={() => {
          copyToClipboard(props?.val?.pf_id);
        }}
      >
        #{props?.val?.pf_id}{" "}
      </p>
      <div class="col-start-1 row-start-2 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-2">
        <Coin width="4" />
        <p class="text-14 text-gradient font-bold font-SpaceGrotesk uppercase my-auto">
          {Math.round(
            props?.val?.bet_value / (props?.val?.extra_data / 10000)
          ).toLocaleString()}
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Total
        </span>
      </div>
      <div class="col-start-2 row-start-2 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-x-2 lg:gap-2">
        <Coin width="4" />
        <p class="text-14 text-gradient font-bold font-SpaceGrotesk uppercase my-auto">
          {Number(props?.val?.bet_value).toLocaleString()}
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Wager
        </span>
      </div>
      <div class="col-start-1 row-start-3 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-x-2 lg:gap-2">
        <Coin width="4" />
        <p class="text-14 text-gradient-green-secondary font-bold font-SpaceGrotesk uppercase my-auto">
          {Number(props?.val?.winnings).toLocaleString()}
        </p>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Winnings
        </span>
      </div>
      <div class="col-start-2 row-start-3 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-x-2 lg:gap-2 relative z-10">
        <span class="col-start-2 lg:col-auto text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto ">
          {((props?.val?.extra_data || 0) / 100).toFixed(2)}%
        </span>
        <span class="text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Chance
        </span>
      </div>
      <p
        class={`col-start-1 row-start-4 lg:row-auto lg:col-auto text-14 font-bold font-SpaceGrotesk uppercase my-auto ${
          props?.val?.winnings <= 0
            ? "text-gradient-red"
            : "text-gradient-green-secondary"
        }`}
      >
        {props?.val?.winnings <= 0 ? "lose" : "win"}
      </p>
      <p
        class={`col-start-2 row-start-4 lg:row-auto lg:col-auto text-14 font-bold font-SpaceGrotesk uppercase my-auto relative z-20 ${
          resentTrade()?.process_id
            ? "cursor-pointer underline text-white"
            : "text-gray-9aa"
        }`}
        onClick={sendTrade}
      >
        {resentTrade()?.process_id
          ? "resend"
          : props?.val?.info === "double"
          ? "double down"
          : props?.val?.status
          ? props?.val?.status
          : "-"}
      </p>
      <div class="col-start-2 row-start-1 lg:row-auto lg:col-auto w-full flex items-center justify-end overflow-hidden relative cursor-pointer">
        <p class="text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate max-w-full">
          {date}
        </p>
      </div>
    </>
  );
};

export default CoinflipStructure;
