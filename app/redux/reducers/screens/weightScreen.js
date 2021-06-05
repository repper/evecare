import * as actionTypes from '../../actions/types';

const INITIAL = {
  showLoading: false,
  hasError: false,
  error: '',
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case actionTypes.WEIGHT_SYNC_REQUEST:
      return {
        ...state,
        showLoading: true,
        hasError: false,
      };
    case actionTypes.WEIGHT_SYNC_SUCCESS:
      return {
        ...state,
        showLoading: false,
        hasError: false,
      };
    case actionTypes.WEIGHT_SYNC_FAILURE:
      return {
        ...state,
        showLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
};
