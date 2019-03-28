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
 * Read object value by keys path array
 * @param src {object}
 * @param keys {Array}
 * @returns {*}
 */
const readEntryByKeys = (src, keys)=>{
  const key = keys.shift();
  if(!src[key]){
    return undefined;
  }
  if(keys.length === 0){
    return src[key];
  }
  return readEntryByKeys(src[key], keys);
};
/**
 * Read dictionary article
 * @param dictionary {object} - source object of articles
 * @param path {string} - path string as key.key.key
 * @param data {object} - data replacement as {placeholder:value}
 * @returns {*}
 */

export const translate = (dictionary, path, data = {}) =>{
  let value = readEntryByKeys(dictionary, path.split('.'));
  if(!value){
    return path;
  }
  Object.keys(data).forEach( k => value = value.replace(new RegExp(`:${k}`, 'gi'), data[k]));
  return value;
};


/**
 *
 * @param locale {string} - name of the localization
 * @returns {Promise}
 */
export const  importDictionary = ( locale ) => {
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
