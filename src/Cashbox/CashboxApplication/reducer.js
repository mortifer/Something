import { handleActions } from "redux-actions";
import * as actionTypes from "./actionTypes";

export default handleActions({
    [ actionTypes.DATE_CHANGED ] : (state, action) => ({
        ...state,
        date: action.payload
    })
}, {});
