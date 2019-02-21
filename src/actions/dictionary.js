import { importDictionary } from '../localization';

export const IMPORT_DICTIONARY_ARTICLES_FULFILLED = 'IMPORT_DICTIONARY_ARTICLES_FULFILLED';
export const IMPORT_DICTIONARY_ARTICLES_PENDING = 'IMPORT_DICTIONARY_ARTICLES_PENDING';
export const IMPORT_DICTIONARY_ARTICLES_REJECTED = 'IMPORT_DICTIONARY_ARTICLES_REJECTED';

/**
 * Fetching customer profile data from the server
 * @returns {function(*, *)}
 */
export function importDictionaryAcrticles(locale) {
  return (dispatch, getState) => {
    dispatch(
      { type: IMPORT_DICTIONARY_ARTICLES_PENDING, payload: { } }
    );
    importDictionary(locale)
      .then((module) => {
        dispatch({ type: IMPORT_DICTIONARY_ARTICLES_FULFILLED, payload: module.default });
      })
      .catch(err => dispatch({ type: IMPORT_DICTIONARY_ARTICLES_REJECTED, payload: err }));
  };
}
