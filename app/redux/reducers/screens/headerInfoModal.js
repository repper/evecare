import * as actionTypes from '../../actions/types';

const INITIAL = {
  showInfoModal: false,
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case actionTypes.SHOW_HEADER_INFO_MODAL:
      return {
        ...state,
        showInfoModal: true,
      };
    case actionTypes.HIDE_HEADER_INFO_MODAL:
      return {
        ...state,
        showInfoModal: false,
      };
    default:
      return state;
  }
};
