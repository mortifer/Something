import React from "react";
import Input from "ui/Input";

class CashboxApplication extends React.Component {

    render() {
        const model = AppModel.Content.Cashbox.Registration.CashboxApplication;
        return (
            <div className="registration_block">
                <h3 className="registration_block_title">{model.Title}</h3>

                <p>Укажите код инспекции, в котрой надо зарегистрировать кассу</p>

                <div className="registration_block_row">
                    <label for="">Код ИФНС</label><Input value={model.Form.IfnsCode} placeholder="IfnsCode" onChange={(el, value) => {}} />
                </div>
            </div>
        );
    }
}

export default CashboxApplication;
