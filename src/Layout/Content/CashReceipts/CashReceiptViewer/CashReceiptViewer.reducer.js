import { Map, fromJS } from "immutable";
import { defineReducer, perform } from "reelm/fluent";
import { put, call } from "reelm/effects";

import { getOfdApi } from "../../../../Effects";

export const Enter = "Enter";
export const CashReceiptLoaded = "CashReceiptLoaded";
export const BeginCashReceiptLoading = "BeginCashReceiptLoading";

export default defineReducer(Map({ loading: true }))
    .on(CashReceiptLoaded, (state, { cashReceipt, backUrl }) => state.merge({
        cashReceipt: fromJS(cashReceipt),
        loading: false,
        backUrl: fromJS(backUrl)
    }))
    .on(BeginCashReceiptLoading, (state) => state.merge({
        loading: true,
    }))
    .on(Enter, perform(function* ( {fnSerialNumber, cashReceiptId, backUrl} ) {
        const api = yield getOfdApi();
        const cashReceipt = yield call(() => api.getCashReceipt(fnSerialNumber, cashReceiptId));

        yield put({ type: BeginCashReceiptLoading });
        yield put({ type: CashReceiptLoaded, cashReceipt: cashReceipt, backUrl: backUrl  });
    }))
