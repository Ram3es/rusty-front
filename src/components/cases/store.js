// store.js
import { createStore } from "solid-js/store";

const [spinReelsTrigger, setSpinReelsTrigger] = createStore({
  triggered: false,
});

export { spinReelsTrigger, setSpinReelsTrigger };
