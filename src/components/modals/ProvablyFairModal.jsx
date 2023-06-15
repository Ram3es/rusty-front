import { createSignal, For } from 'solid-js'
import injector from '../../injector/injector'
import Modal from './Modal'
import { useI18n } from '../../i18n/context'

const ProvablyFairModal = () => {
  const i18n = useI18n()

  const { socket, toggles, setToggles, toastr } = injector

  const [text, setText] = createSignal('')

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
        class='w-full h-full absolute left-0 cursor-default top-0'
        onClick={() => setToggles('provablyFairModal', false)}
      />
      <div
        class='flex flex-col absolute top-32 w-11/12 overflow-y-scroll'
        style={{
          'max-width': '56rem',
          height: '40rem'
        }}
      >
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
          <div class='ml-[33px] mr-16 flex flex-col mt-14 gap-[23px]'>
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
          <div class='flex flex-col gap-6 mt-[25px] ml-[33px] mr-16 mb-9'>
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

          <div class='w-full h-10 px-4 bg-dark-20 relative center'>
            <div class='absolute w-full h-full flex justify-between items-center'>
              <svg
                width='4'
                height='16'
                viewBox='0 0 4 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M4 7.57895L0 16L0 0L4 7.57895Z' fill='#161B2A' />
              </svg>
              <svg
                width='4'
                height='16'
                viewBox='0 0 4 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M0 7.57895L4 16L4 0L0 7.57895Z' fill='#161B2A' />
              </svg>
              <svg
                class='absolute left-16 top-0'
                width='32'
                height='4'
                viewBox='0 0 32 4'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M23.619 2L16 0H32L23.619 2Z' fill='#161B2A' />
                <path d='M7.89474 4L0 0H15L7.89474 4Z' fill='#161B2A' />
              </svg>
            </div>
            <div class='w-full flex items-center'>
              <p class='text-gray-8c text-14 font-medium truncate select-text'>
                {'sha256({secret}{roll}{signature})'}
              </p>
            </div>
          </div>

          <p class='text-24 text-white font-medium font-Oswald uppercase'>
            {i18n.t('provably_fair.Round information')}
          </p>
          <div class='flex flex-col gap-4 w-full'>
            <div class='w-full h-10 px-4 bg-dark-20 relative center'>
              <div class='absolute w-full h-full flex justify-between items-center'>
                <svg
                  width='4'
                  height='16'
                  viewBox='0 0 4 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M4 7.57895L0 16L0 0L4 7.57895Z' fill='#161B2A' />
                </svg>
                <svg
                  width='4'
                  height='16'
                  viewBox='0 0 4 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M0 7.57895L4 16L4 0L0 7.57895Z' fill='#161B2A' />
                </svg>
                <svg
                  class='absolute left-16 top-0'
                  width='32'
                  height='4'
                  viewBox='0 0 32 4'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M23.619 2L16 0H32L23.619 2Z' fill='#161B2A' />
                  <path d='M7.89474 4L0 0H15L7.89474 4Z' fill='#161B2A' />
                </svg>
              </div>
              <input
                class='w-full h-full text-white text-12 sm:text-14 font-medium font-Oswald uppercase placeholder-gray-8c z-10'
                placeholder={i18n.t('provably_fair.Search for ID')}
                type='number'
                value={text()}
                onInput={(e) => {
                  setText(e.currentTarget.value)
                }}
              />
              <div
                class={`absolute right-4 w-24 h-6 duration-200 gap-2 text-gray-47 bg-dark-2d hover:text-white hover center z-10`}
                onClick={searchPF}
              >
                <p class='text-12 sm:text-14 text-current font-bold sentence'>
                  {i18n.t('provably_fair.Search')}
                </p>
              </div>
            </div>

            <div class='w-full grid grid-cols-2 gap-x-6 gap-y-2'>
              <For each={['gamemode', 'hash', 'roll', 'secret', 'random', 'signature']}>
                {(name) => (
                  <div class='w-full flex flex-col gap-1'>
                    <p class='text-12 sm:text-14 text-gray-8c font-normal sentence'>
                      {roundInfo[name][i18n.language]}
                    </p>
                    <div class='w-full h-10 px-4 bg-dark-20 relative center'>
                      <div class='absolute w-full h-full flex justify-between items-center'>
                        <svg
                          width='4'
                          height='16'
                          viewBox='0 0 4 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M4 7.57895L0 16L0 0L4 7.57895Z' fill='#161B2A' />
                        </svg>
                        <svg
                          width='4'
                          height='16'
                          viewBox='0 0 4 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M0 7.57895L4 16L4 0L0 7.57895Z' fill='#161B2A' />
                        </svg>
                        <svg
                          class='absolute left-16 top-0'
                          width='32'
                          height='4'
                          viewBox='0 0 32 4'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M23.619 2L16 0H32L23.619 2Z' fill='#161B2A' />
                          <path d='M7.89474 4L0 0H15L7.89474 4Z' fill='#161B2A' />
                        </svg>
                      </div>
                      <div class='w-full flex items-center'>
                        <p class='text-whitetext-12 sm: text-14 font-medium font-Oswald truncate select-text'>
                          {data()?.[name]}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ProvablyFairModal
