import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';

import { Map, fromJS } from "immutable";
import { browserHistory } from "react-router";
import { Router, Route, IndexRoute, Redirect} from "react-router";
import { forwardTo } from 'reelm';

import Layout                                   from "./Layout";
import      Statistics                          from "./Layout/Content/Statistics/Statistics.view";
import      statisticsSelector                  from "./Layout/Content/Statistics/Statistics.selector";
import          SalesPointStatistics             from "./Layout/Content/Statistics/SalesPoint/SalesPointStatistics.view";
import          salesPointStatisticsSelector     from "./Layout/Content/Statistics/SalesPoint/SalesPointStatistics.selector";
import      Report                              from "./Layout/Content/Report/Report.view";
import      CashReceipts                        from "./Layout/Content/CashReceipts/CashReceipts.view";
import      cashReceiptsSelector                from "./Layout/Content/CashReceipts/CashReceipts.selector";
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
import { Enter as CashReceiptsEnter  } from "./Layout/Content/CashReceipts/CashReceipts.reducer";
import { Enter as StatisticsEnter, Leave as StatisticsLeave  } from "./Layout/Content/Statistics/Statistics.reducer";
import { Enter as SalesPointStatisticsEnter, Leave as SalesPointStatisticsLeave  } from "./Layout/Content/Statistics/SalesPoint/SalesPointStatistics.reducer";
import indexReducer, { Report as ReportNamespace, CashReceipts as CashReceiptsNamespace, Statistics as StatisticsNamespace, SalesPointStatistics as SalesPointStatisticsNamespace } from "./index.reducer";

var store = createStore(indexReducer, compose(reelmRunner(), window.devToolsExtension ? window.devToolsExtension() : f => f));

window.apiURLfake = "http://mp04lr1z.dev.kontur:3001";
window.apiURL = "http://mp04lr1z.dev.kontur:11002";
window.organizationId = "3C3DC287-E0B2-4142-A6B8-DE0F6CCD8DBE";

const CashReceiptsConnected = connect(
    state => cashReceiptsSelector(state.get("cashReceipts")),
    dispatch => ({ dispatch: forwardTo(dispatch, CashReceiptsNamespace) })
    )(CashReceipts);

const StatisticsConnected = connect(
    state => statisticsSelector(state.get("statistics")),
    dispatch => ({ dispatch: forwardTo(dispatch, StatisticsNamespace) })
    )(Statistics);

const SalesPointStatisticsConnected = connect(
    state => salesPointStatisticsSelector(state.get("SalesPointStatistics")),
    dispatch => ({ dispatch: forwardTo(dispatch, SalesPointStatisticsNamespace) })
    )(SalesPointStatistics);

class App extends React.Component {
    render(){
        return (
            <div>
                <Router history={browserHistory}>
                    <Route path="/" component={Layout}>
                        <IndexRoute component={Report} 
                            onEnter={() => store.dispatch({ type: `${ReportNamespace}.${Enter}` })}
                            onLeave={() => store.dispatch({ type: `${ReportNamespace}.${Leave}` })} />
                        <Route path="statistics">
                            <IndexRoute  component={StatisticsConnected}
                                         onEnter={() => store.dispatch({ type: `${StatisticsNamespace}.${StatisticsEnter}` })}
                                         onLeave={() => store.dispatch({ type: `${StatisticsNamespace}.${StatisticsLeave}` })} />
                            <Route path="SalesPointStatistics" component={SalesPointStatisticsConnected}
                                   onEnter={() => store.dispatch({ type: `${SalesPointStatisticsNamespace}.${SalesPointStatisticsEnter}` })}
                                   onLeave={() => store.dispatch({ type: `${SalesPointStatisticsNamespace}.${SalesPointStatisticsLeave}` })} />
                        </Route>
                        <Route path="cash-receipts" component={CashReceiptsConnected} 
                            onEnter={() => store.dispatch({ type: `${CashReceiptsNamespace}.${CashReceiptsEnter}` })} />
                        <Route path="cashbox">
                            <IndexRoute component={Cashbox} />
                            <Route path="registration" component={Registration} >
                                <IndexRoute component={CashboxApplication} />
                                <Route path="registration#cashbox-owner" component={CashboxOwner} />
                                <Route path="registration#cashbox-device" component={CashboxDevice} />
                                <Route path="registration#fiscal-storage" component={FiscalStorage} />
                            </Route>
                        </Route>

                        <Redirect from="*" to="/"/>
                    </Route>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
