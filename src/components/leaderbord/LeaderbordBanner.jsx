// import BannerImg from './img/banner.png'
import BannerImg from './img/banner-img.png'
import Mask from './img/banner1.png'

const LeaderbordBanner = () => {
    return (
        <div class="w-full overflow-hidden rounded-8 relative">
            <img src={BannerImg} alt='banner' class=" w-full h-full" />
            <img src={Mask} alt='banner' class="absolute top-0 left-0 w-full h-full" />
        </div>
    )
}

export default LeaderbordBanner