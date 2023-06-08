import RustyOriginals from './RustyOriginals'
import FreeRewards from './FreeRewards'
import RewardsTable from './RewardsTable'
import BannerSection from './BannerSection'


const NewHome = () => {
    return (
      <div class='flex flex-col gap-14 '>
        <BannerSection />
        <RustyOriginals />
        <FreeRewards />
        <RewardsTable />
      </div>
    )

}
export default NewHome