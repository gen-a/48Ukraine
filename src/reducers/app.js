import {
  SHOW_TOAST,
  HIDE_TOAST,
  SHOW_FLASH_MESSAGE,
  HIDE_FLASH_MESSAGE,
  SET_WINDOW_SIZE,
  SHOW_LOADER,
  HIDE_LOADER,
  SET_LOCALE,
  SET_CURRENT_DEPARTMENT,
  EXPAND_NODE_OF_DEPARTMENT_TREE,
  SET_OPEN_DRAWER
} from '../actions/app';
import { APP_DEFAULT_LOCALE } from '../localization';

const initialState = {
  toast: {
    message: '',
    isActive: false,
  },
  flashMessage: {
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
  departments: [
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
  currentDepartment: '',
  departmentsTree: {
    expanded: []
  },
  openDrawer: ''
};

function app(state = initialState, action) {
  switch (action.type) {
    case SET_OPEN_DRAWER:
      return {
        ...state,
        openDrawer: action.payload
      };
    case SET_CURRENT_DEPARTMENT:
      return {
        ...state,
        currentDepartment: action.payload
      };
    case EXPAND_NODE_OF_DEPARTMENT_TREE:
      return {
        ...state,
        departmentsTree: {
          ...state.departmentsTree,
          expanded:
            action.payload.value
              ? [...state.departmentsTree.expanded, action.payload.id]
              : state.departmentsTree.expanded.filter(id => action.payload.id !== id)
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
    case SHOW_FLASH_MESSAGE:
      return {
        ...state,
        flashMessage: {
          ...action.payload,
          isActive: true
        }
      };
    case HIDE_FLASH_MESSAGE:
      return {
        ...state,
        flashMessage: {
          ...state.flashMessage,
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
