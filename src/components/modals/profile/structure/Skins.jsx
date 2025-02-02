import { createEffect, createSignal } from "solid-js";
import injector from "../../../../injector/injector";
import Coin from "../../../../utilities/Coin";

const SkinsStructure = (props) => {
  const { socket, toastr } = injector;
  const [isResending, setIsResending] = createSignal(false);
  const [resentTrade, setResentTrade] = createSignal({});

  const splitted = props?.val?.timestamp?.split("T")?.[0].split("-");

  const date = `${splitted[1]}/${splitted[2]}/${splitted[0]}`;

  createEffect(() => {
    const vals = (props?.resendTrades || []).find(
      (x) => x.process_id === props.val.process_id
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
      <div class="col-start-1 row-start-2 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] lg:flex items-center gap-x-[14px] lg:gap-[9px]">
        <div
          class="w-6 h-6 rounded-full flex items-center justify-center"
          classList={{
            "bg-green-67/10": props?.val?.type !== "give",
            "bg-gray-9a/10": props?.val?.type === "give",
          }}
        >
          {props?.val?.type === "give" ? (
            <svg
              width="12"
              height="2"
              viewBox="0 0 12 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 2C0.447715 2 1.87764e-08 1.55228 0 1C-1.87764e-08 0.447716 0.447715 5.93042e-07 1 5.62004e-07L11 0C11.5523 -3.10386e-08 12 0.447715 12 1C12 1.55228 11.5523 2 11 2L1 2Z"
                fill="#9A9EC8"
              />
            </svg>
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.99805 0C5.58383 0 5.24805 0.335786 5.24805 0.75V5.25H0.75C0.335786 5.25 0 5.58579 0 6C0 6.41421 0.335787 6.75 0.75 6.75H5.24805V11.25C5.24805 11.6642 5.58383 12 5.99805 12C6.41226 12 6.74805 11.6642 6.74805 11.25V6.75H11.25C11.6642 6.75 12 6.41421 12 6C12 5.58579 11.6642 5.25 11.25 5.25H6.74805V0.75C6.74805 0.335786 6.41226 0 5.99805 0Z"
                fill="url(#paint0_radial_2561_195607)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.99805 0C5.58383 0 5.24805 0.335786 5.24805 0.75V5.25H0.75C0.335786 5.25 0 5.58579 0 6C0 6.41421 0.335787 6.75 0.75 6.75H5.24805V11.25C5.24805 11.6642 5.58383 12 5.99805 12C6.41226 12 6.74805 11.6642 6.74805 11.25V6.75H11.25C11.6642 6.75 12 6.41421 12 6C12 5.58579 11.6642 5.25 11.25 5.25H6.74805V0.75C6.74805 0.335786 6.41226 0 5.99805 0Z"
                fill="url(#paint1_linear_2561_195607)"
                fill-opacity="0.16"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_2561_195607"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(6 9.6) rotate(90) scale(8.4)"
                >
                  <stop stop-color="#27F278" />
                  <stop offset="1" stop-color="#86FFB6" />
                </radialGradient>
                <linearGradient
                  id="paint1_linear_2561_195607"
                  x1="-1.78814e-07"
                  y1="12"
                  x2="14.1176"
                  y2="8.47059"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.200692" stop-color="white" stop-opacity="0" />
                  <stop offset="0.413004" stop-color="white" />
                  <stop offset="0.689282" />
                  <stop offset="1" stop-color="white" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
        <p
          class={`text-14 font-bold font-SpaceGrotesk capitalize  truncate lg:uppercase my-auto ${
            props?.val?.type === "give"
              ? "text-gray-9aa"
              : "text-gradient-green-secondary"
          }`}
        >
          {props?.val?.extra
            ? props?.val?.extra?.split(":")[0]
            : props?.val?.withdraw_type
            ? props?.val?.withdraw_type
            : "shop"}{" "}
          {props?.val?.type === "give" ? "withdraw" : "deposit"}
        </p>
        <span class="text-shadow-base text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Type
        </span>
      </div>
      <p class="col-start-1 row-start-1 lg:row-auto lg:col-auto text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10">
        {props?.val?.offer_id || "-"}
      </p>
      <div class="col-start-2 row-start-2 lg:row-auto lg:col-auto grid grid-cols-[1rem_1fr] md:grid-cols-[2rem_1fr]  lg:flex items-center gap-y-0 gap-2">
        <Coin />
        <p
          class={`text-14 font-bold font-SpaceGrotesk uppercase my-auto ${
            props?.val?.type === "give"
              ? "text-gradient"
              : "text-gradient-green-secondary"
          }`}
        >
          {Number(props?.val?.value).toLocaleString()}
        </p>
        <span class="text-shadow-base text-gray-a2 font-bold capitalize col-start-2 lg:hidden text-13">
          Amount
        </span>
      </div>
      <div
        class={`col-start-1 row-start-3 lg:row-auto lg:col-auto flex items-center gap-2 z-10 ${
          props?.val?.status !== "ACCEPTED"
            ? "text-gray-9a"
            : "text-gradient-green-secondary"
        } ${
          resentTrade()?.process_id ? "cursor-pointer underline text-white" : ""
        }`}
      >
        <p
          class="text-current text-14 font-bold SpaceGrotesk uppercase"
          onClick={sendTrade}
        >
          {resentTrade()?.process_id ? "resend" : props?.val?.status}
        </p>
      </div>
      <div class="col-start-2 row-start-1 lg:row-auto lg:col-auto w-full flex items-center justify-end overflow-hidden relative cursor-pointer">
        <p class="text-14 font-bold font-SpaceGrotesk text-gray-9aa uppercase my-auto relative z-10 truncate">
          {date}
        </p>
      </div>
    </>
  );
};

export default SkinsStructure;
