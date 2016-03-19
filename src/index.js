import React from "react";
import ReactDOM from "react-dom";

import { Router } from "react-router";
import { Provider } from "react-redux";
import { browserHistory } from "react-router";

import routes from "./routes";
import storeConfigurator from "./configureStore";

const store = storeConfigurator();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>{routes}</Router>
    </Provider>, document.getElementById("root")
);

// <Route path="cashbox" component={Cashbox}>
//     <IndexRoute component={CashboxApplication} />
//     <Route path="cashbox-owner" component={CashboxOwner} />
//     <Route path="cashbox-device" component={CashboxDevice} />
//     <Route path="fiscal-storage" component={FiscalStorage} />
// </Route>