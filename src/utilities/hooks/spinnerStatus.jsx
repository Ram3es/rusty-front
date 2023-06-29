import {createSignal, createContext, useContext} from "solid-js";

const SpinnerContext = createContext();

export function SpinnerStatusProvider(props) {
  const [status, setStatus] = createSignal("inactive");
  const spinnerStatus = {
    getStatus: () => status(),
    changeStatus: setStatus,
  };

  return (
    <SpinnerContext.Provider value={spinnerStatus}>
      {props.children}
    </SpinnerContext.Provider>
  );
}

export function useSpinnerStatus() {
  return useContext(SpinnerContext);
}
