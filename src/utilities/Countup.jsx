import { createEffect, onMount} from "solid-js";
import { CountUp } from 'countup.js';

const Countup = ( props ) => {

    let value = () => props?.props || 0;
    let index;

    onMount( () => {
        const counter = new CountUp(index, value());

        if (!counter.error) {
            counter.start();
        } else {
            console.error(counter.error);
        }

        createEffect(() => {
            counter.update(value());
        });
        
    })

    return (
        <div ref={index} />
    )

}

export default Countup