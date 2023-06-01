import Coin from "../../../../utilities/Coin";


const MinesStructure = (props) => {
    const splitted = props?.val?.timestamp?.split("T")?.[0].split("-");

    const date = `${splitted[1]}/${splitted[2]}/${splitted[0]} ${props?.val?.timestamp?.split("T")?.[1]?.split(".")?.[0]}`

    return (
        <>
            <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto"> #{props?.val?.pf_id} </p>
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
            <div class="flex items-center gap-2">
                <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12.1345" cy="13.0003" r="5.57154" stroke="#3B436B"/>
                    <ellipse cx="12.1346" cy="12.929" rx="2.1429" ry="2.07147" stroke="#4D5B97"/>
                    <path d="M12.0974 1.82003L12.0974 1.82003L13.112 5.37108L11.0828 5.37108L12.0974 1.82003Z" stroke="#4D5B97"/>
                    <path d="M12.0974 24.18L12.0974 24.18L11.0829 20.6289L13.112 20.6289L12.0974 24.18Z" stroke="#4D5B97"/>
                    <path d="M2.41493 7.40998L2.41493 7.40998L5.99751 8.30686L4.98293 10.0642L2.41493 7.40998Z" stroke="#4D5B97"/>
                    <path d="M21.7794 18.59L21.7794 18.59L18.1968 17.6931L19.2114 15.9358L21.7794 18.59Z" stroke="#4D5B97"/>
                    <path d="M21.7796 7.40932L21.7796 7.40932L19.2116 10.0635L18.197 8.30617L21.7796 7.40932Z" stroke="#4D5B97"/>
                    <path d="M2.41519 18.5893L2.41519 18.5893L4.98321 15.9352L5.99779 17.6925L2.41519 18.5893Z" stroke="#4D5B97"/>
                </svg>
                <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto">{props?.val?.info}</p>
            </div>
            <div class={`flex items-center gap-2 ${props?.val?.winnings <= 0 ? "text-gray-8c" : "text-green"}`}>
                <p class="text-current text-14 font-medium font-Oswald uppercase">{props?.val?.winnings > 0 ? "win" : "loss"}</p>
                {
                    props?.val?.winnings > 0 ? (
                        <>
                            <p class="text-gray-8c text-14 font-medium font-Oswald">{props?.val?.extra_data}</p>
                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.8509 5.99036L15.8509 5.99042C16.0606 6.02425 16.285 6.09332 16.4653 6.24183C16.6672 6.40817 16.7727 6.641 16.7727 6.89714C16.7727 7.22614 16.5838 7.491 16.3936 7.68148L16.3895 7.68567L16.3894 7.68565L13.3271 10.6808L14.0527 14.9118L14.0539 14.9188L14.0549 14.9258C14.0659 15.0029 14.0689 15.0904 14.0689 15.176C14.0689 15.3877 14.0148 15.601 13.8809 15.7869L13.8808 15.7869C13.7121 16.0212 13.4605 16.125 13.2019 16.125C12.9844 16.125 12.7827 16.057 12.6037 15.956L8.82382 13.9633L5.04039 15.958C4.86332 16.0544 4.66192 16.125 4.44589 16.125C4.19168 16.125 3.93217 16.0284 3.7584 15.7872C3.75831 15.7871 3.75822 15.787 3.75813 15.7869L4.16392 15.4947C4.10126 15.4079 4.06997 15.3017 4.06997 15.176C4.06997 15.1402 4.07589 15.0802 4.08784 14.9963L15.8509 5.99036ZM15.8509 5.99036L15.8434 5.98927L11.6092 5.37183L9.71363 1.52717C9.56475 1.20824 9.28632 0.875 8.82391 0.875C8.3614 0.875 8.08311 1.20844 7.93425 1.52712L6.03853 5.37183L1.80416 5.98927L1.80415 5.98921L1.79662 5.99043C1.58697 6.02427 1.36263 6.09336 1.18239 6.24186C0.980559 6.40816 0.875 6.64095 0.875 6.89714C0.875 7.21422 1.0555 7.47676 1.23152 7.66739L1.24039 7.677L1.24975 7.68613L4.32057 10.6813L15.8509 5.99036Z" stroke="#475A76"/>
                            </svg>
                        </>
                    ) : ""
                }
            </div>
            <div class="w-full flex items-center">
                <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto truncate"> {date} </p>
            </div>
        </>
    );
  };
  
  export default MinesStructure;
  