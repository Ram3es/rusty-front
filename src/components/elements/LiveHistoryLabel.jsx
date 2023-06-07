const LiveHistoryLabel = (props) => {
  return (
    <div class='relative z-10 w-[100px] flex items-center justify-center gap-1.5 py-[3px] px-1.5 label_background-gradient__red rounded border border-transparent'>
      <span class='flex h-1 w-1 relative text-red-ff5'>
        <span
          class='animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75 transform'
          style={{
            'box-shadow': '0px 0px 5px 1px rgba(255, 88, 88, 0.72)'
          }}
        />
        <span class='relative inline-flex rounded-full h-1 w-1 bg-current' />
      </span>
      <p class='uppercase text-red-ff6 text-12 font-Quicksand font-bold'>{props.children}</p>
    </div>
  )
}

export default LiveHistoryLabel
