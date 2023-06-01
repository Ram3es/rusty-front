const Header = (props) => {
  return (
    <>
        <div class={`w-full h-12 px-6 grid ${props?.grid} bg-opacity-25 overflow-hidden relative`}>
            <For each={props?.headings}>
                {(val) => (
                    <div class="flex items-center text-14 text-gray-8c capitalize">{val}</div>
                )}
            </For>
            <div class="flex items-center text-14 text-gray-8c gap-2" onClick={() => props?.setDescending((prev) => (!prev))}> Date <svg class={`transform ${props?.descending() ? "rotate-180" : ""}`} width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5.5L3.4683 0.5L7 5.5H0Z" fill="#FFC701" />
                <path d="M0 8.5L3.4683 13.5L7 8.5H0Z" fill="#475A76" />
            </svg>
            </div>
        </div>
    </>
  );
};

export default Header;
