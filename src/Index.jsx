import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

import { browserHistory } from "react-router";
import { Router, Route, IndexRoute, Redirect} from "react-router";

import Layout                           from "./Layout";
import      Stat                        from "./Layout/Content/Stat";
import      Report                      from "./Layout/Content/Report";
import      CashReceipts                from "./Layout/Content/CashReceipts";
import      Cashbox                     from "./Layout/Content/Cashbox";
import          Registration            from "./Layout/Content/Cashbox/Registration";
import              CashboxApplication  from "./Layout/Content/Cashbox/Registration/CashboxApplication";
import              CashboxOwner        from "./Layout/Content/Cashbox/Registration/CashboxOwner";
import              CashboxDevice       from "./Layout/Content/Cashbox/Registration/CashboxDevice";
import              FiscalStorage       from "./Layout/Content/Cashbox/Registration/FiscalStorage";

//"retail-ui": "git+ssh://git@git.skbkontur.ru:catalogue/retail-ui.git#79b8fe88c589d3f93689c5499ee0a285af887ab4",

class App extends React.Component {
    render(){
        return (
            <div>
                <Router history={browserHistory}>
                    <Route path="/" component={Layout}>
                        <IndexRoute component={Report} />
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

export default App;

const Model = () => {
    axios.get('http://mp04lr1z.dev.kontur:3001/getModel')
        .then(function (response) {
            console.log("ok");
            AppModel = response.data;
            ReactDOM.render(
                <App />
                , document.getElementById("root")
            );
        })
        .catch(function (response) {
            console.log(response);
        });
}

Model();



