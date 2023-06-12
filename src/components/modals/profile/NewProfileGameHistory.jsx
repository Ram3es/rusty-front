import { For, createSignal } from 'solid-js'
import BattleIcon from '../../icons/BattleIcon'
import CoinflipIcon from '../../icons/CoinflipIcon'
import UpgraderIcon from '../../icons/UpgraderIcon'
import WheelIcon from '../../icons/WheelIcon'
import MinesIcon from '../../icons/MinesIcon'
import PlinkoIcon from '../../icons/PlinkoIcon'
import CaseOpeningIcon from '../../icons/CaseOpeningIcon'
import PVPMinesIcon from '../../icons/PVPMinesIcon'
import { useI18n } from '../../../i18n/context'
import ModeMark from '../../header/ModeMark'

const navigationGameModes = [
  {
    name: { en: 'Case Battles', es: 'case battles', ru: 'case battles' },
    svg: <BattleIcon />
  },
  {
    name: { en: 'Coinflip', es: 'coinflip', ru: 'Коинфлип' },
    svg: <CoinflipIcon />
  },
  {
    name: { en: 'Upgrader', es: 'upgrader', ru: 'Апгрейдер' },
    svg: <UpgraderIcon />
  },
  {
    name: { en: 'Wheel', es: 'rueda', ru: 'колесо' },
    svg: <WheelIcon />
  },
  {
    name: { en: 'Mines', es: 'Minas', ru: 'Бомбы' },
    svg: <MinesIcon />
  },
  {
    name: { en: 'Plinko', es: 'Plinko', ru: 'Плинко' },
    svg: <PlinkoIcon />
  },
  {
    name: { en: 'Cases', es: 'cases', ru: 'cases' },
    svg: <CaseOpeningIcon />
  },
  {
    name: { en: 'PVP Mines', es: 'Minas PVP', ru: 'PVP Бомбы' },
    svg: <PVPMinesIcon />
  }
]

const NewProfileGameHistory = () => {
  const i18n = useI18n()

  const [currentTab, setCurrentTab] = createSignal(navigationGameModes[0].name.en)

  return (
    <>
      <div class='flex gap-2 items-center capitalize flex-wrap pt-6'>
        <For each={navigationGameModes}>
          {(mode) => (
            <div
              href={`${mode.url}`}
              class='relative'
              onClick={() => {
                setCurrentTab(mode.name)
              }}
            >
              <div
                class={`h-[42px] relative transition-colors rounded-4 transition-shadows duration-200 pb-0 cursor-pointer group`}
                classList={{
                  'profile-game--item__yellow': currentTab() === mode.name,
                  'profile-game--item': currentTab() !== mode.name
                }}
              >
                <div class='px-3 py-2.5 flex gap-2 items-center relative h-full z-10'>
                  <div
                    class={`${
                      currentTab() === mode.name ? 'text-yellow-ffb' : 'text-gray-55'
                    } group-hover:text-yellow-ffb`}
                  >
                    {mode.svg}
                  </div>
                  <p
                    class={`text-14 font-bold font-SpaceGrotesk  ${
                      currentTab() === mode.name ? 'text-yellow-ffb' : 'text-gray-9b'
                    } group-hover:text-yellow-ffb`}
                  >
                    {mode.name[i18n.language]}
                  </p>
                </div>
              </div>
              <ModeMark mark={mode.mark} />
            </div>
          )}
        </For>
      </div>
    </>
  )
}

export default NewProfileGameHistory
