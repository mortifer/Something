import { handleActions } from "redux-actions";
import reduceReducers from "reduce-reducers";

import * as actionTypes from "./actionTypes";
import { reducer as cashboxAppReducer }  from "./CashboxApplication";

const cashboxReducer = handleActions({
    [ actionTypes.SUBMIT_CASHBOX ] : (state) => state,
    [ actionTypes.FETCH_SUCCEED ]: (state, { input, date }) => ({
        ...state,
        input,
        date
    })
});

export default reduceReducers(cashboxAppReducer, cashboxReducer);
