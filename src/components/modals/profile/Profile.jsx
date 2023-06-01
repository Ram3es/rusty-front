import { createEffect, createSignal } from "solid-js";
import injector from "../../../injector/injector";
import Modal from "../Modal";

import { NavLink } from "solid-app-router";
import ProfileSettings from "./ProfileSettings";
import ProfileHistory from "./ProfileHistory";
import ProfileAccount from "./ProfileAccount";
import { createStore } from "solid-js/store";
import { useI18n } from "../../../i18n/context";
import GrayButtonBg from "../../../assets/img/animatedGrayButtonBg.jpg";
import { playCashoutSound } from "../../../utilities/Sounds/SoundButtonClick";

import HeaderBg from "../../../assets/img/modals/ModalHeaderBg.png";

const Profile = (props) => {
  const i18n = useI18n();

  const { socket, setToggles, toastr, userObject } = injector;

  const [tab, setTab] = createSignal("account");

  const [account, setAccount] = createStore({});

  createEffect(() => {
    if (props.searchParams?.profile && userObject?.authenticated) {
      console.log("FETCHING SYSTEM DATa!");
      socket.emit("system:account", {}, (data) => {
        console.log(data, "system data fetched! ");
        const pfIds = {};
        for(const val of data.data.history) {
          if (!pfIds?.[val.pf_id] || Number(pfIds?.[val.pf_id].t_id) < Number(val.t_id)) pfIds[val.pf_id] = val;
        }
        data.data.history = Object.values(pfIds).sort((a,b) => (b.id - a.id));

        console.log("new data", data.data.history);

        setAccount(data.data);

        if (data.msg) {
          toastr(data);
        }
      });
    }
  });

  let rakebackClaim = () => {
    socket.emit("system:rakeback:claim", {}, (data) => {
      if (data.msg) {
        toastr(data);
      }

      if (!data.error) {
        playCashoutSound();
      }

      if (!data.error) {
        setAccount("user", (prev) => ({ ...prev, rakeback: 0 }));
      }
    });
  };

  return (
    <Modal
      noContainer={true}
      open={() => {
        return true;
      }}
    >
      <NavLink
        class="w-full h-full absolute left-0 cursor-default top-0"
        href={props.pathname()}
      />
      <div
        class="flex flex-col absolute top-40"
        style={{
          width: "50rem",
          "max-width": "100vw",
        }}
      >
        <div
          class={`bg-dark-16 w-full relative flex rounded-6 overflow-hidden flex-col gap-6 transition-all transform -translate-y-1/4 ${
            !(props.searchParams.profile && !props.searchParams.benefits)
              ? ""
              : "-translate-y-0"
          } duration-100 ease-out`}
          style={{
            border: "2px solid rgba(102, 110, 151, 0.2)",
          }}
        >
          <div
            class="flex relative w-full items-center justify-between px-8 py-6 bg-cover border-b-2 border-gray-30"
            style={{ "background-image": `url(${HeaderBg})` }}
          >
            <p class="text-24 text-white font-medium font-Oswald uppercase">
              {i18n.t("profile_true.Profile")}
            </p>
            <NavLink
              href={`${props.pathname()}`}
              class="center"
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
            </NavLink>
          </div>
          <div class="flex sm:grid grid-cols-6 gap-2 overflow-x-scroll sm:overflow-x-visible px-8">
            <For each={[
              {type: "account", name: "profile_true.Account"}, {type: "history", name: "profile_true.History"}, {type: "transactions", name: "profile_true.Transactions"}, 
              {type: "settings", name: "profile_true.Settings"}, {type: "oldSeeds", name: "profile_true.Old seeds"}, {type: "tradeModal", name: "profile_true.Current trades"}
            ]}>
              {(val) => (
                <div
                  class={`duration-200 relative min-w-24 center bg-dark-27 rounded-2 bg-cover scrolling-btn-wrapper-gray overflow-hidden group hover`}
                  style={{
                    filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))",
                    "background-image": `url(${
                      tab() == val.type ? GrayButtonBg : ""
                    })`,
                  }}
                  onClick={() => {
                    if(val.type == "tradeModal") {setToggles("tradeModal", true);} else {setTab(val.type)}
                  }}
                >
                  <div class="scrolling-btn-image-gray absolute left-0 top-0 hidden group-hover:block" />
                  <p class={`text-14 ${ tab() == val.type ? "text-dark-1b" : "text-gray-8c" } group-hover:text-dark-1b font-medium font-Oswald uppercase z-10 px-2 py-1.5`}>
                    {i18n.t(val.name)}
                  </p>
                </div>
              )}
            </For>
          </div>
          <div class="w-full px-8 flex flex-col gap-6 pb-8">
            {tab() == "settings" ? (
              <ProfileSettings changeLang={props.changeLang} />
            ) : tab() == "transactions" ? (
              <ProfileHistory account={account} type="transaction" />
            ) : tab() == "oldSeeds" ? (
              <ProfileHistory account={account} type="oldSeeds" />
            ) : tab() == "history" ? (
              <ProfileHistory account={account} type="history" />
            ) : tab() == "account" ? (
              <ProfileAccount
                account={account}
                rakebackClaim={rakebackClaim}
                pathname={props.pathname}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Profile;
