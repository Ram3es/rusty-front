import { For } from "solid-js";
import Question from "./Question";
import { useI18n } from "../../i18n/context";

const Faq = () => {
  const i18n = useI18n();

  const question = [
    {
      question: {
        en: "How to inquire about a sponsorship.",
        es: "Cómo solicitar información sobre un patrocinio.",
        ru: "Как узнать о спонсорстве.",
      },
      answer: {
        en: "To inquire about sponsorship opportunities please open a Sponsorship Application in our Discord.",
        es: "Para solicitar información sobre oportunidades de patrocinio abra una 'Solicitud de patrocinio' en nuestro Discord.",
        ru: "Чтобы узнать о возможностях спонсорства, пожалуйста, заполните заявку о спонсорстве в нашем Discord.",
      },
    },
    {
      question: {
        en: "I need help, where should I go?",
        es: "Necesito ayuda, ¿a quién debo acudir?",
        ru: "Мне нужна помощь, куда обращаться?",
      },
      answer: {
        en: "To get the best support possible either open a ticket on Discord. Please give our staff 12-24 hours to respond to your case.",
        es: "Para ayudarle de la mejor manera posible abra un ticket en nuestro Discord. Nuestro personal le respondera en un periodo de entre 12 y 24 horas.",
        ru: "Чтобы получить поддержку, откройте тикет на Discord. Пожалуйста, дайте нашим сотрудникам 12-24 часа, чтобы ответить на ваш вопрос.",
      },
    },
    {
      question: {
        en: "I found a bug; how do I report it?",
        es: "He encontrado un bug; ¿cómo lo reporto?",
        ru: "Я нашел ошибку, как сообщить об этом?",
      },
      answer: {
        en: "We have a bug bounty program with rewards up to $10,000.00 depending on the severity of the bug found. Please open up a ticket to if you found a bug!",
        es: "Tenemos un programa de recompensas por encontrar bugs, con recompensas de hasta $10,000.00 dependiendo del bug. Por favor, ¡abra un ticket en Discord si encuentra algún bug!",
        ru: "У нас есть программа вознаграждения за обнаружение ошибок с оплатой до 10 000 $ в зависимости от серьезности найденной ошибки. Пожалуйста, откройте тикет, если вы нашли ошибку!",
      },
    },
    {
      question: {
        en: "How can you prove that my game was fair?",
        es: "Cómo puede demostrar que mi juego fue justo?",
        ru: "Как вы можете доказать, что моя игра была честной?",
      },
      answer: {
        en: "To learn more about Provably fair please visit our Provably fair tab.",
        es: "Para aprender más sobre como funcionan nuestros juegos, visite la pestaña de 'Juego Seguro'.",
        ru: "Чтобы узнать больше о справедливости игры, посетите нашу вкладку 'Честная игра'.",
      },
    },
    {
      question: {
        en: "What is this site, who are you?",
        es: "Que es esta web, quienes sois?",
        ru: "О чем этот сайт, кто Вы?",
      },
      answer: {
        en: "We are a community driven rust gambling site.",
        es: "Somos una web de apustas de Rust impulsada por la comunidad.",
        ru: "Мы игровое сообщество, воодушевленное игрой Rust.",
      },
    },
    {
      question: {
        en: "Are there any age requirements?",
        es: "Hay algún requerimiento de edad?",
        ru: "Есть ли возрастные огранчиения?",
      },
      answer: {
        en: "Yes, there is, you must be at least 18 years of age.",
        es: "Si, debes de tener al menos 18 años.",
        ru: "Да, есть, Вам должно быть не менее 18 лет.",
      },
    },
    {
      question: {
        en: "I just deposited where are my Funds?",
        es: "Acabo de depositar, ¿donde están mis fondos?",
        ru: "Я только что пополнил свой аккаунт, где мои деньги?",
      },
      answer: {
        en: "Funds can take up to 10 minutes to appear in your account. If for some reason it's been longer than that please open up a ticket in our Discord.",
        es: "Los fondos pueden tardar hasta 10 minutos en aparecer en su cuenta. Si por alguna razón ha pasado más tiempo abra un ticket en nuestro Discord.",
        ru: "Деньги могут появиться на вашем счету в течение 10 минут. Если по какой-то причине прошло больше времени, пожалуйста, откройте тикет в нашем Discord.",
      },
    },
    {
      question: {
        en: "What do ranks do?",
        es: "Que hacen los rangos?",
        ru: "Зачем нужны уровни?",
      },
      answer: {
        en: "Each rank unlocks new rewards. You can check them out in the profile under Level Benefits.",
        es: "Cada rango desbloquea recompensas nuevas. Puede comprobarlas en su perfil, en los beneficios del nivel.",
        ru: "Каждый уровень открывает новые награды. Вы можете проверить их в профиле в разделе 'Преимущества уровня'.",
      },
    },
    {
      question: {
        en: "How do I gain levels?",
        es: "Cómo gano niveles?",
        ru: "Как повысить свой уровень?",
      },
      answer: {
        en: "The more you play the higher your rank will get. Depending on your rank you will get a badge that comes with special benefits.",
        es: "A medida que juegue su rango irá incrementando. Dependiendo de su rango recibira una insignia que viene con beneficios especiales",
        ru: "Чем больше Вы играете, тем выше будет Ваш уровень. В зависимости от Вашего ранга вы получите значок, дающий особые преимущества.",
      },
    },
    {
      question: {
        en: "I want to cancel my bet.",
        es: "Quiero cancelar mi apuesta.",
        ru: "Я хочу отменить свою ставку.",
      },
      answer: {
        en: "Unfortunately, as soon as you have placed your bet your bet is irreversible.",
        es: "Desafortunadamente, tan pronto como haya realizado su apuesta, esta es irreversible.",
        ru: "К сожалению, как только Вы сделали ставку, Ваша ставка становится необратимой.",
      },
    },
    {
      question: {
        en: "I’m not getting the skins I withdraw.",
        es: "No estoy recibiendo las skins que he sacadp",
        ru: "Я не поулчаю те скины, которые я вывел.",
      },
      answer: {
        en: "If your account is trade locked by Steam, you won’t be able to receive or deposit skins for at least 15 days.",
        es: "Si su cuenta esta bloqueada por Steam, no podrá recibir o depositar skins por al menos 15 días.",
        ru: "Если Ваша учетная запись была заблокирована Steam, Вы не сможете получать или вносить скины в течение как минимум 15 дней.",
      },
    },
    {
      question: {
        en: "What if I am addicted and need help?",
        es: "Tengo una adicción y necesito ayuda. Que hago?",
        ru: "Что делать, если я зависим и нуждаюсь в помощи?",
      },
      answer: {
        en: "Gambling is serious and if you feel like you need help contact our support or visit the listed websites below. \\  https://www.begambleaware.org \\  https://www.psychguides.com/behavioral-disorders/gambling-addiction",
        es: "La adición es un problema muy serio. Si cree que necesita ayuda por favor contacte con nuestro soporte o visite las páginas mostradas aquí debajo.",
        ru: "Азартные игры — это серьезно, и если Вы чувствуете, что Вам нужна помощь, обратитесь в нашу службу поддержки или посетите перечисленные ниже веб-сайты.",
      },
    },
  ];

  return (
    <>
      <div class="w-full h-full pt-16 flex flex-col gap-6 overflow-y-scroll relative pb-20">
        <p class="text-24 text-white font-medium font-Oswald uppercase">
          {i18n.t("faq.Basic questions")}
        </p>
        <div class="w-full flex-1">
          <For each={question}>{(val) => <Question val={val} />}</For>
        </div>
      </div>
    </>
  );
};

export default Faq;
