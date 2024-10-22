import { createSignal } from "solid-js";


const Img = (props) => {

    let value = () => props?.src || 0;

    const [loaded, setLoaded] = createSignal(false);

    return (
    <>
        <div class={`center ${props?.style?.includes("absolute") ? "" : "relative"} ${props?.style}`}>
            <img alt="image" onLoadStart={() => setLoaded(false)} src={value()} class={`w-full h-full duration-500 ${props?.styleInner || ""} ${loaded() && value() ? "opacity-100" : "opacity-0"}`} onLoad={() => setLoaded(true)} />
            <div class={`absolute ${!loaded() ? "center" : "hidden"}`}>
                <svg class="animate-spin-fade text-purple-76" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-current" d="M19 38C16.4357 38 13.9457 37.499 11.6041 36.5082C9.34043 35.5508 7.31055 34.1777 5.56641 32.4336C3.82227 30.6895 2.44922 28.6596 1.4918 26.3959C0.500977 24.0543 0 21.5643 0 19C0 18.2615 0.597461 17.6641 1.33594 17.6641C2.07441 17.6641 2.67188 18.2615 2.67188 19C2.67188 21.2043 3.10234 23.3418 3.95586 25.3568C4.77969 27.3014 5.95605 29.0492 7.45527 30.5484C8.95449 32.0477 10.7023 33.2277 12.6469 34.0479C14.6582 34.8977 16.7957 35.3281 19 35.3281C21.2043 35.3281 23.3418 34.8977 25.3568 34.0441C27.3014 33.2203 29.0492 32.0439 30.5484 30.5447C32.0477 29.0455 33.2277 27.2977 34.0479 25.3531C34.8977 23.3418 35.3281 21.2043 35.3281 19C35.3281 16.7957 34.8977 14.6582 34.0441 12.6432C33.2231 10.7033 32.0348 8.94043 30.5447 7.45156C29.0575 5.95946 27.2942 4.77091 25.3531 3.95215C23.3418 3.10234 21.2043 2.67188 19 2.67188C18.2615 2.67188 17.6641 2.07441 17.6641 1.33594C17.6641 0.597461 18.2615 0 19 0C21.5643 0 24.0543 0.500977 26.3959 1.4918C28.6596 2.44922 30.6895 3.82227 32.4336 5.56641C34.1777 7.31055 35.5471 9.34414 36.5045 11.6041C37.4953 13.9457 37.9963 16.4357 37.9963 19C37.9963 21.5643 37.4953 24.0543 36.5045 26.3959C35.5508 28.6596 34.1777 30.6895 32.4336 32.4336C30.6895 34.1777 28.6559 35.5471 26.3959 36.5045C24.0543 37.499 21.5643 38 19 38Z"/>
                </svg>
            </div>
        </div>
    </>
    )
}


export default Img;