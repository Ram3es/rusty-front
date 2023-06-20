import {
  currentGameId,
  currentGameRoll,
} from "../../../views/upgrader/Upgrader.jsx";

const GameInfo = () => {
  return (
    <div class="flex flex-col text-11 items-center">
      <div class="text-[#FFB436]">Ticket: {currentGameRoll()}</div>
      <div class="text-[#9A9EC8]">Hash: {currentGameId()}</div>
    </div>
  );
};

export default GameInfo;
