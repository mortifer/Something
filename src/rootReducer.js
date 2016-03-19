import { reducer as cashReducer } from "./Cashbox"

export default (state = {}, action) => {
    return cashReducer(state, action);
};
