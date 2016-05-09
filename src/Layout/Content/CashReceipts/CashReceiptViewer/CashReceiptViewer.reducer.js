import { Map, fromJS } from "immutable";
import { defineReducer, perform } from "reelm/fluent";
import { put, call } from "reelm/effects";

import { getOfdApi } from "../../../../Effects"

export const Enter = "Enter";
export const CashReceiptLoaded = "CashReceiptLoaded";
export const BeginCashReceiptLoading = "BeginCashReceiptLoading";

export default defineReducer(Map({ loading: true }))
    .on(CashReceiptLoaded, (state, { cachReceipt }) => state.merge({
        cachReceipt: fromJS(cachReceipt),
        loading: false,
    }))
    .on(BeginCashReceiptLoading, (state) => state.merge({
        loading: true,
    }))
    .on(Enter, perform(function* ({ cashReceiptId }) {
        const api = yield getOfdApi();
        const cachReceipt = yield call(() => api.getCashReceipt(cashReceiptId));

        yield put({ type: BeginCashReceiptLoading });
        yield put({ type: CashReceiptLoaded, cachReceipt: cachReceipt });        
    }))
