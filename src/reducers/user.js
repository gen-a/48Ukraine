import {
  FETCH_PROFILE_FULFILLED,
  FETCH_PROFILE_REJECTED,
  FETCH_PROFILE_PENDING,
  UPDATE_PROFILE_PENDING,
  UPDATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_REJECTED,
  SET_IS_AUTHENTICATED,
  SET_AUTHENTICATED_DATA,
} from '../actions/user';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  error: '',
  profile: {}
};

function user(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED_DATA:
      return {
        ...state,
        profile: action.payload,
        isAuthenticated: true,
      };
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case FETCH_PROFILE_PENDING:
      return {
        ...state
      };
    case FETCH_PROFILE_REJECTED:
      return {
        ...state
      };
    case FETCH_PROFILE_FULFILLED:
      return {
        ...state
      };
    case UPDATE_PROFILE_PENDING:
      return {
        ...state
      };
    case UPDATE_PROFILE_REJECTED:
      return {
        ...state
      };
    case UPDATE_PROFILE_FULFILLED:
      return {
        ...state
      };
    default:
      return { ...state };
  }
}

export default user;
