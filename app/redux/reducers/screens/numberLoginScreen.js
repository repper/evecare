import * as actionTypes from '../../actions/types';

const INITIAL = {
  showLoading: false,
  hasError: false,
  showOtp: false,
  error: '',
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_MOBILE_RESET:
      return {
        ...state,
        showLoading: false,
        showOtp: false,
        hasError: false,
        error: '',
      };
    case actionTypes.LOGIN_MOBILE_REQUEST:
      return {
        ...state,
        showLoading: true,
        showOtp: false,
        hasError: false,
        error: '',
      };
    case actionTypes.LOGIN_MOBILE_SUCCESS:
      return {
        ...state,
        showLoading: false,
        hasError: false,
        showOtp: true,
      };
    case actionTypes.LOGIN_MOBILE_FAILURE:
      return {
        ...state,
        showLoading: false,
        hasError: true,
        error: action.error,
      };
    case actionTypes.VERIFY_MOBILE_REQUEST:
      return {
        ...state,
        showLoading: true,
        hasError: false,
        error: '',
      };
    case actionTypes.VERIFY_MOBILE_SUCCESS:
      return {
        ...state,
        showLoading: false,
        hasError: false,
      };
    case actionTypes.VERIFY_MOBILE_FAILURE:
      return {
        ...state,
        showLoading: false,
        hasError: true,
        error: action.error,
      };
    default:
      return state;
  }
};
