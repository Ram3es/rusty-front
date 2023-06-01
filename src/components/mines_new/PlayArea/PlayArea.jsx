import RemainingMines from './RemainingMines'
import MineField from './MineField/MineField'
import WinningsAdditions from './WinningsAdditions/WinningsAdditions'

import { hasLost, isPlaying } from '../TilesContainer'

const PlayArea = () => {
  return (
    <div
      class='flex w-full h-full md:pr-52 justify-center gap-24 scale-[60%] md:scale-[80%] xll:scale-100'
      style={{
        background: `${
          isPlaying() && !hasLost()
            ? 'radial-gradient(100% 200% at 50% 0%, rgba(74, 147, 255, 0.05) 0%, rgba(74, 147, 255, 0.025) 20%, rgba(74, 147, 255, 0) 50%)'
            : hasLost() &&
              'radial-gradient(100% 200% at 50% 0%, rgba(214, 51, 51, 0.1) 0%, rgba(214, 51, 51, 0.05) 20%, rgba(214, 51, 51, 0) 50%)'
        }`
      }}
    >
      <div class='flex flex-col items-center xll:gap-5'>
        <RemainingMines />
        <MineField />
      </div>
      <WinningsAdditions />
    </div>
  )
}

export default PlayArea
