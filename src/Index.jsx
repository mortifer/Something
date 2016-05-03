import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

import { Map, fromJS } from 'immutable';
import { browserHistory } from "react-router";
import { Router, Route, IndexRoute, Redirect} from "react-router";

import Layout                           from "./Layout";
import      Stat                        from "./Layout/Content/Stat";
import      Report                      from "./Layout/Content/Report/Report.view";
import      CashReceipts                from "./Layout/Content/CashReceipts";
import      Cashbox                     from "./Layout/Content/Cashbox";
import          Registration            from "./Layout/Content/Cashbox/Registration";
import              CashboxApplication  from "./Layout/Content/Cashbox/Registration/CashboxApplication";
import              CashboxOwner        from "./Layout/Content/Cashbox/Registration/CashboxOwner";
import              CashboxDevice       from "./Layout/Content/Cashbox/Registration/CashboxDevice";
import              FiscalStorage       from "./Layout/Content/Cashbox/Registration/FiscalStorage";

import {Provider} from 'react-redux'
import {compose, createStore} from 'redux'
import reelmRunner from 'reelm';

import { Refresh } from './Layout/Content/Report/Report.reducer';
import indexReducer, { Report as ReportNamespace } from './index.reducer';

var store = createStore(indexReducer, compose(reelmRunner(), window.devToolsExtension ? window.devToolsExtension() : f => f));

window.apiURLfake = "http://mp04lr1z.dev.kontur:3001";
window.apiURL = "http://mp04lr1z.dev.kontur:11002";
window.organizationId = "3C3DC287-E0B2-4142-A6B8-DE0F6CCD8DBE";

class App extends React.Component {
    render(){
        return (
            <div>
                <Router history={browserHistory}>
                    <Route path="/" component={Layout}>
                        <IndexRoute component={Report} onEnter={() => store.dispatch({ type: `${ReportNamespace}.${Refresh}` })} />
                        <Route path="stat" component={Stat} />
                        <Route path="cash-receipts" component={CashReceipts} />
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

axios.get(apiURLfake + '/getModel')
    .then(function (response) {
        store.dispatch({ type: 'DataRetrieved', data: response.data })
    });



