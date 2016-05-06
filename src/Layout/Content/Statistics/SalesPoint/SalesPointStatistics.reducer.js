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

function * updateSalesPointStatistics() {
    var api = yield getOfdApi();

    function getQueryVariable(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }

    try {
        let salesPointStatistics;
        const form = yield select(x => x.toJS().form);
        yield put({ type: SalesPointStatisticsBeginUpdate });
        salesPointStatistics = yield call(() => api.getStatisticsBySalesPoint(form.from, form.to, getQueryVariable("salesPointId")));
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
    .on(Enter, perform(function* () {
        yield* updateSalesPointStatistics();
    }));
