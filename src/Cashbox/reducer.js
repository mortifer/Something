import { handleActions } from "redux-actions";
import * as actionTypes from "./actionTypes";

export default handleActions({
    [ actionTypes.SUBMIT_CASHBOX ] : (state, action) => state,
    [ actionTypes.FETCH_SUCCEED ]: (state, { input, date }) => ({
        ...state,
        input,
        date
    })
});