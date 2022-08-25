import {createSlice} from "@reduxjs/toolkit";
import i18n from "i18next";

export interface LanguageState {
    currentLanguage: "en" | "zh";
    languageList: { name: string, code: string }[];
}

const initialState: LanguageState = {
    currentLanguage: "en",
    languageList: [
        {code: "en", name: "English"},
        {code: "zh", name: "简体中文"}
    ]
};

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        fetchSwitch: (state, action) => {
            i18n.changeLanguage(action.payload).then();
            state.currentLanguage = action.payload;
        },
        fetchAdd: (state) => {
            let payload = {code: "New_language", name: "New language"}
            state.languageList = state.languageList.concat(payload);
        }
    },
});

