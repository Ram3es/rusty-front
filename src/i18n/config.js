import i18next from 'i18next';
import HttpApi from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const i18n = i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',
        whitelist: ['en', 'es', 'ru'],
        preload: ['en', 'es', 'ru'],
        ns: 'translations',
        defaultNS: 'translations',
        fallbackNS: false,
        debug: false,
        detection: {
            order: ['querystring'],
            lookupQuerystring: 'lang',
        },
        backend: {
            loadPath: window.location.origin + '/i18n/{{lng}}/{{ns}}.json',
        }
    }, (err) => {
        if (err) return console.error(err)
    });

export default i18n;