import axios from "axios";
import React from "react";
import { connect } from 'react-redux';

import { Link, IndexLink } from "react-router";

import CashboxApplication from "./CashboxApplication";
import CashboxOwner from "./CashboxOwner";
import CashboxDevice from "./CashboxDevice";
import FiscalStorage from "./FiscalStorage";

import Button from "ui/Button";

class Registration extends React.Component {
    render() {

        var { model, dispatch } = this.props;
        if (!model)
            return (<div>Loading...</div>)
        var onChange = (d) => dispatch({ type: 'Change', data: d });

        return (
            <div className="lightpage">
                <div className="lightpage_back"><h2><Link to="/cashbox">Кассы</Link></h2></div>
                <Link to="/cashbox" className="lightpage_close"></Link>

                <div className="lightpage_content">
                    <h2>Регистрационный учет кассы</h2>
                    <div className="registration">
                        <CashboxApplication model={model.CashboxApplication} onChange={d => onChange({ CashboxApplication: d })} />
                    </div>
                    <Button use="success" size="large" onClick={() => dispatch({ type: 'StartPosting' })}>Отправить заявление</Button>
                </div>
            </div>
        );
    }
}
// <CashboxOwner model={model.CashboxOwner} />
// <CashboxDevice model={model.CashboxDevice} />
// <FiscalStorage model={model.FiscalStorage} />

export default connect(
    state => ({ model: state.get('Registration') && state.get('Registration').toJS() })
)(Registration);


