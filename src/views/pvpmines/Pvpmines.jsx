import { onMount, createEffect, createSignal, For } from "solid-js";
import Bg from "../../assets/img/pvpmines/pvpmines_bg.png";
import injector from "../../injector/injector";
import { createStore } from "solid-js/store";
import Games from "./Games";
import { useI18n } from "../../i18n/context";
import { playOptionClickSound } from "../../utilities/Sounds/SoundButtonClick";
import Fallback from "../Fallback";
import PageLoadState from "../../libraries/PageLoadState";
import PVPMineMode from '../../components/pvp-mines/PvpMineMode'
import PvpMinesLobbyCard from "../../components/pvp-mines/PvpMinesLobbyCard"


const buttonName = {
  clear: {
    en: "clear",
    es: "claro",
    ru: "очистить",
  },
};


const Pvpmines = (props) => {
  const i18n = useI18n();
  const { socket, toastr, userObject } = injector;

  const { pvpminesPageLoaded, onPvpminesPageLoad } = PageLoadState;

  const [games, setGames] = createStore({});

  
  const [modeToCreate, setModeToCreate] = createSignal({
    players:2,
    mode: 'royale',
    bet: 100
  })

  createEffect(() => {
    if (props.loaded()) {
      socket.emit("pvpmines:connect", {}, (data) => {
        for (const id in data.data.games) {
          setGames(id, data.data.games[id]);
        }
        for (const id in data.data.history) {
          setGames(id, data.data.history[id]);
        }
        console.log(games);
        onPvpminesPageLoad(true);
      });
    }
  })
  onMount(() => {
    
    socket.on("pvpmines:update", (data) => {
      setGames(data.gameId, data.data);
    });
  });

  const checkBetLimit = (bet) => {
    if (bet < Number(userObject.user.balance)) {
      return bet
    } 
    return userObject.user.balance
  };

  const create = () => {
    socket.emit(
      "pvpmines:create",
      {
        bet:  modeToCreate().bet,
        players: modeToCreate().players,
        mode: modeToCreate().mode,
      },
      (data) => {
        if (data.msg) {
          toastr(data);
        }
      }
    );
  };

  const join = (gameId) => {
    socket.emit("pvpmines:join", { gameId }, (data) => {
      if (data.msg) {
        toastr(data);
      }
    });
  };

  

  return (
    <Fallback loaded={pvpminesPageLoaded}>
      <img alt="background" src={Bg} class="absolute left-0 top-0 min-w-full md:min-h-full" />
      <div class="w-full h-full flex flex-col gap-10 overflow-y-scroll relative pt-10 min-h-screen">
       <PVPMineMode 
         modeToCreate={modeToCreate()}
         setModeToCreate={setModeToCreate}
         submitFunction={create} 
        />
        <div class='flex flex-col gap-3'>
          <div class=' flex gap-1 text-gradient-green-secondary w-max font-SpaceGrotesk font-bold text-xl '>
              {Object.values(games).filter(game => game.status !== 'ended').length}
              <h3>Active Lobbies</h3>
          </div>
          <div class=" flex flex-wrap gap-5">  
            <For each={Object.keys(games)}>
              {(id) => (
                <>
                {games[id].status !== 'ended' && 
                <PvpMinesLobbyCard 
                  joinToGame={() => join(id)} 
                  status={games[id].status}
                  minesQty={games[id].mines}
                  playersRequired={ games[id].playersAmount}
                  players={games[id].players}
                  game={ games[id]}
                  gameId={id}
                  />}
                  
                  </>
                )}
            </For>
          </div>
        </div>
        <div class='flex flex-col gap-3'>
          <div class=' flex gap-1 text-gradient-gray w-max font-SpaceGrotesk font-bold text-xl '>
              <h3>Past Rounds</h3>
          </div>
          <div class="flex flex-wrap justify-center sm:justify-start gap-5">
            <For each={Object.keys(games).reverse()}>
              {(id) => (
                <>
                {games[id].status === 'ended' && 
                 <PvpMinesLobbyCard 
                   status={games[id].status}
                   minesQty={games[id].minesCleared.length}
                   playersRequired={games[id].playersAmount}
                   players={games[id].players}
                   game={games[id]}
                   gameId={id} 
                    />}
                  
                  </>
                )}
            </For>
            </div>
        </div>
      </div>
      <div
        class="sticky bottom-0 left-0 w-full h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(18, 19, 41, 0) 0%, #121329 100%)",
        }}
       />
    </Fallback>
  );
};

export default Pvpmines;
