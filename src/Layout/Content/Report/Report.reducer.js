import { Map, fromJS } from "immutable"
import { defineReducer, perform } from "reelm/fluent"
import { select, call, put } from "reelm/effects"

import { getOfdApi } from "../../../Effects";

export const Enter = "Enter";
export const Leave = "Leave";
export const Refresh = "Refresh";
export const DataRetrieved = "DataRetrieved";
export const DataRetrievingError = "DataRetrievingError";

const delay = tm => new Promise(r => setTimeout(r, tm)); // ха-ха, таймеры то сбрасывать надо

export default defineReducer(Map({ empty: true, data: undefined, runRefresh: false }))
    .on(DataRetrieved, 
        (state, { data }) => state.set("data", fromJS(data)).set("empty", false))
    .on(DataRetrievingError, 
        (state, { error }) => state.set("error", error).set("empty", true))
    .on(Enter, state => state.merge({ runRefresh: true }))
    .on(Enter, perform(function*() { 
        yield put({ type: Refresh }); 
    }))
    .on(Leave, state => state.merge({ runRefresh: false }))
    .on(Refresh, perform(function* () {
        const api = yield getOfdApi();

        try {
            const tmpDateFrom = new Date(Date.now() - 6*24*60*60*1000);
            const tmpDateTo = new Date();

            const [cashreceipts, tasks, notifications] = 
                yield [
                    call(() => api.getCashreceiptsStatistics(tmpDateFrom, tmpDateTo)),
                    call(() => api.getTasks()),
                    call(() => api.getNotifications())
                ];

            yield put({ type: DataRetrieved, data: { table: cashreceipts, tasks: tasks, notifications: notifications } });
            yield call(() => delay(10000));
        }
        catch (e) {
            yield put({ type: DataRetrievingError, error: e.toString() });
            yield call(() => delay(1000));
        }
        if (yield select(x => x.get("runRefresh")))
            yield put({ type: Refresh });
    }));
