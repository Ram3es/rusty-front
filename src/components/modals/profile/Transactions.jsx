import Coin from "../../../utilities/Coin";
import injector from "../../../injector/injector";
import { useI18n } from "../../../i18n/context";
import { createSignal } from "solid-js";
const Transactions = (props) => {
  const i18n = useI18n();
  const [isResending, setIsResending] = createSignal(false);

  const { socket } = injector;

  const sendTrade = (id) => {
    const RESEND_TIMEOUT = 20000;
    if (isResending()) return;
    setIsResending(true);
    if (id) {
      socket.emit("steam:resend", { processId: id }, (data) => {
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
      <svg
        class="absolute left-0 top-0"
        width="11"
        height="10"
        viewBox="0 0 11 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 9.5V0H11L0 9.5Z" fill="#181A27" />
      </svg>
      <svg
        class="absolute right-0 bottom-0"
        width="11"
        height="10"
        viewBox="0 0 11 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 9.5V0L0 9.5H11Z" fill="#181A27" />
      </svg>
      <div class="flex items-center gap-2">
        {props.val.type !== "give" ? (
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.1483 0.00066672C20.3286 0.0815469 26.08 5.96783 25.9992 13.1482C25.9183 20.3286 20.032 26.08 12.8517 25.9992C5.6714 25.9183 -0.080037 20.032 0.000842672 12.8516C0.0817223 5.68025 5.96796 -0.0712268 13.1483 0.00066672Z"
              fill="#253143"
            />
            <path
              d="M14.0002 19.0264V16.0264L16.5002 13.0264L14.0002 10.0264V7.02637L19.0002 13.0264L14.0002 19.0264Z"
              fill="#33EBB4"
            />
            <path d="M9 19V16L11.5 13L9 10V7L14 13L9 19Z" fill="#33EBB4" />
          </svg>
        ) : (
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.1483 0.00066672C20.3286 0.0815469 26.08 5.96783 25.9992 13.1482C25.9183 20.3286 20.032 26.08 12.8517 25.9992C5.6714 25.9183 -0.080037 20.032 0.000842672 12.8516C0.0817223 5.68025 5.96796 -0.0712268 13.1483 0.00066672Z"
              fill="#253143"
            />
            <path d="M13 7V10L10.5 13L13 16V19L8 13L13 7Z" fill="#EB335F" />
            <path
              d="M17.9956 7.20947V10.2095L15.4956 13.2095L17.9956 16.2095V19.2095L12.9956 13.2095L17.9956 7.20947Z"
              fill="#EB335F"
            />
          </svg>
        )}
        <p class="text-14 text-gray-8c font-medium font-Oswald uppercase">
          {props.val.type !== "give" ? "deposit" : "withdraw"}
        </p>
      </div>
      <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto">
        {props.val.offer_id}
      </p>
      <div class="flex items-center gap-2">
        <Coin />
        <p class="text-14 text-white font-medium font-Oswald uppercase my-auto">
          {Number(props.val?.value)?.toLocaleString()}
        </p>
      </div>
      <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto">
        {props.val.type !== "give" ? "deposit" : "withdraw"}{" "}
        {i18n.t("transactions.Items")}
      </p>
      {Array.isArray(props.resendTrades) &&
      props.resendTrades.find((x) => x.process_id === props.val.process_id) ? (
        <p
          class={`text-14 font-medium font-Oswald uppercase my-auto`}
          classList={{
            "cursor-pointer": !isResending(),
            "text-gray-8c": isResending(),
            underline: !isResending(),
            "text-white": !isResending(),
          }}
          onClick={() => sendTrade(props.val.process_id)}
        >
          Send
        </p>
      ) : (
        <p
          class={`text-14 ${
            props.val?.status == "ACCEPTED"
              ? "text-green"
              : props.val?.status == "BAD"
              ? "text-red"
              : "text-yellow-ff"
          } font-medium font-Oswald uppercase my-auto`}
        >
          {props.val?.status}
        </p>
      )}
      <div class="w-full flex items-center justify-end">
        <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto truncate">
          {props.val?.timestamp}
        </p>
      </div>
    </>
  );
};

export default Transactions;
