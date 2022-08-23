import i18n from "i18next";
import {SWITCH_LANGUAGE, ADD_LANGUAGE, LanguageActions} from "./languageActions";

export interface LanguageState {
    currentLanguage: "en" | "zh";
    languageList: { name: string, code: string }[];
}

const defaultState: LanguageState = {
    currentLanguage: "en",
    languageList: [
        {code: "en", name: "English"},
        {code: "zh", name: "简体中文"}
    ]
};

export const languageReducer = (state = defaultState, action: LanguageActions) => {
    switch (action.type) {
        case SWITCH_LANGUAGE:
            i18n.changeLanguage(action.payload).then();
            return {...state, currentLanguage: action.payload};
        case ADD_LANGUAGE:
            return {...state, languageList: [...state.languageList, action.payload]};
        default:
            return state;
    }
};

export default languageReducer;