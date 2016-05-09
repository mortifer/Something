import { Map, fromJS } from "immutable";
import { defineReducer, perform } from "reelm/fluent";
import { put, call } from "reelm/effects";

import { getOfdApi } from "../../../../Effects"

export const Enter = "Enter";
export const CashReceiptLoaded = "CashReceiptLoaded";
export const BeginCashReceiptLoading = "BeginCashReceiptLoading";

export default defineReducer(Map({ loading: true }))
    .on(CashReceiptLoaded, (state, { cashReceipt }) => state.merge({
        cashReceipt: fromJS(cashReceipt),
        loading: false,
    }))
    .on(BeginCashReceiptLoading, (state) => state.merge({
        loading: true,
    }))
    .on(Enter, perform(function* ( {fnSerialNumber, cashReceiptId} ) {

        function getQueryVariable(variable){
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
            }
            return(false);
        }
        
        const api = yield getOfdApi();
        const cashReceipt = yield call(() => api.getCashReceipt(getQueryVariable("fnSerialNumber"), getQueryVariable("documentId")));

        yield put({ type: BeginCashReceiptLoading });
        yield put({ type: CashReceiptLoaded, cashReceipt: cashReceipt });
    }))
