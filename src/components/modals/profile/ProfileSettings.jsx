import { createSelector, createSignal, onMount, For } from "solid-js";
import injector from "../../../injector/injector";
import { URL } from "../../../libraries/url";
import { useI18n } from "../../../i18n/context";
import roomStore from "../../chat/RoomStore";
import YellowButtonBg from "../../../assets/img/animatedButtonBg.jpg";
import EnFlag from "../../../assets/img/header/enFlag.svg";
import EsFlag from "../../../assets/img/header/esFlag.svg";
import RuFlag from "../../../assets/img/header/ruFlag.svg";
import {
  playButtonClickSound,
  playMenuToggle,
} from "../../../utilities/Sounds/SoundButtonClick";

const ProfileSettings = (props) => {
  const i18n = useI18n();

  const { socket, userObject, toastr, setUserObject } = injector;
  const [tradeurl, setTradeurl] = createSignal(
    userObject?.user?.tradeurl ? userObject.user.tradeurl : ""
  );
  const [clientSeed, setClientSeed] = createSignal(
    userObject?.user?.client_seed ? userObject.user.client_seed : ""
  );
  const [isLangModalOpen, setLangModalOpen] = createSignal(false);
  const [availableLocales, setAvailableLocales] = createSignal([]);
  const [setRoom] = roomStore;

  let langButtonMain;
  let langWrapperMain;

  const handleClick = (event) => {
    if (
      langWrapperMain &&
      langButtonMain &&
      !langWrapperMain.contains(event.target) &&
      !langButtonMain.contains(event.target)
    ) {
      setLangModalOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClick);

  let save = () => {
    playButtonClickSound();
    socket.emit(
      "system:settings:update",
      {
        tradeurl: tradeurl(),
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }
      }
    );
  };

  const changeClientSeed = () => {
    socket.emit(
      "system:client_seed:new",
      {
        client_seed: clientSeed(),
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }
      }
    );
  };

  const regenServerSeed = () => {
    socket.emit("system:server_seed:new", {}, (data) => {
      if (data.msg) {
        toastr(data);
      }

      if (!data.error) {
        setUserObject("user", (prev) => ({
          ...prev,
          server_seed: data.data.server_seed,
        }));
      }
    });
  };

  const toggleActiveLang = (lang) => {
    props.changeLang(lang);
    setAvailableLocales((prev) =>
      prev.map((l) => {
        return { ...l, active: l.code === lang };
      })
    );
  };

  const isSelected = createSelector(() => {
    setRoom(i18n.language);
    return i18n.language;
  });

  onMount(() => {
    setAvailableLocales([
      { title: "En", code: "en", active: isSelected("en"), flag: EnFlag },
      { title: "Es", code: "es", active: isSelected("es"), flag: EsFlag },
      { title: "Ru", code: "ru", active: isSelected("ru"), flag: RuFlag },
    ]);
  });

  return (
    <>
      <div class="w-full flex flex-col gap-4">
        <div class="flex flex-col w-full">
          <p class="text-18 text-white font-bold font-Oswald uppercase mb-2">
            {i18n.t("profile_true.settings.Steam trade URL")}
          </p>
          <div class="center w-full gap-12">
            <input
              class="flex-1 h-10 text-14 rounded-4 text-gray-8c placeholder-gray-8c border border-dark-20 px-4 font-normal"
              placeholder="No tradeurl"
              onInput={(e) => setTradeurl(e.currentTarget.value)}
              value={tradeurl()}
            />
            <div class="w-24 h-10 rounded-2 bg-dark-20 center hover" style={{filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))"}} onClick={() => {
              window.open(
                "http://steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url"
              );
            }}>
              <p class="text-14 text-gray-8c font-black capitalize">
                {i18n.t("profile_true.settings.Find here")}
              </p>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-between items-center">
          <div class="flex flex-col">
            <p class="text-18 text-white font-bold font-Oswald uppercase">
              {i18n.t("profile_true.settings.Language")}
            </p>
            <p class="text-14 text-gray-8c font-normal cursor-pointer">
              {i18n.t("profile_true.settings.Used on the website")}
            </p>
          </div>
          <div class="relative">
            <button
              type="button"
              onClick={() => {
                playMenuToggle();
                setLangModalOpen((prev) => !prev);
              }}
              ref={langButtonMain}
              class="relative w-60 h-10 flex justify-between items-center py-2 pl-3 text-left bg-dark-20 rounded-2"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
            >
              <span class="block truncate">
                <For each={availableLocales()}>
                  {(item) =>
                    item.active ? (
                      <span class="flex gap-2 items-center font-Oswald text-14 text-white uppercase">
                        {" "}
                        <img src={item.flag} alt="flag" />
                        {item.title}
                      </span>
                    ) : (
                      ""
                    )
                  }
                </For>
              </span>
              <span
                class={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2`}
              >
                <svg
                  class={`duration-200 ${isLangModalOpen() ? "" : "transform -rotate-180"}`}
                  width="13"
                  height="7"
                  viewBox="0 0 13 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.12452 -7.90072e-07C5.90864 -7.61763e-07 5.69271 0.0803387 5.52806 0.240654L0.346806 5.29049C0.0172113 5.61172 0.0172114 6.13254 0.346807 6.45364C0.676269 6.77473 1.21054 6.77473 1.54017 6.45364L6.12452 1.98533L10.7091 6.45332C11.0385 6.77442 11.5729 6.77442 11.9023 6.45332C12.2321 6.13222 12.2321 5.61157 11.9023 5.29034L6.72115 0.240471C6.55642 0.0801826 6.34048 -8.18392e-07 6.12452 -7.90072e-07Z"
                    fill="#48488B"
                  />
                </svg>
              </span>
            </button>

            <ul
              ref={langWrapperMain}
              class={`${
                isLangModalOpen() ? "" : "hidden"
              } absolute z-40 mt-1 w-full overflow-auto py-1 font-Oswald text-14 text-white uppercase bg-dark-20 rounded-2`}
              tabindex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              <For each={availableLocales()}>
                {(item) =>
                  !item.active ? (
                    <li
                      onClick={() => toggleActiveLang(item.code)}
                      class="text-gray-900 relative select-none py-2 pl-3 pr-9 cursor-pointer"
                      id="listbox-option-0"
                      role="option"
                    >
                      <span class="flex gap-1 items-center font-Oswald text-14 text-white uppercase">
                        <img src={item.flag} alt="flag" />
                        {item.title}
                      </span>
                    </li>
                  ) : (
                    ""
                  )
                }
              </For>
            </ul>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <p class="text-18 text-white font-bold font-Oswald uppercase mb-2">
            {i18n.t("profile_true.settings.Client seed")}
          </p>
          <div class="center w-full gap-12">
            <input
              class="flex-1 h-10 text-14 rounded-4 text-gray-8c placeholder-gray-8c border border-dark-20 px-4 font-normal"
              placeholder="No tradeurl"
              onInput={(e) => setClientSeed(e.currentTarget.value)}
              value={clientSeed()}
            />
            <div class="w-24 h-10 rounded-2 bg-dark-20 center hover" style={{filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))"}} onClick={changeClientSeed}>
              <p class="text-14 text-gray-8c font-black capitalize">
                {i18n.t("profile_true.settings.Change")}
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <p class="text-18 text-white font-bold font-Oswald uppercase mb-2">
            {i18n.t("profile_true.settings.Hash server seed")}
          </p>
          <div class="center w-full gap-12">
            <div
              class="flex-1 h-10 text-14 rounded-4 text-gray-8c placeholder-gray-8c border border-dark-20 px-4 font-normal overflow-hidden flex items-center"
              placeholder="No tradeurl"
              onInput={(e) => setClientSeed(e.currentTarget.value)}
              value={clientSeed()}
            >
              <p class="text-14 text-gray-6a font-medium truncate">
                {userObject?.user?.server_seed}
              </p>
            </div>
            <div class="w-24 h-10 rounded-2 bg-dark-20 center hover" style={{filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))"}} onClick={regenServerSeed}>
              <p class="text-14 text-gray-8c font-black capitalize">
                {i18n.t("profile_true.settings.Regen")}
              </p>
            </div>
          </div>
        </div>
        
        <div class="flex items-center gap-6 mt-4">
          <div class="flex hover" onClick={save}>
            <div
              class="cursor-pointer relative center hover w-20 sm:w-40 h-10 overflow-hidden rounded-2 bg-cover group scrolling-btn-wrapper"
              style={{ "background-image": `url(${YellowButtonBg})` }}
            >
              <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
              <p class="absolute text-dark-16 text-12 sm:text-14 font-medium font-Oswald uppercase">
                {i18n.t("profile_true.settings.Save changes")}
              </p>
            </div>
          </div>
          <div
            class="relative center cursor-pointer hover rounded-2 bg-cover group scrolling-btn-wrapper h-10 min-w-40 overflow-hidden"
            style={{ "background-image": `url(${YellowButtonBg})` }}
            onClick={() => {
              window.location = URL.SIGNOUT;
            }}
          >
            <div class="scrolling-btn-image hidden group-hover:block absolute left-0 top-0" />
            <div class="absolute left-0.5 top-0.5 h-9 w-[calc(100%-4px)] bg-dark-13" />
            <div class="absolute center">
              <p class="text-yellow-ff text-14 font-semibold font-Oswald uppercase">
                {i18n.t("profile_true.settings.Logout")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
