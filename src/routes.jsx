import React from "react";
import { Route, IndexRoute, Redirect} from "react-router";

import Layout                           from "./Layout";
import      Stat                        from "./Layout/Content/Stat";
import      Report                      from "./Layout/Content/Report";
import      Cashbox                     from "./Layout/Content/Cashbox";
import      Registration                from "./Layout/Content/Cashbox/Registration";
import              CashboxApplication  from "./Layout/Content/Cashbox/Registration/CashboxApplication";
import              CashboxOwner        from "./Layout/Content/Cashbox/Registration/CashboxOwner";
import              CashboxDevice       from "./Layout/Content/Cashbox/Registration/CashboxDevice";
import              FiscalStorage       from "./Layout/Content/Cashbox/Registration/FiscalStorage";

export default (
    <Route path="/" component={Layout} >
        <IndexRoute component={Report} />
        <Route path="stat" component={Stat} />
        <Route path="cashbox">
            <IndexRoute component={Cashbox} />
            <Route path="registration" component={Registration}>
                <IndexRoute component={CashboxApplication}/>
                <Route path="registration#cashbox-owner" component={CashboxOwner}/>
                <Route path="registration#cashbox-device" component={CashboxDevice}/>
                <Route path="registration#fiscal-storage" component={FiscalStorage}/>
            </Route>
        </Route>

        <Redirect from="*" to="/"/>
    </Route>
);
