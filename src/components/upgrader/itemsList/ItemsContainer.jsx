import { For, createSignal, onMount } from "solid-js";
import PotentialDropItem from "../../../views/case/PotentialDropItem";
import useIntersectionObserver from './useIntersectionObserver';

const ItemsContainer = (props) => {
  const [ref, setRef] = createSignal(null);
  const [iterations, setIterations] = createSignal([]);

  onMount(() => {
    setTimeout(() => {
        setIterations(Array(10).fill(props.items()));
    }, 2000)
  });

  const callback = entry => {
    console.log(`Element ${entry.target.id} is in view: ${entry.isIntersecting}`);
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  useIntersectionObserver(ref, callback, options);

  return (
    <div class="w-full grid grid-cols-potential-drop--item gap-2">
      <For each={iterations()}>
        {(itemsIteration) => (
          <For each={itemsIteration}>
            {(item) => <PotentialDropItem skin={item} ref={setRef} id={item.id}/>}
          </For>
        )}
      </For>
    </div>
  );
};

export default ItemsContainer;
