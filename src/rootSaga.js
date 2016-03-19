import { sagas as cashboxSagas } from "./Cashbox";

const convertSagasToArray = (sagas) =>
    Object
        .keys(sagas)
        .map(key => sagas[key])
        .filter(saga => typeof saga === "function");

export default [
    ...convertSagasToArray(cashboxSagas)
]
