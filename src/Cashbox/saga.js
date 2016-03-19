import { takeEvery } from "redux-saga";
import { put } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import { DATE_CHANGED } from "./CashboxApplication/actionTypes"

export function* initAppFromLocalStorage() {
    const input = localStorage.getItem("input") || 11;
    const date = localStorage.getItem("date");

    yield put({ type: actionTypes.FETCH_SUCCEED, input, date });
}

function* saveDateToStore(action) {
    localStorage.setItem("date", action.payload);
}

export function* saveToStore() {
    yield* takeEvery(DATE_CHANGED, saveDateToStore);
}
