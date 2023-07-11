import { For } from "solid-js";
import injector from "../../injector/injector";
import Toast from "./Toast";

const TOAST_MANAGER = () => {
  const { toastrs, setToastrs } = injector;

  return (
    <>
      <div class="absolute w-[calc(100%-2rem)] sm:w-auto right-4 bottom-4 sm:bottom-8 flex flex-col gap-2 z-50">
        <For each={toastrs()}>
          {(toast) => (
            <Toast
              type={toast.type}
              msg={toast.msg}
              remove={() => {
                setToastrs((prev) => prev.filter((val) => val.id != toast.id));
              }}
            />
          )}
        </For>
      </div>
    </>
  );
};

export default TOAST_MANAGER;
