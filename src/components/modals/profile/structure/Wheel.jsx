import Coin from "../../../../utilities/Coin";


const WheelStructure = (props) => {

    const splitted = props?.val?.timestamp?.split("T")?.[0].split("-");
    const date = `${splitted[1]}/${splitted[2]}/${splitted[0]} ${props?.val?.timestamp?.split("T")?.[1]?.split(".")?.[0]}`

    return (
        <>
            <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto">#{props?.val?.pf_id} </p>
            <div class="flex items-center gap-2">
                <Coin />
                <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto"> {Number(props?.val?.bet_value).toLocaleString()} </p>
            </div>
            <div class={`flex items-center gap-2`}>
                <Coin />
                <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto">
                    {Number(props?.val?.winnings).toLocaleString()}
                </p>
            </div>
            <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto"> {((props?.val?.winnings / props?.val?.bet_value) || 0).toFixed(2)}x </p>
           
            <div class={`flex items-center gap-2 ${props?.val?.winnings <= 0 ? "text-gray-8c" : "text-green"}`}>
                <p class="text-current text-14 font-medium font-Oswald uppercase">{props?.val?.winnings > 0 ? "win" : "loss"}</p>
            </div>
            <div class="w-full flex items-center">
                <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto truncate"> {date} </p>
            </div>
        </>
    );
  };
  
  export default WheelStructure;
  