import Splash from "./Splash";
import Coin from "../../utilities/Coin";
import ItemSpinnerBg from "../../components/ItemSpinnerBg";

const Item = ({ drop, _case }) => {
    return (
        <>
        <div
            class="w-60 min-w-[15rem] h-full rounded-2 relative animate-fade-in-translation"
            style={{
            background:
                drop?.price > 1000 * 100
                ? "linear-gradient(90deg, #FFC701 -15%, #6C4224 40.04%, #202337 85.79%, #202337 95.09%)"
                : drop?.price > 1000 * 30
                ? "linear-gradient(90deg, #AA3737 0%, #202337 100%)"
                : drop?.price > 1000 * 10
                ? "linear-gradient(101.68deg, #6645AF 0%, #202337 50%, #202337 100%)"
                : drop?.price > 1000 * 2
                ? "linear-gradient(101.68deg, #439EF2 -44.03%, #22345E 33.77%, #202337 65.17%, #202337 123.09%)"
                : "linear-gradient(101.68deg, #BBCBF0 -20%, #232B3E 40%, #202337 70.5%, #202337 123.09%)",
            }}
        >
            <div
            class={`w-full h-full rounded-2 relative flex items-center gap-4 pl-4`}
            style={{
                background:
                drop?.price > 1000 * 100
                    ? "linear-gradient(101.68deg, #FFC701 -31.81%, #6C4224 18.04%, #202337 61.79%, #202337 123.09%)"
                    : drop?.price > 1000 * 30
                    ? "linear-gradient(101.68deg, #C22121 -23.06%, #753737 39.25%, #202337 85.66%, #202337 123.09%)"
                    : drop?.price > 1000 * 10
                    ? "linear-gradient(101.68deg, #823CC0 -44.03%, #322342 37.66%, #202337 76.36%, #202337 120.86%)"
                    : drop?.price > 1000 * 2
                    ? "linear-gradient(101.68deg, #439EF2 -44.03%, #22345E 33.77%, #202337 65.17%, #202337 123.09%)"
                    : "linear-gradient(101.68deg, #BBCBF0 -44.03%, #232B3E 28.22%, #202337 70.5%, #202337 123.09%)",
            }}
            >
                <div class="absolute left-0 bottom-0">
                    <Splash />
                </div>
                <div class="w-10 h-10 relative center">
                <img alt="item-image" src={_case()?.items?.filter((val) => val.name == drop?.item)?.[0]?.image} class="w-full h-full relative z-10" />
                <div class={`absolute w-24 h-24 -top-3 -left-7`}>
                    <ItemSpinnerBg
                    color={
                        drop?.price > 1000 * 100
                        ? "gold"
                        : drop?.price > 1000 * 30
                        ? "red"
                        : drop?.price > 1000 * 10
                        ? "purple"
                        : drop?.price > 1000 * 2
                        ? "blue"
                        : "gray"
                    }
                    />
                </div>
                </div>
                <div class="flex flex-col items-center max-w-full overflow-hidden gap-1">
                    <p class="text-16 text-gray-8c font-semibold truncate max-w-full"> {drop?.item} </p>
                    <div class="center gap-1.5">
                        <Coin />
                        <p class="text-14 text-white font-medium"> {Number(drop?.price).toLocaleString()} </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
  };
  
  export default Item;
  