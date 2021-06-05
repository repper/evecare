import {act} from 'react-test-renderer';
import * as actionTypes from '../../actions/types';

const INITIAL = {
  showLoading: false,
  hasError: false,
  error: '',
  isLogout: false,
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case actionTypes.DEREGISTER_DEVICE_REQUEST:
      return {
        ...state,
        showLoading: true,
        hasError: false,
        error: '',
      };
    case actionTypes.DEREGISTER_DEVICE_SUCCESS:
      return {
        ...state,
        showLoading: false,
        hasError: false,
        isLogout: true,
        error: '',
      };
    case actionTypes.DEREGISTER_DEVICE_FAILURE:
      return {
        ...state,
        showLoading: false,
        hasError: true,
        error: action.error,
      };
    case actionTypes.RESET_LOGOUT_STATE:
      return {
        ...state,
        isLogout: false,
      };
    default:
      return state;
  }
};
