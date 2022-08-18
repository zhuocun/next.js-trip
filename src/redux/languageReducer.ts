export interface LanguageState {
    language: "en" | "zh";
    languageList: {name: string, code: string}[];
}

const defaultState: LanguageState = {
    language: "en",
    languageList: [
        {name: "English", code: "en"},
        {name: "中文", code: "zh"}
    ]
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case "switch_lang":
            return {...state, language: action.payload};
        case "add_lang":
            return {...state, languageList: [...state.languageList, action.payload]};
        default:
            return state;
    }
};