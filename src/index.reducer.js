import { Map } from "immutable"
import { defineReducer } from "reelm/fluent"
import { call } from "reelm/effects";

import OfdApi from "./Api/OfdApi";

import reportReducer from "./Layout/Content/Report/Report.reducer";
import cashReceiptsReducer from "./Layout/Content/CashReceipts/CashReceipts.reducer";
import statisticsReducer from "./Layout/Content/Statistics/Statistics.reducer";
import SalesPointStatisticsReducer from "./Layout/Content/Statistics/SalesPoint/SalesPointStatistics.reducer";
import cashReceiptViewerReducer from './Layout/Content/CashReceipts/CashReceiptViewer/CashReceiptViewer.reducer';

export const Report = "Report";
export const CashReceipts = "CashReceipts";
export const Statistics = "Statistics";
export const SalesPointStatistics = "SalesPointStatistics";
export const CashReceiptViewer = "CashReceiptViewer";

export default defineReducer(Map())
    .scopedOver(Report, ["report"], reportReducer)
    .scopedOver(CashReceipts, ["cashReceipts"], cashReceiptsReducer)
    .scopedOver(CashReceiptViewer, ["cashReceiptViewer"], cashReceiptViewerReducer)
    .scopedOver(Statistics, ["statistics"], statisticsReducer)
    .scopedOver(SalesPointStatistics, ["SalesPointStatistics"], SalesPointStatisticsReducer)
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
                return JSON.parse(window.localStorage.getItem(x.key));
            });
        }
        return x;
    })
