import * as actionTypes from '../../actions/types';

const INITIAL = {
  showLoading: false,
  hasError: false,
  error: '',
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_NAME_REQUEST:
      return {
        ...state,
        showLoading: true,
        hasError: false,
        error: '',
      };
    case actionTypes.UPDATE_NAME_SUCCESS:
      return {
        ...state,
        showLoading: false,
        hasError: false,
        error: '',
      };
    case actionTypes.UPDATE_NAME_FAILURE:
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
