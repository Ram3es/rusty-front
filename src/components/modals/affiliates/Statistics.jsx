import { createSignal } from "solid-js";

const AffiliatesStatistics = () => {
  const [tab, setTab] = createSignal("weekly");

  return (
    <>
      <div class="w-full flex flex-col gap-4">
        <div class="w-full flex items-center justify-end gap-2">
          <div
            class={`center relative cursor-pointer duration-200 ${
              tab() == "weekly" ? "text-dark-43" : "text-dark-27"
            }`}
            onClick={() => {
              setTab("weekly");
            }}
          >
            <svg
              width="77"
              height="32"
              viewBox="0 0 77 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="77" height="32" class="fill-current" />
              <path d="M38.619 2L31 0H47L38.619 2Z" fill="#161B2A" />
              <path d="M39.4211 30L31 32H47L39.4211 30Z" fill="#161B2A" />
              <path d="M3 15.6842L0 22L0 10L3 15.6842Z" fill="#161B2A" />
            </svg>
            <p
              class={`${
                tab() == "weekly" ? "text-white" : "text-gray-8c"
              } duration-200 text-14 font-medium font-Oswald uppercase absolute`}
            >
              weekly
            </p>
          </div>
          <div
            class={`center relative cursor-pointer duration-200 ${
              tab() == "montly" ? "text-dark-43" : "text-dark-27"
            }`}
            onClick={() => {
              setTab("montly");
            }}
          >
            <svg
              width="77"
              height="32"
              viewBox="0 0 77 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="77" height="32" class="fill-current" />
              <path d="M38.619 2L31 0H47L38.619 2Z" fill="#161B2A" />
              <path d="M39.4211 30L31 32H47L39.4211 30Z" fill="#161B2A" />
              <path d="M3 15.6842L0 22L0 10L3 15.6842Z" fill="#161B2A" />
            </svg>
            <p
              class={`${
                tab() == "montly" ? "text-white" : "text-gray-8c"
              } duration-200 text-14 font-medium font-Oswald uppercase absolute`}
            >
              montly
            </p>
          </div>
          <div
            class={`center relative cursor-pointer duration-200 ${
              tab() == "all time" ? "text-dark-43" : "text-dark-27"
            }`}
            onClick={() => {
              setTab("all time");
            }}
          >
            <svg
              width="77"
              height="32"
              viewBox="0 0 77 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="77" height="32" class="fill-current" />
              <path d="M38.619 2L31 0H47L38.619 2Z" fill="#161B2A" />
              <path d="M39.4211 30L31 32H47L39.4211 30Z" fill="#161B2A" />
              <path d="M3 15.6842L0 22L0 10L3 15.6842Z" fill="#161B2A" />
            </svg>
            <p
              class={`${
                tab() == "all time" ? "text-white" : "text-gray-8c"
              } duration-200 text-14 font-medium font-Oswald uppercase absolute`}
            >
              all time
            </p>
          </div>
        </div>

        <div class="bg-dark-22 w-full h-80" />
      </div>
    </>
  );
};

export default AffiliatesStatistics;
