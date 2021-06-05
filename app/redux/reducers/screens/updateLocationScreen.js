import * as actionTypes from "../../actions/types";

const INITIAL = {
    showLoading: false,
    hasError: false,
    error: "",
};

export default (state = INITIAL, action) => {
    switch (action.type) {
         case actionTypes.UPDATE_LOCATION_REQUEST:
            return {
                ...state,
                showLoading: true,
                hasError: false,
            };
        case actionTypes.UPDATE_LOCATION_SUCCESS:
            return {
                ...state,
                showLoading: false,
                hasError: false,
            };    
        case actionTypes.UPDATE_LOCATION_FAILURE:
            return {
                ...state,
                showLoading: false,
                hasError: true,
            };
        default:
            return state;
    }
};
