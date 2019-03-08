import {
  SHOW_TOAST,
  HIDE_TOAST,
  ADD_FLASH_MESSAGE,
  REMOVE_FLASH_MESSAGE,
  REMOVE_ALL_FLASH_MESSAGES,
  SET_WINDOW_SIZE,
  SHOW_LOADER,
  HIDE_LOADER,
  SET_LOCALE,
  SET_ROUTE_MATCH,
  EXPAND_NODE_OF_DEPARTMENT_TREE,
  SET_OPEN_DRAWER,
  ADD_OPEN_SCRIM,
  REMOVE_OPEN_SCRIM,
  FETCH_INITIAL_STATE_FULFILLED,
  FETCH_INITIAL_STATE_REJECTED,
  FETCH_INITIAL_STATE_PENDING,
} from '../actions/app';

const initialState = {
  toast: {
    message: '',
    isActive: false,
  },
  flashMessages: [],
  window: {
    height: 0,
    width: 0,
    mediaPrefix: '',
    devicePixelRatio: 1,
  },
  routeMatch: {
    params: {},
    isExact: false,
    path: '/',
    url: '/'
  },
  loader: {
    isActive: false,
  },
  locale: '',
  departments: [],
  rootDepartments: [],
  departmentsTree: {
    expanded: []
  },
  openDrawer: '',
  openScrims: []
};

function app(state = initialState, action) {
  switch (action.type) {
    case FETCH_INITIAL_STATE_FULFILLED:
      return {
        ...state,
        departments: action.payload.departments,
        rootDepartments: action.payload.departments.filter(d => d.parent === '0')
      };
    case FETCH_INITIAL_STATE_REJECTED:
      return {
        ...state
      };
    case FETCH_INITIAL_STATE_PENDING:
      return {
        ...state
      };
    case ADD_OPEN_SCRIM:
      return {
        ...state,
        openScrims: [...state.openScrims, action.payload]
      };
    case REMOVE_OPEN_SCRIM:
      return {
        ...state,
        openScrims: state.openScrims.filter(id => action.payload !== id)
      };
    case SET_OPEN_DRAWER:
      return {
        ...state,
        openDrawer: action.payload
      };
    case SET_ROUTE_MATCH:
      return {
        ...state,
        routeMatch: action.payload
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

    case ADD_FLASH_MESSAGE:
      return {
        ...state,
        flashMessages: [...state.flashMessages, action.payload]
      };
    case REMOVE_FLASH_MESSAGE:
      return {
        ...state,
        flashMessages: state.flashMessages.filter(message => message.id !== action.payload)
      };
    case REMOVE_ALL_FLASH_MESSAGES:
      return {
        ...state,
        flashMessages: []
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
