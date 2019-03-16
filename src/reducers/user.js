import {
  UPDATE_PROFILE_PENDING,
  UPDATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_REJECTED,
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
