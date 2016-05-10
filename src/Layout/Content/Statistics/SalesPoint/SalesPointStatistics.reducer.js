import { Map, fromJS } from "immutable"
import { defineReducer, perform } from "reelm/fluent"
import { select, call, put } from "reelm/effects"

import { getOfdApi } from "../../../../Effects";

export const Enter = "Enter";
export const Leave = "Leave";
export const Change = "Change";
export const Refresh = "Refresh";
export const DataRetrievingError = "DataRetrievingError";

export const SalesPointStatisticsRequestUpdate = "SalesPointStatisticsRequestUpdate";
const SalesPointStatisticsBeginUpdate = "SalesPointStatisticsBeginUpdate";
const SalesPointStatisticsUpdated = "SalesPointStatisticsUpdated";

function * updateSalesPointStatistics(salesPointId) {
    var api = yield getOfdApi();

    try {
        let salesPointStatistics;
        const form = yield select(x => x.toJS().form);
        yield put({ type: SalesPointStatisticsBeginUpdate });
        salesPointStatistics = yield call(() => api.getStatisticsBySalesPoint(form.from, form.to, salesPointId));
        yield put({ type: SalesPointStatisticsUpdated, salesPointStatistics: salesPointStatistics });
    }
    catch (e) {
        yield put({ type: DataRetrievingError, error: e.toString() });
    }
}

export default defineReducer(Map({ form: Map({ from: new Date(), to: new Date() }) }))
    .on(DataRetrievingError,
        (state, { error }) => state.merge({salesPointStatisticsUpdating: false, error: error }))
    .on(Change, (state, { data }) => state.mergeDeepIn(["form"], data))

    .on(SalesPointStatisticsRequestUpdate, perform(call(updateSalesPointStatistics)))
    .on(SalesPointStatisticsBeginUpdate, state => state.merge({ salesPointStatisticsUpdating: true, error: null }))
    .on(SalesPointStatisticsUpdated, (state, { salesPointStatistics }) =>
        state.merge({
            salesPointStatistics: salesPointStatistics,
            salesPointStatisticsUpdating: false
        }))
    .on(Leave, state => state.merge({ runRefresh: false }))
    .on(Enter, perform(function* ({salesPointId}) {
        yield* updateSalesPointStatistics(salesPointId);
    }));
