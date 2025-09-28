import languageListJSON from "./config/language-list.json"
import { getIsLanguageTypeGuard, type LanguageType } from "./types"

export class Language {
    private static currentLanguage: LanguageType = getIsLanguageTypeGuard(localStorage.getItem("language")) ? (localStorage.getItem("language") as LanguageType) : "english"

    private constructor() {}

    public static get getCurrentLanguage(): LanguageType {
        return Language.currentLanguage
    }

    public static set setCurrentLanguage(language: LanguageType) {
        Language.currentLanguage = language
        localStorage.setItem("language", Language.currentLanguage)
    }

    public static getText(phraseName: string): string {
        if (!(phraseName in languageListJSON)) return ""
        return languageListJSON[phraseName as keyof typeof languageListJSON][Language.currentLanguage] ?? ""
    }
}
