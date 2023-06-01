import { onMount, createSignal } from "solid-js";

  const ImageLoad = ({ style, placeholder, source }) => {
    const [sourceLoaded, setSourceLoaded] = createSignal(null)
    
    onMount(() => {
        const img = new Image()
        img.src = source
        img.onload = () => {
          setSourceLoaded(source)
        }
    })
  
    return (
      <div class={`${""} ${style()}`} style={{ "background-image": `url(${sourceLoaded() || ""})` }} />
    )
  }

  export default ImageLoad;