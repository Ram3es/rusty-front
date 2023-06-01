import TitleShapesIcon from "../icons/TitleShapesIcon"

const PageTitleWithShapes = (props) => {
  return (
    <div
      class="py-2 px-6 border-l-[3px] border-yellow-ff flex items-center gap-6 w-full"
      style={{
        background: "radial-gradient(179.03% 38675.39% at 100% 48.84%, rgba(217, 217, 217, 0) 0%, rgba(231, 219, 152, 0) 21.35%, rgba(237, 214, 113, 0.12823) 39.06%, rgba(237, 214, 113, 0.12823) 39.07%, rgba(255, 199, 1, 0.5) 100%)"
      }}
    >
      <h1 class="uppercase text-white font-Oswald text-28">{props.title}</h1>
      <TitleShapesIcon />
    </div>
  )
}

export default PageTitleWithShapes
