import { createSignal, createRoot } from "solid-js";

function createCounter() {
  const [homePageLoaded, setHomePageLoaded] = createSignal(false);
  const [wheelPageLoaded, setWheelPageLoaded] = createSignal(false);
  const [minesPageLoaded, setMinesPageLoaded] = createSignal(false);
  const [plinkoPageLoaded, setPlinkoPageLoaded] = createSignal(false);
  const [jackpotPageLoaded, setJackpotPageLoaded] = createSignal(false);
  const [coinflipPageLoaded, setCoinflipPageLoaded] = createSignal(false);
  const [upgraderPageLoaded, setUpgraderPageLoaded] = createSignal(false);
  const [pvpminesPageLoaded, setPvpminesPageLoaded] = createSignal(false);
  const [rewardsPageLoaded, setRewardsPageLoaded] = createSignal(false);
  const [unboxPageLoaded, setUnboxPageLoaded] = createSignal(false);
  const [battlesPageLoaded, setBattlesPageLoaded] = createSignal(false);
  const [createBattlesPageLoaded, setCreateBattlesPageLoaded] = createSignal(false);

  const onHomePageLoad = () => setHomePageLoaded(true);
  const onWheelPageLoad = () => setWheelPageLoaded(true);
  const onMinesPageLoad = () => setMinesPageLoaded(true);
  const onPlinkoPageLoad = () => setPlinkoPageLoaded(true);
  const onJackpotPageLoad = () => setJackpotPageLoaded(true);
  const onCoinflipPageLoad = () => setCoinflipPageLoaded(true);
  const onUpgraderPageLoad = () => setUpgraderPageLoaded(true);
  const onPvpminesPageLoad = () => setPvpminesPageLoaded(true);
  const onRewardsPageLoaded = () => setRewardsPageLoaded(true);
  const onUnboxPageLoaded = () => setUnboxPageLoaded(true);
  const onBattlesPageLoaded = () => setBattlesPageLoaded(true);
  const onCreateBattlesPageLoaded = () => setCreateBattlesPageLoaded(true);

  return {
    homePageLoaded,
    onHomePageLoad,
    wheelPageLoaded,
    onWheelPageLoad,
    minesPageLoaded,
    onMinesPageLoad,
    plinkoPageLoaded,
    onPlinkoPageLoad,
    jackpotPageLoaded,
    pvpminesPageLoaded,
    onJackpotPageLoad,
    coinflipPageLoaded,
    onCoinflipPageLoad,
    upgraderPageLoaded,
    onUpgraderPageLoad,
    onPvpminesPageLoad,
    onRewardsPageLoaded,
    rewardsPageLoaded,
    unboxPageLoaded,
    onUnboxPageLoaded,
    battlesPageLoaded,
    onBattlesPageLoaded,
    createBattlesPageLoaded,
    onCreateBattlesPageLoaded
  };
}

export default createRoot(createCounter);