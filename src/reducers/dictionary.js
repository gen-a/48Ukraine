import {
  IMPORT_DICTIONARY_ARTICLES_FULFILLED,
  IMPORT_DICTIONARY_ARTICLES_PENDING,
  IMPORT_DICTIONARY_ARTICLES_REJECTED,
} from '../actions/dictionary';
import { importInitialDictionary } from '../localization';

const initialState = importInitialDictionary();

function dictionary(state = initialState, action) {
  switch (action.type) {
    case IMPORT_DICTIONARY_ARTICLES_FULFILLED:
      return action.payload;
    case IMPORT_DICTIONARY_ARTICLES_PENDING:
      return {
        ...state
      };
    case IMPORT_DICTIONARY_ARTICLES_REJECTED:
      return {
        ...state
      };
    default:
      return { ...state };
  }
}

export default dictionary;
