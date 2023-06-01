import injector from "../../injector/injector";
import Modal from "./Modal";
import YellowButtonBg from "../../assets/img/animatedButtonBg.jpg";

const ChatRulesModal = () => {
  const { toggles, setToggles } = injector;

  return (
    <Modal
      noContainer={true}
      open={() => {
        return true;
      }}
      handler={() => {}}
    >
      <div
        class="w-full h-full absolute left-0 cursor-default top-0"
        onClick={() => setToggles("chatRulesModal", false)}
      />
      <div
        class="flex flex-col items-center justify-center absolute top-32 w-11/12"
        style={{
          "max-width": "56rem",
          height: "40rem",
        }}
      >
        <div
          class={`bg-dark-16 w-full max-w-lg px-8 py-8 relative flex flex-col gap-6 transition-all transform -translate-y-1/4 ${
            !toggles.chatRulesModal ? "" : "-translate-y-0"
          } duration-100 ease-out`}
        >
          <div class="flex flex-col gap-2 relative">
            <p class="text-24 text-white font-medium font-Oswald uppercase">
              CHAT RULES
            </p>
          </div>
          <div class="flex flex-col gap-4 center">
            <p class="text-14 sm:text-16 text-gray-47 font-normal mb-16">
              1.) Be respectful to all others.
              <br />
              2.) Do not post links or spam in chat.
              <br />
              3.) Only speak the language of the current chat room.
              <br />
              4.) Do not beg for coins or promote your creator code in chat.{" "}
              <br />
              5.) Use common sense. <br />
            </p>
            <div
              class="relative w-full sm:w-80 h-10 center hover group rounded-2 bg-cover scrolling-btn-wrapper overflow-hidden"
              style={{ "background-image": `url(${YellowButtonBg})` }}
              onClick={() => setToggles("chatRulesModal", false)}
            >
              <div class="scrolling-btn-image absolute left-0 top-0 hidden group-hover:block" />
              <p class="text-dark-16 text-14 font-semibold font-Oswald uppercase min-w-36 text-center z-10 px-4 py-2.5">
                I UNDERSTAND
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChatRulesModal;
