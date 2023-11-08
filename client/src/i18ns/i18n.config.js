
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
/* import en from './en'
import vi from './vi' */
import languageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
function getLocalLanguage() {
  return localStorage.getItem('language') ? localStorage.getItem('language') : 'vi'
}
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(languageDetector)
  .use(HttpApi)
  .init({
    supportedLngs:['en','vi'],
    /* lng:  document.querySelector('html').langu */ //getLocalLanguage(),
    fallbackLng: 'en',
   /*  resources: {
      en: {
      
        translation:en
      },
      vi: {
        translation:vi
      },
    }, */
    detection:{
      order: ['path', 'cookie','htmlTag', 'localStorage', , 'subdomain'],
      caches:['cookie']
    },
    backend:{
      loadPath: '/locales/{{lng}}/translation.json',
    }
  });
export default i18n;