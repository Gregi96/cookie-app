import { atom, useAtom } from 'jotai'
import { languages, Languages } from 'lib/locale'

const translationAtom = atom(languages[Languages.en_GB])

export const useTranslationStore = () => {
    const [translation, setTranslation] = useAtom(translationAtom)

    const setLanguage = (languageKey: Languages) => setTranslation(languages[languageKey])

    return {
        T: translation,
        setLanguage
    }
}
