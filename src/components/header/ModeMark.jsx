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
      ) : props.mark === 'soon' ? (
        <div
          class={props.labelStyles ?? "rounded-2 absolute right-0.5 top-0 z-10 px-1 center text-green-3e font-Quicksand font-bold text-10"}
          style={{
              background: "linear-gradient(75.96deg, rgba(255, 255, 255, 0) 20.07%, rgba(255, 255, 255, 0.12) 41.3%, rgba(0, 0, 0, 0.12) 68.93%, rgba(255, 255, 255, 0.12) 100%), radial-gradient(98.73% 114.02% at 100% -37.29%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(99.15% 99.15% at 12.7% 107.2%, rgba(11, 189, 82, 0.48) 0%, rgba(0, 0, 0, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(11, 189, 82, 0) 0%, rgba(11, 189, 82, 0.12) 100%), radial-gradient(58.03% 60.37% at 50% 29.27%, rgba(118, 124, 255, 0.05) 0%, rgba(118, 124, 255, 0) 100%), radial-gradient(100% 275.07% at 100% 0%, rgba(33, 36, 60, 0.48) 0%, rgba(29, 31, 48, 0.48) 100%)",            
          }}
          >
            SOON
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default ModeMark