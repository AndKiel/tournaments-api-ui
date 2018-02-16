import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LngDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
import moment from 'moment';

i18n
  .use(XHR)
  .use(LngDetector)
  .use(reactI18nextModule)
  .init({
    whitelist: ['en'],
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    // have a common namespace used around the full app
    ns: ['default'],
    defaultNS: 'default',

    react: {
      wait: true
    }
  });

i18n.on('languageChanged', function(lng) {
  moment.locale(lng);
});

export default i18n;
