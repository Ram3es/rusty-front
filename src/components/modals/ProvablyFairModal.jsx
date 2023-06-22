import { createSignal, For } from 'solid-js'
import injector from '../../injector/injector'
import Modal from './Modal'
import { useI18n } from '../../i18n/context'
import BgMainVector from '../../assets/img/coinflip/bgItemsRL.png'
import { copyToClipboard } from '../../utilities/tools'

const ProvablyFairModal = () => {
  const i18n = useI18n()

  const { socket, toggles, setToggles, toastr } = injector

  const [text, setText] = createSignal('')
  const [toggleSearch, setToggleSearch] = createSignal(true)

  const [data, setData] = createSignal({})

  const searchPF = () => {
    if (!text()) return

    socket.emit(
      'system:fairness:search',
      {
        id: text()
      },
      (data) => {
        if (data.msg) {
          toastr(data)
        }

        if (!data.error) {
          setData(data.data)
        }
      }
    )
  }

  const roundInfo = {
    gamemode: {
      en: 'gamemode',
      es: 'modo de juego',
      ru: 'игровой режим'
    },
    hash: {
      en: 'hash',
      es: 'picadillo',
      ru: 'хэш'
    },
    roll: {
      en: 'roll',
      es: 'rodar',
      ru: 'свиток'
    },
    secret: {
      en: 'secret',
      es: 'secreto',
      ru: 'секрет'
    },
    random: {
      en: 'random',
      es: 'aleatorio',
      ru: 'случайный'
    },
    signature: {
      en: 'signature',
      es: 'firma',
      ru: 'подпись'
    }
  }

  return (
    <Modal
      noContainer={true}
      open={() => {
        return true
      }}
      handler={() => {}}
    >
      <div
        class='w-full h-full bg-transparent absolute left-0 top-0'
        onClick={() => setToggles('provablyFairModal', false)}
      />
      <div class='flex flex-col absolute overflow-y-scroll h-[550px] fourk:h-[846px] max-w-[348px] md:max-w-[608px] lg:max-w-[708px] xl:max-w-[1208px]'>
        <div
          class={`w-full relative flex flex-col rounded-xl transition-all transform -translate-y-1/4 ${
            !toggles.provablyFairModal ? '' : '-translate-y-0'
          } duration-100 ease-out`}
          style={{
            background:
              'radial-gradient(121.17% 118.38% at 46.04% 63.97%, rgba(118, 124, 255, 0.06) 0%, rgba(118, 124, 255, 0) 63.91%), linear-gradient(90.04deg, #1A1B30 0%, #191C35 100%)',
            'backdrop-filter': 'blur(8px)'
          }}
        >
          <div class='rounded-t-xl border border-black/10 w-full pl-8 pr-6 py-6 relative flex justify-between items-center h-[88px]'>
            <div class='flex flex-col'>
              <p class='font-bold text-20 font-SpaceGrotesk text-white'>
                {i18n.t('provably_fair.Provably fair')}
              </p>
              <span class='text-12 font-SpaceGrotesk font-bold text-gray-64'>
                Verify your past games.
              </span>
            </div>

            <div
              class='text-gray-9a w-10 h-10 flex items-center justify-center border rounded border-[#FFFFFF0A] cursor-pointer'
              onClick={() => setToggles('provablyFairModal', false)}
            >
              <svg
                width='10'
                height='10'
                viewBox='0 0 10 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M0.499614 0.500386C0.188954 0.811046 0.188953 1.31473 0.499614 1.62539L3.87489 5.00066L0.500271 8.37527C0.189611 8.68593 0.189611 9.18961 0.500271 9.50027C0.810931 9.81093 1.31461 9.81093 1.62527 9.50027L4.99988 6.12566L8.37461 9.50039C8.68527 9.81105 9.18895 9.81105 9.49961 9.50039C9.81027 9.18973 9.81028 8.68605 9.49962 8.37539L6.12488 5.00066L9.50027 1.62527C9.81093 1.31461 9.81093 0.81093 9.50027 0.50027C9.18961 0.18961 8.68593 0.18961 8.37527 0.50027L4.99989 3.87566L1.62461 0.500386C1.31395 0.189726 0.810274 0.189726 0.499614 0.500386Z'
                  fill='currentColor'
                />
              </svg>
            </div>
          </div>
          <div class='pl-[33px] pr-16 flex flex-col pt-14 gap-[23px] relative'>
            <div
              class='absolute inset-0 -z-10 bg-repeat mix-blend-luminosity'
              style={{ 'background-image': `url('${BgMainVector}')`, opacity: 0.002 }}
            />
            <p class='font-medium text-16 text-blue-60 font-SpaceGrotesk'>
              {i18n.t('provably_fair.We use the popular')}
            </p>
            <p class='font-medium text-16 text-blue-60 font-SpaceGrotesk'>
              {i18n.t('provably_fair.When a round')}{' '}
              <a
                href='https://api.random.org/signatures/form'
                target='_blank'
                rel='noreferrer'
                class=' underline cursor-pointer text-white'
              >
                {i18n.t('provably_fair.Link')}
              </a>{' '}
              {i18n.t('provably_fair.To verify all')}
            </p>

            <p class='font-medium text-16 text-blue-60 font-SpaceGrotesk'>
              {i18n.t('provably_fair.When updating')}
            </p>
          </div>
          <div class='flex flex-col gap-6 pt-[25px] pl-[33px] pr-16 pb-9 relative'>
            <div
              class='absolute inset-0 -z-10 mb-2 bg-repeat mix-blend-luminosity'
              style={{ 'background-image': `url('${BgMainVector}')`, opacity: 0.002 }}
            />
            <div class='flex flex-col gap-2.5'>
              <p class='text-white text-20 font-bold font-SpaceGrotesk'>
                {i18n.t('provably_fair.Plinko')}
              </p>
              <p class='text-16 font-SpaceGrotesk font-medium text-blue-60'>
                hash = sha256(client_seed + ":" +server_seed + ":" + nonce) <br />
                seedr = seedrandom(hash); <br />
                rows = count the amount of values in roll array in PF popup <br />
                {`roll = Array.from({length: rows}, () => Math.floor(seedr() * 2))`} <br />
                round = roll.slice(0, rows)
                <br />
                {`rights = round.filter((val) => val == 1).length`}
                <br />
                <b>{i18n.t('provably_fair.Rights should be')}</b>
              </p>
            </div>

            <div class='flex flex-col gap-2.5'>
              <p class='text-white text-20 font-bold font-SpaceGrotesk'>
                {i18n.t('provably_fair.Upgrader')}
              </p>
              <p class='text-16 font-SpaceGrotesk font-medium text-blue-60'>
                hash = sha256(client_seed + ":" +server_seed + ":" + nonce)
                <br />
                seedr = seedrandom(hash) <br />
                roll = seedr() <br />
                <b>{i18n.t('provably_fair.Roll should be')}</b>
              </p>
            </div>
          </div>

          <div class='flex flex-col gap-5 ml-[33px] mr-16 mb-6'>
            <p class='text-white text-20 font-bold font-SpaceGrotesk'>
              {i18n.t('provably_fair.Round information')}
            </p>
            <div class='flex flex-col gap-[15px] w-full'>
              <div
                class='flex w-full rounded-[4px] justify-between items-center h-10'
                style={{
                  background:
                    'radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.03)',
                  'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)',
                  'backdrop-filter': 'blur(1.5px)'
                }}
              >
                <div class='flex items-center gap-2 justify-between pl-4 pr-1 py-1 w-full'>
                  <input
                    class={`text-gray-92 text-14 font-medium font-SpaceGrotesk w-full ${
                      toggleSearch() ? '' : 'hidden'
                    }`}
                    placeholder={i18n.t('provably_fair.Search for ID')}
                    type='number'
                    value={text()}
                    onInput={(e) => {
                      setText(e.currentTarget.value)
                    }}
                  />
                  <p
                    class={`text-gray-92 w-full sm:w-44 ${
                      toggleSearch() ? 'hidden' : ''
                    } text-14 font-medium uppercase`}
                    onClick={() => setToggleSearch((prev) => !prev)}
                  >
                    text()
                  </p>
                  <div
                    class='flex items-center justify-center cursor-pointer center w-13 h-8 px-3 py-2 green-success-button-gradient text-[#27F278] text-12 font-SpaceGrotesk'
                    onClick={searchPF}
                  >
                    {i18n.t('provably_fair.Search')}
                  </div>
                </div>
              </div>

              <div class='w-full grid grid-cols-2 gap-x-[27px] gap-y-[15px]'>
                <For each={['gamemode', 'hash', 'roll', 'secret', 'random', 'signature']}>
                  {(name) => (
                    <div class={`w-full flex-col gap-[7px] ${data()?.["gamemode"] == 'battles' && (name === "hash" || name === "secret") ? "hidden" : "flex"}`}>
                      <p class='text-12 font-bold text-gray-64 font-SpaceGrotesk capitalize'>
                        {roundInfo[name][i18n.language]}
                      </p>
                      <div
                        class='w-full min-h-[40px] px-4 rounded-4 flex items-center'
                        style={{
                          background:
                            'radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.12) 0%, rgba(118, 124, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), radial-gradient(100% 275.07% at 100% 0%, rgba(29, 35, 82, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)',
                          border: '1px solid rgba(255, 255, 255, 0.03)',
                          'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.12)',
                          'backdrop-filter': 'blur(1.5px)'
                        }}
                      >
                        <p
                          class='text-gray-92 text-12 font-medium font-SpaceGrotesk select-text h-max overflow-hidden center'
                          onClick={() => copyToClipboard(data()?.[name])}
                        >
                          {data()?.[name]}
                        </p>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>
          <div>
<iframe height="600" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/TerryLoot/embed/GRwqPGR?default-tab=" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/TerryLoot/pen/GRwqPGR">
  Untitled</a> by Terry (<a href="https://codepen.io/TerryLoot">@TerryLoot</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<iframe height="700" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/TerryLoot/embed/vYQXXyv?default-tab=" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/TerryLoot/pen/vYQXXyv">
  Untitled</a> by Terry (<a href="https://codepen.io/TerryLoot">@TerryLoot</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ProvablyFairModal
