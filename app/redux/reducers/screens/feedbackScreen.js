import * as actionTypes from '../../actions/types';

const INITIAL = {
  showLoading: false,
  hasError: false,
  error: '',
  msg:""
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case actionTypes.SAVE_FEEDBACK_REQUEST:
      return {
        ...state,
        showLoading: true,
        hasError: false,
        error: '',
      };
    case actionTypes.SAVE_FEEDBACK_SUCCESS:
      return {
        ...state,
        showLoading: false,
        hasError: false,
        error: '',
        msg: action.payload.msg
      };
    case actionTypes.SAVE_FEEDBACK_FAILURE:
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
