import React from "react";
import { Route, IndexRoute, Redirect} from "react-router";

import Layout from "./Layout";
import Stat from "./Stat";
import Report from "./Report";
import Cashbox from "./Cashbox";

export default (
    <Route path="/" component={Layout}>
        <IndexRoute component={Report} />
        <Route path="stat" component={Stat} />
        <Route path="cashbox" component={Cashbox} />
        <Redirect from="*" to="/" />
    </Route>
);