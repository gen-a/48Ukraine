import {
  SHOW_TOAST,
  HIDE_TOAST,
  SHOW_SYSTEM_MESSAGE,
  HIDE_SYSTEM_MESSAGE,
  SET_WINDOW_SIZE,
  SHOW_LOADER,
  HIDE_LOADER,
  SET_LOCALE,
  SET_MAIN_NAVIGATOR_SELECTED_ID,
  SET_MAIN_NAVIGATOR_EXPANDED_ID,
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
  locale: APP_DEFAULT_LOCALE,
  navigatorNodes: [
    {
      label: 'Name 1',
      id: '1',
      children:
        [
          { label: 'Name 1.1', id: '1.1', children: [] },
          { label: 'Name 1.2', id: '1.2', children: [] },
          { label: 'Name 1.3', id: '1.3', children: [] },
        ]
    },
    { label: 'Name 2', id: '2', children: [] },
    {
      label: 'Name 3',
      id: '3',
      children: [
        { label: 'Name 3.1', id: '3.1', children: [] },
        { label: 'Name 3.2', id: '3.2', children: [] },
        { label: 'Name 3.3', id: '3.3', children: [] },
      ]
    },
    { label: 'Name 4', id: '4', children: [] },
    { label: 'Name 5', id: '5', children: [] },
  ],
  mainNavigator: {
    selectedId: '1',
    expanded: ['1']
  }
};

function app(state = initialState, action) {
  switch (action.type) {
    case SET_MAIN_NAVIGATOR_SELECTED_ID:
      return {
        ...state,
        mainNavigator: {
          ...state.mainNavigator,
          selectedId: action.payload
        }
      };
    case SET_MAIN_NAVIGATOR_EXPANDED_ID:
      return {
        ...state,
        mainNavigator: {
          ...state.mainNavigator,
          expanded:
            action.payload.value
              ? [...state.mainNavigator.expanded, action.payload.id]
              : state.mainNavigator.expanded.filter(id => action.payload.id !== id)
        }
      };
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
