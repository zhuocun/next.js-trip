import i18n from "i18next";
import {SWITCH_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes} from "./languageActions";

export interface LanguageState {
    language: "en" | "zh";
    languageList: {name: string, code: string}[];
}

const defaultState: LanguageState = {
    language: "en",
    languageList: [
        {code: "en", name: "English"},
        {code: "zh", name: "简体中文"}
    ]
};

export default (state = defaultState, action: LanguageActionTypes) => {
    switch (action.type) {
        case SWITCH_LANGUAGE:
            i18n.changeLanguage(action.payload);
            return {...state, language: action.payload};
        case ADD_LANGUAGE:
            return {...state, languageList: [...state.languageList, action.payload]};
        default:
            return state;
    }
};