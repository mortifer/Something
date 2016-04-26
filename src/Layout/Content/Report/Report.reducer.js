import axios from "axios";
import { Map, fromJS } from 'immutable'
import { defineReducer } from 'reelm/composition'
import { spoiled } from 'reelm'
import { join, fork, promise, call, put } from 'reelm/effects'

export const Refresh = 'Refresh';
export const DataRetrieved = 'DataRetrieved';
export const DataRetrievingError = 'DataRetrievingError';

const delay = tm => new Promise(r => setTimeout(r, tm));

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
                return axios.get('http://localhost.dev.kontur:3001/getModel/Report/Graph/Table').then(response => response.data).catch(error => ({ error }));        
            });
            return data;
        })        
        var task2 = yield fork(function* () {
            var data = yield promise(() => {
                return axios.get('http://localhost.dev.kontur:3001/getModel/Report/Graph/Graph').then(response => response.data).catch(error => ({ error }));        
            });
            return data;
        })
        var data1 = yield join(task1);
        var data2 = yield join(task2);

        if (data1.error || data2.error) {
            yield put({ type: DataRetrievingError, error: 'Some error' });
        }
        else {
            yield put({ type: DataRetrieved, data: { graph: data2, table: data1 } });
            yield promise(() => delay(2000));
            yield put({ type: Refresh });
        }

    }))
