import {useI18n} from "../i18n/context";

const Loading = () => {

  const i18n = useI18n();

  return (
    <>
        <div class="absolute w-full center">
            <p class="text-yellow-ff text-20 font-semibold font-Oswald uppercase">{i18n.t('general.Loading items')}</p>
        </div>
    </>
  )
}

export default Loading
