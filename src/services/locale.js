import { APP_LOCALES, APP_DEFAULT_LOCALE } from '../config/app';

/**
 * Localize path add locale prefix if required
 * @returns {string}
 */
export const localizePath = (path, locale) => {
  if(locale !== APP_DEFAULT_LOCALE && APP_LOCALES.includes(locale)){
    return `/${locale}${path}`;
  }
  return path;
};