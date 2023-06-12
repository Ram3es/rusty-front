const RankLabel = (props) => {
    const rank = () => props.rank
    const staff = () => props.staff

    // As of this writing, there is not yet a tailwind solution for setting text-shadow. So the usual hex color is used here.
    const rankLabelConfig = {
        default: {
            textStyle: 'text-bronze-a1',
            boxShadowColor: '#A1745C'
        },
        bronze: {
            textStyle: 'text-bronze-e1',
            boxShadowColor: '#A1745C'
        },
        silver: {
            textStyle: 'text-silver-d9',
            boxShadowColor: '#D9DEE2'
        },
        gold1: {
            textStyle: 'text-gold-ffc',
            boxShadowColor: 'rgba(255, 196, 103, 0.48)'
        },
        gold2: {
            textStyle: 'text-gold-ffc',
            boxShadowColor: 'rgba(255, 196, 103, 0.48)'
        },
        gold3: {
            textStyle: 'text-gold-ffc',
            boxShadowColor: 'rgba(255, 196, 103, 0.48)'
        },
        platinum1: {
            textStyle: 'text-platinum-c8',
            boxShadowColor: '#C8E6F0'
        },
        platinum2: {
            textStyle: 'text-platinum-c8',
            boxShadowColor: '#C8E6F0'
        },
        platinum3: {
            textStyle: 'text-platinum-c8',
            boxShadowColor: '#C8E6F0'
        },
        diamond: {
            textStyle: 'text-diamond-ca',
            boxShadowColor: '#ca83f5'
        },
        staff: {
            textStyle: 'text-blue-2e',
            boxShadowColor: 'rgba(78, 188, 255, 0.48)'
        }
    }

    const getCurrentLabelStyleByRank = (rank) => {
        if (typeof rank !== 'string') rank = 'default'
        const config = rankLabelConfig[rank.toLowerCase()] || rankLabelConfig.default
        return {
            textStyle: config.textStyle,
            boxShadowColor: config.boxShadowColor
        }
    }

    const convertLastDigitToRoman = (input) => {
        if (!input || input.length === 0) {
            return ''
        }

        const lastChar = input[input.length - 1]
        const lastDigit = parseInt(lastChar, 10)

        if (isNaN(lastDigit)) {
            return input
        }

        const romanMapping = {
            1: 'I',
            2: 'II',
            3: 'III'
        }

        const romanEquivalent = romanMapping[lastDigit]
        if (romanEquivalent) {
            return input.slice(0, -1) + ` ${romanEquivalent}`
        } else {
            return input
        }
    }

    return (
        <span
            class={`uppercase ${
                getCurrentLabelStyleByRank(!staff() || staff() < 3 ? rank() : 'Staff').textStyle
            }`}
            style={{
                'text-shadow': !props.withOutShadow ? `0px 0px 12px ${
                    getCurrentLabelStyleByRank(!staff() || staff() < 3 ? rank() : 'Staff')
                        .boxShadowColor
                }` : ''
            }}
        >
            {!staff() || staff() < 3 ? convertLastDigitToRoman(rank()) : 'Staff'}
        </span>
    )
}

export default RankLabel
