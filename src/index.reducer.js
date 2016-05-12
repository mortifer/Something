import { Map } from "immutable"
import { defineReducer } from "reelm/fluent"
import { call } from "reelm/effects";

import OfdApi from "./Api/OfdApi";

import reportReducer from "./Layout/Content/Report/Report.reducer";
import statisticsReducer from "./Layout/Content/Statistics/Statistics.reducer";
import SalesPointStatisticsReducer from "./Layout/Content/Statistics/SalesPoint/SalesPointStatistics.reducer";
import cashReceiptsReducer from "./Layout/Content/CashReceipts/CashReceipts.reducer";
import cashReceiptsByNumberReducer from "./Layout/Content/CashReceipts/CashReceiptsByNumber.reducer";
import cashReceiptViewerReducer from './Layout/Content/CashReceipts/CashReceiptViewer/CashReceiptViewer.reducer';

export const Report = "Report";
export const Statistics = "Statistics";
export const SalesPointStatistics = "SalesPointStatistics";
export const CashReceipts = "CashReceipts";
export const CashReceiptsByNumber = "CashReceiptsByNumber";
export const CashReceiptViewer = "CashReceiptViewer";

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

export default defineReducer(Map())
.scopedOver(Report, ["report"], reportReducer)
.scopedOver(Statistics, ["statistics"], statisticsReducer)
.scopedOver(SalesPointStatistics, ["SalesPointStatistics"], SalesPointStatisticsReducer)
.scopedOver(CashReceipts, ["cashReceipts"], cashReceiptsReducer)
.scopedOver(CashReceiptsByNumber, ["cashReceiptsByNumber"], cashReceiptsByNumberReducer)
.scopedOver(CashReceiptViewer, ["cashReceiptViewer"], cashReceiptViewerReducer)

.mapEffects(x => {
    if (x.type === "GetOfdApi") {
        return call(function* () {
            return new OfdApi(window.apiURL, window.organizationId);
        });
    }
    if (x.type === "SaveState") {
        return call(function* () {
            window.localStorage.setItem(x.key, JSON.stringify(x.value));
        });
    }
    if (x.type === "LoadState") {
        return call(function* () {
            const obj = JSON.parse(window.localStorage.getItem(x.key))
            if (window.location.search){
                if (obj.from) obj.from = getQueryVariable("from")
                if (obj.to) obj.to = getQueryVariable("to")
                history.replaceState(history.previous , "", window.location.toString().split("?")[0]);
            }
            return obj;
        });
    }
    return x;
})
