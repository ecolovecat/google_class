import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJSON from '../locale/en.json';
import viJSON from '../locale/vi.json';

const lng = 'en';

i18n.use(initReactI18next).init({
    resources: { en: { ...enJSON }, vi: { ...viJSON } },
    lng,
});

export default i18n;
