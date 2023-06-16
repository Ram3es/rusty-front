const ChatSendButton = (props) => {
    const handleClick = () => props.onClick()

    return (
        <button
            class='w-9 h-9 flex items-center justify-center border border-green-1b rounded text-white'
            style={{
                background:
                    'linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.008125) 93.75%, rgba(118, 124, 255, 0) 100% ), radial-gradient(172.5% 172.5% at 59.05% 18.75%, #0bbd52 0%, #1bdc80 100%)',
                'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)'
            }}
            onClick={handleClick}
        >
            <svg
                width='16'
                height='17'
                viewBox='0 0 16 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M15.1892 7.31566L1.99821 0.0949755C1.70439 -0.0644422 1.34179 -0.0206805 1.09485 0.207506C0.847907 0.435692 0.772887 0.795163 0.910424 1.10149L3.42047 6.74363C3.59552 7.13748 4.05814 7.31566 4.452 7.14061C4.84585 6.96556 5.02402 6.50294 4.84898 6.10908L3.27668 2.57689L13.1856 8.00021L3.22042 13.4548L4.84898 9.88509C5.01777 9.48811 4.83022 9.02861 4.43324 8.85982C4.03626 8.69102 3.57676 8.87857 3.40797 9.27556L0.904172 14.9146C0.772887 15.2209 0.854159 15.5772 1.09797 15.7992C1.24489 15.9336 1.43244 16.0024 1.62311 16.0024C1.75127 16.0024 1.87943 15.9711 1.99821 15.9055L15.1892 8.68477C15.4393 8.54724 15.5956 8.28467 15.5956 8.00021C15.5956 7.71576 15.4393 7.45319 15.1892 7.31566Z'
                    fill='currentColor'
                />
            </svg>
        </button>
    )
}

export default ChatSendButton
