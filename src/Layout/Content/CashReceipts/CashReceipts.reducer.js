import { Map, List } from "immutable";
import { spoiled } from "reelm";
import { defineReducer, perform } from "reelm/fluent";
import { put, call, select } from "reelm/effects";

import { getOfdApi } from "../../../Effects";

export const Change = "Change";
export const Enter = "Enter";
const SalesPointsUpdated = "SalesPointsUpdated";
const SalesPointsBeginUpdate = "SalesPointsBeginUpdate";

export const CashReceiptsRequestUpdate = "CashReceiptsRequestUpdate";
const CashReceiptsUpdated = "CashReceiptsUpdated";
const CashReceiptsBeginUpdate = "CashReceiptsBeginUpdate";

function * updateCashReceipts() {
    var api = yield getOfdApi();

    let cashreceipts;
    const [form, changedSinceLastUpdate] = yield select(x => [x.toJS().form, x.toJS().changedSinceLastUpdate]);
    if (!changedSinceLastUpdate)
        return;
    yield put({ type: CashReceiptsBeginUpdate });

    if (!form.salesPoint) {
        cashreceipts = yield call(() => api.getCashreceipts(form.from, form.to))
    }
    else {
        cashreceipts = yield call(() => api.getCashreceiptsBySalesPoint(form.from, form.to, form.salesPoint));
    }
    yield put({ type: CashReceiptsUpdated, cashreceipts: cashreceipts });
}

export default defineReducer(Map({ form: Map({ from: new Date(), to: new Date() }), changedSinceLastUpdate: true }))
    .on(Change, (state, { data }) => state.mergeDeepIn(["form"], data))
    .on(Change, (state, { data }) => state.merge({ 
        changedSinceLastUpdate: true
    }))
    .on(CashReceiptsBeginUpdate, state => state.merge({ cashReceiptsUpdating: true }))
    .on(CashReceiptsUpdated, (state, { cashreceipts }) => 
        state.merge({
            cashreceipts: cashreceipts,
            cashReceiptsUpdating: false,
            changedSinceLastUpdate: false
        }))

    .on(SalesPointsBeginUpdate, state => state.merge({ salesPointsUpdating: true }))
    .on(SalesPointsUpdated, (state, { salesPoints }) => state
        .merge({
            salesPoints: salesPoints,
            salesPointsUpdating: false
        }))    
    .on(SalesPointsUpdated, (state, { salesPoints }) => {
        var currentSalesPoint = state.getIn(["form", "salesPoint"]);
        if (!currentSalesPoint) {
            return spoiled(
                state
                    .setIn(["form", "salesPoint"], salesPoints[0].id)
                    .merge({ changedSinceLastUpdate: true }),
                updateCashReceipts);
        }
        else {
            if (!salesPoints.map(x => x.id).includes(currentSalesPoint)) {
                return spoiled(
                    state
                        .setIn(["form", "salesPoint"], salesPoints[0].id)
                        .merge({ changedSinceLastUpdate: true }),
                    updateCashReceipts);
            }
        }
        return state;
    })
    .on(CashReceiptsRequestUpdate, perform(call(updateCashReceipts)))
    .on(Enter, perform(function* () {
        var api = yield getOfdApi();

        yield* updateCashReceipts(api);

        yield put({ type: SalesPointsBeginUpdate });
        var salesPoints = yield call(() => api.getSalesPoints());
        yield put({ type: SalesPointsUpdated, salesPoints: salesPoints });

    }))
