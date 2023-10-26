import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from '../../locale/es';
import en from '../../locale/en';

i18n
.use(initReactI18next)
.init({
    resources: {
        es,
        en,
    },
    fallbackLng: 'es',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ',',
    },
    react: {
        wait: true,
    },
});
export default i18n;