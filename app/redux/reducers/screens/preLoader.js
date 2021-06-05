import * as actionTypes from '../../actions/types';

const INITIAL = {
  asyncDataLoaded: false,
  registeringUser: false,
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case actionTypes.INITIATE_AUTH_APP_STATE:
      return {
        ...state,
        asyncDataLoaded: true,
      };
    case actionTypes.SIGNUP_DEVICE_REQUEST:
      return {
        ...state,
        registeringUser: true,
      };
    case actionTypes.SIGNUP_DEVICE_SUCCESS:
      return {
        ...state,
        registeringUser: false,
      };
    default:
      return state;
  }
};
