import React from "react";
import Input from "ui/Input";
import DatePicker from "ui/DatePicker";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { changeDateAsync } from "./../actions";

class CashboxApplication extends React.Component {
    render() {
        const { date, input, changeDateAsync } = this.props;
        
        return (
            <div>
                CashboxApplication

                <Input defaultValue={input} placeholder="xxx" />
                <DatePicker value={new Date(date)} onChange={(el, value) => changeDateAsync(value)} />
            </div>
        );
    }
}

export default connect((state = {}) => state, dispatch => bindActionCreators({changeDateAsync}, dispatch ))(CashboxApplication);
