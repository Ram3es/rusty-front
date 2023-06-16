import EmojiIcon from "../icons/EmojiIcon"

const ChatEmojisButton = (props) => {
    const handleClick = () => props.onClick()

    return (
        <button
            class={`w-9 h-9 flex items-center justify-center text-gray-9a hover:text-yellow-ffb border rounded ${
                props.isActive
                    ? 'button-emojis-secondary text-yellow-ffb border-yellow-ffb/30'
                    : 'button-emojis-primary border-white/5 '
            }`}
            onClick={handleClick}
        >
            <EmojiIcon />
        </button>
    )
}

export default ChatEmojisButton
