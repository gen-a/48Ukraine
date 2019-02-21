export const APP_LOCALES = ['uk', 'ru', 'en'];
export const APP_DEFAULT_LOCALE = 'uk';




/**
 * Locale in path
 * @type {string}
 */
export const localeInPath = `/:locale(${APP_LOCALES.filter(locale => locale !== APP_DEFAULT_LOCALE).join('|')})`;

/**
 * Localize path add localization prefix if required
 * @returns {string}
 */
export const localizePath = (path, locale) => {
  if(locale !== APP_DEFAULT_LOCALE && APP_LOCALES.includes(locale)){
    return `/${locale}${path}`;
  }
  return path;
};

/**
 *
 * @param locale {string} - name of the localization
 * @returns {Promise}
 */
export const importDictionary = ( locale ) => {
  switch (locale){
    case 'uk':
      return import('./uk');
    case 'ru':
      return import('./ru');
    case 'en':
      return import('./ru');
    default:
      throw new Error(`No import source default for ${locale} `);
  }
};
/**
 * Load initial dictionary articles
 * @returns {Promise.<void>}
 */
export const importInitialDictionary= async () => {
  try{
    const loaded = await importDictionary(APP_DEFAULT_LOCALE);
    return loaded.default;
  }catch(err){
    throw err;
  }
};