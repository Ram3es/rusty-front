const DotIcon = () => {
    return (
        <svg
            width='17'
            height='17'
            viewBox='0 0 17 17'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <g filter='url(#filter0_d_455_4185)'>
                <circle cx='8.5' cy='8.5' r='2.5' fill='#FFB436' />
            </g>
            <defs>
                <filter
                    id='filter0_d_455_4185'
                    x='0'
                    y='0'
                    width='17'
                    height='17'
                    filterUnits='userSpaceOnUse'
                    color-interpolation-filters='sRGB'
                >
                    <feFlood flood-opacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                        result='hardAlpha'
                    />
                    <feMorphology
                        radius='1'
                        operator='dilate'
                        in='SourceAlpha'
                        result='effect1_dropShadow_455_4185'
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation='2.5' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                        type='matrix'
                        values='0 0 0 0 1 0 0 0 0 0.705882 0 0 0 0 0.211765 0 0 0 0.72 0'
                    />
                    <feBlend
                        mode='normal'
                        in2='BackgroundImageFix'
                        result='effect1_dropShadow_455_4185'
                    />
                    <feBlend
                        mode='normal'
                        in='SourceGraphic'
                        in2='effect1_dropShadow_455_4185'
                        result='shape'
                    />
                </filter>
            </defs>
        </svg>
    )
}

export default DotIcon
