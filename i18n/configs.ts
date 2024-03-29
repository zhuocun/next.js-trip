import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation_en from "./en.json";
import translation_zh from "./zh.json";

const resources = {
    en: {
        translation: translation_en
    },
    zh: {
        translation: translation_zh
    }
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        // keySeparator: false, // we do not use keys in form messages.welcome
        // header.slogan
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })
    .then();

export default i18n;
