import { Show, createMemo } from "solid-js";
import Coin from "../utilities/Coin"
import { formatNumber } from '../utilities/Numbers'

export const AmountWithCoin = (props) => {
    const formatedNumber = createMemo(() => formatNumber(props.amount) )
    return (
        <div class ='flex items-center gap-2 text-shadow-base'>
            <Show when={!props.hideCoin}>
                <Coin width={props.widthCoin} color={props.colorCoin} />
            </Show>
            <span
                class={`
                    ${props.fontSize ? `text-[${props.fontSize}px]`: 'text-[14.3719px]'} 
                    ${props.gradient ?? ' gold-text' } font-SpaceGrotesk`}
                style={{
                    'font-size': `${props.fontSize ? props.fontSize : '14.3719'}px`,
                    'font-weight': `${props.notBold ? 'normal' : 'bold'}`
            }}
            >
                {formatedNumber().length === 1 
                    ? props.amount
                    : 
                        <>
                            {formatedNumber().slice(0, -2)}
                            <span style={{ "font-size":` ${(props.fontSize / 1.2).toString()}px` }}>
                                {formatedNumber().slice(-2)}
                            </span>
                        </>
                }
                
            </span>
        </div>
      );
    };

    export default AmountWithCoin
