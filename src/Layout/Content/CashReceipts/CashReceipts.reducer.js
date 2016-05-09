import { Map, fromJS } from "immutable";
import { spoiled } from "reelm";
import { defineReducer, perform } from "reelm/fluent";
import { put, call, select } from "reelm/effects";

import { getOfdApi } from "../../../Effects";

export const Change = "Change";
export const Enter = "Enter";
export const LoadState = "LoadState";
export const DataRetrievingError = "DataRetrievingError";

const SalesPointsUpdated = "SalesPointsUpdated";
const SalesPointsBeginUpdate = "SalesPointsBeginUpdate";

export const CashReceiptsRequestUpdate = "CashReceiptsRequestUpdate";
export const CashReceiptsRequestNextPage = "CashReceiptsRequestNextPage";
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
        if (!form.salesPoint) {
            cashReceipts = yield call(() => api.getCashreceipts(form.from, form.to))
        }
        else {
            cashReceipts = yield call(() => api.getCashreceiptsBySalesPoint(form.from, form.to, form.salesPoint));
        }
        yield put({ type: CashReceiptsUpdated, cashReceipts: cashReceipts });
    }
    catch (e) {
        yield put({ type: DataRetrievingError, error: e.toString() });
    }
}

function * retrieveCashReceiptsNextPage() {
    var api = yield getOfdApi();

    try {
        let cashReceipts;
        const form = yield select(x => x.toJS().form);
        yield put({ type: CashReceiptsBeginUpdate });
        const currentCashReceipts = yield select(x => x.getIn(["cashReceipts", "items"]).toJS());
        console.log(currentCashReceipts)
        const anchorId = currentCashReceipts[currentCashReceipts.length - 1].documentId;
        if (!form.salesPoint) {
            cashReceipts = yield call(() => api.getCashreceipts(form.from, form.to, anchorId))
        }
        else {
            cashReceipts = yield call(() => api.getCashreceiptsBySalesPoint(form.from, form.to, form.salesPoint, anchorId));
        }
        yield put({ type: CashReceiptsUpdated, cashReceipts: fromJS({ items: [...currentCashReceipts, ...cashReceipts.items], count: cashReceipts.count }) });
    }
    catch (e) {
        yield put({ type: DataRetrievingError, error: e.toString() });
    }
}

export default defineReducer(Map({ form: Map({ from: new Date(), to: new Date() }), changedSinceLastUpdate: true }))
    .on(DataRetrievingError,
        (state, { error }) => state.merge({cashReceiptsUpdating: false, error: error }))

    .on(Change, (state, { data }) => state.mergeDeepIn(["form"], data))

    .on(LoadState, (state, { value }) => state.set("form", fromJS(value)))
    .on(Change, perform(function* () {
        const data = yield select(x => x.get("form").toJS());
        yield { type: "SaveState", key: "CashReceipts", value: data };
    }))

    .on(Change, (state) => state.merge({
        changedSinceLastUpdate: true
    }))
    .on(CashReceiptsRequestNextPage, perform(call(retrieveCashReceiptsNextPage)))    
    .on(CashReceiptsRequestUpdate, perform(call(updateCashReceipts)))    
    .on(CashReceiptsBeginUpdate, state => state.merge({ cashReceiptsUpdating: true, error: null }))
    .on(CashReceiptsUpdated, (state, { cashReceipts }) =>
        state.merge({
            cashReceipts: cashReceipts,
            cashReceiptsUpdating: false,
            changedSinceLastUpdate: false
        }))
    .on(SalesPointsBeginUpdate, state => state.merge({ salesPointsUpdating: true, error: null}))
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
                    .merge({ changedSinceLastUpdate: true })//,
                    //updateCashReceipts);
                );
        }
        else {
            if (!salesPoints.map(x => x.id).includes(currentSalesPoint)) {
                return spoiled(
                    state
                        .setIn(["form", "salesPoint"], salesPoints[0].id)
                        .merge({ changedSinceLastUpdate: true })//,
                        //updateCashReceipts
                    );
            }
        }
        return state;
    })
    .on(Enter, perform(function* () {
        var api = yield getOfdApi();
        const formData = yield { type: "LoadState", key: "CashReceipts" };
        if (formData !== null) { // TODO ЧЁ?! разобраться
            yield put({ type: LoadState, value: { ...formData, from: new Date(formData.from), to: new Date(formData.to) } });    
        }
        

        yield* updateCashReceipts(api);

        yield put({type: SalesPointsBeginUpdate});
        var salesPoints = yield call(() => api.getSalesPoints());
        yield put({type: SalesPointsUpdated, salesPoints: salesPoints});
    }));

