import {createEffect, createSignal} from "solid-js";

import {
  currentGameId,
  currentGameRoll,
  isGameStarted
} from "../../../views/upgrader/Upgrader.jsx";

const GameInfo = () => {
  const [ticketMemory, setTicketMemory] = createSignal(null);
  createEffect(() => {
    if (!isGameStarted()) {
      setTicketMemory(currentGameRoll());
    }
  })
  return (
    <div class="flex flex-col text-11 items-center">
      <div class="text-[#FFB436]">Ticket: {ticketMemory()}</div>
      <div class="text-[#9A9EC8]">Hash: {currentGameId()}</div>
    </div>
  );
};

export default GameInfo;
