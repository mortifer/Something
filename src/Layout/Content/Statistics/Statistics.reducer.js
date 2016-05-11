import { Map, fromJS } from "immutable"
import { defineReducer, perform } from "reelm/fluent"
import { select, call, put } from "reelm/effects"

import { getOfdApi } from "../../../Effects";

export const Enter = "Enter";
export const Leave = "Leave";
export const Change = "Change";
export const Refresh = "Refresh";
export const LoadState = "LoadState";
export const DataRetrievingError = "DataRetrievingError";

export const StatisticsRequestUpdate = "StatisticsRequestUpdate";
const StatisticsBeginUpdate = "StatisticsBeginUpdate";
const StatisticsUpdated = "StatisticsUpdated";

function * updateStatistics() {
    var api = yield getOfdApi();

    try {
        let statistics;
        const form = yield select(x => x.toJS().form);
        yield put({ type: StatisticsBeginUpdate });
        statistics = yield call(() => api.getCashreceiptsStatisticsBySalesPoints(form.from, form.to));
        yield put({ type: StatisticsUpdated, statistics: statistics });
    }
    catch (e) {
        yield put({ type: DataRetrievingError, error: e.toString() });
    }
}

export default defineReducer(Map({ form: Map({ from: new Date(), to: new Date() }) }))
    .on(DataRetrievingError,
        (state, { error }) => state.merge({statisticsUpdating: false, error: error }))
    .on(Change, (state, { data }) => state.mergeDeepIn(["form"], data))
    .on(Change, perform(function* () {
        const data = yield select(x => x.get("form").toJS());
        yield { type: "SaveState", key: "Statistics", value: data };
    }))
    .on(StatisticsRequestUpdate, perform(call(updateStatistics)))
    .on(StatisticsBeginUpdate, state => state.merge({ statisticsUpdating: true, error: null }))
    .on(StatisticsUpdated, (state, { statistics }) =>
        state.merge({
            statistics: statistics,
            statisticsUpdating: false
        }))
    .on(Leave, state => state.merge({ runRefresh: false }))
    .on(LoadState, (state, { value }) => state.set("form", fromJS(value)))
    .on(Enter, perform(function* () {

        const formData = yield { type: "LoadState", key: "Statistics" };
        if (formData !== null) { // TODO ЧЁ?! разобраться
            yield put({ type: LoadState, value: { ...formData, from: new Date(formData.from), to: new Date(formData.to) } });
        }

        yield* updateStatistics();
    }));
