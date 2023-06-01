import {useI18n} from "../../i18n/context";

const ModeMark = (props) => {
  const i18n = useI18n();

  return (
    <>
      {props.mark === 'new' ? (
        <span class="absolute right-0.5 top-0 z-10 px-1 center header-mark-new">
          <span class="font-Quicksand font-bold text-10">
            {i18n.t("home.new")}
          </span>
        </span>
      ) : props.mark === 'hot' ? (
        <span class="absolute right-0.5 top-0 z-10 px-1 center header-mark-hot">
          <span class="font-Quicksand font-bold text-10">
            HOT
          </span>
        </span>
      ) : (
        ""
      )}
    </>
  )
}

export default ModeMark