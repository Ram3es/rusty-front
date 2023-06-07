import RustyOriginals from './RustyOriginals'
import FreeRewards from './FreeRewards'
import RewardsTable from './RewardsTable'
import ribbed from './v1.png'







const BannerSection = () => {

    return (
      <div class='flex flex-col gap-14 '>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
            <div class='col-span-2 '>
                <div class='grid  grid-cols-[1fr_1fr]  sm:grid-cols-[1.5fr_1fr_1fr] '>
                  <div class={`h-[200px] col-span-2 sm:col-span-1 bg-[url('${ribbed}')]`}>
                    fefe
                  </div>
                  <div 
                    class='relative'
                    style={{ background: "radial-gradient(34.25% 34.25% at 50% 44.5%, rgba(0, 0, 0, 0.24) 58.03%, rgba(0, 0, 0, 0) 100%), radial-gradient(65.5% 65.5% at 50% 0%, rgba(255, 180, 54, 0.16) 0%, rgba(255, 180, 54, 0) 100%)"}}
                  >
                    <img src={ribbed} class='w-full h-full absolute inset-0' />
                    </div>
                  <div 
                    class='relative'
                    style={{background: "radial-gradient(34.25% 34.25% at 50% 44.5%, rgba(0, 0, 0, 0.24) 58.03%, rgba(0, 0, 0, 0) 100%), radial-gradient(65.5% 65.5% at 50% 0%, rgba(39, 242, 120, 0.16) 0%, rgba(39, 242, 120, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), rgba(255, 255, 255, 0.02)"}}
                    >
                    <img src={ribbed} class='w-full h-full absolute inset-0' /></div>
                </div>
            </div>
            <div class='col-span-2 sm:col-span-1'>ecwe</div>
        </div>
        <RustyOriginals />
        <FreeRewards />
        <RewardsTable />
      </div>
    )

}
export default BannerSection