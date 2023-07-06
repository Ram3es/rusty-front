import Ranks from "../../utilities/Ranks";
import RankLabel from "../chat/RankLabel";

const UserBadge = (props) => {
  return (
    <div class="space-y-2 mt-1 w-fit">
      <div
        class="flex flex-row  center  gap-2 text-sm font-bold h-wit max-w-[214px] whitespace-nowrap pl-2 py-1 pr-3 rounded"
        style={{
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(100% 275.07% at 100% 0%, rgba(30, 34, 68, 0.56) 0%, rgba(15, 19, 53, 0.56) 100%)",
          "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Ranks
          width={5}
          staff={
            props.game().players[props.playerIndex + 1]?.avatar
              ? props.game().players[props.playerIndex + 1].rank || 0
              : 7
          }
          rank={
            props.game().players[props.playerIndex + 1].level?.league ||
            "bronze"
          }
        />
        <div class="hidden lg:block">
          <RankLabel
            staff={
              props.game().players[props.playerIndex + 1]?.avatar
                ? props.game().players[props.playerIndex + 1].rank || 0
                : 7
            }
            rank={
              props.game().players[props.playerIndex + 1].level?.league ||
              "bronze"
            }
          />
        </div>
        <span class="text-gray-9aa truncate max-w-[100px]">
          {props.game().players[props.playerIndex + 1].username || "Terry"}
        </span>
      </div>
    </div>
  );
};

export default UserBadge;
