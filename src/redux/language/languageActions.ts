export const SWITCH_LANGUAGE = "switch_lang";
export const ADD_LANGUAGE = "add_lang";

interface SwitchLanguageAction {
    type: typeof SWITCH_LANGUAGE,
    payload: "en" | "zh"
}

interface AddLanguageAction {
    type: typeof ADD_LANGUAGE,
    payload: {code: string, name: string}
}

export type LanguageActions = SwitchLanguageAction | AddLanguageAction;

export const switchLanguageActionCreator = (languageCode: "en" | "zh"): SwitchLanguageAction => {
    return {
        type: SWITCH_LANGUAGE,
        payload: languageCode
    };
};

export const addLanguageActionCreator = (code: string, name: string): AddLanguageAction => {
    return {
        type: ADD_LANGUAGE,
        payload: {code, name}
    };
};