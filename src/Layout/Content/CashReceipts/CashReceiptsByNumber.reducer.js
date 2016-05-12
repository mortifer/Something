import { Map, fromJS } from "immutable";
import { spoiled } from "reelm";
import { defineReducer, perform } from "reelm/fluent";
import { put, call, select } from "reelm/effects";

import { getOfdApi } from "../../../Effects";

export const Change = "Change";
export const Enter = "Enter";
export const Leave = "Leave";
export const LoadState = "LoadState";
export const DataRetrievingError = "DataRetrievingError";

export const CashReceiptsRequestUpdate = "CashReceiptsRequestUpdate";
const CashReceiptsUpdated = "CashReceiptsUpdated";
const CashReceiptsBeginUpdate = "CashReceiptsBeginUpdate";

function * updateCashReceipts() {
    var api = yield getOfdApi();
    try {
        let cashReceipts;
        const [form, changedSinceLastUpdate] = yield select(x => [x.toJS().form, x.toJS().changedSinceLastUpdate]);
        if (!changedSinceLastUpdate)
            return;
        yield put({ type: CashReceiptsBeginUpdate });
        cashReceipts = yield call(() => api.getCashreceiptsByNumber(form.number))
        yield put({ type: CashReceiptsUpdated, cashReceipts: cashReceipts });
    }
    catch (e) {
        yield put({ type: DataRetrievingError, error: e.toString() });
    }
}

export default defineReducer(Map({ form: Map(), changedSinceLastUpdate: true }))
    .on(DataRetrievingError,
        (state, { error }) => state.merge({cashReceiptsUpdating: false, error: error }))
    .on(Change, (state, { data }) => state.mergeDeepIn(["form"], data))
    .on(LoadState, (state, { value }) => state.set("form", fromJS(value)))
    .on(Change, perform(function* () {
        const data = yield select(x => x.get("form").toJS());
        yield { type: "SaveState", key: "CashReceiptsByNumber", value: data };
    }))
    .on(Change, (state) => state.merge({
        changedSinceLastUpdate: true
    }))
    .on(CashReceiptsRequestUpdate, perform(call(updateCashReceipts)))
    .on(CashReceiptsBeginUpdate, state => state.merge({ cashReceiptsUpdating: true, error: null }))
    .on(CashReceiptsUpdated, (state, { cashReceipts })  =>
        state.merge({
            cashReceipts: cashReceipts,
            cashReceiptsUpdating: false,
            changedSinceLastUpdate: false
        })
    )
    .on(Enter, perform(function* () {
        var api = yield getOfdApi();
        const formData = yield { type: "LoadState", key: "CashReceiptsByNumber" };
        if (formData !== null) { // TODO ЧЁ?! разобраться
            yield put({ type: LoadState, value: { ...formData } });
        }
        yield* updateCashReceipts(api);
    }))
    .on(Leave, (state) => state.merge({ changedSinceLastUpdate: true }));

