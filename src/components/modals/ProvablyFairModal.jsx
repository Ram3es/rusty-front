import { createSignal, For } from "solid-js";
import injector from "../../injector/injector";
import Modal from "./Modal";
import { useI18n } from "../../i18n/context";

const ProvablyFairModal = () => {
  const i18n = useI18n();

  const { socket, toggles, setToggles, toastr } = injector;

  const [text, setText] = createSignal("");

  const [data, setData] = createSignal({});

  const searchPF = () => {
    if (!text()) return;

    socket.emit(
      "system:fairness:search",
      {
        id: text(),
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }

        if (!data.error) {
          setData(data.data);
        }
      }
    );
  };

  const roundInfo = {
    gamemode: {
      en: "gamemode",
      es: "modo de juego",
      ru: "игровой режим",
    },
    hash: {
      en: "hash",
      es: "picadillo",
      ru: "хэш",
    },
    roll: {
      en: "roll",
      es: "rodar",
      ru: "свиток",
    },
    secret: {
      en: "secret",
      es: "secreto",
      ru: "секрет",
    },
    random: {
      en: "random",
      es: "aleatorio",
      ru: "случайный",
    },
    signature: {
      en: "signature",
      es: "firma",
      ru: "подпись",
    },
  };

  return (
    <Modal
      noContainer={true}
      open={() => {
        return true;
      }}
      handler={() => {}}
    >
      <div
        class="w-full h-full absolute left-0 cursor-default top-0"
        onClick={() => setToggles("provablyFairModal", false)}
      />
      <div
        class="flex flex-col absolute top-32 w-11/12 overflow-y-scroll"
        style={{
          "max-width": "56rem",
          height: "40rem",
        }}
      >
        <div
          class={`bg-dark-16 w-full px-8 py-8 relative flex flex-col gap-6 transition-all transform -translate-y-1/4 ${
            !toggles.provablyFairModal ? "" : "-translate-y-0"
          } duration-100 ease-out`}
        >
          <div class="flex flex-col gap-2 relative">
            <p class="text-24 text-white font-medium font-Oswald uppercase">
              {i18n.t("provably_fair.Provably fair")}
            </p>
            <div
              class="center absolute right-0"
              onClick={() => setToggles("provablyFairModal", false)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
                  fill="#8C98A9"
                />
              </svg>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <p class="text-14 sm:text-16 text-gray-47 font-normal">
              {i18n.t("provably_fair.We use the popular")}
            </p>
            <p class="text-14 sm:text-16 text-gray-47 font-normal">
              {i18n.t("provably_fair.When a round")}{" "}
              <a
                href="https://api.random.org/signatures/form"
                target="_blank"
                rel="noreferrer"
                class="text-white"
              >
                {i18n.t("provably_fair.Link")}
              </a>{" "}
              {i18n.t("provably_fair.To verify all")}
            </p>

            <p class="text-14 sm:text-16 text-white font-medium">
              {i18n.t("provably_fair.When updating")}
            </p>

            <p class="text-14 sm:text-16 text-gray-47 font-normal">
              <b>{i18n.t("provably_fair.Plinko")}</b>
              <br />
              hash = sha256(client_seed + ":" +server_seed + ":" + nonce) <br />
              seedr = seedrandom(hash); <br />
              rows = count the amount of values in roll array in PF popup <br />
              {`roll = Array.from({length: rows}, () => Math.floor(seedr() * 2))`}{" "}
              <br />
              round = roll.slice(0, rows)
              <br />
              {`rights = round.filter((val) => val == 1).length`}
              <br />
              <b>{i18n.t("provably_fair.Rights should be")}</b>
            </p>

            <p class="text-14 sm:text-16 text-gray-47 font-normal">
              <b>{i18n.t("provably_fair.Upgrader")}</b>
              <br />
              hash = sha256(client_seed + ":" +server_seed + ":" + nonce)
              <br />
              seedr = seedrandom(hash) <br />
              roll = seedr() <br />
              <b>{i18n.t("provably_fair.Roll should be")}</b>
            </p>

            <div class="w-full h-10 px-4 bg-dark-20 relative center">
              <div class="absolute w-full h-full flex justify-between items-center">
                <svg
                  width="4"
                  height="16"
                  viewBox="0 0 4 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 7.57895L0 16L0 0L4 7.57895Z" fill="#161B2A" />
                </svg>
                <svg
                  width="4"
                  height="16"
                  viewBox="0 0 4 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 7.57895L4 16L4 0L0 7.57895Z" fill="#161B2A" />
                </svg>
                <svg
                  class="absolute left-16 top-0"
                  width="32"
                  height="4"
                  viewBox="0 0 32 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.619 2L16 0H32L23.619 2Z" fill="#161B2A" />
                  <path d="M7.89474 4L0 0H15L7.89474 4Z" fill="#161B2A" />
                </svg>
              </div>
              <div class="w-full flex items-center">
                <p class="text-gray-8c text-14 font-medium truncate select-text">
                  {"sha256({secret}{roll}{signature})"}
                </p>
              </div>
            </div>
          </div>
          <p class="text-24 text-white font-medium font-Oswald uppercase">
            {i18n.t("provably_fair.Round information")}
          </p>
          <div class="flex flex-col gap-4 w-full">
            <div class="w-full h-10 px-4 bg-dark-20 relative center">
              <div class="absolute w-full h-full flex justify-between items-center">
                <svg
                  width="4"
                  height="16"
                  viewBox="0 0 4 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 7.57895L0 16L0 0L4 7.57895Z" fill="#161B2A" />
                </svg>
                <svg
                  width="4"
                  height="16"
                  viewBox="0 0 4 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 7.57895L4 16L4 0L0 7.57895Z" fill="#161B2A" />
                </svg>
                <svg
                  class="absolute left-16 top-0"
                  width="32"
                  height="4"
                  viewBox="0 0 32 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.619 2L16 0H32L23.619 2Z" fill="#161B2A" />
                  <path d="M7.89474 4L0 0H15L7.89474 4Z" fill="#161B2A" />
                </svg>
              </div>
              <input
                class="w-full h-full text-white text-12 sm:text-14 font-medium font-Oswald uppercase placeholder-gray-8c z-10"
                placeholder={i18n.t("provably_fair.Search for ID")}
                type="number"
                value={text()}
                onInput={(e) => {
                  setText(e.currentTarget.value);
                }}
              />
              <div
                class={`absolute right-4 w-24 h-6 duration-200 gap-2 text-gray-47 bg-dark-2d hover:text-white hover center z-10`}
                onClick={searchPF}
              >
                <p class="text-12 sm:text-14 text-current font-bold sentence">
                  {i18n.t("provably_fair.Search")}
                </p>
              </div>
            </div>

            <div class="w-full grid grid-cols-2 gap-x-6 gap-y-2">
              <For
                each={[
                  "gamemode",
                  "hash",
                  "roll",
                  "secret",
                  "random",
                  "signature",
                ]}
              >
                {(name) => (
                  <div class="w-full flex flex-col gap-1">
                    <p class="text-12 sm:text-14 text-gray-8c font-normal sentence">
                      {roundInfo[name][i18n.language]}
                    </p>
                    <div class="w-full h-10 px-4 bg-dark-20 relative center">
                      <div class="absolute w-full h-full flex justify-between items-center">
                        <svg
                          width="4"
                          height="16"
                          viewBox="0 0 4 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 7.57895L0 16L0 0L4 7.57895Z"
                            fill="#161B2A"
                          />
                        </svg>
                        <svg
                          width="4"
                          height="16"
                          viewBox="0 0 4 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 7.57895L4 16L4 0L0 7.57895Z"
                            fill="#161B2A"
                          />
                        </svg>
                        <svg
                          class="absolute left-16 top-0"
                          width="32"
                          height="4"
                          viewBox="0 0 32 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.619 2L16 0H32L23.619 2Z"
                            fill="#161B2A"
                          />
                          <path
                            d="M7.89474 4L0 0H15L7.89474 4Z"
                            fill="#161B2A"
                          />
                        </svg>
                      </div>
                      <div class="w-full flex items-center">
                        <p class="text-whitetext-12 sm: text-14 font-medium font-Oswald truncate select-text">
                          {data()?.[name]}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProvablyFairModal;
