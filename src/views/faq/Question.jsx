import { createSignal, For } from "solid-js";

import { useI18n } from "../../i18n/context";

const Question = (props) => {
  const i18n = useI18n();

  const [active, setActive] = createSignal(false);

  return (
    <div
      class={`w-full ${
        active() ? "" : "h-12"
      } relative bg-dark-26 bg-opacity-40 overflow-hidden mb-3 px-6`}
    >
      <div
        class="h-12 w-full flex justify-between items-center cursor-pointer"
        onClick={() => setActive((prev) => !prev)}
      >
        <p class="text-14 sm:text-16 text-white font-medium capitalize">
          {props.val.question[i18n.language]}
        </p>
        <svg
          class={`transform duration-200 ${active() ? "rotate-180" : ""}`}
          width="13"
          height="7"
          viewBox="0 0 13 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.02491 6.69434C5.80903 6.69434 5.5931 6.614 5.42845 6.45368L0.247197 1.40384C-0.0823981 1.08261 -0.082398 0.561798 0.247197 0.2407C0.576659 -0.0803975 1.11093 -0.0803975 1.44056 0.2407L6.02491 4.70901L10.6095 0.241013C10.9389 -0.0800843 11.4733 -0.0800842 11.8027 0.241013C12.1325 0.562111 12.1325 1.08277 11.8027 1.404L6.62154 6.45386C6.45681 6.61415 6.24087 6.69434 6.02491 6.69434Z"
            fill="#8C98A9"
          />
        </svg>
      </div>
      <div class="w-full flex flex-col gap-2 mb-4">
        <For each={props.val.answer[i18n.language].split("\\")}>
          {(text) => (
            <p class="text-14 sm:text-16 text-gray-47 font-medium">{text}</p>
          )}
        </For>
      </div>
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
    </div>
  );
};

export default Question;
