const InfoToolTip = (props) => {
  return (
    <div
    class='relative font-SpaceGrotesk  flex gap-1 items-center justify-center rounded flex-col text-14 px-6 py-4 bottom-4 text-center
    text-shadow-lg shadow-sm shadow-black ' 
    style={{
      color: 'rgba(162, 165, 198, 1)', 
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), radial-gradient(50% 100% at 50% 0%, rgba(255, 180, 54, 0.12) 0%, rgba(255, 180, 54, 0) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), radial-gradient(100% 242.42% at 100% 50%, #1D2352 0%, #1D1F30 100%)'
    }}
  >
 {props.text}
 <div 
  class="absolute -bottom-[11px] text-10 text-[#242945] " 
  style={{
    display: 'inline-block',
    "-webkit-transform": 'scale(2,1)', /* Safari and Chrome */
    "-moz-transform": 'scale(2,1)', /* Firefox */
    "-ms-transform": 'scale(2,1)', /* IE 9 */
    "-o-transform": 'scale(2,1)', /* Opera */
    transform: 'scale(2,1)', /* W3C */
    'text-shadow': '20 20 50px black'
  }}
>
  ▼
</div>
</div>
  )
}

export default InfoToolTip;