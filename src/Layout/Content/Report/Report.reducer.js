import axios from "axios";
import { Map, fromJS } from 'immutable'
import { defineReducer } from 'reelm/composition'
import { spoiled } from 'reelm'
import { join, fork, promise, call, put } from 'reelm/effects'

export const Refresh = 'Refresh';
export const DataRetrieved = 'DataRetrieved';
export const DataRetrievingError = 'DataRetrievingError';

const delay = tm => new Promise(r => setTimeout(r, tm)); // ха-ха, таймеры то сбрасывать надо

export default defineReducer(Map({ empty: true, data: undefined }))
    .on(DataRetrieved, (state, { data }) => state.set('data', fromJS(data)).set('empty', false))
    .on(DataRetrievingError, (state, { error }) => state.set('error', error).set('empty', true))
    .on(DataRetrievingError, (state) => spoiled(state,
        function* () { 
            yield promise(() => delay(10000));
            yield put({ type: Refresh });
        }))
    .on(Refresh, state => spoiled(state, function* () {
        var task1 = yield fork(function* () {
            var data = yield promise(() => {
                let tmpDateFrom = new Date(Date.now() - 6*24*60*60*1000).toISOString().split("T");
                let tmpDateTo = new Date().toISOString().split("T");
                return axios.get(window.apiURL + '/v1/organizations/' + window.organizationId + '/statistics/cashreceipt?from='+ tmpDateFrom[0] +'&to='+ tmpDateTo[0]).then(response => response.data).catch(error => ({ error }));
            });
            return data;
        })        
        var task2 = yield fork(function* () {
            var data = yield promise(() => {
                return axios.get(apiURLfake + '/getModel/Report/Graph/Chart').then(response => response.data).catch(error => ({ error }));
            });
            return data;
        })
        var task3 = yield fork(function* () {
            var data = yield promise(() => {
                return axios.get(apiURLfake + '/getModel/Report/Tasks').then(response => response.data).catch(error => ({ error }));
            });
            return data;
        })
        var task4 = yield fork(function* () {
            var data = yield promise(() => {
                return axios.get(apiURLfake + '/getModel/Report/Notifications').then(response => response.data).catch(error => ({ error }));
            });
            return data;
        })
        var data1 = yield join(task1);
        var data2 = yield join(task2);
        var data3 = yield join(task3);
        var data4 = yield join(task4);

        if (data1.error || data2.error || data3.error || data4.error) {
            yield put({ type: DataRetrievingError, error: 'Some error' });
        }
        else {
            yield put({ type: DataRetrieved, data: { table: data1, graph: data2, tasks: data3, notifications: data4 } });
            yield promise(() => delay(10000));
            yield put({ type: Refresh });
        }

    }))
