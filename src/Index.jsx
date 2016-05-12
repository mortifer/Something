import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';

import { browserHistory } from "react-router";
import { Router, Route, IndexRoute, Redirect, IndexRedirect } from "react-router";
import { forwardTo } from 'reelm';

import Layout                                   from "./Layout";
import      Statistics                          from "./Layout/Content/Statistics/Statistics.view";
import      statisticsSelector                  from "./Layout/Content/Statistics/Statistics.selector";
import          SalesPointStatistics            from "./Layout/Content/Statistics/SalesPoint/SalesPointStatistics.view";
import          salesPointStatisticsSelector    from "./Layout/Content/Statistics/SalesPoint/SalesPointStatistics.selector";
import      Report                              from "./Layout/Content/Report/Report.view";
import      CashReceipts                        from "./Layout/Content/CashReceipts/CashReceipts.view";
import      cashReceiptsSelector                from "./Layout/Content/CashReceipts/CashReceipts.selector";
import      CashReceiptsByNumber                from "./Layout/Content/CashReceipts/CashReceiptsByNumber.view";
import      cashReceiptsByNumberSelector        from "./Layout/Content/CashReceipts/CashReceiptsByNumber.selector";
import          CashReceiptViewer               from "./Layout/Content/CashReceipts/CashReceiptViewer/CashReceiptViewer.view";

import      Cashbox                             from "./Layout/Content/Cashbox";
import          Registration                    from "./Layout/Content/Cashbox/Registration";
import              CashboxApplication          from "./Layout/Content/Cashbox/Registration/CashboxApplication";
import              CashboxOwner                from "./Layout/Content/Cashbox/Registration/CashboxOwner";
import              CashboxDevice               from "./Layout/Content/Cashbox/Registration/CashboxDevice";
import              FiscalStorage               from "./Layout/Content/Cashbox/Registration/FiscalStorage";

import { Provider } from "react-redux"
import {compose, createStore} from "redux"
import {reelmRunner} from "reelm";

import { Enter, Leave } from "./Layout/Content/Report/Report.reducer";
import { Enter as StatisticsEnter, Leave as StatisticsLeave  } from "./Layout/Content/Statistics/Statistics.reducer";
import { Enter as SalesPointStatisticsEnter, Leave as SalesPointStatisticsLeave  } from "./Layout/Content/Statistics/SalesPoint/SalesPointStatistics.reducer";
import { Enter as CashReceiptsEnter, Leave as CashReceiptsLeave   } from "./Layout/Content/CashReceipts/CashReceipts.reducer";
import { Enter as CashReceiptsByNumberEnter, Leave as CashReceiptsByNumberLeave   } from "./Layout/Content/CashReceipts/CashReceiptsByNumber.reducer";
import { Enter as CashReceiptViewerEnter } from "./Layout/Content/CashReceipts/CashReceiptViewer/CashReceiptViewer.reducer";

import indexReducer, { 
    Report as ReportNamespace, 
    Statistics as StatisticsNamespace, 
    SalesPointStatistics as SalesPointStatisticsNamespace ,
    CashReceipts as CashReceiptsNamespace,
    CashReceiptsByNumber as CashReceiptsByNumberNamespace,
    CashReceiptViewer as CashReceiptViewerNamespace
} from "./index.reducer";

var store = createStore(indexReducer, compose(reelmRunner(), window.devToolsExtension ? window.devToolsExtension() : f => f));

window.apiURLfake = "http://mp04lr1z.dev.kontur:3001";
window.apiURL = "http://mp04lr1z.dev.kontur:11002";
window.organizationId = "3C3DC287-E0B2-4142-A6B8-DE0F6CCD8DBE";

const StatisticsConnected = connect(
    state => statisticsSelector(state.get("statistics")),
    dispatch => ({ dispatch: forwardTo(dispatch, StatisticsNamespace) })
    )(Statistics);

const SalesPointStatisticsConnected = connect(
    state => salesPointStatisticsSelector(state.get("SalesPointStatistics")),
    dispatch => ({ dispatch: forwardTo(dispatch, SalesPointStatisticsNamespace) })
    )(SalesPointStatistics);

