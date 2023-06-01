import Coin from "../../utilities/Coin";

const ItemInfo = (props) => {

    return (
        <>
            <div class={`${props.wrapperCalsses} absolute z-40 transform -translate-x-1/2 -translate-y-2 py-3 px-5 bg-dark-17 border border-gray-30 shadow-md flex flex-row-reverse gap-3 items-center w-max text-center rounded-2`}
                style={{
                    left: props.positionX,
                    bottom: props.positionY,
                }}
            >
                <span class="text-gray-8c text-16">{props.name}</span>
                <div class="flex flex-row gap-2">
                    <Coin /> 
                    <p class="text-14 text-white font-medium font-Oswald">{Number(props.price).toLocaleString()}</p>
                </div>
            </div>
            <svg class="group-hover:block hidden absolute left-1/2 bottom-full transform -translate-x-1/2" width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.95305 0.5H20.0469C21.2765 0.5 21.9838 1.89801 21.2554 2.88859L12.7085 14.5124C12.1091 15.3277 10.8909 15.3277 10.2915 14.5124L1.74458 2.88859C1.01622 1.89802 1.72352 0.5 2.95305 0.5Z" fill="#171B27" stroke="#272A3B"/>
            </svg>
        </>
    )
}

export default ItemInfo;