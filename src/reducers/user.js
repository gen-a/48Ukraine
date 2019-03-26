import {
  UPDATE_PROFILE_PENDING,
  UPDATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_REJECTED,
  SET_AUTHENTICATED_DATA,
  UPDATE_PASSWORD_PENDING,
  UPDATE_PASSWORD_FULFILLED,
  UPDATE_PASSWORD_REJECTED,
  LOG_OUT_PENDING,
  LOG_OUT_FULFILLED,
  LOG_OUT_REJECTED,

} from '../actions/user';

const initialState = {
  isAuthenticated: false,
  isBusy: false,
  error: '',
  profile: {},
};

function user(state = initialState, action) {
  switch (action.type) {
    case LOG_OUT_FULFILLED:
      return {
        ...state,
        profile: {},
        isAuthenticated: false,
        isBusy: false
      };
    case SET_AUTHENTICATED_DATA:
      return {
        ...state,
        profile: action.payload,
        isAuthenticated: true,
      };
    case UPDATE_PROFILE_FULFILLED:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
        isBusy: false
      };
    case LOG_OUT_PENDING:
    case UPDATE_PASSWORD_PENDING:
    case UPDATE_PROFILE_PENDING:
      return {
        ...state,
        isBusy: true
      };
    case LOG_OUT_REJECTED:
    case UPDATE_PROFILE_REJECTED:
    case UPDATE_PASSWORD_REJECTED:
    case UPDATE_PASSWORD_FULFILLED:
      return {
        ...state,
        isBusy: false
      };
    default:
      return { ...state };
  }
}

export default user;