const CashReceiptsConnected = connect(
    state => cashReceiptsSelector(state.get("cashReceipts")),
    dispatch => ({ dispatch: forwardTo(dispatch, CashReceiptsNamespace) })
)(CashReceipts);

const CashReceiptsByNumberConnected = connect(
    state => cashReceiptsByNumberSelector(state.get("cashReceiptsByNumber")),
    dispatch => ({ dispatch: forwardTo(dispatch, CashReceiptsByNumberNamespace) })
)(CashReceiptsByNumber);

const CashReceiptViewerConnected = connect(
    state => state.get("cashReceiptViewer").toJS(),
    dispatch => ({ dispatch: forwardTo(dispatch, CashReceiptViewerNamespace) })
    )(CashReceiptViewer);

class App extends React.Component {
    render(){
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={Report}
                        onEnter={() => store.dispatch({ type: `${ReportNamespace}.${Enter}` })}
                        onLeave={() => store.dispatch({ type: `${ReportNamespace}.${Leave}` })} />
                    <Route path="Statistics">
                        <IndexRoute  component={StatisticsConnected}
                                     onEnter={() => store.dispatch({ type: `${StatisticsNamespace}.${StatisticsEnter}` })}
                                     onLeave={() => store.dispatch({ type: `${StatisticsNamespace}.${StatisticsLeave}` })} />
                        <Route path="SalesPoint/:salesPointId" component={SalesPointStatisticsConnected}
                               onEnter={({ params }) => store.dispatch({ type: `${SalesPointStatisticsNamespace}.${SalesPointStatisticsEnter}`, salesPointId: params.salesPointId })}
                               onLeave={() => store.dispatch({ type: `${SalesPointStatisticsNamespace}.${SalesPointStatisticsLeave}` })} />
                    </Route>
                    <Route path="CashReceipts">
                        <IndexRedirect to="Common" />
                        <Route path="Common" component={CashReceiptsConnected}
                                    onEnter={() => store.dispatch({ type: `${CashReceiptsNamespace}.${CashReceiptsEnter}` })}
                                    onLeave={() => store.dispatch({ type: `${CashReceiptsNamespace}.${CashReceiptsLeave}` })}>
                            <Route path=":fnSerialNumber/:cashReceiptId"
                                   component={CashReceiptViewerConnected}
                                   onEnter={({ params }) => store.dispatch({ type: `${CashReceiptViewerNamespace}.${CashReceiptViewerEnter}`, fnSerialNumber: params.fnSerialNumber, cashReceiptId: params.cashReceiptId, backUrl: "Common" })}
                            />
                        </Route>
                        <Route path="Number" component={CashReceiptsByNumberConnected}
                                    onEnter={() => store.dispatch({ type: `${CashReceiptsByNumberNamespace}.${CashReceiptsByNumberEnter}` })}
                                    onLeave={() => store.dispatch({ type: `${CashReceiptsByNumberNamespace}.${CashReceiptsByNumberLeave}` })}>
                            <Route path=":fnSerialNumber/:cashReceiptId"
                                   component={CashReceiptViewerConnected}
                                   onEnter={({ params }) => store.dispatch({ type: `${CashReceiptViewerNamespace}.${CashReceiptViewerEnter}`, fnSerialNumber: params.fnSerialNumber, cashReceiptId: params.cashReceiptId, backUrl: "Number" })}
                            />
                        </Route>
                        <Redirect from="*" to="Common" />
                    </Route>
                    <Route path="Cashbox">
                        <IndexRoute component={Cashbox} />
                        <Route path="Registration" component={Registration} >
                            <IndexRoute component={CashboxApplication} />
                            <Route path="Registration#cashbox-owner" component={CashboxOwner} />
                            <Route path="Registration#cashbox-device" component={CashboxDevice} />
                            <Route path="Registration#fiscal-storage" component={FiscalStorage} />
                        </Route>
                    </Route>

                    <Redirect from="*" to="/"/>
                </Route>
            </Router>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
