import RedCoin from "../../assets/img/coinflip/redcoin.svg";
import BlackCoin from "../../assets/img/coinflip/blackcoin.svg";
import Logo from "../../assets/smallLogo.svg";

const CoinflipUsersRow = (props) => {
  return (
    <div class={`${props.mobile ? 'col-span-3 row-start-1 h-full flex lg:hidden items-center gap-3' : 'lg:rounded-l-6 h-full flex items-center lg:border-r border-[#282b57] gap-5 px-6 lg:coinflip-list--background__secondary'} `}>
      <div
        class={`relative border rounded-full w-12 h-12 p-[5px] ${
          props.game?.creator?.side === 1 ? "border-yellow-ffb" : "border-white"
        } ${
          props.game?.winner?.side &&
          props.game?.creator?.side !== props.game?.winner?.side &&
          "opacity-25"
        }`}
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), radial-gradient(80.66% 584.01% at 39.62% 51.7%, rgba(31, 35, 68, 0.56) 0%, rgba(35, 37, 61, 0.56) 100%)",
          "box-shadow": `${
            props.game?.winner?.side &&
            props.game?.creator?.side === props.game?.winner?.side &&
            `0px 0px 36px ${
              props.game?.creator?.side === 1
                ? "rgba(235, 172, 50, 0.48)"
                : "rgba(255, 255, 255, 0.48)"
            }`
          } `,
        }}
      >
        <img
          alt="avatar"
          class="w-full h-full rounded-full"
          src={props.game?.creator?.avatar}
        />
        <img
          alt="coin"
          class="w-6 h-6 absolute right-0 top-7"
          src={props.game?.creator?.side === 2 ? BlackCoin : RedCoin}
        />
      </div>
      <div
        class={`relative border rounded-full w-12 h-12 p-[5px] ${
          props.game?.opponent?.avatar || props.game?.opponent?.bot
            ? props.game?.creator?.side === 1
              ? "border-white"
              : "border-yellow-ffb"
            : "border-gray-9a/40"
        } ${
          props.game?.winner?.side &&
          props.game?.opponent?.side !== props.game?.winner?.side &&
          "opacity-25"
        }`}
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), radial-gradient(80.66% 584.01% at 39.62% 51.7%, rgba(31, 35, 68, 0.56) 0%, rgba(35, 37, 61, 0.56) 100%)",
          "box-shadow": `${
            props.game?.winner?.side &&
            props.game?.opponent?.side === props.game?.winner?.side &&
            `0px 0px 36px ${
              props.game?.creator?.side === 1
                ? "rgba(255, 255, 255, 0.48)"
                : "rgba(235, 172, 50, 0.48)"
            }`
          } `,
        }}
      >
        {props.game?.opponent.avatar || props.game?.opponent.bot ? (
          <>
            <img
              alt="avatar"
              class="w-full h-full rounded-full"
              src={props.game?.opponent?.avatar || Logo}
            />
            <img
              alt="coin"
              class="w-6 h-6 absolute right-0 top-7"
              src={props.game?.creator?.side === 1 ? BlackCoin : RedCoin}
            />
          </>
        ) : (
          <img
            alt="avatar"
            class="w-full h-full rounded-full"
            src={props.game?.creator?.side === 1 ? BlackCoin : RedCoin}
          />
        )}
      </div>
    </div>
  );
};

export default CoinflipUsersRow;
