const BattleRoyaleIcon = (props) => {
  return (
    <svg
      class={props.additionClasses}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        filter: `${props.glowColor && `drop-shadow(0px 0px 8px rgba(${props.glowColor}, 0.8))`}`
      }}
    >
      <path
        d='M0 14.554L1.84099 12.713L3.28517 14.1572L1.44418 15.9982L0 14.554Z'
        fill='currentColor'
      />
      <path
        d='M12.9597 9.46424L12.2375 10.1864L10.9995 8.94843L8.74854 11.0306L10.0709 12.353L9.34871 13.0752L10.7931 14.5196L14.4041 10.9086L12.9597 9.46424Z'
        fill='currentColor'
      />
      <path
        d='M12.5958 14.1583L14.0399 12.7141L15.8809 14.5551L14.4368 15.9993L12.5958 14.1583Z'
        fill='currentColor'
      />
      <path
        d='M7.22067 5.16957L2.05107 0L1.59525 4.51284L4.99469 7.39555L7.22067 5.16957Z'
        fill='currentColor'
      />
      <path
        d='M14.2889 4.5144L13.8331 0.00152588L3.64824 10.1864L2.92601 9.46418L1.48163 10.9086L5.09263 14.5196L6.53701 13.0752L5.81482 12.353L14.2889 4.5144Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default BattleRoyaleIcon
