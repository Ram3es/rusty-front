import {
  Suspense,
  onMount,
  createMemo,
  createSignal,
  Show,
  Switch,
  Match,
  useTransition,
  lazy
} from "solid-js";
import { Routes, Route, useLocation, useSearchParams } from "solid-app-router";

import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Chat from "./components/chat/Chat";
import Home from "./views/home/Home";

// const Home = lazy(() => import("./views/home/Home"))



import { URL } from "./libraries/url";
import Wheel from "./views/wheel/Wheel";
import Mines from "./views/mines/Mines";
import Plinko from "./views/plinko/plinko";
import Coinflip from "./views/coinflip/Coinflip";
import CoinflipGameModal from "./components/modals/CoinflipGameModal";
import PaymentModal from "./components/modals/PaymentModal";
import SmallPaymentModal from "./components/modals/SmallPaymentModal";
import CoinflipCreateModal from "./components/modals/CoinflipCreateModal";
import Profile from "./components/modals/profile/Profile";
import TradeModal from "./components/modals/TradeModal";
import AffiliatesModal from "./components/modals/AffiliatesModal";
import ProvablyFairModal from "./components/modals/ProvablyFairModal";
import FreeModal from "./components/modals/FreeModal";
import LevelBenefitsModal from "./components/modals/LevelBenefitsModal";
import Faq from "./views/faq/Faq";
import BonusPotModal from "./components/modals/BonusPotModal";
import WinningsModal from "./components/modals/WinningsModal";
import TosModal from "./components/modals/TosModal";
import Tos from "./views/tos/Tos";
import TOAST_MANAGER from "./utilities/solid-toast/main.toast";
import Pvpmines from "./views/pvpmines/Pvpmines";
import Upgrader from "./views/upgrader/Upgrader";
import ChatRulesModal from "./components/modals/ChatRulesModal";

import PvpModal from "./components/modals/PvpModal";
import Footer from "./components/footer/Footer";

import Injector from "./injector/injector";

import Chart from "chart.js/auto";
import * as helpers from "chart.js/helpers";

import i18n from "./i18n/config";
import { createI18n } from "./i18n/context";
import { I18nProvider } from "./components/I18nProvider";
import i18next from "i18next";
import Rewards from "./views/rewards/Rewards";
import Case from "./views/case/Case";
import snowf from "snowf";
import SubHeader from "./components/header/SubHeader";
import PageLoader from "./components/PageLoader";
import Fallback from "./views/Fallback";
import Unbox from "./views/unbox/Unbox";
import CaseUnboxing from "./views/unbox/CaseUnboxing";
import Cases from "./views/cases/Cases";
import CaseBattles from "./views/caseBattles/CaseBattles";
import CreateCaseBattle from "./views/caseBattles/CreateCaseBattle";
import GameCaseBattle from "./views/caseBattles/GameCaseBattle";
import Leaderboard from "./views/leaderboard/Leaderboard";
import NewProfile from "./components/modals/profile/NewProfile";

