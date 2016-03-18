import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, IndexRoute, browserHistory, Redirect} from "react-router";
import { Provider } from "react-redux";

import Layout from "./Layout";
import Stat from "./Stat";
import Report from "./Report";
import Cashbox from "./Cashbox";

import configureStore from "./configureStore";

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Report} />
                <Route path="stat" component={Stat} />
                <Route path="cashbox" component={Cashbox} />
                <Redirect from="*" to="/" />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// <Route path="cashbox" component={Cashbox}>
//     <IndexRoute component={CashboxApplication} />
//     <Route path="cashbox-owner" component={CashboxOwner} />
//     <Route path="cashbox-device" component={CashboxDevice} />
//     <Route path="fiscal-storage" component={FiscalStorage} />
// </Route>
