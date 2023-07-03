import Fallback from "../Fallback";
import RustyOriginals from "../../components/new-home/RustyOriginals";
import FreeRewards from "../../components/new-home/FreeRewards";
import RewardsTable from "../../components/new-home/RewardsTable";
import BannerSection from "../../components/new-home/BannerSection";

const Home = () => {
  return (
    <Fallback loaded={() => true}>
      {/* <img alt="background" src={Bg} class="absolute left-0 top-0 min-w-full md:min-h-full" /> */}
      <div class="w-full h-full pt-8 flex flex-col gap-4 relative min-h-screen">
        <div class="flex flex-col gap-14 ">
          <BannerSection />
          <RustyOriginals />
          <FreeRewards />
          <RewardsTable />
        </div>
      </div>
    </Fallback>
  );
};

export default Home;