const App = () => {

  const [pending, start] = useTransition();

  const { userObject, setUserObject, setLeaderboards, toggles, socket } = Injector;
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  const [searchParams, setSearchParams] = useSearchParams();
  const [loaded, setLoaded] = createSignal(false);

  const [i18nState, updatei18nState] = createI18n(i18next);

  const connectFkn = (data, event) => {
    console.log('here');
    try {
      setUserObject("authenticated", data?.user?.authenticated);
      setUserObject("user", {
          ...data?.user?.data,
          sounds: data?.user?.data?.sounds / 100,
      });
      setUserObject("chat", (data?.chat || []).reverse());
      setLeaderboards(data?.leaderboards);
    } catch(e) {
      console.log("connectFkn", data, event, e)
      setLoaded(true);
    }
    setLoaded(true);
  }


  const emitConnect = () => {
    console.log('connect');
    socket.emit("system:connect", {}, (data) => {
        connectFkn(data, 'emit')
    });
    
  }

  onMount(async () => {


    emitConnect();

    socket.on("system:connect", (data) => {
      connectFkn(data, 'on');
    })


    window.Chart = Chart;
    Chart.helpers = helpers;
    import("chart.js-plugin-labels-dv");

    await i18n;
    updatei18nState(i18next);
    // if (SNOWMODE) {
    //   snowf.init({
    //     size: 5,
    //     amount: 50,
    //   });
    // }

  });

  const handleOnChangeLang = (lang) => {
    i18next.changeLanguage(lang).then(() => {
      updatei18nState(i18next);
    });
  };

  return (
    
      <I18nProvider i18n={i18nState}>
        <div
          class={`absolute top-0 left-0 w-full h-full overflow-hidden bg-dark-18`}
        >
          <Fallback loaded={loaded}>
            <div class="w-full transition-all duration-200 relative flex flex-col h-full">
              <SubHeader changeLang={handleOnChangeLang} pathname={pathname} />
              <div class="flex flex-row h-[calc(100vh-130px)] w-full">
                <div class="main-content flex flex-col w-full">
                  <div class="flex flex-col lg:flex-row h-full">
                    {/* <Nav pathname={pathname} /> */}
                    <div class="order-1 lg:order-2 flex-1 w-full lg:w-auto h-auto lg:h-full relative center overflow-hidden">
                      <div class="relative flex-1 h-full flex flex-col items-center overflow-hidden">
                        {/* <Header
                          pathname={pathname}
                          changeLang={handleOnChangeLang}
                        /> */}
                        <div class="w-full flex-1 center relative overflow-hidden">
                          <div
                            id="scrollWrapper"
                            class="w-full h-full overflow-scroll realtive flex flex-col justify-between relative"
                            style={{
                              background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), radial-gradient(100% 316.05% at 0% 0%, #1D1F3E 0%, #1B1D34 100%)'
                            }}
                          >
                            <div
                              class="px-4 xl:px-8 xxl:px-14 mb-5 llg:max-w-[calc(100vw-324px)]"
                            >
                              <Suspense fallback={"Loading..."}>
                                <Routes fallback={"Page Not Found"}>
                                    <Route
                                      path={"/"}
                                      element={<Home setSearch={setSearchParams} />}
                                    />
                                  <Route
                                    exact
                                    path={`${URL.FAQ}`}
                                    element={<Faq />}
                                  />
                                  <Route
                                    exact
                                    path={`${URL.TOS}`}
                                    element={<Tos />}
                                  />
                                  <Route
                                    exact
                                    path={`${URL.GAMEMODES.WHEEL}`}
                                    element={<Wheel loaded={loaded} pathname={pathname} />}
                                  />
                                  <Route
                                    exact
                                    path={`${URL.GAMEMODES.MINES}`}
                                    element={<Mines loaded={loaded} />}
                                  />
                                  <Route
                                    exact
                                    path={`${URL.GAMEMODES.PLINKO}`}
                                    element={<Plinko loaded={loaded} pathname={pathname} />}
                                  />
                                  <Route
                                    path={`${URL.GAMEMODES.COINFLIP}/*`}
                                    element={<Coinflip loaded={loaded} />}
                                  />
                                  <Route
                                    path={`${URL.GAMEMODES.PVP_MINES}/*`}
                                    element={<Pvpmines loaded={loaded} pathname={pathname} />}
                                  />

                                  <Route
                                    path={`${URL.GAMEMODES.UPGRADER}/*`}
                                    element={<Upgrader loaded={loaded} />}
                                  />
                                  <Route
                                    path={`${URL.GAMEMODES.CASE_BATTLES}`}
                                    element={<CaseBattles loaded={loaded} />}
                                  />
                                  <Route
                                    path={`${URL.GAMEMODES.CASE_BATTLES_CREATE}`}
                                    element={<></>}
                                  />
                                  <Route
                                    path={`${URL.GAMEMODES.CASE_BATTLES_GAME}`}
                                    element={<GameCaseBattle searchParams={searchParams} loaded={loaded} />}
                                  />
                                  <Route
                                    path={`${URL.REWARDS}`}
                                    element={<Rewards loaded={loaded} />}
                                  />
                                  <Route
                                    path={`${URL.CASE}`}
                                    element={<Case searchParams={searchParams} loaded={loaded} />}
                                  />
                                  <Route
                                    path={`${URL.GAMEMODES.UNBOX}`}
                                    element={<Unbox loaded={loaded} />}
                                  />
                                  <Route
                                    path={`${URL.CASES}`}
                                    element={<Cases searchParams={searchParams} loaded={loaded} />}
                                  />
                                  <Route
                                    path={`${URL.CASE_UNBOXING}`}
                                    element={<CaseUnboxing searchParams={searchParams} loaded={loaded} />}
                                  />
                                  <Route
                                    path={`${URL.LEADERBOARD}`}
                                    element={<Leaderboard searchParams={searchParams} loaded={loaded} />}
                                  />
                                  <Route
                                    path="*"
                                    element={<Home loaded={loaded} setSearch={setSearchParams} />}
                                  />
                                </Routes>
                              </Suspense>
                              </div>
                              <Suspense fallback={"Loading..."}>
                                <Routes fallback={"Page Not Found"}>
                                <Route
                                    path={`${URL.GAMEMODES.CASE_BATTLES_CREATE}`}
                                    element={<CreateCaseBattle searchParams={searchParams} loaded={loaded} />}
                                  />
                                </Routes>
                              </Suspense>
                            
                            <Footer pathname={pathname} />
                          </div>
                        </div>
                        <TOAST_MANAGER />

                        <Switch fallback={<></>}>
                          <Match when={pathname() == URL.GAMEMODES.COINFLIP_GAME}>
                            <CoinflipGameModal
                              pathname={pathname}
                              searchParams={searchParams}
                            />
                          </Match>
                          <Match
                            when={
                              pathname() == URL.GAMEMODES.COINFLIP_CREATE ||
                              pathname() == URL.GAMEMODES.COINFLIP_JOIN
                            }
                          >
                            <CoinflipCreateModal
                              pathname={pathname}
                              searchParams={searchParams}
                            />
                          </Match>
                          <Match
                            when={
                              (searchParams?.deposit &&
                                (searchParams?.items ||
                                  searchParams?.crypto ||
                                  searchParams?.giftcard)) ||
                              searchParams?.withdraw ||
                              pathname() == URL.GAMEMODES.JACKPOT_DEPOSIT
                            }
                          >
                            <PaymentModal
                              pathname={pathname}
                              searchParams={searchParams}
                            />
                          </Match>
                          <Match
                            when={
                              (searchParams?.deposit ||
                                searchParams?.cryptoDeposit) &&
                              !searchParams?.items &&
                              !searchParams?.crypto &&
                              !searchParams?.giftcard
                            }
                          >
                            <SmallPaymentModal
                              pathname={pathname}
                              searchParams={searchParams}
                            />
                          </Match>
                          <Match
                            when={
                              searchParams?.free || pathname().includes("/r/")
                            }
                          >
                            <FreeModal
                              pathname={pathname}
                              searchParams={searchParams}
                            />
                          </Match>
                          <Match when={searchParams?.bonusPot}>
                            <BonusPotModal
                              pathname={pathname}
                              searchParams={searchParams}
                            />
                          </Match>
                          <Match when={searchParams?.affiliates}>
                            <AffiliatesModal
                              pathname={pathname}
                              searchParams={searchParams}
                            />
                          </Match>
                          <Match when={searchParams?.pvpid}>
                            <PvpModal
                              pathname={pathname}
                              searchParams={searchParams}
                            />
                          </Match>
                          <Match
                            when={1}
                          >
                            <NewProfile
                              pathname={pathname}
                              changeLang={handleOnChangeLang}
                              searchParams={searchParams}
                            />
                          </Match>
                          <Match
                            when={searchParams?.profile && searchParams?.benefits}
                          >
                            <LevelBenefitsModal
                              pathname={pathname}
                              searchParams={searchParams}
                            />
                          </Match>
                        </Switch>

                        <Switch fallback={<></>}>
                          <Match when={toggles.winningsModal}>
                            <WinningsModal
                              pathname={pathname}
                              searchParams={searchParams}
                            />
                          </Match>
                          <Match when={toggles.provablyFairModal}>
                            <ProvablyFairModal />
                          </Match>
                          <Match when={toggles.tosModal}>
                            <TosModal />
                          </Match>
                          <Match when={toggles.chatRulesModal}>
                            <ChatRulesModal />
                          </Match>
                          <Match
                            when={
                              toggles.tradeModal && userObject.trades?.length > 0
                            }
                          >
                            <TradeModal />
                          </Match>
                        </Switch>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="chat-content">
                  <Chat />
                </div>
              </div>
            </div>
          </Fallback>
        </div>
      </I18nProvider>
  );
};

export default App;
