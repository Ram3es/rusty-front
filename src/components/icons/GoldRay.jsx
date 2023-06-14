const GoldRay = (props) => {
    return (
        <svg class={props.additionalClasses ?? ''} width="76" height="4" viewBox="0 0 76 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.842102 0.842102L76 2.18421L0.842102 3.52631V0.842102Z" fill={`url(#${props.id ?? 'paint0_linear_11_105' })`}/>
            <defs>
                <linearGradient id={props.id ?? "paint0_linear_11_105"} x1="0.842103" y1="2.18421" x2="76" y2="2.18423" gradientUnits="userSpaceOnUse">
                <stop stop-color={props.color ?? "#FFC467"}/>
                <stop offset="1" stop-color={props.color ?? "#FFC467"} stop-opacity="0"/>
                </linearGradient>
            </defs>
        </svg>
    )
}
export default GoldRay
