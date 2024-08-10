import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ru from './ru.json';
// import ukr from './ukr.json';
const resources = {
  en: {
    translation: en
  },
  ru: {
    translation: ru
  },
  // uk: {
  //   translation: ukr
  // },
  // Добавьте другие языки по необходимости
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Язык по умолчанию
    fallbackLng: 'en', // Язык, если выбранный язык не найден
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
