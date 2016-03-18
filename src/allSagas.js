import * as cashboxSagas from "./Cashbox/saga";

export default [
    ...Object.keys(cashboxSagas).map(key => cashboxSagas[key]).filter(saga => typeof saga === "function")
]