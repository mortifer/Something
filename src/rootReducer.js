import cashboxAppReducer from "./Cashbox/CashboxApplication/reducer"
import cashReducer from "./Cashbox/reducer"

export default (state = {}, action) => {
    return cashReducer(cashboxAppReducer(state, action), action);
};