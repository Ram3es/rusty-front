import Coin from "../../../utilities/Coin";

const History = (props) => {
  return (
    <>
      <div class="flex items-center gap-2">
        <p class="text-14 text-gray-8c font-medium font-Oswald uppercase">
          {props.val.mode}
        </p>
      </div>
      <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto">
        pf #{props.val.pf_id}
      </p>
      <div class="flex items-center gap-2">
        <Coin />
        <p class="text-14 text-white font-medium font-Oswald uppercase my-auto">
          {Number(props.val?.bet_value).toLocaleString()}
        </p>
      </div>
      <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto">
        {props.val?.info}
      </p>
      <div
        class={`flex items-center gap-2 ${
          props.val.winnings <= 0 ? "text-red" : "text-green"
        }`}
      >
        <Coin color="current" />
        <p class="text-14 text-current font-medium font-Oswald uppercase my-auto">
          {Number(props.val?.winnings).toLocaleString()}
        </p>
      </div>
      <div class="w-full flex items-center justify-end">
        <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto truncate">
          {props.val?.timestamp}
        </p>
      </div>
    </>
  );
};

export default History;
