import { onCleanup } from 'solid-js'

export const useDebounce = (signalSetter, delay) => {
  let timerHandle;
  function debouncedSignalSetter(value) {
    clearTimeout(timerHandle);
    timerHandle = setTimeout(() => signalSetter(value), delay);
  }
  onCleanup(() => clearInterval(timerHandle));
  return debouncedSignalSetter;
}
