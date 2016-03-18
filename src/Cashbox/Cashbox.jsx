import React from "react";
import { Link, IndexLink } from "react-router";

import CashboxApplication from "./CashboxApplication";
import CashboxOwner from "./CashboxOwner";
import CashboxDevice from "./CashboxDevice";
import FiscalStorage from "./FiscalStorage";

import Button from "ui/Button";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { submitCashboxData } from "./actions";


class Cashbox extends React.Component {
    _handleSubmit(evt){
        const { submitCashboxData } = this.props;
        submitCashboxData();
    }

    render() {
        const {children} = this.props;
        return (
            <div>
                Cashbox
                <div>
                    <IndexLink to="/cashbox" activeClassName="-active">Заявление в ИФНС</IndexLink>
                    <Link to="/cashbox#cashbox-owner" activeClassName="-active">Владелец кассы</Link>
                    <Link to="/cashbox#cashbox-device" activeClassName="-active">Кассовый аппарат </Link>
                    <Link to="/cashbox#fiscal-storage" activeClassName="-active">Фискальный накопитель</Link>
                </div>
                <CashboxApplication />
                <CashboxOwner />
                <CashboxDevice />
                <FiscalStorage />

                <Button use="success" onClick={(evt) => this._handleSubmit(evt)}>Отправить заявление</Button>
            </div>
        );
    }
}

export default connect((state = {}) => state, (dispatch) => bindActionCreators({submitCashboxData}, dispatch))(Cashbox);
