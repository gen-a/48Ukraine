import {
  SHOW_TOAST,
  HIDE_TOAST,
  SHOW_SYSTEM_MESSAGE,
  HIDE_SYSTEM_MESSAGE,
  SET_WINDOW_SIZE,
  SHOW_LOADER,
  HIDE_LOADER,
  SET_LOCALE,
} from '../actions/app';
import { APP_DEFAULT_LOCALE } from '../localization';

const initialState = {
  toast: {
    message: '',
    isActive: false,
  },
  systemMessage: {
    title: '',
    body: '',
    type: 'error',
    isActive: false,
  },
  window: {
    height: 0,
    width: 0,
    mediaPrefix: '',
    devicePixelRatio: 1,
  },
  loader: {
    isActive: false,
  },
  locale: APP_DEFAULT_LOCALE
};

function app(state = initialState, action) {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        locale: action.payload
      };
    case SHOW_TOAST:
      return {
        ...state,
        toast: {
          text: action.payload,
          isActive: true
        }
      };
    case HIDE_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          isActive: false
        }
      };
    case SHOW_SYSTEM_MESSAGE:
      return {
        ...state,
        systemMessage: {
          ...action.payload,
          isActive: true
        }
      };
    case HIDE_SYSTEM_MESSAGE:
      return {
        ...state,
        systemMessage: {
          ...state.systemMessage,
          isActive: false,
        }
      };
    case SHOW_LOADER:
      return {
        ...state,
        loader: {
          isActive: true
        }
      };
    case HIDE_LOADER:
      return {
        ...state,
        loader: {
          isActive: false
        }
      };
    case SET_WINDOW_SIZE:
      return {
        ...state,
        window: {
          ...action.payload
        }
      };
    default:
      return { ...state };
  }
}

export default app;
